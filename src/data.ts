export const keySignatures = {
  // Major keys
  C: {},
  G: { F: 'sharp' },
  D: { F: 'sharp', C: 'sharp' },
  A: { F: 'sharp', C: 'sharp', G: 'sharp' },
  E: { F: 'sharp', C: 'sharp', G: 'sharp', D: 'sharp' },
  B: { F: 'sharp', C: 'sharp', G: 'sharp', D: 'sharp', A: 'sharp' },
  'F#': {
    F: 'sharp',
    C: 'sharp',
    G: 'sharp',
    D: 'sharp',
    A: 'sharp',
    E: 'sharp',
  },
  'C#': {
    F: 'sharp',
    C: 'sharp',
    G: 'sharp',
    D: 'sharp',
    A: 'sharp',
    E: 'sharp',
    B: 'sharp',
  },
  F: { B: 'flat' },
  Bb: { B: 'flat', E: 'flat' },
  Eb: { B: 'flat', E: 'flat', A: 'flat' },
  Ab: { B: 'flat', E: 'flat', A: 'flat', D: 'flat' },
  Db: { B: 'flat', E: 'flat', A: 'flat', D: 'flat', G: 'flat' },
  Gb: { B: 'flat', E: 'flat', A: 'flat', D: 'flat', G: 'flat', C: 'flat' },
  Cb: {
    B: 'flat',
    E: 'flat',
    A: 'flat',
    D: 'flat',
    G: 'flat',
    C: 'flat',
    F: 'flat',
  },

  // Minor keys
  Am: {},
  Em: { F: 'sharp' },
  Bm: { F: 'sharp', C: 'sharp' },
  'F#m': { F: 'sharp', C: 'sharp', G: 'sharp' },
  'C#m': { F: 'sharp', C: 'sharp', G: 'sharp', D: 'sharp' },
  'G#m': { F: 'sharp', C: 'sharp', G: 'sharp', D: 'sharp', A: 'sharp' },
  'D#m': {
    F: 'sharp',
    C: 'sharp',
    G: 'sharp',
    D: 'sharp',
    A: 'sharp',
    E: 'sharp',
  },
  'A#m': {
    F: 'sharp',
    C: 'sharp',
    G: 'sharp',
    D: 'sharp',
    A: 'sharp',
    E: 'sharp',
    B: 'sharp',
  },
  Dm: { B: 'flat' },
  Gm: { B: 'flat', E: 'flat' },
  Cm: { B: 'flat', E: 'flat', A: 'flat' },
  Fm: { B: 'flat', E: 'flat', A: 'flat', D: 'flat' },
  Bbm: { B: 'flat', E: 'flat', A: 'flat', D: 'flat', G: 'flat' },
  Ebm: { B: 'flat', E: 'flat', A: 'flat', D: 'flat', G: 'flat', C: 'flat' },
  Abm: {
    B: 'flat',
    E: 'flat',
    A: 'flat',
    D: 'flat',
    G: 'flat',
    C: 'flat',
    F: 'flat',
  },
} as const

export const keyMap = {
  C2: 'C,,',
  D2: 'D,,',
  E2: 'E,,',
  F2: 'F,,',
  G2: 'G,,',
  A2: 'A,,',
  B2: 'B,,',
  C3: 'C,',
  D3: 'D,',
  E3: 'E,',
  F3: 'F,',
  G3: 'G,',
  A3: 'A,',
  B3: 'B,',
  C4: 'C',
  D4: 'D',
  E4: 'E',
  F4: 'F',
  G4: 'G',
  A4: 'A',
  B4: 'B',
  C5: 'c',
  D5: 'd',
  E5: 'e',
  F5: 'f',
  G5: 'g',
  A5: 'a',
  B5: 'b',
  C6: "c'",
}

export const accidentalsMap = {
  down: '',
  sharp: '^',
  'double-sharp': '^^',
  flat: '_',
  'double-flat': '__',
  natural: '=',
}

export type KeySignature = keyof typeof keySignatures
export const keyStates = [
  'up',
  'down',
  'natural',
  'sharp',
  'flat',
  'double-sharp',
  'double-flat',
] as const
export type KeyState = (typeof keyStates)[number]
export type PressedKeyState = Exclude<KeyState, 'up'>

export const symbols = [' ', '👉', '♮', '♯', '♭', '𝄪', '𝄫'] as const

export const deltaSemitoneMap = {
  down: 0,
  natural: 0,
  sharp: 1,
  flat: -1,
  'double-sharp': 2,
  'double-flat': -2,
} as { [state in PressedKeyState]: number }

export const SEMITONE_OCTAVE = 12

export const baseSemitoneMap = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
} as const

export const toneMap = {
  C: 0,
  D: 1,
  E: 2,
  F: 3,
  G: 4,
  A: 5,
  B: 6,
} as const
export type Tone = keyof typeof toneMap

export const romanNumeralsUpper = [
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI',
  'VII',
] as const

export const romanNumeralsLower = [
  'i',
  'ii',
  'iii',
  'iv',
  'v',
  'vi',
  'vii',
] as const
