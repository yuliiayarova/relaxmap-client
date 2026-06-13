import css from './LocationDescription.module.css';

interface LocationDescriptionProps {
  description: string;
}

export default function LocationDescription({
  description,
}: LocationDescriptionProps) {
  return <p className={css['location-story']}>{description}</p>;
}
