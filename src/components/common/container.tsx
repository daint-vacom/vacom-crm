import { type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const containerVariants = cva('mx-auto px-4 lg:px-6 space-y-5', {
  variants: {
    width: {
      fixed: 'max-w-[1320px]',
      fluid: '',
    },
  },
  defaultVariants: {
    width: 'fluid',
  },
});

export interface ContainerProps extends VariantProps<typeof containerVariants> {
  children?: ReactNode;
  className?: string;
}

export function Container({ children, width, className = '' }: ContainerProps) {
  return (
    <div
      data-slot="container"
      className={cn(containerVariants({ width: width }), className)}
    >
      {children}
    </div>
  );
}
