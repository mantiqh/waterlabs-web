import React from 'react';

import Footer from '../common/footer';
import Hero from './hero';

const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      {/* Additional home page sections will go here */}
      <Footer />
    </main>
  );
};

export default HomePage;
