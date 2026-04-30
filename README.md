# 🎭 MemeForge

A professional meme generator built with **React**, **Tailwind CSS**, and the **Canvas API**.

## Features

- 🖼 12 pre-built popular meme templates
- 📁 Upload your own images (PNG, JPG, GIF, WebP)
- ✍️ Customise top & bottom text
- 🎨 9 font families including Impact & Bebas Neue
- 🎨 Full text color + outline color pickers
- **Bold**, *Italic*, UPPERCASE toggles
- Left / Center / Right text alignment
- Font size & stroke width sliders
- 4 text position modes (Top & Bottom, Top Only, Bottom Only, Center)
- Auto text wrapping for long strings
- 😂 24 quick-add emoji stickers
- ⬇️ Download as PNG
- ⎘ Copy to clipboard
- Toast notifications
- Responsive layout

## Tech Stack

- **React 18** — UI & state
- **Tailwind CSS v3** — Styling
- **HTML5 Canvas API** — Image + text rendering
- **Vite** — Build tool
- **Lucide React** — Icons
- **clsx** — Conditional class names

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open http://localhost:5173
```

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
meme-forge/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx              # Entry point
    ├── App.jsx               # Root component
    ├── index.css             # Tailwind directives + global styles
    ├── constants/
    │   └── templates.js      # Meme templates, fonts, colors, stickers
    ├── hooks/
    │   ├── useMemeCanvas.js  # Canvas drawing logic
    │   └── useToast.js       # Toast notification system
    └── components/
        ├── Header.jsx        # Top navigation bar
        ├── CanvasPreview.jsx # Canvas display + download toolbar
        ├── TemplateGrid.jsx  # Template picker + upload tab
        ├── TextControls.jsx  # All text styling controls
        ├── StickerPanel.jsx  # Emoji sticker grid
        └── Toast.jsx         # Toast notification component
```

## Adding Supabase (Optional)

To persist memes and add a public gallery:

```bash
npm install @supabase/supabase-js
```

```js
// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

**Schema:**
```sql
create table memes (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp default now(),
  image_url text not null,
  top_text text,
  bottom_text text,
  template_id text
);
```

**Upload meme to Supabase Storage:**
```js
canvas.toBlob(async (blob) => {
  const { data } = await supabase.storage
    .from('memes')
    .upload(`meme-${Date.now()}.png`, blob)
  
  await supabase.from('memes').insert({
    image_url: data.path,
    top_text: settings.topText,
    bottom_text: settings.bottomText,
  })
})
```
