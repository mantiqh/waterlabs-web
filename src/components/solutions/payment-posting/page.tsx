import PaymentPostingCTASection from './cta-section';
import PaymentPostingHeroSection from './hero-section';
import HowWaterlabsClosesSection from './how-waterlabs-closes';
import HumanInTheLoopSection from './human-in-the-loop';
import TheProblemSection from './the-problem';
import ThisIsntJustPaymentPostingSection from './this-isnt-just-payment-posting';

export const PaymentPostingPage = () => {
  return (
    <div className="flex w-full flex-col">
      <PaymentPostingHeroSection />
      <TheProblemSection />
      <HowWaterlabsClosesSection />
      <HumanInTheLoopSection />
      <ThisIsntJustPaymentPostingSection />
      <PaymentPostingCTASection />
    </div>
  );
};

export default PaymentPostingPage;
