import { AddRate } from '@/shared/ui/AddStarsRate/AddRate';
import css from './LocationInfoBlock.module.css';

interface LocationInfoBlockProps {
  rate: number;
  locationName: string;
  region: string;
  type: string;
  ownerName: string;
  ownerId: string;
}

export default function LocationInfoBlock({
  rate,
  locationName,
  region,
  type,
  ownerName,
  ownerId,
}: LocationInfoBlockProps) {
  return (
    <div className={css['location-titele-box']}>
      <div className={css['location-rate-box']}>
        <div className={css['location-rate-stars']}>
          <AddRate rate={rate} />
        </div>
        <span className={css['dot-separator']}></span>
        <p className={css['location-text-rate']}>{rate}</p>
      </div>
      <h1 className={css['location-name']}>{locationName}</h1>
      <dl className={css['location-details']}>
        <div className={css['location-params-str']}>
          <dt className={css['location-params-key']}>Регіон:</dt>
          <dd className={css['location-params-value']}>{region}</dd>
        </div>
        <div className={css['location-params-str']}>
          <dt className={css['location-params-key']}>Тип локації:</dt>
          <dd className={css['location-params-value']}>{type}</dd>
        </div>
        <div className={css['location-params-str']}>
          <dt className={css['location-params-key']}>Автор статті:</dt>
          <dd className={css['location-params-value']}>
            <a
              className={css['link-autor-story']}
              href={`/profile/${ownerId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {ownerName}
            </a>
          </dd>
        </div>
      </dl>
    </div>
  );
}
