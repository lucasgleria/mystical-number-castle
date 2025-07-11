Okay, let's break down the development process into a detailed, step-by-step plan, integrating the game flow, design improvements, and technical choices. This plan assumes you'll use a modern JavaScript framework like **Vue.js** for its approachability and excellent reactivity for UI, combined with **GSAP** for rich animations, and **Vite** for a fast development experience.

**Project Name:** Mystical Number Castle

-----

## Step-by-Step Development Plan

### Phase 1: Project Setup & Core Structure (Days 1-3)

**Goal:** Get the development environment ready and establish the foundational structure of the game.

1.  **Initialize Project with Vite & Vue.js:**

      * Open your terminal/command prompt.
      * `npm create vite@latest mystical-number-castle -- --template vue`
      * `cd mystical-number-castle`
      * `npm install`
      * `npm install gsap` (Install GreenSock Animation Platform)
      * `npm install sass` (For advanced CSS features and easier styling)
      * `npm run dev` (Verify the development server is running).

2.  **Basic File Structure & Git Initialization:**

      * Initialize Git: `git init`
      * Create `.gitignore` (add `node_modules/`, `.env`, etc.)
      * Organize `src` directory:
        ```
        src/
        ├── assets/
        │   ├── images/ (for your castle, genie sprites, etc.)
        │   └── fonts/ (if custom fonts are used)
        ├── components/ (reusable UI components like buttons, inputs)
        ├── views/ (main screen components like MeetingScreen, GameScreen, EndingScreen)
        ├── stores/ (for Vuex/Pinia, or simple state management if not using a dedicated store)
        ├── utils/ (helper functions: number generation, score calculation)
        ├── App.vue (main application component)
        └── main.js (Vue app entry point)
        ```
      * Create `public/` folder for static assets if needed (e.g., `index.html`).

