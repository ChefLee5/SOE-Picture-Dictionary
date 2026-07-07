#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
One-off content-authoring script: injects Week 1 (days 1-5) content for
the two new blocks added to close the 30-min/day engagement gap:
  Block I - Rhythm & Sound (music/rhythm literacy, built on the free album)
  Block J - Hero Quest Moment (hero-lore + growth-mindset micro-stories)

Pilot pass: Week 1 only. Weeks 2-8 follow once this is approved, using
the same per-week-batch pattern (rhythm_focus and gmsl_tenet rotate by
week-pair per the approved plan).
"""
import json
import pathlib

BASE_DIR = pathlib.Path(__file__).parent.resolve()
CONTENT_FILE = BASE_DIR / "workbook_content.json"

# Week 1 focus: beat-tapping / call-and-response (Block I),
# empathic validation tenet (Block J) — matches "Hello, 7 Lands!" theme.

BLOCK_I_WEEK1 = [
    {
        "title": "Beat the Alphabet",
        "time": 5,
        "track_title": "Alphabet Song Remix",
        "track_number": 3,
        "rhythm_focus": "beat-tapping",
        "img": "land1_music-instruments.jpg",
        "img_alt": "Musical instruments in a Harmonia classroom",
        "img_source": "SOE Picture Dictionary — Land 1",
        "instructions": "Listen to \"Alphabet Song Remix\" from The Sound of Essentials Deluxe. Tap the beat on your knees as you sing. Write 3 letters whose sound you tapped the loudest.",
        "tip": "Kenji says: A steady beat makes new words easier to remember. Your hands can help your brain learn!"
    },
    {
        "title": "Count the Beat",
        "time": 5,
        "track_title": "Numbers",
        "track_number": 8,
        "rhythm_focus": "call-and-response",
        "img": "land2_numbers-counting.jpg",
        "img_alt": "Number tiles and counting beads in Numeria",
        "img_source": "SOE Picture Dictionary — Land 2",
        "instructions": "Listen to \"Numbers.\" When the song calls out a number, clap it back! After the song, write the 3 numbers that were hardest to clap in time.",
        "tip": "Aiko says: Call-and-response is one of the oldest ways people have learned together — your voice is joining a very old tradition!"
    },
    {
        "title": "My Body, My Rhythm",
        "time": 5,
        "track_title": "My Body",
        "track_number": 9,
        "rhythm_focus": "beat-tapping",
        "img": "land5_inside-the-body.jpg",
        "img_alt": "Diagram of the body in a Vitalis health class",
        "img_source": "SOE Picture Dictionary — Land 5",
        "instructions": "Listen to \"My Body.\" Tap each body part the song names — head, shoulders, knees — right when you hear it. Write 2 body parts the song surprised you with.",
        "tip": "Kenji says: Your body already knows rhythm — every heartbeat is a beat! Music just gives it a song to follow."
    },
    {
        "title": "Stretch to the Beat",
        "time": 5,
        "track_title": "Let's Stretch",
        "track_number": 6,
        "rhythm_focus": "call-and-response",
        "img": "land5_exercise-movement.jpg",
        "img_alt": "Children stretching in Vitalis",
        "img_source": "SOE Picture Dictionary — Land 5",
        "instructions": "Listen to \"Let's Stretch\" and copy each stretch right when the song calls it out. Write down which stretch felt best on your body today.",
        "tip": "Aiko says: When you move on the beat, your whole body is learning the rhythm — not just your ears!"
    },
    {
        "title": "The Week in Rhythm",
        "time": 5,
        "track_title": "Days of the Week",
        "track_number": 2,
        "rhythm_focus": "beat-tapping",
        "img": "land7_the-calendar-cycles.jpg",
        "img_alt": "A weekly calendar wheel in Celestia",
        "img_source": "SOE Picture Dictionary — Land 7",
        "instructions": "Listen to \"Days of the Week.\" Tap once for each day as it's sung, a little louder on today's day. Write today's day of the week from memory — no peeking!",
        "tip": "Kenji says: You just tapped your way through a whole week! Rhythm makes even long lists easy to hold onto."
    },
]

BLOCK_J_WEEK1 = [
    {
        "title": "Kenji's New Word",
        "time": 5,
        "hero_name": "Kenji",
        "hero_land": "Harmonia",
        "char_img": "kenji.png",
        "gmsl_tenet": "empathic validation",
        "img": "land1_emotions-feelings.jpg",
        "img_alt": "A child's mixed feelings shown in a Harmonia classroom",
        "img_source": "SOE Picture Dictionary — Land 1",
        "story_snippet": "Kenji tried to say a brand-new word out loud in front of his friends, but it came out all jumbled. His cheeks went warm and he wanted to hide. Aiko didn't laugh — she said, \"Thank you for saying it out loud. That took courage.\" Kenji tried again, a little slower, and this time it came out clear.",
        "reflection_question": "Have you ever tried something new and it came out wrong at first? Write about it — what happened next?",
        "tip": "Kenji says: Saying something wrong out loud is still braver than staying quiet. I'm proud of you for trying!"
    },
    {
        "title": "Octavia Loses Count",
        "time": 5,
        "hero_name": "Octavia",
        "hero_land": "Numeria",
        "char_img": "octavia.png",
        "gmsl_tenet": "empathic validation",
        "img": "land2_numbers-counting.jpg",
        "img_alt": "Counting tiles scattered on a Numeria table",
        "img_source": "SOE Picture Dictionary — Land 2",
        "story_snippet": "Octavia was counting a big pile of number tiles when she lost her place — twice! She felt her frustration building. Kwame sat beside her and said, \"Counting a big pile is hard. Let's group them into fives together.\" Octavia took a breath, grouped the tiles, and finished the count with a smile.",
        "reflection_question": "What do you do when you lose count or lose your place? Write one thing that helps you start again.",
        "tip": "Octavia says: Losing count doesn't mean you can't count — it just means the pile was big! Break it into smaller pieces."
    },
    {
        "title": "Silas and the Mystery Rock",
        "time": 5,
        "hero_name": "Silas",
        "hero_land": "Terrasol",
        "char_img": "silas.png",
        "gmsl_tenet": "empathic validation",
        "img": "land3_rocks-minerals.jpg",
        "img_alt": "A collection of rocks and minerals in Terrasol",
        "img_source": "SOE Picture Dictionary — Land 3",
        "story_snippet": "Silas was sure he'd found a diamond in the garden — but Vesta gently showed him it was just a shiny quartz rock. Silas felt a little silly for being so sure. \"Thank you for showing me,\" Vesta said. \"Guessing is how scientists start!\" Silas kept the quartz anyway — it was still his favorite find of the day.",
        "reflection_question": "Have you ever been excited about a guess that turned out different than you thought? Write about it.",
        "tip": "Silas says: Every scientist guesses wrong sometimes. What matters is staying curious enough to look closer!"
    },
    {
        "title": "Felix Trips on the Beat",
        "time": 5,
        "hero_name": "Felix",
        "hero_land": "Vitalis",
        "char_img": "felix.png",
        "gmsl_tenet": "empathic validation",
        "img": "land5_exercise-movement.jpg",
        "img_alt": "Children stretching and moving in Vitalis",
        "img_source": "SOE Picture Dictionary — Land 5",
        "story_snippet": "Felix tried a new stretch during Movement time and lost his balance, landing with a soft thud. A few kids giggled, but Amara knelt down and said, \"That was a tricky move — thanks for going first.\" Felix laughed too, stood back up, and tried it again — this time he stuck the landing.",
        "reflection_question": "What do you do after you fall down or make a mistake while moving your body? Write about a time you tried again.",
        "tip": "Felix says: Falling down is part of learning to move. Getting back up is the real skill!"
    },
    {
        "title": "Elias Forgets the Date",
        "time": 5,
        "hero_name": "Elias",
        "hero_land": "Celestia",
        "char_img": "elias.png",
        "gmsl_tenet": "empathic validation",
        "img": "land7_the-calendar-cycles.jpg",
        "img_alt": "A calendar wheel showing the days and seasons in Celestia",
        "img_source": "SOE Picture Dictionary — Land 7",
        "story_snippet": "Elias, the Time Keeper himself, mixed up two days on the calendar during Friday review. Selene smiled and said, \"Even Time Keepers get their days crossed sometimes — thank you for double-checking.\" Elias re-traced the week on the calendar wheel, and this time it clicked into place.",
        "reflection_question": "What is one thing from this whole week that you want to remember? Write it down like Elias would.",
        "tip": "Elias says: Even the keeper of time double-checks the calendar sometimes. Checking your work is a strength, not a weakness!"
    },
]


def main():
    with open(CONTENT_FILE, "r", encoding="utf-8-sig") as f:
        data = json.load(f)

    week1 = data["weeks"][0]
    assert week1["week"] == 1, "Expected weeks[0] to be week 1"

    for i, day in enumerate(week1["days"]):
        day["blocks"]["I"] = BLOCK_I_WEEK1[i]
        day["blocks"]["J"] = BLOCK_J_WEEK1[i]

    with open(CONTENT_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")

    print(f"Injected Block I + Block J for Week 1, days 1-{len(week1['days'])}.")


if __name__ == "__main__":
    main()
