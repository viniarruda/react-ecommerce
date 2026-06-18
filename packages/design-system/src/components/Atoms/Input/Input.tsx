import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@lib/utils';

const input = tv({
  base: 'w-full rounded-md transition-all focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    variant: {
      outline: 'border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 hover:border-gray-400 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:hover:border-gray-500',
      filled: 'border border-transparent bg-gray-100 text-gray-900 placeholder:text-gray-400 hover:bg-gray-200 focus:bg-white focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-100 dark:placeholder:text-gray-500 dark:hover:bg-gray-600 dark:focus:bg-gray-800',
    },
    size: {
      sm: 'px-2 py-1.5 text-sm',
      md: 'px-3 py-2 text-base',
      lg: 'px-4 py-3 text-lg',
    },
    isInvalid: {
      true: 'border-error-500 focus:border-error-500 focus:ring-error-500',
    },
  },
  defaultVariants: {
    variant: 'outline',
    size: 'md',
  },
});

export type InputVariants = VariantProps<typeof input>;

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    InputVariants {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, isInvalid, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(input({ variant, size, isInvalid }), className)}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
