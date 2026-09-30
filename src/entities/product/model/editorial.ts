/*
 * Long-read copy for the Editorial design. It dramatises facts already on the page
 * (battery, weight, sensor, report rate) and adds no new product claims.
 */
export const featureCopy: Record<string, { kicker: string; deck: string; body: string[]; pull: string }> = {
  wireless: {
    kicker: 'The untethered',
    deck: 'What happens to your aim when nothing pulls back.',
    body: [
      'There is a particular kind of quiet when the cable is gone. No drag across the edge of the desk, no loop catching on a keyboard foot, no small correction you never noticed you were making.',
      'Slide Control keeps the link wireless and the rhythm unbroken. Charge it, forget it, and let the match decide when you stop — up to 95 hours later.',
    ],
    pull: '“Ninety-five hours. Long enough to forget where the charger is.”',
  },
  weight: {
    kicker: 'The featherweight',
    deck: 'Fifty-five grams, and every one of them accounted for.',
    body: [
      'Weight is the first thing a hand learns and the last thing it forgets. Too much and every flick costs effort; too little and the shape stops telling you where it is.',
      'At 125 by 63 by 40 millimetres, the shell fills the palm without asking for attention. It stays where you left it, which is the whole point.',
    ],
    pull: '“A shape that disappears in your hand — and stays exactly where you left it.”',
  },
  sensor: {
    kicker: 'The underside',
    deck: 'Turn it over. This is where the argument is won.',
    body: [
      'Beneath the shell sits the Super Hero 3 sensor, tracking beyond 888 inches per second and up to 20 000 DPI.',
      'Numbers like these are easy to print and hard to feel — until the moment a flick lands exactly where you meant it to, and you stop thinking about the mouse at all.',
    ],
    pull: '“It won’t miss a beat while you focus on not missing your shot.”',
  },
  response: {
    kicker: 'The five thousand',
    deck: 'Five thousand reports a second, and none of them late.',
    body: [
      'A 32-bit ARM processor polls at up to 5000 Hz. In practice that means the distance between intention and action shrinks to almost nothing.',
      'You click; the game already knows. It is the least visible feature on the page, and the one you will notice first.',
    ],
    pull: '“The moment you click and the moment the game sees it are the same moment.”',
  },
};
