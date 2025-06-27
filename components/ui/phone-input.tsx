"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Flag from "react-world-flags";
import countries from "@/lib/constants/countries";
import { Earth } from "lucide-react";
import { AsYouType } from "libphonenumber-js/mobile";
type PhoneInputProps = {
  readonly value: { code: string; number: string };
  readonly onChange: (val: { code: string; number: string }) => void;
  readonly className?: string;
};

export function PhoneInput({ value, onChange, className }: PhoneInputProps) {
  const [open, setOpen] = React.useState(false);
  const selected = countries.find((c) => c.dialCode === value.code);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="text-xs">
            {selected ? (
              <Flag code={selected.code} className="w-4 h-4" />
            ) : (
              <Earth />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 max-h-60 overflow-y-auto p-2">
          {countries.map((c) => (
            <Button
              key={c.code}
              variant="ghost"
              className="w-full justify-start text-left text-sm px-2 py-1"
              onClick={() => {
                onChange({ ...value, code: c.dialCode });
                setOpen(false);
              }}
            >
              <div className="flex items-center gap-2">
                <Flag code={c.code} className="w-4 h-4" />
                <span className="truncate">{c.name}</span>
                <span className="ml-auto text-muted-foreground">
                  +{c.dialCode}
                </span>
              </div>
            </Button>
          ))}
        </PopoverContent>
      </Popover>

      <Input
        type="text"
        placeholder=""
        className="w-full"
        prefix={
          <span className="h-full flex items-center justify-center text-sm font-semibold text-black/45 mr-2">{`+${
            selected?.dialCode ?? "00"
          }`}</span>
        }
        value={new AsYouType(selected?.code).input(value.number)}
        onChange={(e) => onChange({ ...value, number: e.target.value })}
      />
    </div>
  );
}
