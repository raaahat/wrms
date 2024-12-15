import { VariantProps } from 'class-variance-authority';
import { Button, buttonVariants } from './ui/button';
import { LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isPending?: boolean;
  buttonText: string;
}
export const SubmitButton = ({
  isPending,
  buttonText,
  ...props
}: SubmitButtonProps) => {
  return (
    <Button
      className='relative flex items-center justify-center transition-all duration-300 '
      {...props}
    >
      {isPending !== undefined && (
        <LoaderCircle
          className={cn(
            'w-full transition-all -ms-1 me-2 animate-spin',
            !isPending && 'hidden w-0'
          )}
          size={16}
          strokeWidth={2}
          aria-hidden='true'
        />
      )}

      {buttonText}
    </Button>
  );
};
