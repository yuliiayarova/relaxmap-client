import AdvantagesBlock from '@/components/AdvantagesBlock/AdvantagesBlock';
import HeroBlock from '@/components/HeroBlock/HeroBlock';
import Feedbacks from '@/components/ReviewsBlock/ReviewsBlock';
import Footer from '@/components/Footer/Footer';

import PopularLocationsBlock from '@/components/PopularLocationsBlock/PopularLocationsBlock';
import LocationDetailsPage from '@/components/LocationDetailsPageAll/LocationDetailsPageAll';
import LocationCard from '@/components/LocationCard/LocationCard';

export default function Home() {
  return (
    <>
      <main>
        {/* <HeroBlock /> */}
        <div className="container">
          <LocationCard
            pathPhotoLocatin={'/images/location-sone-beach.jpg'}
            nameTypeLocation={'Море'}
            rate={3.5}
            nameLocation={"Сонячна Рів'єра"}
            locationId={'0123'}
          />
          {/* <LocationDetailsPage /> */}
          {/* <AdvantagesBlock />
          <PopularLocationsBlock />
          <Feedbacks /> */}
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
}
