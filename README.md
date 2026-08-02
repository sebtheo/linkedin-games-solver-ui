# LinkedIn Games Solver UI

Daily LinkedIn games solutions for Pinpoint, Queens, Zip, Tango, Crossclimb, and Mini Sudoku.

Built with **Next.js** (App Router, SSR/SSG) and deployed on Vercel at [solver.sebtheo.uk](https://solver.sebtheo.uk).

## Prerequisites

- Node.js 18+
- npm

## Setup

```bash
git clone https://github.com/sebtheo/linkedin-games-solver-ui.git
cd linkedin-games-solver-ui
make install
```

## Development

```bash
make run
```

Open [http://localhost:3000](http://localhost:3000).

## Backend API

```
https://linkedin-solver.sebtheo.uk/api
```

- `GET /solutions/` - today's solutions
- `GET /solutions/?date=DD-MM-YYYY` - solutions for a date
- `GET /dates/` - available dates

## SEO

The site generates server-rendered pages for:

- `/` - today's all-games hub
- `/[DD-MM-YYYY]` - all games for a date
- `/[DD-MM-YYYY]/[game]` - single-game answer
- `/archive` - full date archive
- `/games/[game]` - per-game hub with recent answers

Sitemap: `https://solver.sebtheo.uk/sitemap.xml`

### After deploying

1. Push to `main` (Vercel auto-deploys)
2. In [Google Search Console](https://search.google.com/search-console), submit `https://solver.sebtheo.uk/sitemap.xml`
3. Add a project link on [sebtheo.uk](https://sebtheo.uk) pointing to solver.sebtheo.uk (backlink for portfolio SEO)

## Related

- Scraper: [github.com/sebtheo/linkedin-games-scraper](https://github.com/sebtheo/linkedin-games-scraper)
- PyPI: [linkedin_games_scraper](https://pypi.org/project/linkedin_games_scraper/)
- Portfolio: [sebtheo.uk](https://sebtheo.uk)
