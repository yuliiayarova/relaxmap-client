import AdvantagesBlock from '@/components/AdvantagesBlock/AdvantagesBlock';
import Feedbacks from '@/components/ReviewsBlock/ReviewsBlock';

import PopularLocationsBlock from '@/components/PopularLocationsBlock/PopularLocationsBlock';

export default function Home() {
  return (
    <main>
      <div className="container">
        <h1>Main page of Relax Map</h1>
        <Feedbacks></Feedbacks>
      </div>
      <AdvantagesBlock />
      <PopularLocationsBlock />
    </main>
  );
}
