#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
One-off fix for Block E tip attribution: Block E rotates subjects by
land, so the tip speaker must belong to that land's canonical hero
pair (per the SOE seven-lands canon):
  Land 4 Aquaria    -> Ronan & Nerissa
  Land 6 Luminosity -> Ezra & Athena
  Land 7 Celestia   -> Elias & Selene

Only the leading "<Name> says" token is replaced; the rest of each
tip sentence is left untouched. Names alternate per land for voice
variety. The week-8 finale tip ("All Heroes say:") is an intentional
exception and is never touched.

Usage: python fix_tip_attribution_e.py
"""
import json
import pathlib
import re
import collections

BASE_DIR = pathlib.Path(__file__).parent.resolve()
CONTENT_FILE = BASE_DIR / "workbook_content.json"

CANONICAL_PAIRS = {
    4: ["Ronan", "Nerissa"],
    6: ["Ezra", "Athena"],
    7: ["Elias", "Selene"],
}
TIP_RE = re.compile(r"^([A-Za-z]+) says")


def main():
    with open(CONTENT_FILE, "r", encoding="utf-8-sig") as f:
        data = json.load(f)

    counters = collections.defaultdict(int)
    fixed = collections.Counter()

    for week in data["weeks"]:
        for day in week["days"]:
            blk = day.get("blocks", {}).get("E")
            if not isinstance(blk, dict):
                continue
            land = blk.get("land")
            names = CANONICAL_PAIRS.get(land)
            tip = blk.get("tip", "")
            if not names or not tip:
                continue
            m = TIP_RE.match(tip)
            if not m or m.group(1) in names:
                continue
            idx = counters[land] % len(names)
            counters[land] += 1
            blk["tip"] = names[idx] + tip[len(m.group(1)):]
            fixed[f"land{land} ({m.group(1)} -> {names[idx]})"] += 1

    with open(CONTENT_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")

    total = sum(fixed.values())
    print(f"Fixed {total} Block E tip attributions:")
    for key, count in sorted(fixed.items()):
        print(f"  {key}: {count}")


if __name__ == "__main__":
    main()