3.  **Define Global Styles & Color Palette (SCSS):**

      * In `src/assets/styles/` (create this folder if it doesn't exist):
          * Create `_variables.scss` for your color palette (purple, blue, pink, gold, white).
          * Create `_base.scss` for global resets, font imports, and basic body/html styles.
          * Create `main.scss` that imports variables and base styles, then potentially component-specific styles.
      * Import `main.scss` into `main.js` or `App.vue`.
      * Implement the background gradient (purple to pink) as seen in your `pallete.png` for the `body` or `App.vue` container.

4.  **Game State Management (Centralized Store - Pinia recommended for Vue 3):**

      * Install Pinia: `npm install pinia`
      * In `src/main.js`, configure Pinia:
        ```javascript
        import { createApp } from 'vue'
        import { createPinia } from 'pinia'
        import App from './App.vue'
        import './assets/styles/main.scss' // Your global styles

        const app = createApp(App)
        app.use(createPinia())
        app.mount('#app')
        ```
      * In `src/stores/gameStore.js`, define your core game state:
        ```javascript
        import { defineStore } from 'pinia'

        export const useGameStore = defineStore('game', {
            state: () => ({
                currentScreen: 'meeting', // 'meeting', 'game', 'ending'
                playerName: '',
                minRange: 1,
                maxRange: 100,
                difficulty: null, // 'easy', 'medium', 'hard'
                targetNumber: null,
                attemptsUsed: 0,
                attemptsLeft: 0,
                maxAttempts: { easy: Infinity, medium: 20, hard: 10 }, // Example values
                leaderboard: [], // Array of { name, score, attempts, difficulty }
            }),
            actions: {
                // Actions to update state
                setScreen(screen) { this.currentScreen = screen; },
                setPlayerName(name) { this.playerName = name; },
                setRange(min, max) { this.minRange = min; this.maxRange = max; },
                setDifficulty(difficulty) { this.difficulty = difficulty; this.attemptsLeft = this.maxAttempts[difficulty]; },
                startGame() {
                    this.targetNumber = Math.floor(Math.random() * (this.maxRange - this.minRange + 1)) + this.minRange;
                    this.attemptsUsed = 0;
                    this.setScreen('game');
                },
                makeGuess() {
                    this.attemptsUsed++;
                    this.attemptsLeft--;
                    // Logic to check guess and update state based on outcome
                },
                endGame(won = false) {
                    // Calculate score, add to leaderboard, save to local storage
                    this.setScreen('ending');
                }
                // ... more actions for leaderboard management
            },
            getters: {
                // Getters for computed state
                // ...
            }
        })
        ```

### Phase 2: Meeting Screen Development (Days 4-6)

**Goal:** Fully implement the Meeting Screen with all inputs, difficulty selection, and "Begin Adventure" functionality.

1.  **`MeetingScreen.vue` Component:**

      * Create `src/views/MeetingScreen.vue`.
      * Import `useGameStore` to interact with global state.
      * **Background & Title:** Place the castle image (`meeting-screen.png`) as a background or within a container. Add the "MYSTICAL NUMBER CASTLE" title.
      * **"Your Magical Identity" Section:**
          * Text input for `playerName` (bind with `v-model`).
          * Add a character counter (`0/20`).
      * **"Set Your Number Range" Section:**
          * Number inputs for `minRange` and `maxRange` (bind with `v-model`).
          * Display "Current range: X to Y (Z numbers)".
          * Add validation (e.g., min \< max, numbers only).
      * **"Select Difficulty" Buttons:**
          * Three buttons ("Easy", "Medium", "Hard").
          * Apply `active` class when a difficulty is selected (use `v-bind:class` and `v-model` for selection).
          * When clicked, update `gameStore.difficulty`.
      * **"Begin Adventure" Button:**
          * Disabled until `playerName`, `minRange`, `maxRange`, and `difficulty` are valid.
          * On click, call `gameStore.startGame()`.

2.  **Reusable UI Components:**

      * Create `src/components/TextInput.vue` (for player name).
      * Create `src/components/NumberInput.vue` (for min/max range).
      * Create `src/components/ActionButton.vue` (for "Begin Adventure", "Submit Guess", "Give Up", "Play Again"). Style this to reflect the golden/orange buttons in your designs.
      * Create `src/components/DifficultyButton.vue` (for Easy/Medium/Hard, handling active states).
      * Apply glassmorphism styles to these components.

3.  **Initial Styling and Responsiveness:**

      * Style all elements in `MeetingScreen.vue` and its child components using SCSS.
      * Apply your color palette.
      * Start implementing basic CSS media queries to ensure the layout is responsive on smaller screens.

### Phase 3: Game Screen Development (Days 7-10)

**Goal:** Build the core gameplay loop with the Genie, guess input, feedback, and attempt tracking.

1.  **`GameScreen.vue` Component:**
      * Create `src/views/GameScreen.vue`.
      * Import `useGameStore`.
      * **Background:** Use a darker, "inside castle" background. This could be a subtly different image or just CSS adjustments to `meeting-screen.png`.
      * **Adventurer's Quest Panel:**
          * Display `gameStore.currentRange`, `gameStore.attemptsUsed`, `gameStore.attemptsLeft`.
          * Style with glassmorphism.
      * **Genie Component (`GenieSprite.vue`):**
          * Create `src/components/GenieSprite.vue`.
          * This component will receive a prop `expression` (e.g., 'idle', 'thinking', 'correct', 'tooHigh', 'tooLow', 'close', 'sad').
          * Use `v-if` or dynamic `src` attributes to swap between genie sprite images from `genie-sprites.png` based on the `expression` prop.
          * **GSAP Animation:** Implement subtle idle animations for the genie using GSAP (e.g., gentle floating, eye blinks). When the `expression` prop changes, use GSAP to animate transitions between expressions (e.g., a quick scale down/up or fade).
      * **Speech Bubble Component:**
          * Create `src/components/SpeechBubble.vue`.
          * Takes a `message` prop.
          * Style the speech bubble, position it relative to the genie.
          * Use GSAP to animate the speech bubble appearing/disappearing.
      * **"Make Your Guess" Section:**
          * `NumberInput` for the guess.
          * `ActionButton` for "Submit Guess".
          * On "Submit Guess":
              * Call `gameStore.makeGuess()`.
              * Implement guess checking logic in `gameStore` (or a `utils` helper).
              * Update the `GenieSprite`'s `expression` and the `SpeechBubble`'s `message` based on guess outcome (correct, too high, too low, close).
              * Check for win/loss conditions. If win/loss, call `gameStore.endGame()`.
      * **"Give Up" Button:**
          * `ActionButton` for "Give Up".
          * On click, call `gameStore.endGame(false)`.

### Phase 4: Ending Screen & Leaderboard (Days 11-13)

**Goal:** Display game results, the leaderboard, and allow playing again.

1.  **`EndingScreen.vue` Component:**

      * Create `src/views/EndingScreen.vue`.
      * Import `useGameStore`.
      * **Background:** Use the "outside castle, opposite view" image (`ending-game.png`) as a background. Enhance it with subtle animations (twinkling stars via CSS/GSAP).
      * **Game Over/Win Message:**
          * Conditionally display "Game Over" or "Congratulations\!" messages based on game outcome (passed via store or computed property).
          * Include the target number and player's stats (name, attempts).
      * **Leaderboard Section:**
          * **"Leaderboard" Title.**
          * **Difficulty Tabs:** "All", "Easy", "Medium", "Hard" (use `v-for` and `v-bind:class` for active state). On click, filter the `gameStore.leaderboard` data.
          * **Table:** Display Rank, Name, Score, Attempts.
              * Populate with data from `gameStore.leaderboard`.
              * Sort the leaderboard data by score, then attempts.
              * Use GSAP to animate new entries sliding in or existing entries reordering if the leaderboard is dynamic.
      * **"Play Again" Button:**
          * `ActionButton`.
          * On click, call `gameStore.setScreen('meeting')` to restart the game flow.

2.  **Leaderboard Logic & Persistence (`gameStore.js` & `utils/`):**

      * In `gameStore.js`:
          * Implement `addScoreToLeaderboard()` action. This action will calculate the score (e.g., `(maxRange - minRange) / attemptsUsed * (difficultyMultiplier)`), create a leaderboard entry object, add it to `this.leaderboard`, and sort the array.
          * Implement `saveLeaderboard()` action/function (to `localStorage`).
          * Implement `loadLeaderboard()` action/function (from `localStorage`). Call this on app startup (e.g., in `App.vue`'s `onMounted` hook).
      * In `src/utils/scoreCalculator.js`: A helper function to encapsulate complex score calculation logic.

### Phase 5: Polish, Animations & Responsiveness (Days 14-16+)

**Goal:** Refine the user experience with smooth animations, comprehensive responsiveness, and final touches.

1.  **Global Screen Transitions:**

      * In `App.vue`, use Vue's `<Transition>` component with GSAP for smooth fading or sliding animations when `gameStore.currentScreen` changes. This will make the screen changes feel fluid.
      * Example using GSAP with Vue Transitions: Look up Vue's `v-enter`, `v-leave` hooks or GSAP's `transition` integration for Vue.

2.  **Enhance All Animations with GSAP:**

      * **UI Element Interactions:** Animate button presses, input field focus, and selection states.
      * **Backgrounds:** Subtle parallax scrolling effects for background layers (if applicable), twinkling stars, floating particles.
      * **Text Animations:** Animate text appearing (e.g., `gsap.from` for titles, character by character).
      * **Genie:** More detailed emotional transitions.

3.  **Comprehensive Responsiveness:**

      * Review all screens and components on various device sizes using browser developer tools.
      * Adjust `font-size`, `padding`, `margin`, `flexbox` / `grid` layouts with media queries to ensure optimal presentation on all screens.
      * Consider responsive image techniques (e.g., `srcset`).

4.  **Error Handling & Edge Cases:**

      * What if the user enters invalid range numbers?
      * What if local storage is full or disabled?
      * Clear feedback messages for all user actions.

5.  **Performance Optimization:**

      * Optimize image sizes (compress and serve appropriate resolutions).
      * Lazy load non-critical assets.
      * Minimize DOM manipulations (Vue helps with this naturally).
      * Ensure GSAP animations are performant (e.g., use `transform` properties for animations where possible, as they are GPU-accelerated).

6.  **Accessibility (A11y):**

      * Ensure proper `alt` text for images.
      * Use semantic HTML.
      * Ensure keyboard navigation is possible for all interactive elements.

7.  **Testing:**

      * Manual testing across different browsers and devices.
      * Consider unit tests for core game logic (score calculation, number generation).

8.  **Deployment:**

      * Build for production: `npm run build`.
      * Deploy the `dist` folder to a hosting service (e.g., Netlify, Vercel, GitHub Pages).

-----

This step-by-step plan provides a robust framework. Remember to commit your code regularly with meaningful messages\! Good luck with your Mystical Number Castle game\!