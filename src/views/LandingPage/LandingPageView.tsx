import LandingNavbar from './components/LandingNavbar';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import FeaturesSection from './components/FeaturesSection';
import WorkflowVisualSection from './components/WorkflowVisualSection';
import BenefitsSection from './components/BenefitsSection';
import CtaSection from './components/CtaSection';
import LandingFooter from './components/LandingFooter';

export default function LandingPageView() {
  return (
    <div className="min-h-screen bg-#FAF8F5 flex flex-col justify-between selection:bg-#263B35 selection:text-white">
      <LandingNavbar />
      <main className="flex-1">
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <WorkflowVisualSection />
        <BenefitsSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  );
}
