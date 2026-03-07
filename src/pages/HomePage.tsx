import { PageTransition } from '../components/PageTransition';
import { Hero } from '../components/Hero';
import { SearchBar } from '../components/SearchBar';
import { LuxuryFeatures } from '../components/LuxuryFeatures';
import { StatsBar } from '../components/StatsBar';
import { FeaturedProperties } from '../components/FeaturedProperties';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Services } from '../components/Services';
import { Story } from '../components/Story';
import { Testimonials } from '../components/Testimonials';
import { MapSection } from '../components/MapSection';
import { BlogInsights } from '../components/BlogInsights';
import { CTABanner } from '../components/CTABanner';

export function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <SearchBar />
      <LuxuryFeatures />
      <StatsBar />
      <FeaturedProperties />
      <WhyChooseUs />
      <Services />
      <Story />
      <Testimonials />
      <MapSection />
      <BlogInsights />
      <CTABanner />
    </PageTransition>
  );
}
