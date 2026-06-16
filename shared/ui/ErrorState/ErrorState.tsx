import Button from '../Button/Button';
import css from './ErrorState.module.css';

interface ErrorStateProps {
  onRetry?: () => void;
}

export default function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="container">
      <p className={css.errorDecsr}>Something went wrong. Please try again.</p>
      {onRetry && <Button onClick={onRetry} text="Retry" />}
    </div>
  );
}
