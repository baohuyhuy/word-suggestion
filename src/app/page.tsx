import SearchForm from '@/components/search-form';
import { TypographyH1 } from '@/components/typography';
import ModeToggle from '@/components/ui/mode-toggle';

export default async function Home() {
  return (
    <div className="flex flex-col gap-y-4 p-4 relative">
      <div className='absolute top-4 right-4'>
        <ModeToggle />
      </div>
      <TypographyH1>Word Suggestions</TypographyH1>
      <p>Word Suggestions using Trie Data Structure vs. Linear Search</p>
      <SearchForm />
    </div>
  );
}
