import "./styles.css";
import { fetchRandomJoke } from "./joke.js";

const statusNode = document.querySelector("#status");
const setupNode = document.querySelector("#joke-setup");
const deliveryNode = document.querySelector("#joke-delivery");
const buttonNode = document.querySelector("#fetch-joke");

function setLoadingState(isLoading) {
  buttonNode.disabled = isLoading;
  buttonNode.setAttribute("aria-busy", String(isLoading));
}

function showStatus(message, isError = false) {
  statusNode.textContent = message;
  statusNode.classList.toggle("error", isError);
}

function showJoke({ setup, delivery }) {
  setupNode.textContent = setup;
  deliveryNode.textContent = delivery;
}

async function loadJoke() {
  setLoadingState(true);
  showStatus("Loading a fresh joke...");
  showJoke({ setup: "", delivery: "" });

  try {
    const joke = await fetchRandomJoke();
    showStatus("");
    showJoke(joke);
  } catch (error) {
    showStatus(
      `Could not load a joke right now. Please try again. (${error.message})`,
      true,
    );
  } finally {
    setLoadingState(false);
  }
}

buttonNode.addEventListener("click", loadJoke);
loadJoke();
