import AdvantagesBlock from '@/components/AdvantagesBlock/AdvantagesBlock';
import HeroBlock from '@/components/HeroBlock/HeroBlock';
import Feedbacks from '@/components/ReviewsBlock/ReviewsBlock';
import Footer from '@/components/Footer/Footer';


import PopularLocationsBlock from '@/components/PopularLocationsBlock/PopularLocationsBlock';

export default function Home() {
  return (
    <main>
   
      <div className="container">
           <HeroBlock />
         <AdvantagesBlock />
         <PopularLocationsBlock />
        <Feedbacks />

           </div>
    </main>
    <Footer/>
  );
}
