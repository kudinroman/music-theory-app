export function toAbc(note, duration = "1") {
  const match = note.match(/^([A-G])([#bx]*)(\d)$/);
  if (!match) return "";

  const [, letter, acc, octaveStr] = match;
  const octave = Number(octaveStr);

  const accMap = {
    "#": "^",
    "##": "^^",
    b: "_",
    bb: "__",
    x: "^^",
  };

  const abcAcc = accMap[acc] || "";

  let abcNote = letter;

  if (octave > 4) {
    abcNote = letter.toLowerCase() + "'".repeat(octave - 5);
  } else if (octave < 4) {
    abcNote = letter + ",".repeat(4 - octave);
  }

  const abcDuration = duration === "1" ? "" : duration;

  return `${abcAcc}${abcNote}${abcDuration}`;
}
