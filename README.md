# The Midnight Museum — PYP 6 Halloween Escape Room

A completely static, Chromebook-friendly Halloween escape room built from the supplied PYP 6 unit slide decks and EDM Unit 2 assessment topics. Five puzzle rooms are intended for a 20-minute collaborative experience, followed by approximately 10 minutes of costume voting and a 5-minute finale, with five minutes for the introduction.

## Classroom schedule (40 minutes)
- 0–5 minutes: Introduce Pip, group students, open the website.
- 5–25 minutes: Complete five interactive rooms. Each room gives one final-code digit.
- 25–35 minutes: Costume voting through an embedded Google Form.
- 35–40 minutes: Announce awards and celebrate.

## Curriculum connections
1. Clockmaker: lowest common multiple, Unit 2 assessment, numbers 9 and 12; first common multiple 36.
2. Potion: equivalent ratio 3:2 and three-fourths of a quantity, Unit 2 assessment themes.
3. Gallery: observation vs inference, evidence, framing/headlines, responsibility, _Perceptions and Misconceptions_ and _The Boy Who Fooled the World_.
4. Robot: design cycle, testing, improvements and limitations of technology, _Technological Advancements_.
5. Poet: persuasive claim for an audience supported by evidence, modal verb 'should', and a spoken-word acrostic, connected to persuasive-writing and grammar slides.

## Teacher answer key
- Clock: 36 minutes → 6.
- Potion: 8 purple drops and 9 jars → 9.
- Gallery: factual observation option B and careful headline option B → 2.
- Robot: improve after testing (B), add/test a low-light sensor (C) → 4.
- Poem: persuasive claim B and hidden word CHECK → 5.
- **Final code: 69245**.

This teacher key is also in the bottom collapsible section of the webpage; do not display that section to students. Source-code inspection can reveal answers because no backend is used.

## GitHub Pages deployment
1. Create a GitHub repository.
2. Upload `index.html` to the repository root.
3. Go to Settings → Pages, select Deploy from a branch, main, /(root), and Save.
4. Open the Pages URL once deployed. The game has no installation or server requirements.

## Google Forms + Sheets voting
1. Create a Google Form with four questions: funniest, scariest, most creative, best homemade.
2. Enter student costume labels or nominee numbers (avoid public student names).
3. In Forms → Responses, link a spreadsheet in Google Sheets.
4. Publish/share the responder link ending in `/viewform` (rather than the editor link).
5. In `index.html` replace `const GOOGLE_FORM_URL='';` with the responder URL inside quotes.
6. Test the form on a student Chromebook. If your school restricts embedded content, use the provided new-tab link.

For one student per vote on a shared Chromebook, **do not enable 'Limit to 1 response'** unless everyone has their own sign-in context. Google Forms alone does not reliably prevent repeat votes without account restrictions. Review school consent/privacy settings before collecting identifying details.

## Editable game content
All game content lives in the `rooms` array in `index.html`; edit questions, hints and feedback there. This version was written as new, original questions tied to concepts in the slides rather than copying published assessment questions verbatim. No student data is stored by the escape game.
