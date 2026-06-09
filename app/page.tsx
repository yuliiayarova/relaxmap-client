import AdvantagesBlock from '@/components/AdvantagesBlock/AdvantagesBlock';
import HeroBlock from '@/components/HeroBlock/HeroBlock';
import Feedbacks from '@/components/ReviewsBlock/ReviewsBlock';
import Footer from '@/components/Footer/Footer';

import PopularLocationsBlock from '@/components/PopularLocationsBlock/PopularLocationsBlock';
import LocationDetailsPage from '@/components/LocationDetailsPage/LocationDetailsPage';

export default function Home() {
  return (
    <>
      <main>
        {/* <HeroBlock /> */}
        <div className="container">
          <LocationDetailsPage />
          {/* <AdvantagesBlock />
          <PopularLocationsBlock />
          <Feedbacks /> */}
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
}
