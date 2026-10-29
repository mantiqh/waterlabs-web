import ChargeCaptureCTASection from './cta-section';
import ChargeCaptureHeroSection from './hero-section';
import HowWaterlabsClosesSection from './how-waterlabs-closes';
import HumanInTheLoopSection from './human-in-the-loop';
import TheProblemSection from './the-problem';
import ThisRunsOnCurieCodeSection from './this-runs-on-curiecode';

export const ChargeCaptureAndCodingPage = () => {
  return (
    <div className="flex w-full flex-col">
      <ChargeCaptureHeroSection />
      <TheProblemSection />
      <HowWaterlabsClosesSection />
      <HumanInTheLoopSection />
      <ThisRunsOnCurieCodeSection />
      <ChargeCaptureCTASection />
    </div>
  );
};

export default ChargeCaptureAndCodingPage;
