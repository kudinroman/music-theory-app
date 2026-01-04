import { range, flatMap, fromPairs } from "lodash";
import { NOTE_LOCALES } from "./note_locales";

const BASE_NOTES = [
  "C",
  "C#",
  "Cb",
  "Cx",
  "Cbb",
  "D",
  "D#",
  "Db",
  "Dx",
  "Dbb",
  "E",
  "E#",
  "Eb",
  "Ex",
  "Ebb",
  "F",
  "F#",
  "Fb",
  "Fx",
  "Fbb",
  "G",
  "G#",
  "Gb",
  "Gx",
  "Gbb",
  "A",
  "A#",
  "Ab",
  "Ax",
  "Abb",
  "B",
  "B#",
  "Bb",
  "Bx",
  "Bbb",
];

export function generateAllNotesLocalized(locale = "ru") {
  return fromPairs(
    flatMap(BASE_NOTES, (note) =>
      range(0, 9).map((octave) => [
        `${note}${octave}`,
        `${NOTE_LOCALES[locale][note]}${octave}`,
      ]),
    ),
  );
}
