import { Input } from "@/components/ui/input";

const SearchInputNav = () => {
  return (
    <form className="flex w-full max-w-[600px] items-center">
      <div className="relative w-full">
        <Input
          type="search"
          placeholder="Search for classifieds"
          className="w-full pl-4 pr-12 shadow-none rounded-l-full"
        />
      </div>
    </form>
  );
};

export default SearchInputNav;
