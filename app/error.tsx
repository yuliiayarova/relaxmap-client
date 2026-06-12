'use client';

import ErrorState from '@/shared/ui/ErrorState/ErrorState';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
  return <ErrorState onRetry={reset} />;
}
