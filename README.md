# Pratiksha's Imposter Game 🎭

One secret word. One sneaky imposter. Can you find them?

A pass-the-phone party game for **3–8 players** on a single device. Built with React, Vite, Tailwind CSS, Lucide icons, Framer Motion and Canvas Confetti. Works on Android, iPhone, Windows and any desktop browser.

## How the game works

1. Everyone gets the **same secret word**, except the imposter, who gets a **different but related word** (e.g. everyone: *Apple*, imposter: *Mango*).
2. The phone is passed around. Each player privately reveals their own word and hides it again.
3. Everyone gives one clue about their word. The imposter tries to blend in.
4. Everyone votes in secret (again passing the phone). Votes stay hidden until all are in.
5. The imposter is revealed. If the group accuses the right player(s), the group wins. **A tie means the imposter slips away.**

With 2 imposters (needs 5+ players) the group accuses the two top vote-getters and wins only if **both** are imposters.

---

## Running it on Windows (beginner-friendly)

### Prerequisites

1. Install **Node.js (LTS version)** from <https://nodejs.org> - keep the default options in the installer.
2. Install **Visual Studio Code** from <https://code.visualstudio.com>.

To check Node installed correctly, open Command Prompt and run `node -v`. You should see a version number.

### Step 1 - Open the project in VS Code
Extract `pratiksha-imposter-game.zip`. In VS Code choose **File → Open Folder…** and select the extracted `pratiksha-imposter-game` folder (the one that contains `package.json`).

### Step 2 - Open the terminal
In VS Code choose **Terminal → New Terminal**.

### Step 3 - Install the dependencies (only needed once)
```
npm install
```
This downloads the libraries into a `node_modules` folder. It needs an internet connection and can take a minute or two.

### Step 4 - Start the game
```
npm run dev
```

### Step 5 - Open it
The terminal prints something like:
```
  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.23:5173/
```
Hold **Ctrl** and click the `Local` link, or paste it into your browser.

### Stopping the server
Click in the terminal and press **Ctrl + C** (answer `Y` if Windows asks to terminate the batch job).

---

## Playing on your phone (same Wi-Fi)

1. Connect your phone and your laptop to the **same Wi-Fi network**.
2. Run `npm run dev` on the laptop.
3. On your phone's browser, type the **Network** address from the terminal (for example `http://192.168.1.23:5173`).
4. If it does not load, Windows Firewall may be blocking Node.js. When Windows shows *"Allow Node.js to communicate on private networks"*, click **Allow access**. (Some public / guest Wi-Fi networks block device-to-device traffic - use your home network or a phone hotspot.)

Tip: on iPhone use *Share → Add to Home Screen*, on Android use *⋮ → Add to Home screen* to get a full-screen app feel.

---

## Making a production build

```
npm run build
```
The optimised site is created in the `dist` folder. To preview it locally:
```
npm run preview
```

## Deploying to Vercel (free)

**Option A - with GitHub (easiest)**
1. Create a free account at <https://vercel.com>.
2. Push this folder to a new GitHub repository (the `.gitignore` already skips `node_modules` and `dist`).
3. In Vercel click **Add New → Project**, import the repository.
4. Vercel detects Vite automatically (Build command `npm run build`, Output directory `dist`). Click **Deploy**.

**Option B - with the Vercel CLI**
```
npm install -g vercel
vercel
```
Answer the prompts (accept the defaults). Use `vercel --prod` to publish to your production URL.

---

## Running the automated checks

```
npm test
```
Verifies the word database (1000+ unique pairs, all 20 categories) and the game logic (role assignment for 3–8 players with 1 or 2 imposters, voting, ties, recent-pair avoidance, name validation).

## Settings

| Setting | What it does |
| --- | --- |
| Imposters | 1 or 2 (2 needs 5+ players) |
| Discussion timer | Off / 30s / 60s / 90s / 2 min |
| Sound | Small beeps and fanfares (generated in the browser, no audio files) |
| Category hints | Shows the word's category (e.g. *Fruits*) with the secret word. Both words are always in the same category, so it never gives the imposter away. |

Settings are remembered in your browser. **Secret words and roles are never saved** - they only exist in memory during a round.

## Privacy features during word reveal

- Each player sees only their own word; handover screens never contain a word or a role.
- The word is hidden when you tap **HIDE WORD**, after 10 seconds, when the browser tab/app loses focus, and the instant you tap **NEXT PLAYER**.
- Nobody is told whether they are the imposter.
- Repeat taps are ignored so a double tap can't skip a player or cast a vote twice.

## Project structure

```
src/
  components/   Header, HomeScreen, PlayerSetup, HandoverScreen, PlayerReveal,
                DiscussionScreen, VotingScreen, ResultsScreen, Settings, ui
  data/         wordPairs.js   (1300+ word pairs in 20 categories)
  hooks/        useGame.js     (game state machine)
  utils/        gameLogic.js   (pure game rules), sound.js
  App.jsx  main.jsx  index.css
scripts/        selftest.mjs
```

## Adding your own words

Open `src/data/wordPairs.js` and add a line to the `RAW` list:
```js
["Samosa", "Kachori", "food"],
```
The third value must be one of the category keys at the top of the file. Keep both words familiar and closely related.

## Troubleshooting

- **`npm` is not recognized** - restart VS Code (or the computer) after installing Node.js.
- **Port already in use** - Vite automatically picks the next port; use the URL it prints.
- **PowerShell says scripts are disabled** - in the VS Code terminal dropdown choose **Command Prompt** instead of PowerShell.
- **Fonts look different offline** - the fun fonts (Fredoka, Nunito) load from Google Fonts; offline the game falls back to your system font.
