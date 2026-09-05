# Noah Portfolio — Split Home V2

Updated desktop interaction inspired by the work rail behavior discussed from ooze.design.

## What changed in V2

- Left work rail scrolls independently from the right detail panel.
- Brand/profile card stays visually fixed above the work browser.
- Work cards use a normal continuous vertical flow instead of sticky stacking.
- Bottom of the work browser now has a progressive depth field:
  - subtle blur
  - medium blur
  - stronger blur
  - white fade into the page background
- A CSS mask softens the last portion of the list so cards disappear gradually instead of clipping abruptly.
- Clicking a work still swaps the right-hand detail panel without navigating away.
- Mobile/tablet disables the desktop blur field and switches back to a clean responsive grid/list.

## Run

```bash
npm install
npm run dev
```

Open the local URL Vite prints, usually `http://localhost:5173`.

## Main files

- `src/App.tsx`
- `src/styles.css`
