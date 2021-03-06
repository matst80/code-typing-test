const fromString = (
  path: string,
  title: string,
  text: string,
  shouldShuffle = true
) => ({
  path,
  title,
  shouldShuffle,
  input: text.split(" "),
});

export const texts = [
  {
    title: "Typescript",
    path: "typescript",
    input: [
      "var",
      "let",
      "if",
      "else",
      "Math",
      "JSON",
      "stringify",
      "map",
      "array",
      "number",
      "function",
      "interface",
      "string",
      "import",
      "const",
      "return",
    ],
    shouldShuffle: true,
  },
  {
    title: "C#",
    path: "csharp",
    input: [
      "var",
      "record",
      "if",
      "else",
      "public",
      "private",
      "class",
      "delegate",
      "System",
      "interface",
      "return",
      "Exception",
    ],
    shouldShuffle: true,
  },
  fromString(
    "torn",
    "Törnrosa",
    "Det ska vi nog ta reda på tänkte den gamla drottningen men hon sa ingenting gick bara in i gästrummet lyfte bort alla sängkläderna och la en ärta i botten på sängen",
    false
  ),
  fromString(
    "bord",
    "Bord duka dig",
    "Sonen kom i lära hos en snickare och när hans läroår var slut fick han ett litet bord av sin arbetsgivare",
    false
  ),
];

export function shuffle(array: string[], doShuffle = true) {
  if (!doShuffle) return [...array];
  let currentIndex = array.length;
  while (0 !== currentIndex) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
