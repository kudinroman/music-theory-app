import { createEvent, createStore, sample } from "effector";

export const play = createEvent();
export const stop = createEvent();

export const $isPlaying = createStore(false)
  .on(play, () => true)
  .on(stop, () => false);

export const player = (() => {
  const obj = { isPlaying: false };

  sample({
    clock: [$isPlaying],
    fn: (state) => state,
    target: createEvent(),
  }).watch((value) => {
    obj.isPlaying = value;
  });

  obj.play = () => play();
  obj.stop = () => stop();

  return obj;
})();
