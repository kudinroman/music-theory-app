import { createEvent, createStore, combine } from "effector";

const play = createEvent();
const stop = createEvent();

const $isPlaying = createStore(false)
  .on(play, () => true)
  .on(stop, () => false);

export const actions = {
  play,
  stop,
};

export const stores = {
  $isPlaying,
};

export const store = combine(stores);
