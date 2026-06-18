import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '@lib/utils';

const text = tv({
  base: '',
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    color: {
      primary: 'text-gray-900 dark:text-gray-100',
      secondary: 'text-gray-600 dark:text-gray-400',
      tertiary: 'text-gray-500 dark:text-gray-500',
      error: 'text-error-500',
      success: 'text-success-500',
      warning: 'text-warning-500',
    },
  },
  defaultVariants: {
    size: 'md',
    weight: 'normal',
    align: 'left',
    color: 'primary',
  },
});

export type TextVariants = VariantProps<typeof text>;

export interface TextProps extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>, TextVariants {
  as?: 'p' | 'span' | 'div' | 'label';
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, as: Component = 'p', size, weight, align, color, ...props }, ref) => {
    return (
      <Component
        ref={ref as any}
        className={cn(text({ size, weight, align, color }), className)}
        {...(props as any)}
      />
    );
  }
);

Text.displayName = 'Text';
