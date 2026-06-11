import Hero from '@/components/home/Hero'
import ServiceHighlights from '@/components/home/ServiceHighlights'
import Reviews from '@/components/home/Reviews'
import BrandLogos from '@/components/home/BrandLogos'
import InstagramFeed from '@/components/home/InstagramFeed'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceHighlights />
      <Reviews />
      <BrandLogos />
      <InstagramFeed />
    </>
  )
}
