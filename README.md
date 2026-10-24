# Random Joke Generator

A lightweight frontend app that fetches and displays random jokes from the external [JokeAPI](https://jokeapi.dev/).

## Requirements

- Node.js 20+ (or newer)

## Setup

```bash
npm install
```

## Development

Run the app locally:

```bash
npm run dev
```

Then open the local URL printed by Vite (usually `http://localhost:5173`).

## Build

```bash
npm run build
```

## Tests

```bash
npm test
```

## External API

This app uses JokeAPI at runtime:

- Endpoint: `https://v2.jokeapi.dev/joke/Any?safe-mode&type=single,twopart`
- Handles both supported response formats:
  - Single joke string (`joke`)
  - Two-part joke (`setup` + `delivery`)