import Hero from '@/components/home/Hero'
import SalonAbout from '@/components/home/SalonAbout'
import ServicesMenu from '@/components/home/ServicesMenu'
import CtaButtons from '@/components/home/CtaButtons'
import Team from '@/components/home/Team'
import BrandLogos from '@/components/home/BrandLogos'
import ContactMap from '@/components/home/ContactMap'
import Reveal from '@/components/ui/Reveal'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Reveal>
        <SalonAbout />
      </Reveal>
      <Reveal>
        <BrandLogos />
      </Reveal>
      <Reveal>
        <ServicesMenu />
      </Reveal>
      <Reveal>
        <CtaButtons />
      </Reveal>
      <Reveal>
        <Team />
      </Reveal>
      <Reveal>
        <ContactMap />
      </Reveal>
    </>
  )
}
