import { createApp, ref } from "vue";

import loader from "./Loader.vue";

declare const window;

const isLoading = ref(false);

let timeout;
const startGlobalSpinner = (): void => {
  window.clearTimeout(timeout);
  isLoading.value = true;
};

const finishGlobalSpinner = (): void => {
  window.clearTimeout(timeout);
  timeout = window.setTimeout(() => {
    isLoading.value = false;
  }, 300);
};

const createGlobalLoader = (): void => {
  window["loading"] = createApp(loader, {
    isLoading: isLoading
  }).mount("#loading");
};

const asyncGlobalSpinner = async (
  ...promises: Promise<unknown>[]
): Promise<unknown> => {
  startGlobalSpinner();
  let results;
  try {
    results = await Promise.all(promises);
  } catch (e) {
    console.error("[asyncGlobalSpinner]: request error", e);
    finishGlobalSpinner();
    throw new Error(e);
  }
  finishGlobalSpinner();

  return results;
};


export {
  asyncGlobalSpinner,
  createGlobalLoader,
  finishGlobalSpinner,
  startGlobalSpinner,
};
