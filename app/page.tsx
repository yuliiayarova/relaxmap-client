import AdvantagesBlock from '@/components/AdvantagesBlock/AdvantagesBlock';
import HeroBlock from '@/components/HeroBlock/HeroBlock';
import Feedbacks from '@/components/ReviewsBlock/ReviewsBlock';

export default function Home() {
  return (
    <main>
      <HeroBlock />
      <div className="container">
        <Feedbacks />
      </div>
      <AdvantagesBlock />
    </main>
  );
}
