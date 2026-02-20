# Portfolio — Next.js + Tailwind + TypeScript

## Colour Palette

| Token         | Hex       | Usage                          |
|---------------|-----------|-------------------------------|
| `--pink`      | `#ffa3ca` | Accents, links, year tags      |
| `--red`       | `#d31412` | Nav links, hover states        |
| `--green-dark`| `#285d3f` | Body text, backgrounds         |
| `--green-light`| `#7bbcb0`| Labels, secondary text         |
| `--cream`     | `#f5f0e8` | Page background, card surface  |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Images

Place your project images in `/public/images/`. The cards expect these filenames:

```
/public/images/project-bloom.jpg
/public/images/project-meridian.jpg
/public/images/project-solstice.jpg
/public/images/project-verdant.jpg
/public/images/project-carmine.jpg
```

**Why `/public/images/`?**  
For a personal portfolio with a small, known set of images, keeping them in `/public` is the right call — they're served as static assets directly by Vercel's CDN with zero configuration. No external object storage needed. If your portfolio grows to dozens of project images or you need user-uploaded content, migrate to **Vercel Blob** or **Cloudinary** at that point.

Recommended image size: **800×800px** (square, 1:1) at ~150–250KB. Convert to `.webp` for best performance:
```bash
# Using ImageMagick
convert input.jpg -resize 800x800^ -gravity center -extent 800x800 -quality 82 output.webp
```
Then update the `imageSrc` paths in `app/page.tsx` to `.webp`.

---

## Customising Content

Edit the `projects` array in `app/page.tsx` to add your real projects:

```ts
const projects = [
  {
    name: "Your Project",
    year: "2024",
    tag: "Category",
    imageSrc: "/images/your-image.jpg",
    imageAlt: "Description",
  },
  // ...
];
```

Change the name ("Jane Doe") and bio paragraph directly in `app/page.tsx`.

---

## Deploying to Vercel

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "init"
gh repo create my-portfolio --public --push
# or push to an existing repo
```

### 2. Import on Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"** and select your repo
3. Framework preset will auto-detect **Next.js** — leave all defaults
4. Click **Deploy**

Vercel will give you a URL like `my-portfolio.vercel.app`.

### 3. Connect Your Custom Domain

1. In your Vercel project, go to **Settings → Domains**
2. Type your domain (e.g. `janedoe.com`) and click **Add**
3. Vercel will show you DNS records to add. You have two options:

**Option A — Apex domain (`janedoe.com`)**  
Add an **A record** at your DNS provider:
```
Type:  A
Name:  @ (or leave blank)
Value: 76.76.21.21
```

**Option B — Subdomain (`www.janedoe.com` or `portfolio.janedoe.com`)**  
Add a **CNAME record**:
```
Type:  CNAME
Name:  www (or portfolio)
Value: cname.vercel-dns.com
```

4. DNS propagation takes a few minutes to ~24h depending on your registrar (usually fast with Cloudflare, Namecheap, etc.)
5. Once verified, Vercel auto-provisions an **SSL certificate** — no extra steps needed.

> **Tip:** If you use Cloudflare for DNS, set the proxy status to **DNS only** (grey cloud) for the Vercel record initially, then re-enable proxying after it's verified if you want Cloudflare's CDN on top.

---

## File Structure

```
portfolio/
├── app/
│   ├── globals.css        # CSS variables, card flip styles, font imports
│   ├── layout.tsx         # Root layout + metadata
│   └── page.tsx           # Main page (hero, intro, project cards)
├── components/
│   ├── P5Hero.tsx         # Client-side p5.js sketch
│   └── ProjectCard.tsx    # Flip card component
├── public/
│   └── images/            # ← Put your project images here
├── tailwind.config.ts
├── next.config.js
└── tsconfig.json
```
