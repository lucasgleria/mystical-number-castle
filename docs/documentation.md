## Game Planning: Mystical Number Castle

### Game Flow

Here's a detailed breakdown of your specified game flow:

**1. Meeting Screen (meeting-screen.png)**

* **Objective:** Welcome the player, gather initial game settings.
* **Visuals:**
    * **Background:** Mysterious, shiny, clear, and colorful castle image (as provided in `meeting-screen.png`). This sets the thematic tone.
    * **Title:** "MYSTICAL NUMBER CASTLE" prominently displayed at the top, perhaps with a glowing or magical effect.
    * **Subtitle:** "THE GENIE'S CHALLENGE" or similar, reinforcing the game's premise.
    * **Instructional Text:** "Enter the Mystical Number Castle, where the Genie awaits to challenge your mind..." (as seen in `meeting-screen.png`).
* **User Input:**
    * **"Your Magical Identity" (Name Input):** A text field for the player to enter their name (e.g., "Brave Adventurer" as a placeholder). Character limit of 20.
    * **"Set Your Number Range" (Min/Max Inputs):** Two number input fields for "Minimum Value" and "Maximum Value." Default values likely 1 and 100, respectively, with a display of the current range (e.g., "Current range: 1 to 100 (99 numbers)").
* **Difficulty Selection:**
    * Three distinct buttons: "Easy," "Medium," and "Hard."
    * **Easy:** Unlimited guesses, extensive help/clues.
    * **Medium:** Limited guesses (e.g., 10-15), moderate clues.
    * **Hard:** Very limited guesses (e.g., 5-7), minimal or no clues.
* **Call to Action:** A prominent "Begin Adventure" button to start the game.

**2. Game Screen (game-screen.png)**

* **Objective:** The core gameplay loop where the player guesses the number.
* **Visuals:**
    * **Background:** Inside the castle environment, maintaining the magical and slightly dark aesthetic. This could involve an interior view of the castle from `meeting-screen.png`.
    * **Genie Character:** The central element. The genie will display different expressions and text bubbles based on the player's guess. (Refer to `genie-sprites.png` for sprite variations).
    * **UI Elements:**
        * **"Adventurer's Quest" Panel:** Displays current game stats:
            * "Current Range": Shows the active guessing range (e.g., "1 - 100").
            * "Attempts": Tracks "Attempts Used" (e.g., "0/20") and "Attempts Left" (e.g., "20 left").
* **Gameplay Loop:**
    * **Genie's Prompt:** The genie initially says, "I'm thinking of a number... Can you guess it?"
    * **Player Input:** A text input field labeled "Enter your guess..." and a "Submit Guess" button.
    * **Genie's Feedback (based on `genie-sprites.png`):**
        * **"Congratulations! You guessed correctly!"** (Happy/celebratory genie)
        * **"Hmm, let me think about your guess..."** (Thinking/neutral genie - for when the guess isn't right but not extremely far)
        * **"Oh my! You were so close!"** (Surprised/slightly concerned genie - for when the guess is very close to the target number)
        * *(You'll need additional sprites/expressions for "too high" and "too low" feedback.)*
    * **Clue System (based on difficulty):**
        * **Easy:** Genie provides explicit "higher" or "lower" clues, and potentially hints like "It's an even number" or "It's a multiple of 5."
        * **Medium:** Genie provides "higher" or "lower" clues.
        * **Hard:** Genie might only say "Not quite" or give subtle non-directional feedback.
    * **"Give Up" Button:** Allows the player to exit the game at any time and go to the ending screen.

**3. Ending Screen (ending-game.png)**

* **Objective:** Conclude the game, display results, and provide a leaderboard.
* **Visuals:**
    * **Background:** Outside the castle, opposite to the `meeting-screen.png` view. This could be a moonlit lands  cape with the castle silhouette in the distance, maintaining the mystical feel.
    * **Game Over/Win Message:**
        * **Loss:** "Game Over" and "The number was [Guessed Number]. Better luck next time!"
        * **Win:** "Congratulations, [Player Name]! You guessed the number [Guessed Number] in [X] attempts!"
* **Leaderboard:**
    * **Title:** "Leaderboard" and "Top guessers of the Mystical Number Castle."
    * **Difficulty Tabs:** "All," "Easy," "Medium," "Hard" to filter the leaderboard.
    * **Table:** Displays "Rank," "Name," "Score," and "Attempts."
        * **Score Calculation:** Needs to be defined. Perhaps based on attempts taken, time, or a combination. Fewer attempts for correct guess = higher score.
* **Call to Action:** "Play Again" button to restart the game (loops back to the Meeting Screen).

### Game Logic Considerations

* **Number Generation:** Randomly select a target number within the chosen min/max range.
* **Attempt Tracking:** Decrement attempts based on difficulty.
* **Win Condition:** Player's guess matches the target number.
* **Loss Condition:** Player runs out of attempts or clicks "Give Up."
* **Score Calculation:** Develop a scoring algorithm. For instance:
    * Base score for guessing correctly.
    * Bonus points for fewer attempts.
    * Penalties for incorrect guesses.
* **Leaderboard Management:** Store top scores (locally for a simple game, or with a backend for persistent scores). Sort by score, then attempts (lower is better).
