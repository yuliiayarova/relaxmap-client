import Image from 'next/image';
import css from './LocationGallery.module.css';

interface LocationGalleryProps {
  locationName: string;
  pathImage: string;
}

export default function LocationGallery({
  locationName,
  pathImage,
}: LocationGalleryProps) {
  return (
    <div className={css['location-img-box']}>
      <Image
        src={pathImage}
        alt={locationName}
        width={335}
        height={223}
        className={css['location-img']}
      />
    </div>
  );
}
