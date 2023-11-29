import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconSearch } from "@tabler/icons-react";

export function SearchInput() {
  return (
    <div className="flex  max-w-sm items-center space-x-2">
      <Input
        className="hidden lg:inline-block"
        type="text"
        placeholder="Search"
      />
      <Button type="submit">
        <IconSearch />
      </Button>
    </div>
  );
}
