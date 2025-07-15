## Mystical Number Castle Game Development Checklist

**Project Name:** Mystical Number Castle
**Core Technologies:** Vue.js (with Pinia), GSAP, SCSS, Vite

-----

### Phase 1: Project Setup & Core Structure (Estimated 1-3 Days)

**Goal:** Establish the foundational development environment, basic styling, and global state management.

  * **1.1 Project Initialization & Dependencies**

      * [x] **Create New Vite Project:**
          * `npm create vite@latest mystical-number-castle -- --template vue`
          * `cd mystical-number-castle`
      * [x] **Install Core Dependencies:**
          * `npm install` (Installs Vue and Vite defaults)
          * `npm install gsap` (GreenSock Animation Platform)
          * `npm install sass` (For SCSS support)
          * `npm install pinia` (Vue's recommended state management)
      * [x] **Verify Development Server:**
          * `npm run dev` (Ensure it starts correctly and opens in browser)

  * **1.2 Initial Project Structure & Git**

      * [x] **Initialize Git Repository:**
          * `git init`
      * [x] **Create `.gitignore` File:**
          * Add `node_modules/`, `.env`, `dist/`, `.DS_Store`, etc.
      * [x] **Organize `src` Directory:**
          * [x] Create `src/assets/`
              * [x] `src/assets/images/` (Place `pallete.png`, `genie-sprites.png`, `meeting-screen.png`, `game-screen.png`, `ending-game.png` here initially)
              * [x] `src/assets/fonts/` (If custom fonts are used later)
              * [x] `src/assets/styles/`
          * [x] Create `src/components/`
          * [x] Create `src/views/`
          * [x] Create `src/stores/`
          * [x] Create `src/utils/`
      * [x] **Cleanup Default Vue Files:** Remove unnecessary demo code from `App.vue` and `components/`.

  * **1.3 Global Styling Setup (SCSS)**

      * [x] **Create `src/assets/styles/_variables.scss`:**
          * Define your core color palette using SCSS variables (e.g., `$primary-purple: #...; $accent-gold: #...;`).
          * Define common spacing, font sizes, border-radii.
      * [x] **Create `src/assets/styles/_base.scss`:**
          * Apply CSS resets (e.g., `* { margin: 0; padding: 0; box-sizing: border-box; }`).
          * Define global font families (e.g., `font-family: 'YourGameFont', sans-serif;`).
          * Set `body` and `html` to take full viewport height and width.
          * Apply the primary background gradient (purple to pink) from `pallete.png` to the `body` or main `App.vue` container.
      * [x] **Create `src/assets/styles/main.scss`:**
          * Import `_variables.scss` and `_base.scss`.
          * `@import 'variables';`
          * `@import 'base';`
      * [x] **Link `main.scss` in `src/main.js`:**
          * `import './assets/styles/main.scss';`

  * **1.4 Pinia State Management Setup**

      * [x] **Configure Pinia in `src/main.js`:**
        ```javascript
        import { createApp } from 'vue';
        import { createPinia } from 'pinia';
        import App from './App.vue';
        import './assets/styles/main.scss';

        const app = createApp(App);
        app.use(createPinia());
        app.mount('#app');
        ```
      * [x] **Create `src/stores/gameStore.js`:**
          * Define the initial `gameStore` structure with `defineStore`.
          * **State (`state`):**
              * `currentScreen: 'meeting'` (enum: `'meeting'`, `'game'`, `'ending'`)
              * `playerName: ''`
              * `minRange: 1`
              * `maxRange: 100`
              * `difficulty: null` (enum: `'easy'`, `'medium'`, `'hard'`)
              * `targetNumber: null`
              * `attemptsUsed: 0`
              * `attemptsLeft: 0`
              * `maxAttempts: { easy: Infinity, medium: 20, hard: 10 }` (Adjust `medium` and `hard` as desired)
              * `gameWon: false`
              * `leaderboard: []` (Initialize as empty array)
          * **Actions (`actions` - empty for now):** Define placeholders for `setScreen`, `setPlayerName`, `setRange`, `setDifficulty`, `startGame`, `makeGuess`, `endGame`, `addScoreToLeaderboard`, `saveLeaderboard`, `loadLeaderboard`.
          * **Getters (`getters` - empty for now):** Define placeholders for `currentRangeDisplay`.
      * [x] **Initial Commit:** Commit your project setup to version control.

-----

### Phase 2: Meeting Screen Development (Estimated 3 Days)

**Goal:** Fully implement the Meeting Screen's UI, input logic, and basic screen transition.

  * **2.1 Core `MeetingScreen.vue` Structure**

      * [x] **Create `src/views/MeetingScreen.vue`:**
          * Add basic `<template>`, `<script setup>`, and `<style scoped>` blocks.
      * [x] **Integrate `MeetingScreen` into `App.vue`:**
          * Import `MeetingScreen` in `App.vue`.
          * Use `v-if` to conditionally render `MeetingScreen` based on `gameStore.currentScreen === 'meeting'`. (Use `useGameStore` in `App.vue`).

  * **2.2 Reusable UI Components for Meeting Screen**

      * [x] **`src/components/TextInput.vue`:**
          * [x] Props: `label`, `placeholder`, `modelValue`, `maxLength`.
          * [x] Emit `update:modelValue` on input.
          * [x] Basic styling (glassmorphism effect).
      * [x] **`src/components/NumberInput.vue`:**
          * [x] Props: `label`, `placeholder`, `modelValue`, `min`, `max`.
          * [x] Emit `update:modelValue` (ensure value is parsed as a number).
          * [x] Basic styling (glassmorphism effect).
      * [x] **`src/components/ActionButton.vue`:**
          * [x] Props: `label`, `disabled` (boolean).
          * [x] Emit `click` event.
          * [x] Apply the gold/orange button styling. Define hover/active states.
      * [x] **`src/components/DifficultyButton.vue`:**
          * [x] Props: `label`, `value`, `isSelected`.
          * [x] Emit `click` event with `value`.
          * [x] Styling for default, hover, and `isSelected` states (e.g., different background/border).

  * **2.3 `MeetingScreen.vue` Content & Logic**

      * [x] **Add Castle Background Image:** Position `meeting-screen.png` within `MeetingScreen.vue` using CSS (e.g., `background-image`, `background-size`, `background-position`).
      * [x] **"MYSTICAL NUMBER CASTLE" Title:**
          * Add `<h1>` for the main title.
          * Add subtitle "THE GENIE'S CHALLENGE".
          * Apply `font-size`, `color` (gold/yellow from palette), `text-shadow` for shine.
      * [x] **"Your Magical Identity" Section:**
          * [x] Use `TextInput.vue` for `playerName`.
          * [x] Bind `v-model` to `gameStore.playerName`.
          * [x] Display character counter `(gameStore.playerName.length)/20`.
      * [x] **"Set Your Number Range" Section:**
          * [x] Use `NumberInput.vue` for `minRange` and `maxRange`.
          * [x] Bind `v-model` to `gameStore.minRange` and `gameStore.maxRange`.
          * [x] Display "Current range: X to Y (Z numbers)" using a getter from `gameStore`.
          * [x] Add client-side validation (e.g., `minRange < maxRange`). Provide visual feedback if invalid.
      * [x] **"Select Difficulty" Section:**
          * [x] Use `DifficultyButton.vue` components (`Easy`, `Medium`, `Hard`).
          * [x] On click, call `gameStore.setDifficulty(value)`.
          * [x] Pass `isSelected` prop based on `gameStore.difficulty`.
          * [x] Add descriptions for each difficulty (Unlimited guesses, Moderate clues, etc.).
      * [x] **"Begin Adventure" Button:**
          * [x] Use `ActionButton.vue`.
          * [x] `disabled` prop should be true if `playerName` is empty, range is invalid, or `difficulty` is not selected.
          * [x] On `click`, call `gameStore.startGame()`.

  * **2.4 Update `gameStore.js` Actions & Getters for Meeting Screen**

      * [x] **`setPlayerName(name)` action:** Updates `playerName` state.
      * [x] **`setRange(min, max)` action:** Updates `minRange` and `maxRange` states.
      * [x] **`setDifficulty(difficulty)` action:** Updates `difficulty` state and initializes `attemptsLeft` based on `maxAttempts[difficulty]`.
      * [x] **`startGame()` action:**
          * Generates `targetNumber` using `Math.random()` within `minRange` and `maxRange`.
          * Sets `attemptsUsed = 0`.
          * Sets `gameWon = false`.
          * Sets `currentScreen = 'game'`.
      * [x] **`currentRangeDisplay` getter:** Returns a formatted string like "1 to 100 (99 numbers)".
      * [x] **Initial Commit:** Commit Meeting Screen functionality.

-----

### Phase 3: Game Screen Development (Estimated 4 Days)

**Goal:** Implement the main gameplay loop with the Genie, guess input, and feedback.

  * **3.1 Core `GameScreen.vue` Structure**

      * [x] **Create `src/views/GameScreen.vue`:**
          * Add basic `<template>`, `<script setup>`, and `<style scoped>` blocks.
      * [x] **Integrate `GameScreen` into `App.vue`:**
          * Use `v-if` to conditionally render `GameScreen` when `gameStore.currentScreen === 'game'`.

  * **3.2 Genie & Speech Bubble Components**

      * [x] **`src/components/GenieSprite.vue`:**
          * [x] Props: `expression` (string: `'idle'`, `'thinking'`, `'correct'`, `'tooHigh'`, `'tooLow'`, `'close'`, `'sad'`).
          * [x] Load all genie sprite images from `genie-sprites.png` as individual image files (e.g., `genie-idle.png`, `genie-correct.png` - you might need to manually cut them from the sprite sheet or use CSS sprites).
          * [x] Use `v-bind:src` or `v-if` to switch the displayed image based on `expression`.
          * [x] **GSAP Animation:** Implement subtle `gsap.to` or `gsap.fromTo` animations for `y` position for a gentle idle float.
          * [x] **GSAP Animation:** Animate scale or slight rotation when `expression` changes to give it a "pop" effect.
      * [x] **`src/components/SpeechBubble.vue`:**
          * [x] Props: `message` (string).
          * [x] Basic CSS styling for a speech bubble shape.
          * [x] **GSAP Animation:** Use `gsap.from` to animate its appearance (e.g., fade in and scale up slightly) when `message` changes or becomes non-empty. Animate out when `message` is empty.

  * **3.3 `GameScreen.vue` Content & Logic**

      * [x] **Background:** Apply an "inside castle" background style to `GameScreen.vue` (can be a darker version of the `meeting-screen` background, or a new image).
      * [x] **"Adventurer's Quest" Panel:**
          * [x] Create a dedicated `src/components/GameStatsPanel.vue` component.
          * [x] Display `Current Range: {{ gameStore.currentRangeDisplay }}`.
          * [x] Display `Attempts Used: {{ gameStore.attemptsUsed }}/{{ gameStore.maxAttempts[gameStore.difficulty] }}`.
          * [x] Display `Attempts Left: {{ gameStore.attemptsLeft }}`.
          * [x] Apply glassmorphism style.
      * [x] **Genie and Speech Bubble Integration:**
          * [x] Place `<GenieSprite :expression="genieExpression" />`.
          * [x] Place `<SpeechBubble :message="genieMessage" />`.
          * [x] Define `genieExpression` and `genieMessage` reactive variables in `GameScreen.vue` to control Genie's state.
          * [x] Initialize Genie: `genieExpression = 'idle'`, `genieMessage = "I'm thinking of a number... Can you guess it?"`
      * [x] **"Make Your Guess" Section:**
          * [x] Use `NumberInput.vue` for the user's guess.
          * [x] Create a local reactive variable `userGuess`.
          * [x] Use `ActionButton.vue` for "Submit Guess".
          * [x] On "Submit Guess" click:
              * [x] Call `gameStore.makeGuess(userGuess.value)`.
              * [x] Clear `userGuess` input after submission.
      * [x] **"Give Up" Button:**
          * [x] Use `ActionButton.vue`.
          * [x] On `click`, call `gameStore.endGame(false)` (player loses by giving up).

  * **3.4 Update `gameStore.js` Actions & Getters for Game Screen**

      * [x] **`makeGuess(guess)` action:**
          * [x] Increment `attemptsUsed`.
          * [x] Decrement `attemptsLeft`.
          * [x] **Logic:**
              * If `guess === this.targetNumber`:
                  * Set `gameWon = true`.
                  * Call `this.endGame(true)`.
              * Else if `this.attemptsLeft <= 0`:
                  * Set `gameWon = false`.
                  * Call `this.endGame(false)`.
              * Else: (Guess is incorrect, game continues)
                  * Determine if `guess` is too high, too low, or "close" (e.g., within 5-10 numbers).
                  * Store this feedback in a temporary state variable (e.g., `lastGuessFeedback`) to be consumed by `GameScreen.vue`.
      * [x] **`endGame(won)` action:**
          * [x] Sets `this.gameWon = won`.
          * [x] Calls `this.addScoreToLeaderboard()` if `won` is true.
          * [x] Calls `this.saveLeaderboard()` to persist scores.
          * [x] Sets `this.currentScreen = 'ending'`.
      * [x] **`addScoreToLeaderboard()` action (Stub - fully implement in Phase 4):** Placeholder for now.
      * [x] **`saveLeaderboard()` action (Stub - fully implement in Phase 4):** Placeholder for now.
      * [x] **`genieFeedback` getter (or compute in `GameScreen.vue`):** Returns an object `{ expression, message }` based on `lastGuessFeedback`, `gameWon`, `attemptsLeft`, etc.
      * [x] **Initial Commit:** Commit Game Screen functionality (excluding full leaderboard save/load).

-----

### Phase 4: Ending Screen & Leaderboard (Estimated 3 Days)

**Goal:** Display game results, implement leaderboard logic, and enable game restart.

  * **4.1 Core `EndingScreen.vue` Structure**

      * [x] **Create `src/views/EndingScreen.vue`:**
          * Add basic `<template>`, `<script setup>`, and `<style scoped>` blocks.
      * [x] **Integrate `EndingScreen` into `App.vue`:**
          * Use `v-if` to conditionally render `EndingScreen` when `gameStore.currentScreen === 'ending'`.

  * **4.2 Leaderboard Component**

      * [x] **`src/components/LeaderboardTable.vue`:**
          * [x] Props: `leaderboardData` (array of objects), `selectedDifficulty` (string).
          * [x] Filter `leaderboardData` based on `selectedDifficulty` (or show 'All').
          * [x] Render a table with columns: `Rank`, `Name`, `Score`, `Attempts`.
          * [x] Use `v-for` to render rows.
          * [x] Apply styling for table, rows, and cells.
          * [x] **Optional GSAP:** Animate rows appearing or reordering.

  * **4.3 `EndingScreen.vue` Content & Logic**

      * [x] **Background:** Apply "outside castle, opposite view" image (`ending-game.png`) as background.
      * [x] **Game Outcome Message:**
          * [x] Display "Game Over" or "MYSTICAL NUMBER CASTLE" + "THE GENIE'S CHALLENGE".
          * [x] Conditionally display win/loss message:
              * If `gameStore.gameWon`: "Congratulations, {{ gameStore.playerName }}\! You guessed the number {{ gameStore.targetNumber }} in {{ gameStore.attemptsUsed }} attempts\!"
              * If not `gameStore.gameWon`: "Game Over. The number was {{ gameStore.targetNumber }}. Better luck next time\!"
          * [x] Apply appropriate styling (e.g., gold/yellow for win, red for loss).
      * [x] **Leaderboard Section:**
          * [x] Add "Leaderboard" title.
          * [x] **Difficulty Tabs:**
              * [x] Create local reactive `currentLeaderboardFilter: 'all'`.
              * [x] Use `v-for` to render "All", "Easy", "Medium", "Hard" buttons.
              * [x] Apply `active` class based on `currentLeaderboardFilter`.
              * [x] On click, update `currentLeaderboardFilter`.
          * [x] **Integrate `LeaderboardTable.vue`:**
              * [x] Pass `gameStore.leaderboard` (or a filtered version) to `leaderboardData`.
              * [x] Pass `currentLeaderboardFilter` to `selectedDifficulty`.
      * [x] **"Play Again" Button:**
          * [x] Use `ActionButton.vue`.
          * [x] On `click`, call `gameStore.setScreen('meeting')` to restart.

  * **4.4 Update `gameStore.js` Actions & Persistence**

      * [x] **`calculateScore()` utility function (`src/utils/scoreCalculator.js`):**
          * Takes `attemptsUsed`, `minRange`, `maxRange`, `difficulty`.
          * Returns a score (e.g., `(maxRange - minRange) / attemptsUsed * difficultyMultiplier`).
      * [x] **`addScoreToLeaderboard()` action:**
          * [x] Inside `endGame(true)`:
              * `const score = calculateScore(...)`
              * `this.leaderboard.push({ name: this.playerName, score, attempts: this.attemptsUsed, difficulty: this.difficulty })`
              * `this.leaderboard.sort((a, b) => b.score - a.score || a.attempts - b.attempts)` (Sort by score descending, then attempts ascending)
              * [x] Keep only top 10 scores (`this.leaderboard = this.leaderboard.slice(0, 10)`).
      * [x] **`saveLeaderboard()` action:**
          * [x] `localStorage.setItem('mysticalNumberCastleLeaderboard', JSON.stringify(this.leaderboard))`
      * [x] **`loadLeaderboard()` action:**
          * [x] `const storedLeaderboard = localStorage.getItem('mysticalNumberCastleLeaderboard')`
          * [x] `if (storedLeaderboard) { this.leaderboard = JSON.parse(storedLeaderboard); }`
      * [x] **Call `loadLeaderboard()` on App Initialization:** In `App.vue`'s `onMounted` hook, call `gameStore.loadLeaderboard()`.
      * [x] **Initial Commit:** Commit Ending Screen and Leaderboard functionality.

-----

### Phase 5: Polish, Animations & Responsiveness (Estimated 3+ Days)

**Goal:** Elevate the game's presentation, performance, and user experience.

  * **5.1 Global Screen Transitions & Visual Polish**

      * [ ] **Implement Vue `<Transition>` in `App.vue`:**
          * Wrap the screen components with `<Transition name="screen-fade-slide" mode="out-in">`.
          * Define CSS classes (`.screen-fade-slide-enter-active`, `.screen-fade-slide-leave-active`, etc.) for fade and slide animations.
          * **Optional GSAP Integration for Transitions:** Use GSAP directly within Vue transition hooks (`onBeforeEnter`, `onEnter`, `onLeave`) for more control and complex animations.
      * [ ] **Particle Effects (Stars):**
          * [ ] Add subtle twinkling stars in the background for all screens (can be done with CSS animations or simple JS/GSAP animating `opacity`).
          * [ ] Consider a subtle parallax effect for background layers.
      * [ ] **Glassmorphism Refinement:** Adjust blur, opacity, and borders for a polished look across all UI panels. Add subtle inner shadows or highlights.

  * **5.2 Enhance All Animations with GSAP**

      * [ ] **Genie Expression Transitions:** Fine-tune `GenieSprite.vue` animations for smoother and more expressive changes between states.
      * [ ] **Button Interactions:** Animate button presses with subtle scale or background color changes using GSAP.
      * [ ] **Input Field Focus:** Animate a subtle glow or border change on input focus.
      * [ ] **Speech Bubble Dynamics:** Make its appearance/disappearance more fluid, perhaps with a slight bounce.
      * [ ] **Leaderboard Entry Animations:** Animate individual rows fading in or sliding up when the leaderboard is displayed or updated.
      * [ ] **Game Win/Loss Celebration:** Add a short, impactful animation sequence (e.g., screen shake, flash, special genie animation) for win/loss conditions.

  * **5.3 Comprehensive Responsiveness**

      * [ ] **Extensive Testing:** Test on various screen sizes and orientations (desktop, tablet, mobile) using browser developer tools and actual devices if possible.
      * [ ] **Media Queries Review:** Adjust `font-size`, `padding`, `margin`, `flex-direction`, `grid-template-areas` in CSS for different breakpoints.
      * [ ] **Flexible Layouts:** Ensure components adapt gracefully to available space using `flexbox` or `grid`.
      * [ ] **Image Optimization:** Ensure images are served at appropriate resolutions and compressed to reduce load times.

  * **5.4 Error Handling & User Feedback**

      * [ ] **Input Validation Feedback:** Clear visual cues and messages for invalid name, min/max range, or non-numeric guesses.
      * [ ] **Edge Cases:** Test game behavior when attempts run out, guess is exactly `minRange`/`maxRange`, very small ranges, etc.
      * [ ] **Loading States:** If any assets take time to load (unlikely for this scale, but good practice), implement loading indicators.

  * **5.5 Accessibility (A11y)**

      * [ ] **Semantic HTML:** Use appropriate HTML tags (`<button>`, `<input>`, `<h1>`, `<table>`, `<tbody>`, `<thead>`, etc.).
      * [ ] **Image `alt` Text:** Provide descriptive `alt` attributes for all images (especially `genie-sprites` and backgrounds).
      * [ ] **Keyboard Navigation:** Ensure all interactive elements (buttons, inputs) are reachable and operable via keyboard (Tab, Enter, Space).
      * [ ] **Color Contrast:** Verify sufficient color contrast for text and important UI elements, especially against the glassmorphism backgrounds.

  * **5.6 Performance Optimization**

      * [ ] **Code Splitting (Vite handles much of this):** Ensure your build process is effectively splitting code to only load what's needed for the current screen.
      * [ ] **Bundle Analysis:** (Optional) Use a Vite plugin to analyze bundle size and identify large dependencies.
      * [ ] **Animation Optimization:** Ensure GSAP animations are targeting `transform` properties for hardware acceleration. Avoid animating `width`/`height`, `top`/`left` directly unless necessary.

  * **5.7 Testing & Final Review**

      * [ ] **Functional Testing:** Play through the game multiple times (win, lose, give up, different difficulties, different ranges).
      * [ ] **UI/UX Review:** Get feedback from others. Is it intuitive? Is it fun? Are there any confusing parts?
      * [ ] **Cross-Browser Testing:** Test on Chrome, Firefox, Safari, Edge.
      * [ ] **Bug Fixing:** Address any identified bugs or issues.

  * **5.8 Prepare for Deployment**

      * [ ] **Build Production Bundle:**
          * `npm run build`
      * [ ] **Test Production Build Locally:**
          * Use a local web server (e.g., `npm install -g serve`, then `serve dist`) to verify the built version works correctly.
      * [ ] **Deployment:** Deploy the `dist` folder to your chosen hosting provider (Netlify, Vercel, GitHub Pages, etc.).