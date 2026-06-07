interface IconProps {
  name: string; // ID іконки зі спрайту (наприклад, 'arrow_forward')
  size?: number; // Розмір (ширина і висота будуть однаковими)
  className?: string; // Додаткові класи для стилізації
  title?: string;
}

export default function Icon({ name, size = 24, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      className={`fill-current ${className}`}
      aria-hidden="true"
    >
      <use href={`/icons/sprite.svg#icon-${name}`} />
    </svg>
  );
}
