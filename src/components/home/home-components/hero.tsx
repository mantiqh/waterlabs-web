import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center p-24">
      <p className="mt-6 text-xl text-muted-foreground max-w-[600px] text-center">
        Welcome to your production-ready, scalable Next.js project template. Built with App Router,
        TypeScript, and Industry Best Practices.
      </p>
    </section>
  );
};

export default Hero;
