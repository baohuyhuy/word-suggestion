import data from '@/data/words_dictionary.json';

function isStartWith(word: string, prefix: string) {
  if (word.length < prefix.length) return false;
  for (let i = 0; i < prefix.length; i++) {
    if (word[i] !== prefix[i]) return false;
  }
  return true;
}

export function linearSuggest(prefix: string, suggestionLimit: number) {
  const suggestions: string[] = [];
  const words = Object.keys(data);
  console.log('Linear Search');
  for (let i = 0; i < words.length; i++) {
    if (suggestions.length >= suggestionLimit) break;
    if (isStartWith(words[i], prefix)) {
      suggestions.push(words[i]);
    }
  }
  return suggestions;
}