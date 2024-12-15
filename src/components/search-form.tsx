'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import handleFormSubmit from '@/utils/actions';
import clsx from 'clsx';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

const searchInitialState: {
  searchType?: 'trie' | 'linear';
  word?: string;
  message?: string;
  result?: string[];
  timeTaken?: string;
  limit?: number;
} = {
  searchType: 'trie',
  word: '',
  limit: 1,
};

export default function SearchForm() {
  const [formState, formAction] = useActionState(
    handleFormSubmit,
    searchInitialState,
  );
  const { pending } = useFormStatus();

  return (
    <>
      <form className="flex flex-col gap-y-4" action={formAction}>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="word">Enter a word:</Label>
          <Input
            name="word"
            id="word"
            type="text"
            required
            autoComplete="off"
            defaultValue={formState?.word}
          />
        </div>
        
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="searchType">Search method:</Label>
          <RadioGroup
            name="searchType"
            defaultValue="trie"
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="trie" id="trie" />
              <Label htmlFor="trie">Trie</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="linear" id="linear" />
              <Label htmlFor="linear">Linear</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="suggestionLimit">Search limit:</Label>
          <RadioGroup
            name="suggestionLimit"
            defaultValue="1"
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="1" />
              <Label htmlFor="1">1</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="10" id="10" />
              <Label htmlFor="10">10</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="30" id="30" />
              <Label htmlFor="30">30</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="50" id="50" />
              <Label htmlFor="50">50</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="100" id="100" />
              <Label htmlFor="100">100</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={pending}
            name="actionType"
            value="search"
          >
            Search
          </Button>
          <Button
            disabled={pending}
            name="actionType"
            value="add"
            type="submit"
          >
            Add Word
          </Button>
          <Button
            disabled={pending}
            name="actionType"
            value="delete"
            type="submit"
          >
            Delete Word
          </Button>
        </div>

        {formState.message && <p aria-live="polite">{formState.message}</p>}
      </form>
      {formState.timeTaken && <p>Running time: {formState.timeTaken}</p>}
      {formState?.result && formState?.limit && (
        <div
          className={clsx(
            'grid ',
            `grid-rows-${formState.limit / 2} md:grid-rows-${
              formState.limit / 3
            } lg:grid-rows-${formState.limit / 4} xl:grid-rows-${
              formState.limit / 5
            } 2xl:grid-rows-${formState.limit / 6}`,
            'grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6',
          )}
        >
          {formState.result.map((word) => (
            <span className="border p-2 font-semibold" key={word}>
              {word}
            </span>
          ))}
        </div>
      )}
    </>
  );
}
