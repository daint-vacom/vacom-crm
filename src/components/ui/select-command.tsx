'use client';

import { ReactNode, useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface Props {
  searchPlaceholder?: string;
  emptyMessage?: string;
  enableSearch?: boolean;
  modal?: boolean;
  trigger: ReactNode;
  children: ReactNode;
}

export function SelectCommand({
  searchPlaceholder = 'Tìm dữ liệu...',
  emptyMessage = 'Không có kết quả',
  enableSearch = true,
  modal,
  trigger,
  children,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={modal}>
      <PopoverTrigger asChild data-slot="select-trigger">
        {trigger}
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
        <Command shouldFilter={enableSearch}>
          {enableSearch && (
            <CommandInput placeholder={searchPlaceholder} className="h-9" />
          )}
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            {children}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
