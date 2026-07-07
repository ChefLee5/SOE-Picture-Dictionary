#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate unique workbook illustrations (replacing borrowed Picture
Dictionary art) via fal.ai Seedream v4 edit, reference-conditioned on
the SOE character ref images.

Reads every image referenced in workbook_content.json, builds a
canon-aligned prompt (land, hero pair, activity subject), attaches the
land's two hero reference JPEGs, and writes results to art_generated/
(NEVER overwrites the live images). Review, then copy approved files
into OEBPS/images/dictionary/ under the same filenames — the existing
pipeline picks them up unchanged.

Usage:
  py generate_workbook_art.py --list              # show plan, no API calls
  py generate_workbook_art.py --limit 1           # test batch
  py generate_workbook_art.py --land land3        # one land only
  py generate_workbook_art.py                     # full run (skips existing)

Env: FAL_KEY must be set. Model override: --model <fal model id>.
"""
import argparse
import base64
import io
import json
import mimetypes
import os
import sys
import time
import urllib.request
from collections import defaultdict
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

BASE = Path(__file__).resolve().parent
CONTENT = BASE / "workbook_content.json"
OUT_DIR = BASE / "art_generated"
REF_DIR = Path(r"C:\Users\ldmur\Downloads\The Sound of Essentials Image Assets")

DEFAULT_MODEL = "fal-ai/bytedance/seedream/v4/edit"

# land -> (name, heroes, accent, setting described WITHOUT the land's proper
# noun — naming the land in the prompt makes the model paint the word on walls.
# Accent is a COLOR NAME, never a hex code: the model paints hex strings into
# the art (learned the hard way — 8 of the first batch had "#7fb685" etc.
# rendered on signs and walls).
LANDS = {
    1: ("Harmonia", ("Kenji", "Aiko"), "warm golden yellow",
        "a warm, music-filled village classroom world of song, greetings and friendship"),
    2: ("Numeria", ("Octavia", "Kwame"), "soft sage green",
        "a playful geometric world of numbers, counting games, coins and patterns"),
    3: ("Terrasol", ("Vesta", "Silas"), "fresh spring green",
        "a lush garden-and-farm world of plants, animals and nature discovery"),
    4: ("Aquaria", ("Nerissa", "Ronan"), "calm sky blue",
        "a bright coastal harbor world of water, boats, maps and travel"),
    5: ("Vitalis", ("Amara", "Felix"), "warm terracotta",
        "a sunny park-and-playground world of movement, health and good food"),
    6: ("Luminosity", ("Athena", "Ezra"), "soft coral",
        "a friendly town-square world of helpers, workshops, tools and community"),
    7: ("Celestia", ("Selene", "Elias"), "gentle violet",
        "a dreamy starlit observatory world of clocks, seasons and night sky"),
}
# Ref image filenames that differ from the canonical hero name
REF_NAME_OVERRIDES = {"Selene": "Celene Ref.jpeg", "Silas": "Silas.jpeg"}

GENDER = {
    "Kenji": "boy", "Kwame": "boy", "Silas": "boy", "Ronan": "boy",
    "Felix": "boy", "Ezra": "boy", "Elias": "boy",
    "Aiko": "girl", "Octavia": "girl", "Vesta": "girl", "Nerissa": "girl",
    "Amara": "girl", "Athena": "girl", "Selene": "girl",
}

STYLE = (
    "Bright, playful, neuro-affirming children's workbook illustration. Clean bold shapes, "
    "generous whitespace, warm print-safe colors, friendly and calm mood. Exactly TWO children "
    "in the scene and no other people: the boy appears exactly once and the girl appears exactly "
    "once — never duplicate a character. Keep both heroes on-model with the reference images: "
    "same faces, hair, skin tones, and outfits. ABSOLUTELY NO text, words, letters, numbers, "
    "signs, labels, or writing anywhere in the image — decorate walls and objects with pictures "
    "and symbols only. Wide 4:3 scene composition suitable for a printed activity page."
)


def ref_path(hero):
    fname = REF_NAME_OVERRIDES.get(hero, f"{hero} Ref.jpeg")
    p = REF_DIR / fname
    if not p.exists():
        raise FileNotFoundError(f"reference image missing: {p}")
    return p


def data_uri(path):
    mime = mimetypes.guess_type(str(path))[0] or "image/jpeg"
    b64 = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{mime};base64,{b64}"


def collect_jobs():
    with io.open(CONTENT, encoding="utf-8-sig") as f:
        data = json.load(f)
    usage = defaultdict(list)
    for w in data["weeks"]:
        for d in w["days"]:
            for letter, blk in sorted(d.get("blocks", {}).items()):
                if isinstance(blk, dict) and blk.get("img"):
                    usage[blk["img"]].append(blk)
    jobs = []
    for img in sorted(usage):
        if not (img.startswith("land") and img[4].isdigit()):
            print(f"  (skipping non-land image: {img})")
            continue
        land = int(img[4])
        land_name, heroes, accent, themes = LANDS[land]
        blocks = usage[img]
        alt = next((b.get("img_alt", "") for b in blocks if b.get("img_alt")), "")
        title = blocks[0].get("title", img)
        subject = alt or title
        subject = subject.replace(land_name, "the village").replace(f"{land_name}'s", "the village's")
        prompt = (
            f"Illustrate: {subject}. Setting: {themes}. "
            f"The hero duo — the {GENDER[heroes[0]]} from the first reference image and the "
            f"{GENDER[heroes[1]]} from the second reference image, one of each — are actively "
            f"engaged in the scene together. "
            f"Palette anchored on a {accent} accent. " + STYLE
            + " Any signs, banners, storefronts, posters, books or labels in the scene are "
            "blank or decorated with simple pictorial symbols only — a storefront or building "
            "sign shows a single pictogram icon (a coin, an envelope, a leaf), never lettering. "
            "Final rules, most important: the image must contain zero written words, letters, "
            "or codes anywhere including corners and edges, and exactly two children total, "
            "both heroes present together — never add extra children or duplicate the heroes."
        )
        jobs.append({"img": img, "land": land, "heroes": heroes, "prompt": prompt})
    return jobs


def call_fal(model, prompt, ref_paths, api_key):
    payload = {
        "prompt": prompt,
        "image_urls": [data_uri(p) for p in ref_paths],
        "image_size": {"width": 1280, "height": 960},
        "num_images": 1,
    }
    req = urllib.request.Request(
        f"https://fal.run/{model}",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Key {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=300) as resp:
        result = json.loads(resp.read().decode("utf-8"))
    images = result.get("images") or []
    if not images:
        raise RuntimeError(f"no image in response: {json.dumps(result)[:400]}")
    return images[0]["url"]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--list", action="store_true", help="print the plan, no API calls")
    ap.add_argument("--limit", type=int, default=0, help="generate at most N images")
    ap.add_argument("--land", help="filter to one land, e.g. land3")
    ap.add_argument("--model", default=DEFAULT_MODEL)
    ap.add_argument("--force", action="store_true", help="regenerate even if output exists")
    args = ap.parse_args()

    jobs = collect_jobs()
    if args.land:
        jobs = [j for j in jobs if j["img"].startswith(args.land)]
    print(f"{len(jobs)} scene images in scope")

    if args.list:
        for j in jobs:
            print(f"  {j['img']}  [{LANDS[j['land']][0]}: {' & '.join(j['heroes'])}]")
            print(f"    {j['prompt'][:140]}...")
        return

    api_key = os.environ.get("FAL_KEY")
    if not api_key:
        sys.exit("FAL_KEY not set")

    OUT_DIR.mkdir(exist_ok=True)
    done = failed = skipped = 0
    for j in jobs:
        out = OUT_DIR / j["img"]
        if out.exists() and not args.force:
            skipped += 1
            continue
        if args.limit and done >= args.limit:
            break
        refs = [ref_path(h) for h in j["heroes"]]
        print(f"→ {j['img']} ({' & '.join(j['heroes'])}) ... ", end="", flush=True)
        try:
            url = call_fal(args.model, j["prompt"], refs, api_key)
            with urllib.request.urlopen(url, timeout=120) as r:
                out.write_bytes(r.read())
            print(f"OK ({out.stat().st_size // 1024} KB)")
            done += 1
        except Exception as e:
            msg = str(e)
            if hasattr(e, "read"):
                try:
                    msg += " | " + e.read().decode("utf-8", "replace")[:300]
                except Exception:
                    pass
            print(f"FAILED: {msg[:400]}")
            failed += 1
            if failed >= 3 and done == 0:
                sys.exit("3 consecutive failures before any success — aborting (check model id / key).")
        time.sleep(1)

    print(f"\ngenerated: {done} | skipped (already exist): {skipped} | failed: {failed}")
    print(f"output dir: {OUT_DIR}")
    print("Review, then copy approved files into OEBPS/images/dictionary/ (same filenames).")


if __name__ == "__main__":
    main()
