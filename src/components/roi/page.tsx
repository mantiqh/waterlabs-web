import PageMotion from '@/components/common/page-motion';

import ROIAssessmentSection from './assessment-section';
import ROICalculatorSection from './calculator-section';
import ROICtaBanner from './cta-banner';
import ROIHeroSection from './hero-section';
import ROIProofBand from './proof-band';
import ROISampleReportSection from './sample-report-section';

export const ROIPage = () => {
  return (
    <div
      data-motion-root
      data-motion-state="pending"
      className="flex w-full flex-col overflow-x-clip"
    >
      <PageMotion />
      <ROIHeroSection />
      <ROIProofBand />
      <ROICalculatorSection />
      <ROISampleReportSection />
      <ROIAssessmentSection />
      <ROICtaBanner />
    </div>
  );
};

export default ROIPage;
