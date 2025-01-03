import wordsDictionary from '@/data/words_dictionary.json';
class Dictionary {
  data: { [key: string]: 1 } = {};

  constructor(sampleData: { [key: string]: 1 } = {}) {
    this.data = sampleData;
  }

  search(word: string) {
    return this.data[word] ? true : false;
  }

  suggest(prefix: string, suggestionLimit: number) {
    let countComparisons = 0;

    function isStartWith(word: string, prefix: string) {
      if (++countComparisons && word.length < prefix.length) return false;
      for (let i = 0; ++countComparisons && i < prefix.length; i++) {
        if (++countComparisons && word[i] !== prefix[i]) return false;
      }
      return true;
    }

    const suggestions: string[] = [];
    const words = Object.keys(this.data);

    for (let i = 0; ++countComparisons && i < words.length; i++) {
      if (++countComparisons && suggestions.length >= suggestionLimit) break;
      if (isStartWith(words[i], prefix)) {
        suggestions.push(words[i]);
      }
    }
    return { suggestions, countComparisons };
  }

  insert(word: string) {
    this.data[word] = 1;
  }

  delete(word: string) {
    delete this.data[word];
  }
}

export const dictionary = new Dictionary(
  wordsDictionary as { [key: string]: 1 },
);
