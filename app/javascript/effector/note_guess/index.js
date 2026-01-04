import {
  createStore,
  createEvent,
  createEffect,
  sample,
  combine,
} from "effector";
import { shuffle, keys } from "lodash";

import { NOTE_LOCALES } from "../shared/note_locales";
import { randomDuration } from "../shared/durations";
import { generateAllNotesLocalized } from "../shared/generateAllNotesLocalized";
import { toAbc } from "../shared/to_abc";
import { getClef } from "../shared/getClef";

const ALL_NOTES = Object.keys(generateAllNotesLocalized("ru"));

export const startGame = createEvent();
export const answerClick = createEvent();
export const tick = createEvent();
export const restartGame = createEvent();
export const changeNoteLocale = createEvent();

export const renderNotesFx = createEffect(({ element, notes }) => {
  if (!window.ABCJS || !element) return;

  const currentNotes = shuffle(ALL_NOTES)
    .slice(0, 3)
    .map((note) => ({
      note,
      duration: randomDuration(), // "1/2", "1/4", "1" и т.д.
    }));

  // Генерируем ABCJS ноты в одну строку
  const abcNotes = currentNotes
    .map(({ note, duration }) => {
      const clef = getClef(note); // функция возвращает "bass" или "treble"
      const abcNote = toAbc(note, duration);
      // ABCJS позволяет менять ключ через [K:C clef=...] перед нотой
      return `[K:C clef=${clef}]${abcNote}`;
    })
    .join(" "); // объединяем через пробел

  // Формируем полноценный ABCJS код
  const abc = `X:1
M:4/4
L:1/4
${abcNotes} |`;

  console.log("ABCJS code:\n", abc);

  element.innerHTML = "";

  window.ABCJS.renderAbc(element, abc, {
    add_classes: true,
    staffwidth: 200,
    paddingtop: 20,
    paddingbottom: 20,
    responsive: "resize",
    clickListener: (abcElem) => {
      const clickedNote = abcElem.pitches?.[0]?.name?.toUpperCase();
      if (clickedNote) answerClick(clickedNote);
    },
  });
});

const $noteGuess = createStore({
  notes: keys(NOTE_LOCALES.ru),
  currentNotes: [],
  correctNote: null,
  correct: 0,
  incorrect: 0,
  timeLeft: 20,
  bestResult: 0,
  timerId: null,
})
  .on(startGame, (state) => {
    if (state.timerId) clearInterval(state.timerId);

    const currentNotes = shuffle(state.notes).slice(0, 3);
    const timerId = setInterval(() => tick(), 1000);

    return {
      ...state,
      currentNotes,
      correctNote: currentNotes[Math.floor(Math.random() * 3)],
      correct: 0,
      incorrect: 0,
      timeLeft: 20,
      timerId,
    };
  })
  .on(answerClick, (state, note) => {
    if (state.timeLeft <= 0) return state;

    const currentNotes = shuffle(state.notes).slice(0, 3);
    const correctNow = note === state.correctNote;
    const newCorrect = correctNow ? state.correct + 1 : state.correct;
    const newBestResult =
      newCorrect > state.bestResult ? newCorrect : state.bestResult;

    return {
      ...state,
      correct: newCorrect,
      incorrect: correctNow ? state.incorrect : state.incorrect + 1,
      currentNotes,
      correctNote: currentNotes[Math.floor(Math.random() * 3)],
      bestResult: newBestResult,
    };
  })
  .on(tick, (state) => {
    if (state.timeLeft <= 0) {
      if (state.timerId) clearInterval(state.timerId);
      return { ...state, timeLeft: 0, timerId: null };
    }
    return { ...state, timeLeft: state.timeLeft - 1 };
  })
  .reset(restartGame)
  .on(restartGame, (state) => {
    if (state.timerId) clearInterval(state.timerId);
    return { ...state, timerId: null };
  });

sample({
  clock: [startGame, answerClick],
  source: $noteGuess,
  fn: (state) => ({
    element: document.getElementById("note-guess-notation"),
    notes: state.currentNotes,
  }),
  target: renderNotesFx,
});

const $noteLocale = createStore("ru").on(
  changeNoteLocale,
  (_, locale) => locale,
);

const $currentNotesLocalized = combine(
  $noteGuess,
  $noteLocale,
  (state, locale) =>
    state.currentNotes.map((note) => NOTE_LOCALES[locale][note]),
);

const $correctNoteLocalized = combine(
  $noteGuess,
  $noteLocale,
  (state, locale) =>
    state.correctNote ? NOTE_LOCALES[locale][state.correctNote] : null,
);

export const actions = {
  startGame,
  answerClick,
  tick,
  restartGame,
  changeNoteLocale,
};

export const stores = {
  $noteGuess,
  $noteLocale,
  $currentNotesLocalized,
  $correctNoteLocalized,
};

export const store = combine(stores);
