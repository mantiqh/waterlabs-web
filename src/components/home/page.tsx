import React from 'react';

import Footer from '../common/footer';
import Hero, { HeroData } from './hero';

interface HomePageProps {
  data?: HeroData | null;
}

const HomePage: React.FC<HomePageProps> = ({ data }) => {
  return (
    <main>
      <Hero data={data} />
      {/* Additional home page sections will go here */}
      <Footer />
    </main>
  );
};

export default HomePage;
