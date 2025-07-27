# Tistory Post Card

Generate beautiful SVG cards for the latest post from any Tistory blog, perfect for embedding in your README, profile, or website.

## Features

- Fetches the latest post from a Tistory blog via **RSS**.
- Renders a stylish SVG card with:
  - Blog title and description
  - Post title
  - Up to 5 tags
  - Tistory logo and custom styles
  - **Theme support**: light, dark, or auto (follows user's browser preference)
- Simple REST API, deployable on Vercel or any Node.js server.

## Demo

```
GET /api/post?name={tistory_blog_name}
```

Returns an SVG card for the latest post of the given Tistory blog.

Example:

```
GET /api/post?name=your-blog-name
```

## Example Output

[![example card](https://tistory-post-card.vercel.app/api/post?name=iot624)](https://iot624.tistory.com)

## Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- npm

### Installation

```bash
git clone https://github.com/yourusername/tistory-post-card.git
cd tistory-post-card
npm install
```

### Running Locally

```bash
npm start
```

The server will start on [http://localhost:8000](http://localhost:8000).

### API Endpoints

- `GET /api/post?name={tistory_blog_name}&theme={theme}`  
  Returns an SVG card for the latest post of the specified Tistory blog.
  - `theme` (optional): `light`, `dark`, or `auto` (default: `auto`).
    - `auto`: The card automatically adapts to the user's browser dark mode setting using CSS media queries.
    - `dark`: Forces dark mode (white text).
    - `light`: Forces light mode (black text).

## Theme Support

You can control the color theme of the SVG card using the `theme` query parameter:

- `theme=auto` (default): The card will automatically detect and follow the user's browser dark mode preference. Text and tag colors will switch between black and white accordingly.
- `theme=dark`: The card will always use dark mode (white text).
- `theme=light`: The card will always use light mode (black text).

**Example:**

```
GET /api/post?name=your-blog-name&theme=auto
GET /api/post?name=your-blog-name&theme=dark
GET /api/post?name=your-blog-name&theme=light
```

## Project Structure

```
.
├── api/
│   ├── index.js      # Express server entry point
│   └── routes.js     # API route definitions
├── templates/
│   └── card.js       # SVG card template logic
├── utils/
│   ├── rss.js        # RSS parsing logic
│   └── string.js     # String utility functions
├── package.json
└── vercel.json       # (Optional) Vercel deployment config
```

## Deployment

This project is ready to deploy on [Vercel](https://vercel.com/) out of the box.  
Just import your repository and set the root directory.

## Dependencies

- [express](https://www.npmjs.com/package/express)
- [rss-parser](https://www.npmjs.com/package/rss-parser)
