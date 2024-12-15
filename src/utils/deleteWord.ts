import { trie } from '@/utils/trie';
import { z } from 'zod';

const Schema = z.object({
  word: z
    .string()
    .regex(/^[A-Za-z]+$/, 'Word must contain only alphabet characters')
    .min(1, 'Please enter a word')
    .toLowerCase(),
});

export default function deleteWord(formData: FormData) {
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
  const success = trie.search(word);
  trie.delete(word);
  console.log(success);
  return {
    word,
    message: success
      ? `Word "${word}" deleted successfully`
      : `Word "${word}" not found in the trie`,
  };
}
