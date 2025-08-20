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
import { destinations } from "@/lib/destinations";
import { cn } from "@/lib/utils";
import { Check, Search } from "lucide-react";
import { motion as m } from "motion/react";
import { useState } from "react";

function SearchBox({ selectedDstn, setSelectedDst, submitted }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (value) => {
    setSelectedDst(value);
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
            className="w-full justify-between hover:text-white capitalize bg-transparent hover:bg-transparent focus:ring-0 focus:outline-none"
            disabled={submitted}
          >
            {selectedDstn ? selectedDstn : "Search Destinations Here"}
            <m.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </m.div>
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
                  {destinations.map((city) => (
                    <CommandItem
                      key={city.id}
                      value={city.value}
                      onSelect={() => handleSelect(city.value)}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <Check
                          className={cn(
                            "h-4 w-4",
                            selectedDstn.includes(city.value)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        <span className="font-medium">{city.label}</span>
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
