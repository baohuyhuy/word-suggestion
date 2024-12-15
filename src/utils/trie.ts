import data from '@/data/words_dictionary.json';

class TrieNode {
  children: { [key: string]: TrieNode };
  isEndOfWord: boolean;

  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  root: TrieNode;

  constructor(data?: { [key: string]: 1 }) {
    console.log('Building Trie');
    this.root = new TrieNode();
    if (data) {
      Object.keys(data).forEach((key) => {
        this.insert(key);
      });
    }
  }

  insert(word: string) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  search(word: string): boolean {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return node.isEndOfWord;
  }

  delete(word: string): boolean {
    return this.deleteHelper(this.root, word, 0);
  }

  private deleteHelper(node: TrieNode, word: string, depth: number): boolean {
    if (!node) {
      return false;
    }

    if (depth === word.length) {
      if (!node.isEndOfWord) {
        return false;
      }
      node.isEndOfWord = false;
      return Object.keys(node.children).length === 0;
    }

    const char = word[depth];
    if (!this.deleteHelper(node.children[char], word, depth + 1)) {
      return false;
    }

    delete node.children[char];
    return Object.keys(node.children).length === 0 && !node.isEndOfWord;
  }

  suggest(prefix: string, suggestionLimit: number) {
    // console.log("Trie Search");
    let countComparisons = 0;
    let cur = this.root;

    for (const c of prefix) {
      if (++countComparisons && !cur.children[c])
        return { suggestions: [], countComparisons };
      cur = cur.children[c];
    }

    const suggestions: string[] = [];
    if (++countComparisons && cur.isEndOfWord) {
      suggestions.push(prefix);
    }

    function findSuggestions(node: TrieNode, prefix: string) {
      if (++countComparisons && suggestions.length >= suggestionLimit) return;
      for (const char in node.children) {
        const newPrefix = prefix + char;
        if (
          ++countComparisons &&
          ++countComparisons &&
          node.children[char].isEndOfWord &&
          suggestions.length < suggestionLimit
        ) {
          suggestions.push(newPrefix);
        }
        findSuggestions(node.children[char], newPrefix);
      }
    }

    findSuggestions(cur, prefix);

    return {
      suggestions,
      countComparisons,
    };
  }
}

export const trie = new Trie(data as { [key: string]: 1 });
