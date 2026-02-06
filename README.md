# Cyberpunk Portfolio

This is a static portfolio website featuring a cyberpunk/hacker theme.

## Features
- **Visual Effects**: Matrix rain, Pixel grid, CRT scanlines, Glitch text.
- **Boot Sequence**: Simulated OS boot loader.
- **Dynamic Content**: Skills, Certifications, and Projects rendered from JavaScript data.
- **Responsive Design**: Fully responsive layout using Tailwind CSS.

## How to Run

Since this is a static HTML/JS website, you can run it simply by opening `index.html` in your web browser.

For a better development experience (e.g. to avoid CORS issues if you expand functionality), you can serve it with a local server:

### Python
```bash
python3 -m http.server
```
Then visit `http://localhost:8000`.

### Node.js (http-server)
```bash
npx http-server .
```

## Structure
- `index.html`: The main entry point containing structure and styles.
- `script.js`: Contains all logic, visual effects engines, and portfolio data.
