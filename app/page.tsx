import AdvantagesBlock from '@/components/AdvantagesBlock/AdvantagesBlock';
import HeroBlock from '@/components/HeroBlock/HeroBlock';
import Feedbacks from '@/components/ReviewsBlock/ReviewsBlock';

import PopularLocationsBlock from '@/components/PopularLocationsBlock/PopularLocationsBlock';
import LocationDetailsPage from '@/components/LocationDetailsPageAll/LocationDetailsPageAll';
import LocationCard from '@/components/LocationCard/LocationCard';

export default function Home() {
  return (
    <main>
      <HeroBlock />
      <div className="container">
        <AdvantagesBlock />
        <PopularLocationsBlock />
        <Feedbacks />
      </div>
    </main>
  );
}
