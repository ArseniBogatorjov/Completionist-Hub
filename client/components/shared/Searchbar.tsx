import { Input } from '@/components/ui/input';
import { Dispatch, SetStateAction } from 'react';
import { styles } from '@/lib/constants/styles';
import { cn } from '@/lib/utils';

interface SearchbarProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  placeholder: string;
}

export default function Searchbar({
  search,
  setSearch,
  placeholder,
}: SearchbarProps) {
  return (
    <Input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      type="search"
      placeholder={placeholder}
      className={cn(styles.INPUT)}
    />
  );
}
