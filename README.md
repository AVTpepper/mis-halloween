# The Midnight Museum — Classroom Edition

A static, Chromebook-friendly Halloween escape room. Teams investigate six rooms, collect six digits and rescue Pip from a painting. No accounts, database, build step or runtime dependencies are required. Open `index.html` or host the five website files on GitHub Pages.

Skippable five-second cutscenes introduce the museum, connect each solved room to the next, reveal recovered digits, and celebrate Pip’s rescue. Animated doors, glowing relics, floating Pip, stars and mist set the scene. Press Continue or Escape to skip; the team countdown pauses during the scene and resumes automatically afterward. Reduced-motion preferences disable movement. Refreshing during a scene restores the saved game paused; press Resume to continue.

## Classroom planning

Allow 5 minutes to introduce Pip and form teams, 20 minutes to escape, 10 minutes for costume voting and 5 minutes to celebrate. Aim for 2–3 minutes per curriculum room and reserve roughly 4–5 minutes for the two arcade turns and final code. Timing depends on players’ Snake experience; use Pause when introducing the controls. The countdown begins when a team enters the museum and continues through the final door. Pause is available; reaching zero permits teams to continue solving.

Each room begins with clickable objects that reveal clues in a notebook. Inspect every object to reveal the lock challenge. Potion jars can be toggled to model three-fourths of 12; the team still enters its own numerical answer. Hints and retry feedback support discussion. The robot and gallery use evidence-based decisions, while the poem combines persuasion with an acrostic.

Progress, clue discoveries, answers and the timer are saved in this browser's local storage when available. The countdown continues while the tab is closed unless paused. Refresh, select Continue, and pick up where you left off. Use **Start a new team game** between teams; restarting an existing game asks for confirmation. Storage restrictions may prevent recovery, but the game still works. Teams should use one device each. No student names or answers are sent to a server by the escape game.

## Team lives and the Serpent Arcade

Teams start with **five shared lives**. Every incorrect Check the lock submission, incorrect final rescue code, or Snake crash costs one life. Hints, clue inspection and pausing are free. The remaining lives appear above the game and persist across refreshes. At zero lives the rescue automatically starts over: all room digits, answers, Snake levels and the countdown reset. Starting the new attempt restores five lives.

Snake is the sixth challenge, preserving all five curriculum rooms. Two teammates take **sequential turns on the same device**. Player 1 must clear 10 levels, then Player 2 must clear 10. One gold spark clears one short level; the snake grows and gradually speeds up. Walls and the snake’s body are hazards. A crash costs a team life and resets the active player’s run to zero; an already completed Player 1 turn is retained until the whole team loses its last life. Both players must reach 10/10 before the lock button enables and digit 7 can be earned.

Use arrow keys, WASD, or the on-screen direction buttons. Start/resume the turn explicitly. Space pauses while the board has focus; the Pause turn button works at any time. Navigating away, hiding the tab, refreshing or pausing the team countdown safely pauses the snake. Refresh restores its board, each player's cleared levels and shared lives; it never starts moving automatically. The team countdown continues as described above. The updated rules use a new save version, so older five-room saves begin a fresh attempt.

## Curriculum connections and teacher answer key

Open **Teacher room** in the top navigation and enter `halloween123` to view classroom planning, the learning focus, explanation, answer, digit and discussion prompt for every stage, the final code and setup notes. Opening the room pauses an active countdown. Return to the game and press Resume to continue. Leaving the room or refreshing locks it again; the access code is not saved in browser storage. Incorrect teacher-code attempts do not cost team lives.

This is a convenience gate on a static site, not secure authentication: the code and answers remain discoverable in the downloaded source. Avoid displaying the unlocked room to students.

The supplied starting website identifies PYP 6 slide decks and EDM Unit 2 topics as its basis. Those six source resources were not present in this checkout, so these connections describe the supplied material and have not been independently checked against those resources. Questions are original classroom puzzles.

| Room | Concepts and reasoning | Answer | Digit |
| --- | --- | --- | --- |
| Clockmaker’s Secret | LCM of 9 and 12; compare multiples | First shared multiple is 36 minutes; take its ones digit | 6 |
| Potion of Proportions | Equivalent ratios and a fraction of a quantity | 3:2 scaled by 4 gives 12:8; three-fourths of 12 is 9 jars | 9 |
| Gallery of Misleading Headlines | Observation versus inference; framing and responsible reporting; Perceptions and Misconceptions / The Boy Who Fooled the World | Observation B: painting on floor at 21:06. Headline B: cause unknown. B is alphabet position 2 | 2 |
| Rescue Robot That Failed | Design cycle, test evidence and technology limitations; Technological Advancements | B: improve and test again. C: add a low-light sensor and test in darkness. Improve is stage 4 of this puzzle’s checklist | 4 |
| Poet Behind the Portrait | Persuasive claim, audience, evidence, modal verb “should”, spoken-word poetry | Claim B supports a recommendation with evidence. First letters spell CHECK, five letters | 5 |
| Serpent Arcade | Planning, spatial reasoning and turn-taking | Both players clear 10 Snake levels each; collect the arcade digit | 7 |

**Final rescue code: 692457.** Teacher answers are kept off the student interface. This is a static educational activity; source inspection can still reveal answers.

## GitHub Pages

Repository: https://github.com/AVTpepper/mis-halloween

1. In repository **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source (an administrator may need to enable Pages).
2. Push to `main`, or run **Deploy classroom website** manually in the Actions tab.
3. Check the workflow’s deployment link. The expected URL is `https://avtpepper.github.io/mis-halloween/`.

The workflow publishes only `index.html`, `styles.css`, `game.js`, `snake.js` and `cutscenes.js`. All asset paths are relative so the repository subpath works. Alternatively, select **Deploy from a branch → main → /(root)**; the same five files work directly without a build. Use one deployment method.

## Google Forms costume voting

1. Create a Google Form for funniest, scariest, most creative and best homemade costume.
2. Prefer costume labels or nominee numbers rather than public student names.
3. Link responses to Google Sheets using the Form’s Responses tab.
4. In `game.js`, set `const GOOGLE_FORM_URL='';` to your published HTTPS responder URL ending in `/viewform`. Do not use the editor URL.
5. Push the change and test on a school Chromebook. A full `docs.google.com/forms/.../viewform` URL is embedded, with a new-tab fallback. A `forms.gle` short link opens in a new tab.

Until a form is supplied, students see a friendly waiting message. Voting is hosted separately by Google and follows its account and school access settings. Avoid “Limit to 1 response” on shared devices unless students have separate sign-in contexts. Google Forms cannot reliably prevent duplicate votes without account restrictions.

## Editing, verification and ZIP

`game.js` contains puzzle content (`rooms`), inspectable clues (`objects`), game flow and the form setting. `snake.js` contains the arcade rules, controls, drawing and saved board. Edit appearance in `styles.css` and page structure in `index.html`.

For browser checks, install Node.js and Microsoft Edge, then run `npm ci` followed by `npm test`. Playwright launches Edge against a local static server and covers the complete six-room rescue, both 10-level Snake turns through actual controls, a crash and retained teammate progress, life loss at puzzle and final locks, zero-life reset, refresh recovery, jar model, pause, timeout, restart, mobile overflow and form embedding. Development dependencies are unnecessary for classroom use.

On Windows, run `powershell -File scripts/package.ps1` to create `artifacts/midnight-museum-classroom.zip`. It contains the five website files plus this teacher guide. Extract all files together and open `index.html`. The generated ZIP is ignored by Git; source files and the packaging script are tracked.
