# LinkedIn Game Solver UI

This is the UI for the LinkedIn Game Solver. It uses Vite and Tailwind CSS and is hosted on Vercel. It makes use of Vercel analytics to track usage.

## Development

```bash
npm install
npm run dev
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
