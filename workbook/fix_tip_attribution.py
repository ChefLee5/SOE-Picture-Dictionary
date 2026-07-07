#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
One-off fix for the tip-attribution bug: some 'tip' strings in
workbook_content.json quote a hero who doesn't match the block's
canonical pair (per the SOE seven-lands canon):
  Block A -> Kenji & Aiko (Harmonia)
  Block C -> Silas & Vesta (Terrasol)
  Block D -> Felix & Amara (Vitalis)
  Block G -> Kenji & Aiko (Harmonia, per template label)
  Block H -> Kenji & Aiko (Harmonia, per template label)

Only the leading "<Name> says" token is replaced; the rest of each
tip sentence is left untouched. Names alternate per block for voice
variety rather than collapsing every fix onto one hero.

Usage: python fix_tip_attribution.py
"""
import json
import pathlib
import collections

BASE_DIR = pathlib.Path(__file__).parent.resolve()
CONTENT_FILE = BASE_DIR / "workbook_content.json"

CANONICAL_NAMES = {
    "A": ["Kenji", "Aiko"],
    "C": ["Silas", "Vesta"],
    "D": ["Felix", "Amara"],
    "G": ["Kenji", "Aiko"],
    "H": ["Kenji", "Aiko"],
}
WRONG_PREFIXES = ("Amara says", "Nerissa says")


def fix_tip(letter: str, tip: str, counters: dict) -> str:
    for wrong in WRONG_PREFIXES:
        if tip.startswith(wrong):
            names = CANONICAL_NAMES[letter]
            idx = counters[letter] % len(names)
            counters[letter] += 1
            correct_name = names[idx]
            # Block D: "Amara says" is already canonically correct, only
            # "Nerissa says" is wrong there. Guard against re-touching it.
            if letter == "D" and wrong == "Amara says":
                continue
            rest = tip[len(wrong):]
            return f"{correct_name} says{rest}"
    return tip


def main():
    with open(CONTENT_FILE, "r", encoding="utf-8-sig") as f:
        data = json.load(f)

    counters = collections.defaultdict(int)
    fixed = collections.Counter()

    for week in data["weeks"]:
        for day in week["days"]:
            for letter, blk in day.get("blocks", {}).items():
                if letter not in CANONICAL_NAMES:
                    continue
                if not isinstance(blk, dict):
                    continue
                tip = blk.get("tip", "")
                if not tip:
                    continue
                new_tip = fix_tip(letter, tip, counters)
                if new_tip != tip:
                    blk["tip"] = new_tip
                    fixed[letter] += 1

    with open(CONTENT_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")

    total = sum(fixed.values())
    print(f"Fixed {total} tip attributions:")
    for letter, count in sorted(fixed.items()):
        print(f"  Block {letter}: {count}")


if __name__ == "__main__":
    main()
