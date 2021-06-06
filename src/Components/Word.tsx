interface WordProps {
  word: String;
  current: String;
}

const getLetter = (word: string[], current: string[]) => (idx: number) => {
  const hasEntered = current.length > idx;
  const isCorrect = hasEntered && word[idx] === current[idx];
  return hasEntered
    ? {
        color: isCorrect ? "green" : "red",
      }
    : {};
};

const Word = ({ word, current = "" }: WordProps) => {
  const wordChars = word.split("");
  const currentChars = current.split("");
  const getChar = getLetter(wordChars, currentChars);
  const letters = wordChars.map((letter, idx) => {
    return (
      <span className="char" key={`${word}-${idx}`} style={getChar(idx)}>
        {letter}
      </span>
    );
  });
  return <>{letters}</>;
};

export default Word;
