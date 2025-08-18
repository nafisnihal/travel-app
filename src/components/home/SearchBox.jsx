import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cities } from "@/lib/cities";
import { cn } from "@/lib/utils";
import { Check, Search } from "lucide-react";
import { useState } from "react";

function SearchBox() {
  const [selectedCities, setSelectedCities] = useState("");
  console.log("🚀 ~ SearchBox ~ selectedCities:", selectedCities);
  const [open, setOpen] = useState(false);

  const handleSelect = (value) => {
    setSelectedCities(value);
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Popover open={open} onOpenChange={setOpen} className="w-[600px]">
        <PopoverTrigger asChild className="w-full">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between capitalize"
          >
            {selectedCities ? selectedCities : "Search Destinations"}
            <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 bg-transparent border-none">
          <Command className="bg-white/20 backdrop-blur-md">
            <div className="flex items-center border-b px-3">
              <CommandInput
                placeholder="Search destinations..."
                className="h-9 flex-1 w-[450px] placeholder:text-white"
              />
            </div>
            <CommandList>
              <CommandEmpty>No destinations found.</CommandEmpty>
              <ScrollArea className="h-[200px]">
                <CommandGroup>
                  {cities.map((city) => (
                    <CommandItem
                      key={city.value}
                      value={city.value}
                      onSelect={() => handleSelect(city.value)}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <Check
                          className={cn(
                            "h-4 w-4",
                            selectedCities.includes(city.value)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        <span>{city.label}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export { SearchBox as default };
