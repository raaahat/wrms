import { useState } from 'react';
import { toast } from 'sonner';

export function useAsyncAction(actionName: string) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function performAction(
    action: () => Promise<{ success: boolean; message: string }>
  ) {
    setIsSubmitting(true);
    toast.loading('Please wait...', { id: actionName });

    try {
      const { success, message } = await action();
      if (success) {
        toast.success(message, { id: actionName });
      } else {
        toast.error(message, { id: actionName });
      }
      return success;
    } catch (error) {
      toast.error('An error occurred. Please try again.', { id: actionName });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }

  return { isSubmitting, performAction };
}
