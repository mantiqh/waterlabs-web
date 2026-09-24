import ROIAssessmentSection from './assessment-section';
import ROICalculatorSection from './calculator-section';
import ROICtaBanner from './cta-banner';
import ROIHeroSection from './hero-section';
import ROIProofBand from './proof-band';
import ROISampleReportSection from './sample-report-section';

export const ROIPage = () => {
  return (
    <main className="w-full flex flex-col">
      <ROIHeroSection />
      <ROIProofBand />
      <ROICalculatorSection />
      <ROISampleReportSection />
      <ROIAssessmentSection />
      <ROICtaBanner />
    </main>
  );
};

export default ROIPage;
