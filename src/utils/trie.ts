import data from '@/data/words_dictionary.json';

const ALPHABET_SIZE = 26;

export class TrieNode {
  child: Array<TrieNode | null>;
  isEndOfWord: boolean;

  constructor() {
    // await Promise((resolve) => setTimeout(resolve, 10000));
    this.child = new Array<TrieNode | null>(26);
    for (let i = 0; i < ALPHABET_SIZE; i++) {
      this.child[i] = null;
    }
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

  insert(str: string) {
    if (!str) return;
    let cur = this.root;
    str.split('').forEach((c) => {
      const index = c.charCodeAt(0) - 'a'.charCodeAt(0);
      if (!cur.child[index]) {
        cur.child[index] = new TrieNode();
      }
      cur = cur.child[index]!;
    });
    cur.isEndOfWord = true;
  }

  suggest(prefix: string, suggestionLimit: number) {
    console.log("Trie Search");
    let cur = this.root;

    for (const c of prefix) {
      const index = c.charCodeAt(0) - 'a'.charCodeAt(0);
      if (!cur.child[index]) return [];
      cur = cur.child[index]!;
    }
    
    const suggestions: string[] = [];
    if (cur.isEndOfWord) {
      suggestions.push(prefix);
    }

    function findSuggestions(node: TrieNode, prefix: string) {
      if (suggestions.length >= suggestionLimit) return;
      for (let i = 0; i < ALPHABET_SIZE; i++) {
        if (node.child[i]) {
          const newPrefix = prefix + String.fromCharCode(i + 'a'.charCodeAt(0));
          if (node.child[i]!.isEndOfWord && suggestions.length < suggestionLimit) {
            suggestions.push(newPrefix);
          }
          findSuggestions(node.child[i]!, newPrefix);
        }
      }
    }

    findSuggestions(cur, prefix);

    return suggestions;
  }
}

export const trie = new Trie(data as { [key: string]: 1 });