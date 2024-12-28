import { dictionary } from '@/utils/linear';
import { trie } from '@/utils/trie';
import { z } from 'zod';

const SEARCH_TYPES = ['trie', 'linear'] as const;

const Schema = z.object({
  word: z
    .string()
    .regex(/^[A-Za-z]+$/, 'Word must contain only alphabet characters')
    .min(1, 'Please enter a word')
    .toLowerCase(),

  searchType: z.enum(SEARCH_TYPES, {
    invalid_type_error: 'Please select a search type',
  }),

  suggestionLimit: z.coerce.number(),
});

export async function suggestWords(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = Schema.safeParse(rawFormData);

  if (!validatedFields.success) {
    const error: {
      searchType?: 'trie' | 'linear';
      word?: string;
      message?: string;
      result?: string[];
      timeTaken?: string;
      limit?: number;
      countComparisons?: number;
    } = {
      searchType: 'trie',
      message: validatedFields.error.errors[0].message,
    };
    return error;
  }

  const { word, searchType, suggestionLimit } = validatedFields.data;

  const start = performance.now();
  const {suggestions, countComparisons} =
    searchType === 'trie'
      ? trie.suggest(word, suggestionLimit)
      : dictionary.suggest(word, suggestionLimit);
  return suggestions.length === 0
    ? {
        word,
        searchType,
        message: 'No suggestion found',
        timeTaken: `${performance.now() - start}ms`,
        limit: suggestionLimit,
        countComparisons,
      }
    : {
        word,
        searchType,
        result: suggestions,
        timeTaken: `${performance.now() - start}ms`,
        limit: suggestionLimit,
        countComparisons
      };
}
