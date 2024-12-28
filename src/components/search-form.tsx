'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import handleFormSubmit from '@/utils/actions';
import clsx from 'clsx';
import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';

const searchInitialState: {
  searchType?: 'trie' | 'linear';
  word?: string;
  message?: string;
  result?: string[];
  timeTaken?: string;
  limit?: number;
  countComparisons?: number;
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
  const [input, setInput] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      formRef.current?.requestSubmit();
    }, 500);
    return () => clearTimeout(id);
  }, [input]);

  return (
    <>
      <form
        className="flex flex-col gap-y-4"
        action={formAction}
        ref={formRef}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
      >
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="word">Enter a word:</Label>
          <Input
            name="word"
            id="word"
            type="text"
            required
            autoComplete="off"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="searchType">Search method:</Label>
          <RadioGroup
            name="searchType"
            defaultValue="trie"
            className="flex gap-4"
          >
            <div
              className="flex items-center space-x-2"
              onClick={() => {
                formRef.current?.requestSubmit();
              }}
            >
              <RadioGroupItem value="trie" id="trie" />
              <Label htmlFor="trie">Trie</Label>
            </div>
            <div
              className="flex items-center space-x-2"
              onClick={() => {
                formRef.current?.requestSubmit();
              }}
            >
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
            <div
              className="flex items-center space-x-2"
              onClick={() => formRef.current?.requestSubmit()}
            >
              <RadioGroupItem value="1" id="1" />
              <Label htmlFor="1">1</Label>
            </div>
            <div
              className="flex items-center space-x-2"
              onClick={() => formRef.current?.requestSubmit()}
            >
              <RadioGroupItem value="10" id="10" />
              <Label htmlFor="10">10</Label>
            </div>
            <div
              className="flex items-center space-x-2"
              onClick={() => formRef.current?.requestSubmit()}
            >
              <RadioGroupItem value="100" id="100" />
              <Label htmlFor="100">100</Label>
            </div>

            <div
              className="flex items-center space-x-2"
              onClick={() => formRef.current?.requestSubmit()}
            >
              <RadioGroupItem value="1000" id="1000" />
              <Label htmlFor="1000">1000</Label>
            </div>

            <div
              className="flex items-center space-x-2"
              onClick={() => formRef.current?.requestSubmit()}
            >
              <RadioGroupItem value="10000" id="10000" />
              <Label htmlFor="10000">10000</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex gap-4">
          <Button
            disabled={pending}
            name="actionType"
            value="add"
            onClick={() => formRef.current?.requestSubmit()}
          >
            Add Word
          </Button>
          <Button
            disabled={pending}
            name="actionType"
            value="delete"
            onClick={() => formRef.current?.requestSubmit()}
          >
            Delete Word
          </Button>
        </div>

        {formState.message && <p aria-live="polite">{formState.message}</p>}
      </form>
      {formState.timeTaken && <p>Running time: {formState.timeTaken}</p>}
      {formState.countComparisons && (
        <p>Comparisons: {formState.countComparisons}</p>
      )}
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
            <span className="border p-2 font-semibold rounded-lg" key={word}>
              {word}
            </span>
          ))}
        </div>
      )}
    </>
  );
}
