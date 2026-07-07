#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Content-authoring pass 2 of 2: injects Blocks I (Rhythm & Sound) and
J (Hero Quest Moment) for Weeks 2-8 (35 entries each), completing the
40-day set begun by add_blocks_ij_week1.py.

Rotation plan (locked in the approved expansion plan):
  Block I rhythm_focus: wk2 call-and-response · wk3-4 rhyme-prediction
    · wk5-6 syllable-clapping · wk7 tempo-change · wk8 greatest-hits
  Block J gmsl_tenet: wk2 reappraisal of affect · wk3 collaborative
    "we" language · wk4 seek to understand · wk5 reappraisal (Vitalis)
    · wk6 autonomy-supportive · wk7 hope for change · wk8 retrospective
"""
import json
import pathlib

BASE_DIR = pathlib.Path(__file__).parent.resolve()
CONTENT_FILE = BASE_DIR / "workbook_content.json"

I = {}  # I[week] = list of 5 entries
J = {}

# ---------------- WEEK 2 — Feelings & Families · call-and-response · reappraisal ----------------
I[2] = [
    {"title": "Echo My Feelings", "time": 5, "track_title": "Manners", "track_number": 10, "rhythm_focus": "call-and-response",
     "img": "land1_emotions-feelings.jpg", "img_alt": "Faces showing different feelings in Harmonia", "img_source": "SOE Picture Dictionary — Land 1",
     "instructions": "Listen to \"Manners.\" When the song says a kind phrase, echo it back in your own voice. Write 2 kind phrases you echoed, then say them to someone in your family today.",
     "tip": "Aiko says: When you echo kind words, your voice learns kindness too. Words we repeat become words we own!"},
    {"title": "Horse Hooves, Family Moves", "time": 5, "track_title": "Horses Interlude", "track_number": 4, "rhythm_focus": "call-and-response",
     "img": "land3_the-barnyard.jpg", "img_alt": "Farm animals in the Terrasol barnyard", "img_source": "SOE Picture Dictionary — Land 3",
     "instructions": "Listen to \"Horses Interlude.\" Gallop your fingers on the table like hooves, copying each rhythm the song plays. Invite a family member to copy YOUR rhythm back. Write who played with you.",
     "tip": "Kenji says: Rhythm games are more fun with family. When someone copies your beat, you're the teacher!"},
    {"title": "Stretch and Answer", "time": 5, "track_title": "Let's Stretch", "track_number": 6, "rhythm_focus": "call-and-response",
     "img": "land5_exercise-movement.jpg", "img_alt": "Children stretching together in Vitalis", "img_source": "SOE Picture Dictionary — Land 5",
     "instructions": "Listen to \"Let's Stretch\" again — but today, answer the song! When it calls a stretch, shout \"Got it!\" and do the move. Write the stretch that made you feel strongest.",
     "tip": "Aiko says: Answering a song out loud wakes up your ears, your voice, and your body all at once!"},
    {"title": "Manners Echo Chain", "time": 5, "track_title": "Manners", "track_number": 10, "rhythm_focus": "call-and-response",
     "img": "land1_manners-politeness.jpg", "img_alt": "Children practicing polite words in Harmonia", "img_source": "SOE Picture Dictionary — Land 1",
     "instructions": "Play \"Manners\" once more. This time make an echo chain: the song says it, you say it, then a family member says it — three echoes! Write your family's favorite manner word.",
     "tip": "Kenji says: A phrase that travels through three voices lands three times deeper in your heart."},
    {"title": "My Body Answers Back", "time": 5, "track_title": "My Body", "track_number": 9, "rhythm_focus": "call-and-response",
     "img": "land5_inside-the-body.jpg", "img_alt": "A friendly diagram of the body in Vitalis", "img_source": "SOE Picture Dictionary — Land 5",
     "instructions": "Listen to \"My Body.\" Each time a body part is named, touch it and call its name back to the song. Write 3 body parts you called back — did you beat the song to any of them?",
     "tip": "Aiko says: You finished a whole week of echo games! Your ears and voice are becoming a team."},
]
J[2] = [
    {"title": "Aiko's Worry Butterfly", "time": 5, "hero_name": "Aiko", "hero_land": "Harmonia", "char_img": "aiko.png", "gmsl_tenet": "reappraisal of affect",
     "img": "land1_emotions-feelings.jpg", "img_alt": "A child noticing her feelings in Harmonia", "img_source": "SOE Picture Dictionary — Land 1",
     "story_snippet": "Before her big listening recital, Aiko's tummy felt full of butterflies. \"I must be doing something wrong,\" she whispered. Kenji shook his head: \"Butterflies mean you CARE. Your body is getting ready to do something that matters.\" Aiko took a slow breath, smiled at her butterflies, and walked on stage.",
     "reflection_question": "When was the last time your tummy felt fluttery before something big? What did it mean you cared about?",
     "tip": "Aiko says: Butterflies aren't a stop sign — they're your heart saying this matters. Bring them along!"},
    {"title": "Nerissa and the Hard Sound", "time": 5, "hero_name": "Nerissa", "hero_land": "Aquaria", "char_img": "nerissa.png", "gmsl_tenet": "reappraisal of affect",
     "img": "land4_the-ocean-marine-life.jpg", "img_alt": "Sea creatures in the waters of Aquaria", "img_source": "SOE Picture Dictionary — Land 4",
     "story_snippet": "Nerissa kept stumbling on the word \"squirrel\" — it made her want to give up. She noticed her frustration bubbling like sea foam. \"This feeling means I'm at the edge of something new,\" she told herself. She slowed the word into little sound-waves — squir-rel — and rode each one until the whole word swam smoothly.",
     "reflection_question": "What word or task makes you feel bubbly-frustrated? Write it, then break it into small pieces like Nerissa.",
     "tip": "Nerissa says: Frustration is the splash right before the breakthrough. Slow the wave down and ride it!"},
    {"title": "Selene's Moody Sky", "time": 5, "hero_name": "Selene", "hero_land": "Celestia", "char_img": "selene.png", "gmsl_tenet": "reappraisal of affect",
     "img": "land3_weather-seasons.jpg", "img_alt": "Changing weather across the seasons", "img_source": "SOE Picture Dictionary — Land 3",
     "story_snippet": "Selene woke up feeling gray, like a cloudy day, and worried something was wrong with her. Elias looked at the sky with her. \"Seasons change, and so do feelings,\" he said. \"A cloudy morning doesn't mean a ruined day.\" By afternoon, Selene's clouds had drifted, and she wrote a song about weather that lives inside people.",
     "reflection_question": "If your feelings today were weather, what would they be? Draw or write your inside-weather.",
     "tip": "Selene says: Every feeling is a season, and no season stays forever. You can sing in any weather!"},
    {"title": "Amara's Shaky Legs", "time": 5, "hero_name": "Amara", "hero_land": "Vitalis", "char_img": "amara.png", "gmsl_tenet": "reappraisal of affect",
     "img": "land5_sports-fitness.jpg", "img_alt": "Children trying new sports in Vitalis", "img_source": "SOE Picture Dictionary — Land 5",
     "story_snippet": "Before teaching her first dance to the little ones, Amara's legs felt shaky. \"Shaky legs?\" laughed Felix kindly. \"That's just your power warming up!\" Amara stomped her shaky legs like a drumbeat until the shake became a rhythm — and the rhythm became the first step of her dance.",
     "reflection_question": "Where do you feel nervousness in your body? What could that feeling turn into?",
     "tip": "Amara says: A shake can become a shimmy. Your body's nervous energy is just power looking for a dance!"},
    {"title": "Vesta Reads the Family Map", "time": 5, "hero_name": "Vesta", "hero_land": "Terrasol", "char_img": "vesta.png", "gmsl_tenet": "reappraisal of affect",
     "img": "land1_family-relationships.jpg", "img_alt": "A big family gathering in Harmonia", "img_source": "SOE Picture Dictionary — Land 1",
     "story_snippet": "At the big family gathering, Vesta felt squeezed and overwhelmed — too many voices, too many hugs. She almost hid. Instead, she drew a little map of the room and marked one quiet corner \"my recharge spot.\" Visiting her spot between hugs, she discovered the crowd felt fun when she could step out and step back in.",
     "reflection_question": "What helps you recharge when things feel like too much? Draw your own recharge spot.",
     "tip": "Vesta says: Feeling overwhelmed means your heart is taking in a lot of love at once. It's okay to take breaks!"},
]

# ---------------- WEEK 3 — Community & Cooperation · rhyme-prediction · collaborative "we" ----------------
I[3] = [
    {"title": "Rhyme the Manners", "time": 5, "track_title": "Manners", "track_number": 10, "rhythm_focus": "rhyme-prediction",
     "img": "land1_manners-politeness.jpg", "img_alt": "Polite greetings in the Harmonia square", "img_source": "SOE Picture Dictionary — Land 1",
     "instructions": "Listen to \"Manners.\" Just before each verse ends, PAUSE and guess the rhyming word — then listen to check. Write 2 rhyme pairs you caught (like please/trees).",
     "tip": "Kenji says: Guessing the rhyme before it comes is how your brain learns to read ahead. Detectives do it with clues; readers do it with sounds!"},
    {"title": "Number Rhyme Hunt", "time": 5, "track_title": "Numbers", "track_number": 8, "rhythm_focus": "rhyme-prediction",
     "img": "land2_numbers-counting.jpg", "img_alt": "Numbers dancing across a Numeria chalkboard", "img_source": "SOE Picture Dictionary — Land 2",
     "instructions": "Listen to \"Numbers.\" Which words rhyme with the numbers? (What rhymes with two? With four?) Write 3 number-rhymes you heard or invented — silly ones count double!",
     "tip": "Aiko says: Silly rhymes stick the best. If 'eight ate a plate' makes you giggle, you'll never forget it!"},
    {"title": "Days That Rhyme Together", "time": 5, "track_title": "Days of the Week", "track_number": 2, "rhythm_focus": "rhyme-prediction",
     "img": "land7_the-calendar-cycles.jpg", "img_alt": "The week spinning around a Celestia calendar", "img_source": "SOE Picture Dictionary — Land 7",
     "instructions": "Listen to \"Days of the Week.\" Which day names almost rhyme? Say them with a friend or family member, taking turns predicting the next day before the song sings it. Write the day your helper guessed fastest.",
     "tip": "Kenji says: Two guessers are better than one. When you predict together, you both win!"},
    {"title": "Rain Rhyme Relay", "time": 5, "track_title": "Rain", "track_number": 18, "rhythm_focus": "rhyme-prediction",
     "img": "land3_weather-seasons.jpg", "img_alt": "Rain falling over the Terrasol hills", "img_source": "SOE Picture Dictionary — Land 3",
     "instructions": "Listen to \"Rain.\" Every time you hear a word that rhymes with rain, raise your hand! Then play relay: you say a rain-rhyme, a partner says the next. Write your 3 best rhymes.",
     "tip": "Aiko says: Rhymes are like raindrops — once one falls, more always follow. Catch as many as you can!"},
    {"title": "Time to Rhyme Review", "time": 5, "track_title": "Time", "track_number": 11, "rhythm_focus": "rhyme-prediction",
     "img": "land7_telling-time-clocks.jpg", "img_alt": "Clocks of every kind in Celestia", "img_source": "SOE Picture Dictionary — Land 7",
     "instructions": "Listen to \"Time.\" Pause before each verse's last word and guess the rhyme out loud. Count your correct guesses. Write your score — and one brand-new rhyme for the word 'time' the song didn't use.",
     "tip": "Kenji says: You guessed rhymes all week like a champion! Predicting sounds is a reading superpower now in YOUR toolbox."},
]
J[3] = [
    {"title": "Kwame Counts With the Class", "time": 5, "hero_name": "Kwame", "hero_land": "Numeria", "char_img": "kwame.png", "gmsl_tenet": "collaborative we-language",
     "img": "land6_community-helpers-services.jpg", "img_alt": "Community helpers working together", "img_source": "SOE Picture Dictionary — Land 6",
     "story_snippet": "The class had to count all the library books — hundreds of them! Kwame started alone and kept losing track. Then he stopped: \"Wait. Let's do this together. WE can each take one shelf.\" Ten counters finished in minutes what one counter couldn't finish in an hour. The librarian hung a sign: Counted with love, by all of us.",
     "reflection_question": "What big job could you finish faster with helpers? Write who you'd invite to your team.",
     "tip": "Kwame says: 'Let's' is my favorite math word — it multiplies helpers and divides the work!"},
    {"title": "Ronan and the Heavy Net", "time": 5, "hero_name": "Ronan", "hero_land": "Aquaria", "char_img": "ronan.png", "gmsl_tenet": "collaborative we-language",
     "img": "land4_freshwater-life.jpg", "img_alt": "Life along the rivers of Aquaria", "img_source": "SOE Picture Dictionary — Land 4",
     "story_snippet": "Ronan's cleanup net got so full of river junk he couldn't lift it. He almost dumped it back. Nerissa waded over: \"We've got this — you lift, I'll pull.\" Splash by splash, they hauled it out together. \"Funny,\" Ronan said, \"the net felt lighter the moment you said WE.\"",
     "reflection_question": "Write about a time something felt lighter because someone helped you — or because you helped them.",
     "tip": "Ronan says: Brave doesn't mean alone. The strongest word a warrior knows is 'we'!"},
    {"title": "Athena's Study Circle", "time": 5, "hero_name": "Athena", "hero_land": "Luminosity", "char_img": "athena.png", "gmsl_tenet": "collaborative we-language",
     "img": "land6_school-subjects-education.jpg", "img_alt": "Students learning side by side", "img_source": "SOE Picture Dictionary — Land 6",
     "story_snippet": "Athena knew ALL the answers, and she liked going first. But she noticed some friends had stopped raising their hands. So she tried something new: \"What do WE think?\" she asked, and waited. Quiet voices spoke up with ideas Athena had never thought of. The wisest sage, she learned, is the one who makes room.",
     "reflection_question": "When could you make room for someone else's idea? Write one question you could ask a friend.",
     "tip": "Athena says: Knowing answers is good. Growing MORE answer-finders is wisdom!"},
    {"title": "Ezra and the Garden Choir", "time": 5, "hero_name": "Ezra", "hero_land": "Luminosity", "char_img": "ezra.png", "gmsl_tenet": "collaborative we-language",
     "img": "land3_the-garden.jpg", "img_alt": "A community garden growing in Terrasol", "img_source": "SOE Picture Dictionary — Land 3",
     "story_snippet": "Ezra wanted to record the garden's morning sounds, but his one microphone missed the crickets by the fence and the finches in the fig tree. He recruited friends to stand still in every corner, humming the note of what they heard. \"Alone I heard a garden,\" Ezra said. \"Together we heard a choir.\"",
     "reflection_question": "Close your eyes for 30 seconds. What sounds do you hear that someone else might miss? Write two.",
     "tip": "Ezra says: Every listener catches a different sound. That's why we listen together!"},
    {"title": "Aiko Passes the Melody", "time": 5, "hero_name": "Aiko", "hero_land": "Harmonia", "char_img": "aiko.png", "gmsl_tenet": "collaborative we-language",
     "img": "land1_music-instruments.jpg", "img_alt": "Instruments waiting to be played together", "img_source": "SOE Picture Dictionary — Land 1",
     "story_snippet": "At the Week 3 concert, Aiko had the solo — but halfway through, she saw little Pip in the front row humming along perfectly. Aiko knelt and held out the melody like a baton: \"Sing it WITH me?\" The solo became a duet, the duet became a sing-along, and Harmonia learned its favorite new song — the one everyone owns.",
     "reflection_question": "What's something you're good at that you could share instead of keeping solo? Write how you'd invite someone in.",
     "tip": "Aiko says: A shared song is twice as loud and ten times as warm. This week, turn your solo into a duet!"},
]

# ---------------- WEEK 4 — Wonders of the World · rhyme-prediction · seek to understand ----------------
I[4] = [
    {"title": "Le Cheval Guessing Game", "time": 5, "track_title": "Le Cheval (French)", "track_number": 5, "rhythm_focus": "rhyme-prediction",
     "img": "land4_the-airport-travel.jpg", "img_alt": "Travelers heading out to see the world", "img_source": "SOE Picture Dictionary — Land 4",
     "instructions": "Listen to \"Le Cheval\" — a song in French! You won't know every word, and that's the game: guess which sounds rhyme anyway. Write 2 French sound-pairs your ears caught. Rhyme works in every language!",
     "tip": "Kenji says: Your ears can catch rhymes even in languages you don't speak yet. Sound is the world's first language!"},
    {"title": "Shape Rhymes Around the World", "time": 5, "track_title": "Shapes", "track_number": 16, "rhythm_focus": "rhyme-prediction",
     "img": "land2_shapes-geometry.jpg", "img_alt": "Shapes hiding in buildings and bridges", "img_source": "SOE Picture Dictionary — Land 2",
     "instructions": "Listen to \"Shapes.\" Pause before each verse ends and predict the rhyme. Then look around your room: find a real square, circle, and triangle. Write each shape next to its rhyme from the song.",
     "tip": "Aiko says: The world is built from shapes, and songs are built from rhymes. Today you found both!"},
    {"title": "Changes Rhyme Challenge", "time": 5, "track_title": "Changes", "track_number": 12, "rhythm_focus": "rhyme-prediction",
     "img": "land7_seasons-time-in-nature.jpg", "img_alt": "Nature transforming through the seasons", "img_source": "SOE Picture Dictionary — Land 7",
     "instructions": "Listen to \"Changes.\" Guess each rhyme before it lands — but careful, this song likes to surprise! Write 1 rhyme you guessed right and 1 the song swapped for a surprise word.",
     "tip": "Kenji says: When a song breaks its own rhyme, it's winking at you. Surprises only work because you predicted!"},
    {"title": "Months Around the Sun", "time": 5, "track_title": "Months of the Year", "track_number": 17, "rhythm_focus": "rhyme-prediction",
     "img": "land7_the-calendar-cycles.jpg", "img_alt": "Twelve months circling the Celestia sky", "img_source": "SOE Picture Dictionary — Land 7",
     "instructions": "Listen to \"Months of the Year.\" Predict which month the song sings next — then whisper the month your birthday is in every time it passes. Write your birthday month and its nearest rhyme.",
     "tip": "Aiko says: Twelve months, one big circle around the sun. You just sang your way around the whole world's year!"},
    {"title": "Hard Words, Brave Guesses", "time": 5, "track_title": "Hard Words", "track_number": 15, "rhythm_focus": "rhyme-prediction",
     "img": "land4_tricky-english-words.jpg", "img_alt": "Tricky words waiting to be conquered", "img_source": "SOE Picture Dictionary — Land 4",
     "instructions": "Listen to \"Hard Words.\" These are the trickiest words in the land — guess each rhyme anyway! Write the hardest word from the song, then clap its syllables. Guessing brave beats guessing safe!",
     "tip": "Kenji says: A week of wonder complete! You've now guessed rhymes in English AND French — your ears are world travelers."},
]
J[4] = [
    {"title": "Vesta Asks the Mountain", "time": 5, "hero_name": "Vesta", "hero_land": "Terrasol", "char_img": "vesta.png", "gmsl_tenet": "seek to understand",
     "img": "land4_geography-landforms.jpg", "img_alt": "Mountains and valleys of the wide world", "img_source": "SOE Picture Dictionary — Land 4",
     "story_snippet": "Little Juniper kept building her block mountain upside-down — wide side up. Vesta almost fixed it for her. Instead she asked, \"Tell me about your mountain?\" Juniper beamed: \"It's an upside-down mountain for the sky-people!\" Vesta grinned. There was nothing to fix — there was a whole imagination to explore.",
     "reflection_question": "Has anyone ever misunderstood something you made? What did you wish they had asked you first?",
     "tip": "Vesta says: Before you fix, ask. Sometimes 'wrong' is just a wonder you haven't understood yet!"},
    {"title": "Kenji Hears a New Way", "time": 5, "hero_name": "Kenji", "hero_land": "Harmonia", "char_img": "kenji.png", "gmsl_tenet": "seek to understand",
     "img": "land1_communication-technology.jpg", "img_alt": "Different ways people share their words", "img_source": "SOE Picture Dictionary — Land 1",
     "story_snippet": "A new student, Mila, wouldn't sing during music time. Kenji wondered if she disliked music — until he asked, \"What music do you love?\" Mila's hands flew: she signed her favorite song in sign language, rhythm dancing through her fingers. Kenji learned her song hand by hand. Now Harmonia's choir sings AND signs.",
     "reflection_question": "Think of someone who does something differently than you. Write one question you could ask to understand their way.",
     "tip": "Kenji says: Everyone carries music inside. Asking 'show me your way' opens doors that guessing never will!"},
    {"title": "Ronan Reads the River Wrong", "time": 5, "hero_name": "Ronan", "hero_land": "Aquaria", "char_img": "ronan.png", "gmsl_tenet": "seek to understand",
     "img": "land3_rivers-lakes.jpg", "img_alt": "Rivers winding through the land", "img_source": "SOE Picture Dictionary — Land 3",
     "story_snippet": "Ronan was sure his friend Tam skipped the river cleanup because he didn't care. He almost said something sharp. Instead he tried, \"Hey — what happened yesterday?\" Tam looked down: \"My boots have holes. I didn't want anyone to see.\" Ronan swallowed his almost-words. The next day, two pairs of boots stood by the river.",
     "reflection_question": "Write about a time you guessed why someone did something — and the real reason turned out different.",
     "tip": "Ronan says: The story you imagine about someone is usually smaller than their real one. Ask for the real one!"},
    {"title": "Athena and the Question Compass", "time": 5, "hero_name": "Athena", "hero_land": "Luminosity", "char_img": "athena.png", "gmsl_tenet": "seek to understand",
     "img": "land4_directions-navigation.jpg", "img_alt": "A compass pointing toward discovery", "img_source": "SOE Picture Dictionary — Land 4",
     "story_snippet": "Pip declared the compass was broken: \"It won't point where I'm going!\" Athena didn't correct him. \"What have you tried so far?\" she asked. Pip showed her — he'd been turning the compass, expecting the needle to follow. \"Ahh,\" said Athena, \"so you discovered the needle is loyal to the north! What could that be useful for?\" Pip's eyes went wide with the answer.",
     "reflection_question": "What's something that confused you until someone asked what YOU were thinking? Write what helped it click.",
     "tip": "Athena says: 'What have you tried?' is the sage's favorite question. It finds the discovery hiding inside the mistake!"},
    {"title": "Octavia's Pattern Puzzle", "time": 5, "hero_name": "Octavia", "hero_land": "Numeria", "char_img": "octavia.png", "gmsl_tenet": "seek to understand",
     "img": "land2_patterns-sequences.jpg", "img_alt": "Patterns weaving through Numeria", "img_source": "SOE Picture Dictionary — Land 2",
     "story_snippet": "Remy's bead pattern went red-red-blue-red-red-GREEN — and Octavia's pattern-loving eyes twitched. \"Interesting!\" she managed. \"Walk me through your pattern?\" Remy pointed: \"Green is for grandma. She gets a surprise every seventh bead.\" Octavia sat down slowly. It wasn't a broken pattern. It was a love pattern — the most advanced kind.",
     "reflection_question": "Look at something a family member arranged their own way. Write a question you could ask about why they like it like that.",
     "tip": "Octavia says: A wonder-filled week! Remember: patterns you don't understand yet aren't wrong — they're invitations."},
]

# ---------------- WEEK 5 — Body, Mind & Balance · syllable-clapping · reappraisal (Vitalis) ----------------
I[5] = [
    {"title": "Clap Your Body Words", "time": 5, "track_title": "My Body", "track_number": 9, "rhythm_focus": "syllable-clapping",
     "img": "land5_inside-the-body.jpg", "img_alt": "The amazing machine inside you", "img_source": "SOE Picture Dictionary — Land 5",
     "instructions": "Listen to \"My Body.\" Clap the syllables of each body part: shoul-der (2), el-bow (2), sto-mach (2). Find one 3-clap body word! Write your words with a dot between each syllable.",
     "tip": "Kenji says: Clapping a word chops it into bite-size sounds. Small bites make big words easy to swallow!"},
    {"title": "Stretch-Syllable Combo", "time": 5, "track_title": "Let's Stretch", "track_number": 6, "rhythm_focus": "syllable-clapping",
     "img": "land5_exercise-movement.jpg", "img_alt": "Bodies bending and reaching in Vitalis", "img_source": "SOE Picture Dictionary — Land 5",
     "instructions": "Listen to \"Let's Stretch\" — but clap each move's syllables BEFORE you do it: stre-e-etch (slow clap!), jump (1 fast clap!). Write one 1-syllable move and one 2-syllable move from your routine.",
     "tip": "Aiko says: Some words move slow like a stretch, some snap quick like a jump. Syllables are how words exercise!"},
    {"title": "Drill Time Syllable Squad", "time": 5, "track_title": "Drill Time", "track_number": 7, "rhythm_focus": "syllable-clapping",
     "img": "land5_sports-fitness.jpg", "img_alt": "Training hard and having fun in Vitalis", "img_source": "SOE Picture Dictionary — Land 5",
     "instructions": "Listen to \"Drill Time.\" March in place and STOMP each syllable of the drill words instead of clapping. Which word made you stomp the most times? Write it and count its stomps.",
     "tip": "Kenji says: Your feet can count syllables as well as your hands. Your whole body is a word-machine!"},
    {"title": "Food Syllable Feast", "time": 5, "track_title": "Numbers", "track_number": 8, "rhythm_focus": "syllable-clapping",
     "img": "land5_nutrition-food-groups.jpg", "img_alt": "Healthy foods from every color", "img_source": "SOE Picture Dictionary — Land 5",
     "instructions": "Play \"Numbers\" as your beat. Clap the syllables of 5 healthy foods you ate or want to eat: ba-na-na (3!), broc-co-li (3!), egg (1!). Write your foods from fewest syllables to most.",
     "tip": "Aiko says: You just sorted words by their beats — that's syllable math! Even snack time has rhythm."},
    {"title": "Rest & Slow Syllables", "time": 5, "track_title": "Time", "track_number": 11, "rhythm_focus": "syllable-clapping",
     "img": "land5_sleep-rest.jpg", "img_alt": "A calm and cozy bedtime in Vitalis", "img_source": "SOE Picture Dictionary — Land 5",
     "instructions": "Listen to \"Time\" quietly. Whisper-clap (fingertips only!) the syllables of calm words: qui-et, gen-tle, breathe, re-lax, sleep-y. End with 3 slow breaths. Write your favorite calm word and its clap-count.",
     "tip": "Kenji says: A balanced week complete! You've clapped loud, stomped strong, and whispered soft — rhythm has a volume knob, and now you own it."},
]
J[5] = [
    {"title": "Amara's Impossible Pose", "time": 5, "hero_name": "Amara", "hero_land": "Vitalis", "char_img": "amara.png", "gmsl_tenet": "reappraisal of affect",
     "img": "land5_exercise-movement.jpg", "img_alt": "Trying tricky new moves in Vitalis", "img_source": "SOE Picture Dictionary — Land 5",
     "story_snippet": "The tree pose made Amara wobble like jelly, and heat rose in her chest — the give-up feeling. She stopped: \"Hello, wobble. You're here because I'm learning something my body doesn't know YET.\" She wobbled on purpose, laughed, and tried again beside the wall. By Friday, the jelly stood tall as a tree.",
     "reflection_question": "What's your 'wobble' right now — something your body or brain doesn't know YET? Write it with the word YET at the end.",
     "tip": "Amara says: The wobble isn't failure — it's your balance being born. Welcome it!"},
    {"title": "Felix and the Last-Place Race", "time": 5, "hero_name": "Felix", "hero_land": "Vitalis", "char_img": "felix.png", "gmsl_tenet": "reappraisal of affect",
     "img": "land5_sports-fitness.jpg", "img_alt": "Racing and playing in Vitalis", "img_source": "SOE Picture Dictionary — Land 5",
     "story_snippet": "Felix came dead last in the obstacle race, and the disappointment sat heavy as a backpack full of rocks. He wanted to quit racing forever. That night he noticed something: his chest only ached like this about things he LOVED. \"This hurt is proof I care,\" he said. He turned the ache into a training plan, one cone at a time.",
     "reflection_question": "Write about a time losing or messing up really stung. What did the sting tell you about what you love?",
     "tip": "Felix says: Only things that matter can disappoint you. That heavy feeling? It's love wearing a disguise!"},
    {"title": "Nerissa's Deep Breath Discovery", "time": 5, "hero_name": "Nerissa", "hero_land": "Aquaria", "char_img": "nerissa.png", "gmsl_tenet": "reappraisal of affect",
     "img": "land5_mental-health-emotions.jpg", "img_alt": "Finding calm inside big feelings", "img_source": "SOE Picture Dictionary — Land 5",
     "story_snippet": "Before speaking at the Aquaria assembly, Nerissa's heart drummed so fast she thought everyone could hear it. Instead of fighting the drum, she made it her metronome: one slow breath for every four beats. \"My heart isn't scared,\" she realized. \"It's setting the tempo.\" She spoke in rhythm with herself — and her voice came out like a song.",
     "reflection_question": "Put your hand on your heart and count 10 beats. What tempo is your body playing right now — fast, slow, or in-between?",
     "tip": "Nerissa says: A racing heart is your body's drumroll — it plays loudest right before something great!"},
    {"title": "Selene's Sleepless Song", "time": 5, "hero_name": "Selene", "hero_land": "Celestia", "char_img": "selene.png", "gmsl_tenet": "reappraisal of affect",
     "img": "land5_sleep-rest.jpg", "img_alt": "Nighttime rest under the Celestia stars", "img_source": "SOE Picture Dictionary — Land 5",
     "story_snippet": "The night before the seasons festival, Selene's thoughts spun too fast for sleep. \"My brain is broken tonight,\" she sighed. Then she listened closer — her spinning thoughts were all IDEAS, sparkling like too many stars. She kept a notepad by her pillow, gave each idea one line, and told them, \"I'll see you tomorrow.\" Sleep came like a quiet chorus.",
     "reflection_question": "When your brain feels too busy, what are the thoughts made of — worries, ideas, wishes? Write two of them down to hold for tomorrow.",
     "tip": "Selene says: A busy mind isn't broken — it's bright. Give your sparks a notepad and your eyes some rest!"},
    {"title": "Kwame Balances the Scale", "time": 5, "hero_name": "Kwame", "hero_land": "Numeria", "char_img": "kwame.png", "gmsl_tenet": "reappraisal of affect",
     "img": "land2_weights-measures.jpg", "img_alt": "Scales and balances in Numeria", "img_source": "SOE Picture Dictionary — Land 2",
     "story_snippet": "Kwame's tower of homework felt heavier than any scale could measure, and dread crept in. So he weighed it for real: each task got a pebble on the balance scale. Seven pebbles — that's all his mountain was. \"Dread made it feel like seventy,\" he laughed. He moved one pebble to the 'done' side, then another. The scale — and his chest — grew lighter.",
     "reflection_question": "What feels like a heavy pile for you right now? List the pieces — count them like pebbles. How many are there really?",
     "tip": "Kwame says: A balanced week indeed! Big feelings love to multiply the truth. Counting the real number takes their power away."},
]

# ---------------- WEEK 6 — Inventions & Discoveries · syllable-clapping · autonomy-supportive ----------------
I[6] = [
    {"title": "Invent-a-Word Claps", "time": 5, "track_title": "Hard Words", "track_number": 15, "rhythm_focus": "syllable-clapping",
     "img": "land7_inventions-discoveries.jpg", "img_alt": "Great inventions through the ages", "img_source": "SOE Picture Dictionary — Land 7",
     "instructions": "Listen to \"Hard Words.\" Clap the syllables of these invention words: te-le-phone (3), com-pu-ter (3), wheel (1). Now INVENT your own word for a machine you wish existed, and clap it. Write your invented word and its clap-count!",
     "tip": "Kenji says: Every real word was invented by someone. Today you joined the word-inventors' club!"},
    {"title": "Clock-Tick Syllables", "time": 5, "track_title": "Time", "track_number": 11, "rhythm_focus": "syllable-clapping",
     "img": "land7_historical-timekeeping.jpg", "img_alt": "Sundials, hourglasses, and ancient clocks", "img_source": "SOE Picture Dictionary — Land 7",
     "instructions": "Listen to \"Time.\" Tick-tock your claps like a clock: sun-di-al (3 ticks), hour-glass (2 ticks), watch (1 tick). Which timekeeper word ticks longest? Write the time-words from most ticks to fewest.",
     "tip": "Aiko says: People invented clocks to count time — and syllables to count words. You're using both inventions at once!"},
    {"title": "Rain Machine Rhythms", "time": 5, "track_title": "Rain", "track_number": 18, "rhythm_focus": "syllable-clapping",
     "img": "land7_the-water-cycle-weather-systems.jpg", "img_alt": "The water cycle turning above the land", "img_source": "SOE Picture Dictionary — Land 7",
     "instructions": "Listen to \"Rain.\" Nature invented the first machine — the water cycle! Clap its parts: e-vap-o-ra-tion (5!), cloud (1), rain-drop (2). Write the 5-clap word — it's the longest word this week. You can clap it!",
     "tip": "Kenji says: Five syllables is a big word — but you just clapped it into five small ones. No word is too big for a clapper!"},
    {"title": "Changes: The Discovery Song", "time": 5, "track_title": "Changes", "track_number": 12, "rhythm_focus": "syllable-clapping",
     "img": "land7_the-scientific-method.jpg", "img_alt": "Experiments and discoveries in progress", "img_source": "SOE Picture Dictionary — Land 7",
     "instructions": "Listen to \"Changes.\" Scientists clap out their discovery words too: ex-per-i-ment (4), dis-cov-er (3), test (1). Do one tiny experiment: whisper-clap, normal-clap, and LOUD-clap the same word. Write which version helped you hear the syllables best.",
     "tip": "Aiko says: You just ran a real experiment on your own claps. Testing different ways is what discoverers do!"},
    {"title": "One Hundred Listens", "time": 5, "track_title": "One Hundred", "track_number": 13, "rhythm_focus": "syllable-clapping",
     "img": "land2_numbers-counting.jpg", "img_alt": "Counting all the way to one hundred", "img_source": "SOE Picture Dictionary — Land 2",
     "instructions": "\"One Hundred\" has NO words — it's all instruments! Listen and clap along with the main beat. Count how many claps fit in the song's chorus. Then clap the syllables of your full name over the music. Write your name's total clap-count.",
     "tip": "Kenji says: A discovery week complete! Even a song without words has rhythm to find. Your name is a rhythm too — you carry it everywhere!"},
]
J[6] = [
    {"title": "Silas Builds It Sideways", "time": 5, "hero_name": "Silas", "hero_land": "Terrasol", "char_img": "silas.png", "gmsl_tenet": "autonomy-supportive language",
     "img": "land6_tools-construction.jpg", "img_alt": "Tools and building projects underway", "img_source": "SOE Picture Dictionary — Land 6",
     "story_snippet": "Pip's birdhouse door faced the ground. Silas opened his mouth to say \"That's wrong\" — and closed it. \"Have you considered how the birds will fly in?\" he asked instead. Pip studied it, flipped the birdhouse himself, then added a landing stick Silas had never seen on any birdhouse. \"Good thing I didn't fix it,\" Silas thought. \"His way ended up better.\"",
     "reflection_question": "Would you rather someone fix your project FOR you, or ask you a question that helps you fix it yourself? Write why.",
     "tip": "Silas says: 'Have you considered...' hands someone a tool. 'You're wrong' takes their tools away!"},
    {"title": "Octavia's Backwards Pattern", "time": 5, "hero_name": "Octavia", "hero_land": "Numeria", "char_img": "octavia.png", "gmsl_tenet": "autonomy-supportive language",
     "img": "land2_problem-solving-logic.jpg", "img_alt": "Puzzles and logic challenges in Numeria", "img_source": "SOE Picture Dictionary — Land 2",
     "story_snippet": "Remy solved the number puzzle backwards — starting from the answer and working to the front. \"That's not the method,\" Octavia almost said. Instead: \"What made you start from the end?\" Remy shrugged: \"The end had the most clues.\" Octavia tested it on the next puzzle herself. Backwards was FASTER. Now Numeria teaches both directions.",
     "reflection_question": "Do you ever solve things your own weird way? Write about your way — and what makes it work for you.",
     "tip": "Octavia says: 'The method' is just the first way someone found. Your way might be the next method!"},
    {"title": "Ezra's Un-Quiet Experiment", "time": 5, "hero_name": "Ezra", "hero_land": "Luminosity", "char_img": "ezra.png", "gmsl_tenet": "autonomy-supportive language",
     "img": "land7_energy-forces.jpg", "img_alt": "Energy and forces at work", "img_source": "SOE Picture Dictionary — Land 7",
     "story_snippet": "Mila wanted to test if plants grow better with music — by playing DRUMS at the garden. Loud ones. Ezra winced. \"Have you thought about what the quiet plants will tell us?\" he offered. Mila's eyes lit: \"A quiet row AND a drum row — then we compare!\" Ezra hadn't given her the answer. He'd given her a better question, and she'd built a real experiment from it.",
     "reflection_question": "If you could test one curious question this week, what would it be? Write your question and your first step.",
     "tip": "Ezra says: A good question doesn't stop an idea — it grows it a second branch!"},
    {"title": "Elias and the New Calendar", "time": 5, "hero_name": "Elias", "hero_land": "Celestia", "char_img": "elias.png", "gmsl_tenet": "autonomy-supportive language",
     "img": "land7_the-future-dreams.jpg", "img_alt": "Dreaming up the future in Celestia", "img_source": "SOE Picture Dictionary — Land 7",
     "story_snippet": "Juniper invented her own calendar: eight days a week, with a day called \"Funday.\" Elias, Keeper of real calendars, felt his eyebrows rise. \"Walk me through your invention,\" he said, and truly listened. \"Funday is for finishing dreams from the other days,\" she explained. Elias nodded slowly and pinned her calendar next to his. \"Inventors,\" he said, \"deserve wall space.\"",
     "reflection_question": "Invent your own special day! What would you name it, and what would it be for? Write or draw it.",
     "tip": "Elias says: Time enough to listen is the best gift you can give an inventor — including the one in your mirror!"},
    {"title": "Athena's Lantern Question", "time": 5, "hero_name": "Athena", "hero_land": "Luminosity", "char_img": "athena.png", "gmsl_tenet": "autonomy-supportive language",
     "img": "land7_inventions-discoveries.jpg", "img_alt": "Bright ideas lighting up the workshop", "img_source": "SOE Picture Dictionary — Land 7",
     "story_snippet": "The little inventors' fair was chaos — glue everywhere, ideas half-built, one volcano erupting early. Athena walked the tables with only one sentence: \"What would you like to try next?\" No fixing, no steering. By day's end, every invention was finished — each one stranger and more wonderful than anything Athena would have designed. That, she wrote in her journal, is the lantern trick: light the path, don't walk it for them.",
     "reflection_question": "What would YOU like to try next — in anything? Write your next step like an inventor's plan.",
     "tip": "Athena says: A discovery-filled week! Remember the lantern trick: the best helpers light paths, they don't push feet."},
]

# ---------------- WEEK 7 — Sound & Story · tempo-change · hope for change ----------------
I[7] = [
    {"title": "Fast Song, Slow Song", "time": 5, "track_title": "Drill Time", "track_number": 7, "rhythm_focus": "tempo-change",
     "img": "land7_time-in-music-rhythm.jpg", "img_alt": "Rhythm and tempo in the music of Celestia", "img_source": "SOE Picture Dictionary — Land 7",
     "instructions": "Listen to \"Drill Time\" — a FAST song. Now sing its chorus back in slow motion, like a sleepy giant. Then super fast, like a hummingbird! Write which tempo made the words easiest to hear.",
     "tip": "Kenji says: Changing a song's speed is like a magnifying glass for sounds — slow it down and hidden sounds appear!"},
    {"title": "The Ocean's Tempo", "time": 5, "track_title": "The Ocean", "track_number": 14, "rhythm_focus": "tempo-change",
     "img": "land4_the-ocean-marine-life.jpg", "img_alt": "Waves rolling across the wide ocean", "img_source": "SOE Picture Dictionary — Land 4",
     "instructions": "\"The Ocean\" has no words — just sound, like waves. Listen: does it flow fast or slow? Sway your arms with its tempo. Now tell a one-sentence story OUT LOUD that matches that speed. Write your story sentence.",
     "tip": "Aiko says: Every story has a tempo. Ocean stories roll slow and deep — race-car stories zoom. Match your voice to your tale!"},
    {"title": "Alphabet at Every Speed", "time": 5, "track_title": "Alphabet Song Remix", "track_number": 3, "rhythm_focus": "tempo-change",
     "img": "land1_the-classroom.jpg", "img_alt": "Letters lining the walls of a Harmonia classroom", "img_source": "SOE Picture Dictionary — Land 1",
     "instructions": "Listen to \"Alphabet Song Remix.\" Now say the alphabet three ways: turtle-slow, walking-speed, and rocket-fast. Where did rocket-speed trip you up? Write the letters where you stumbled — those are your practice letters!",
     "tip": "Kenji says: Speed shows you exactly where the tricky spots hide. Stumbles aren't failures — they're X marks the spot!"},
    {"title": "Rain Storm, Rain Whisper", "time": 5, "track_title": "Rain", "track_number": 18, "rhythm_focus": "tempo-change",
     "img": "land3_weather-seasons.jpg", "img_alt": "A storm rolling into gentle rain", "img_source": "SOE Picture Dictionary — Land 3",
     "instructions": "Listen to \"Rain.\" Drum your fingers as a gentle drizzle (slow), then a shower (medium), then a THUNDERSTORM (fast!) — then back down to drizzle. You just conducted a storm! Write the three tempo words from slowest to fastest.",
     "tip": "Aiko says: You controlled the whole storm with tempo alone. Conductors do exactly this with orchestras!"},
    {"title": "Story Tempo Theater", "time": 5, "track_title": "Changes", "track_number": 12, "rhythm_focus": "tempo-change",
     "img": "land1_school-events-activities.jpg", "img_alt": "A stage ready for performers in Harmonia", "img_source": "SOE Picture Dictionary — Land 1",
     "instructions": "Listen to \"Changes\" one more time. Now perform your favorite sentence from ANY story this week — once slow and mysterious, once bouncy and quick. Which fits the sentence best? Write your sentence and its perfect tempo.",
     "tip": "Kenji says: A storyteller's week complete! You now hold the storyteller's secret: HOW you say it is half the story."},
]
J[7] = [
    {"title": "Nerissa's Long Road to R", "time": 5, "hero_name": "Nerissa", "hero_land": "Aquaria", "char_img": "nerissa.png", "gmsl_tenet": "hope for change",
     "img": "land4_tricky-english-words.jpg", "img_alt": "The trickiest sounds in the language", "img_source": "SOE Picture Dictionary — Land 4",
     "story_snippet": "A little Aquarian named Coral couldn't say her R's — \"wiver\" instead of \"river\" — and she'd stopped talking in class. Nerissa knelt beside her: \"Want to know a secret? Until I was your age, I said 'thquirrel.' Me! The Sound Sculptor!\" Coral's mouth fell open. \"Sounds take time to sculpt,\" Nerissa said. \"Mine came. Yours is coming.\" Coral whispered \"wiver\" — then grinned and tried again.",
     "reflection_question": "What's hard for you now that a grown-up you know once found hard too? Ask someone about a thing they struggled with as a kid, and write what they say.",
     "tip": "Nerissa says: Every expert you admire once struggled exactly where you're struggling. The road continues — keep walking!"},
    {"title": "Ronan and the Reader's Story", "time": 5, "hero_name": "Ronan", "hero_land": "Aquaria", "char_img": "ronan.png", "gmsl_tenet": "hope for change",
     "img": "land1_the-classroom.jpg", "img_alt": "Books waiting in the reading corner", "img_source": "SOE Picture Dictionary — Land 1",
     "story_snippet": "Tam hid during reading time — the words swam and scrambled on the page. Ronan sat with him and opened the oldest book in Aquaria's library. Inside the cover, in shaky child-handwriting: 'This book beat me today. — R.' \"That's me,\" Ronan said. \"Same book. It beat me forty times before I beat it.\" Tam looked at the shaky signature, then at the Word Warrior it became. He opened to page one.",
     "reflection_question": "Write a note to your future self about something hard today. Someday you'll read it the way Tam read Ronan's!",
     "tip": "Ronan says: Struggling readers become word warriors every single day. You're not behind — you're mid-story!"},
    {"title": "Kenji's Hundred Crumpled Songs", "time": 5, "hero_name": "Kenji", "hero_land": "Harmonia", "char_img": "kenji.png", "gmsl_tenet": "hope for change",
     "img": "land1_hobbies-recreation.jpg", "img_alt": "Making music and art in Harmonia", "img_source": "SOE Picture Dictionary — Land 1",
     "story_snippet": "Pip crumpled his song sheet: \"It's terrible. I'll never write like you.\" Kenji left and came back hauling a dusty box — one hundred crumpled papers, his first hundred songs. \"Every Word Musician has a crumple box,\" he said. \"The song Harmonia sings at every festival? It was crumple number ninety-nine, uncrumpled and fixed.\" Pip smoothed out his sheet and drew a small box in the corner: #1.",
     "reflection_question": "What would go in YOUR crumple box — drawings, words, or projects that didn't work yet? Write why keeping them might matter.",
     "tip": "Kenji says: Your worst try today is a stepping stone in a bridge you can't see yet. Keep every stone!"},
    {"title": "Aiko Learns to Listen Again", "time": 5, "hero_name": "Aiko", "hero_land": "Harmonia", "char_img": "aiko.png", "gmsl_tenet": "hope for change",
     "img": "land1_body-language-gestures.jpg", "img_alt": "Understanding each other without words", "img_source": "SOE Picture Dictionary — Land 1",
     "story_snippet": "Mila told Aiko sadly, \"I interrupted everyone at lunch again. I'll always be bad at listening.\" Aiko laughed gently: \"You know I'm called the Harmony Keeper? When I was small, I talked over EVERYONE — my nickname was Chatterbird.\" Mila stared. \"How did Chatterbird become the Harmony Keeper?\" \"One conversation at a time,\" Aiko said. \"Same road you're on right now.\"",
     "reflection_question": "Is there a habit you're trying to change? Write it down — then write the nickname you'll earn once you've changed it.",
     "tip": "Aiko says: 'Always' and 'never' are the only words that are never true about growing kids. You are built to change!"},
    {"title": "Selene and the Unfinished Song", "time": 5, "hero_name": "Selene", "hero_land": "Celestia", "char_img": "selene.png", "gmsl_tenet": "hope for change",
     "img": "land7_ages-life-stages.jpg", "img_alt": "Growing and changing through the years", "img_source": "SOE Picture Dictionary — Land 7",
     "story_snippet": "On the last night of story week, Selene showed the children Celestia's oldest songbook. The final song stopped mid-line — unfinished for a hundred years. \"Why did no one finish it?\" they asked. \"Because it isn't stuck,\" Selene smiled. \"It's waiting. Some songs wait for the right singer to grow up.\" She looked around the circle. \"One of you, maybe. You're all still being written too.\"",
     "reflection_question": "You are an unfinished song — and that's the exciting part! Write one line of the 'song of you' as it sounds today.",
     "tip": "Selene says: A story-filled week! Unfinished doesn't mean broken — it means the best verses are still coming."},
]

# ---------------- WEEK 8 — Grand Celebration · greatest-hits · all-heroes retrospective ----------------
I[8] = [
    {"title": "Greatest Hits: Your Top Beat", "time": 5, "track_title": "Sunny Day (Intro)", "track_number": 1, "rhythm_focus": "greatest-hits",
     "img": "land1_music-instruments.jpg", "img_alt": "All the instruments of the 7 Lands together", "img_source": "SOE Picture Dictionary — Land 1",
     "instructions": "Start with \"Sunny Day\" — the song that opens the whole album. Then pick YOUR favorite track from all 8 weeks and play it. Do its activity one more time (tap, clap, echo, or guess!). Write your #1 song and why it wins.",
     "tip": "Kenji says: Champions have a signature move. This week you pick yours — from every rhythm you've learned!"},
    {"title": "The 7-Lands Beat Parade", "time": 5, "track_title": "Numbers", "track_number": 8, "rhythm_focus": "greatest-hits",
     "img": "land2_numbers-counting.jpg", "img_alt": "Counting a parade through Numeria", "img_source": "SOE Picture Dictionary — Land 2",
     "instructions": "Play \"Numbers\" and march a beat-parade through your home: tap in the kitchen (Numeria!), clap by a window (Terrasol!), hum in the hall (Harmonia!). Visit 3 'lands' of your house. Write which room had the best echo.",
     "tip": "Aiko says: You just took rhythm traveling, like a parade through all the lands. Music moves — and so do you!"},
    {"title": "Teach Your Favorite Rhythm", "time": 5, "track_title": "My Body", "track_number": 9, "rhythm_focus": "greatest-hits",
     "img": "land1_family-relationships.jpg", "img_alt": "Family joining in the fun", "img_source": "SOE Picture Dictionary — Land 1",
     "instructions": "You're the teacher today! Pick any rhythm game from the last 8 weeks and teach it to a family member using \"My Body\" (or your favorite track). Write your student's name and give them a score out of 3 stars.",
     "tip": "Kenji says: When you can teach a rhythm, you truly own it. Today the student becomes the Word Musician!"},
    {"title": "The Quiet Finale Warm-Up", "time": 5, "track_title": "After the Storm (Outro)", "track_number": 19, "rhythm_focus": "greatest-hits",
     "img": "land3_weather-seasons.jpg", "img_alt": "Calm skies after the storm passes", "img_source": "SOE Picture Dictionary — Land 3",
     "instructions": "Listen to \"After the Storm\" — the album's gentle goodbye song. No words, just calm. Breathe with it. Then whisper-clap the syllables of tomorrow's big words: cel-e-bra-tion (4), cham-pi-on (3). Write both words with their counts. You're ready.",
     "tip": "Aiko says: Every performer rests before the big day. Calm is part of the celebration too!"},
    {"title": "Grand Rhythm Celebration!", "time": 5, "track_title": "Alphabet Song Remix", "track_number": 3, "rhythm_focus": "greatest-hits",
     "img": "land1_celebrations-traditions.jpg", "img_alt": "A grand celebration in Harmonia square", "img_source": "SOE Picture Dictionary — Land 1",
     "instructions": "GRAND FINALE! Play \"Alphabet Song Remix\" — the very first song from Day 1 — and do EVERYTHING: tap the beat, echo the words, guess the rhymes, clap the syllables, change the tempo! Write one sentence about how much stronger your rhythm powers are than Week 1.",
     "tip": "Kenji says: Eight weeks ago you tapped your first beat. Today you did five rhythm skills in ONE song. Take a bow, Rhythm Champion!"},
]
J[8] = [
    {"title": "Elias Opens the Memory Book", "time": 5, "hero_name": "Elias", "hero_land": "Celestia", "char_img": "elias.png", "gmsl_tenet": "retrospective",
     "img": "land7_time-concepts-history.jpg", "img_alt": "Looking back through the pages of time", "img_source": "SOE Picture Dictionary — Land 7",
     "story_snippet": "Elias gathered the heroes around the great Memory Book of the summer. \"Eight weeks,\" he said, turning pages: Kenji's jumbled word, Octavia's lost count, Felix's fall, Aiko's butterflies, Ronan's heavy net. \"Look closely — every one of these pages is a mistake.\" He smiled. \"And every mistake grew into the strongest chapter of this book.\"",
     "reflection_question": "Turn back through YOUR workbook like a Memory Book. Find one early page where something was hard. Is it easier now? Write what changed.",
     "tip": "Elias says: Time turns struggles into stories. You've been writing a great one for eight whole weeks!"},
    {"title": "Amara's Champion Dance", "time": 5, "hero_name": "Amara", "hero_land": "Vitalis", "char_img": "amara.png", "gmsl_tenet": "retrospective",
     "img": "land1_celebrations-traditions.jpg", "img_alt": "Dancing at the summer celebration", "img_source": "SOE Picture Dictionary — Land 1",
     "story_snippet": "For the Grand Celebration, Amara choreographed the Champion Dance — one move from each week: a wobble (Week 5!), a shaky-leg stomp (Week 2!), a last-place lap of honor (for Felix), a slow-motion fall and rise. \"Why are all the moves mistakes?\" asked Pip. Amara spun: \"Because that's what champion dances are made of. The falls we got up from!\"",
     "reflection_question": "Invent one dance move that shows something you overcame this summer. Name your move and draw or describe it!",
     "tip": "Amara says: Dance your falls proudly — they're the steps that taught your feet the most!"},
    {"title": "Kwame Counts the Growing", "time": 5, "hero_name": "Kwame", "hero_land": "Numeria", "char_img": "kwame.png", "gmsl_tenet": "retrospective",
     "img": "land2_charts-graphs.jpg", "img_alt": "Charts showing how far we've come", "img_source": "SOE Picture Dictionary — Land 2",
     "story_snippet": "Kwame loves numbers, so he counted the summer: 40 days. 10 blocks a day. Almost 400 activities. \"But here's my favorite number,\" he said, holding up a giant ONE. \"One kid — you — showed up again and again. Every song, every story, every wobbly letter. The biggest number of the summer is how much ONE learner can grow.\"",
     "reflection_question": "Give your summer a number! How many stars out of 100 was it? Write your number and the best thing you learned.",
     "tip": "Kwame says: You can't always see growing while it happens — but count backwards to Week 1, and WOW. Look at you!"},
    {"title": "Vesta Maps the Journey", "time": 5, "hero_name": "Vesta", "hero_land": "Terrasol", "char_img": "vesta.png", "gmsl_tenet": "retrospective",
     "img": "land4_map-reading-gps.jpg", "img_alt": "A map marking every stop on the great journey", "img_source": "SOE Picture Dictionary — Land 4",
     "story_snippet": "Vesta unrolled a giant map of the summer: eight lands for eight weeks, with little flags at every adventure — the rhyme river, the syllable mountains, the tempo storm, the crumple-box forest. \"The map looks finished,\" said Juniper. Vesta shook her head and pointed past the last flag, where the map faded into blank space. \"Cartographers leave room,\" she said. \"That part is for what you explore next.\"",
     "reflection_question": "Draw a tiny map of your summer quest — mark 3 favorite stops. Then leave blank space and label it: NEXT!",
     "tip": "Vesta says: Finished maps are just invitations to draw bigger ones. Your blank space is waiting!"},
    {"title": "All Heroes: The Champion's Pledge", "time": 5, "hero_name": "Kenji", "hero_land": "All 7 Lands", "char_img": "kenji.png", "gmsl_tenet": "retrospective",
     "img": "land1_celebrations-traditions.jpg", "img_alt": "Every hero gathered for the grand finale", "img_source": "SOE Picture Dictionary — Land 1",
     "story_snippet": "On the final day, all the heroes gathered — Kenji and Aiko, Octavia and Kwame, Vesta and Silas, Amara and Felix, Athena and Ezra, Nerissa and Ronan, Selene and Elias. Kenji stepped forward with the Champion's Pledge: \"I tried. I wobbled. I asked. I helped. I grew. And when the next hard thing comes —\" all the heroes answered together — \"I'LL REMEMBER I'VE DONE HARD THINGS BEFORE!\"",
     "reflection_question": "Say the Champion's Pledge out loud, then sign your name below it like a true hero of the 7 Lands. What hard thing will you try next?",
     "tip": "Kenji says: This isn't goodbye — heroes' quests never really end. See you in the next adventure, Champion!"},
]


def main():
    with open(CONTENT_FILE, "r", encoding="utf-8-sig") as f:
        data = json.load(f)

    injected = 0
    for week in data["weeks"]:
        wnum = week["week"]
        if wnum not in I:
            continue
        for i, day in enumerate(week["days"]):
            day["blocks"]["I"] = I[wnum][i]
            day["blocks"]["J"] = J[wnum][i]
            injected += 2

    with open(CONTENT_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")

    print(f"Injected {injected} entries (Blocks I+J, weeks 2-8).")


if __name__ == "__main__":
    main()
