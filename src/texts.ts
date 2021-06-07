export const texts = [
  {
    title: "Javascript",
    input: [
      "var",
      "let",
      "if",
      "else",
      "Math",
      "JSON",
      "stringify",
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
    ],
    shouldShuffle: true,
  },
  {
    title: "Törnrosa",
    input:
      "Det ska vi nog ta reda på tänkte den gamla drottningen men hon sa ingenting gick bara in i gästrummet lyfte bort alla sängkläderna och la en ärta i botten på sängen".split(
        " "
      ),
    shouldShuffle: false,
  },
  {
    title: "Bord duka dig",
    input:
      "Den ädste sonen kom i lära hos en snickare och när hans läroår var slut fick han ett litet bord av sin arbetsgivare".split(
        " "
      ),
    shouldShuffle: false,
  },
];

export function shuffle(array: string[], doShuffle = true) {
  if (!doShuffle) return [...array];
  let currentIndex = array.length,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
