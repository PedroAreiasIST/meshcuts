import test from "node:test";
import assert from "node:assert/strict";

import { fetchRandomJoke, getDisplayJoke } from "../src/joke.js";

test("getDisplayJoke supports single joke format", () => {
  const result = getDisplayJoke({ joke: "Just one line." });
  assert.deepEqual(result, { setup: "Just one line.", delivery: "" });
});

test("getDisplayJoke supports setup and delivery format", () => {
  const result = getDisplayJoke({
    setup: "Knock knock.",
    delivery: "Who's there?",
  });
  assert.deepEqual(result, { setup: "Knock knock.", delivery: "Who's there?" });
});

test("fetchRandomJoke rejects unsupported payload", async () => {
  await assert.rejects(
    () =>
      fetchRandomJoke(async () => ({
        ok: true,
        json: async () => ({ value: "missing expected fields" }),
      })),
    /Unexpected joke response format/,
  );
});
