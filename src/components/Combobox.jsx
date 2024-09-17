"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import * as React from "react";

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
import { cn } from "@/lib/utils";

export function Combobox({
  selectedCategory,
  setSelectedCategory,
  options = [],
  isLoading = false,
  value,
  placeholder = "",
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedCategory?.name || `Select ${placeholder}`}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder={`Search  ${placeholder}...`}
            className="h-10"
          />
          {isLoading ? (
            "Loading..."
          ) : (
            <CommandList>
              <CommandEmpty>No {placeholder} found.</CommandEmpty>
              <CommandGroup>
                {options?.map((framework) => (
                  <CommandItem
                    key={framework?.id}
                    value={framework?.name || value}
                    onSelect={() => {
                      setSelectedCategory(
                        selectedCategory?.name === framework?.name
                          ? null
                          : framework
                      );
                      setOpen(false);
                    }}
                  >
                    {framework?.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedCategory?.name === framework?.name
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
