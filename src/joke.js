const JOKE_API_URL =
  "https://v2.jokeapi.dev/joke/Any?safe-mode&type=single,twopart";

export function getDisplayJoke(payload) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  if (typeof payload.joke === "string" && payload.joke.trim()) {
    return { setup: payload.joke.trim(), delivery: "" };
  }

  const setup = typeof payload.setup === "string" ? payload.setup.trim() : "";
  const delivery =
    typeof payload.delivery === "string" ? payload.delivery.trim() : "";

  if (setup && delivery) {
    return { setup, delivery };
  }

  return null;
}

export async function fetchRandomJoke(fetchImpl = fetch) {
  const response = await fetchImpl(JOKE_API_URL, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const payload = await response.json();

  if (payload?.error) {
    throw new Error("Joke API returned an error");
  }

  const joke = getDisplayJoke(payload);
  if (!joke) {
    throw new Error("Unexpected joke response format");
  }

  return joke;
}
