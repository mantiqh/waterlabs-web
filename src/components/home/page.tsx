import React from 'react';

import Hero from './hero';
import Footer from '../common/footer';

interface HomePageProps {
  data: any;
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
