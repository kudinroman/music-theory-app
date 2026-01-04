export function getClef(note) {
  const octave = Number(note.match(/\d$/)?.[0]);

  if (octave <= 3) return "bass";
  return "treble";
}
