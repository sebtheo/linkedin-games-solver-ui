# LinkedIn Games Solver UI

This UI displays the answers from this open-source scraper:

Repository:
> https://github.com/sebtheo/linkedin-games-scraper

PyPI:
> https://pypi.org/project/linkedin-games-scraper

This is the UI for the LinkedIn Game Solver. It uses Vite and Tailwind CSS and is hosted on Vercel. It makes use of Vercel analytics to track usage.

## Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)

## Setup

1. Clone the repository:

```bash
git clone https://github.com/sebtheo/linkedin-game-solver-ui.git
cd linkedin-game-solver-ui
```

2. Install dependencies:

```bash
make install
```

## Development

### Using npm scripts

```bash
make run
```

Access the app at `http://localhost:5173`.

## Backend API

The backend API is in a separate private repository but you can access the data for free at the API endpoint.

```
https://linkedin-solver.sebtheo.uk
```

### Fetching today's solutions:

```
https://linkedin-solver.sebtheo.uk/api/solutions
```

Response:

```json
{
  "solutions": {
    "data": {
      "pinpoint": "Hebrew letters",
      "crossclimb": [[0, "CAPE"]], // The first number is the row, the second is the answer
      "zip": [29, 35], // Where the numbers are on the grid
      "zip_sequence": [29, 34], // The sequence for the correct answer
      "zip_grid": 6, // The grid size
      "queens": [[0, 1]], // The first number is the row, the second is the column
      "queens_board": [[0, 0, 0, 0, 0, 0, 0, 0]], // Lists of where the colours are on the grid
      "queens_grid": 8, // The grid size
      "tango": "011001110010100101001101011010100110" // Tango is always 6x6 grid so start at the top left and go row by row 0 = sun 1 = moon
    }
  },
  "date": "16-05-2025" // The date of the solutions
}
```

### Fetching solutions for a specific date:

```
https://linkedin-solver.sebtheo.uk/api/solutions/?date=2024-01-01
```

Response:

Same as above for fetching today's solutions.

### Fetching the available dates:

```
https://linkedin-solver.sebtheo.uk/api/dates
```

Response:

```json
{
  "dates": ["16-05-2025", "15-05-2025"]
}
```

## Code Quality

### Linting

The project uses ESLint for code quality checks. Run linting with:

```bash
make lint
```

### Code Formatting

To format your code consistently, install Prettier and run:

```bash
npm install --save-dev prettier
make format
```

## Deployment

The application is automatically deployed to Vercel when changes are pushed to the main branch.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `make lint` to ensure code quality
5. Run `make format` to format your code
6. Submit a pull request
