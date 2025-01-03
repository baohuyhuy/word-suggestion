import addWord from '@/utils/addWord';
import deleteWord from '@/utils/deleteWord';
import { suggestWords } from '@/utils/suggestWords';
import { z } from 'zod';

const Schema = z.object({
  actionType: z.enum(['search', 'add', 'delete'], {
    invalid_type_error: 'Please select an action type',
  }).default('search'),
});

export default async function handleFormSubmit(
  prevState: unknown,
  formData: FormData,
) {
  const rawFormData = Object.fromEntries(formData.entries());
  const validatedFields = Schema.safeParse(rawFormData);

  if (!validatedFields.success) {
    const error: {
      actionType?: 'search' | 'add' | 'delete';
      word?: string;
      message?: string;
      result?: string[];
      timeTaken?: string;
      limit?: number;
      countComparisons?: number;
    } = {
      message: validatedFields.error.errors[0].message,
    };
    return error;
  }

  const { actionType } = validatedFields.data;

  if (actionType === 'search') {
    return suggestWords(formData);
  } else if (actionType === 'add') {
    return addWord(formData);
  } else {
    return deleteWord(formData);
  }
}
