"use client";

import { ChangeEvent, InputHTMLAttributes, useCallback, useRef } from "react";
import { useQueryState } from "nuqs";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon, XIcon } from "lucide-react";
import debounce from "debounce";
import { Button } from "@/components/ui/button";

function debounceFunc<T extends (...args: any) => any>(
  func: T,
  wait: number,
  opts: { immediate: boolean },
) {
  return debounce(func, wait, opts);
}

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const SearchInput = (props: SearchInputProps) => {
  const { className, ...rest } = props;
  const [q, setSearch] = useQueryState("q", { shallow: false });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback(
    debounceFunc(
      (value: string) => {
        setSearch(value || null);
      },
      100,
      { immediate: true },
    ),
    [],
  );

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    handleSearch(newValue);
  };

  const clearSearch = () => {
    setSearch(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <form className="relative flex-1">
      <div className="relative w-full max-w-[600px] mx-auto ">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          className={cn(className)}
          ref={inputRef}
          defaultValue=""
          type="search"
          {...rest}
          onChange={handleOnChange}
        />
        {q && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2.5 top-1.5 w-6 h-6 cursor-pointer z-100 group rounded-full"
            onClick={clearSearch}
          >
            <XIcon className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
          </Button>
        )}
      </div>
    </form>
  );
};

export default SearchInput;
