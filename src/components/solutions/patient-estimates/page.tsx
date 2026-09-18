import PatientEstimatesCTASection from './cta-section';
import PatientEstimatesHeroSection from './hero-section';
import HowWaterlabsClosesSection from './how-waterlabs-closes';
import HumanInTheLoopSection from './human-in-the-loop';
import TheProblemSection from './the-problem';
import ThisIsntJustPatientEstimatesSection from './this-isnt-just-patient-estimates';

export const PatientEstimatesPage = () => {
  return (
    <div className="w-full flex flex-col">
      <PatientEstimatesHeroSection />
      <TheProblemSection />
      <HowWaterlabsClosesSection />
      <HumanInTheLoopSection />
      <ThisIsntJustPatientEstimatesSection />
      <PatientEstimatesCTASection />
    </div>
  );
};

export default PatientEstimatesPage;
