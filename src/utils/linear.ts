import data from '@/data/words_dictionary.json';

export function linearSuggest(prefix: string, suggestionLimit: number) {
  let countComparisons = 0;

  function isStartWith(word: string, prefix: string) {
    if (++countComparisons && word.length < prefix.length) return false;
    for (let i = 0; ++countComparisons && i < prefix.length; i++) {
      if (++countComparisons && word[i] !== prefix[i]) return false;
    }
    return true;
  }

  const suggestions: string[] = [];
  const words = Object.keys(data);
  // console.log('Linear Search');
  for (let i = 0; ++countComparisons && i < words.length; i++) {
    if (++countComparisons && suggestions.length >= suggestionLimit) break;
    if (isStartWith(words[i], prefix)) {
      suggestions.push(words[i]);
    }
  }
  return { suggestions, countComparisons };
}
