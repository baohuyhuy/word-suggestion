import { trie } from '@/utils/trie';
import { z } from 'zod';

const Schema = z.object({
  word: z
    .string()
    .regex(/^[A-Za-z]+$/, 'Word must contain only alphabet characters')
    .min(1, 'Please enter a word')
    .toLowerCase(),
});

export default function addWord(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = Schema.safeParse(rawFormData);

  if (!validatedFields.success) {
    const error: {
      word?: string;
      message?: string;
      searchType?: 'trie' | 'linear';
      result?: string[];
      timeTaken?: string;
      limit?: number;
      countComparisons?: number;
    } = {
      message: validatedFields.error.errors[0].message,
    };
    return error;
  }

  const { word } = validatedFields.data;

  if (trie.search(word)) {
    return {
      word,
      message: `Word "${word}" already exists in the trie`,
    };
  }

  trie.insert(word);
  return {
    word,
    message: `Word "${word}" added successfully`,
  };
}
