import Hero from '@/components/home/Hero'
import SalonAbout from '@/components/home/SalonAbout'
import ServicesMenu from '@/components/home/ServicesMenu'
import Team from '@/components/home/Team'
import BrandLogos from '@/components/home/BrandLogos'
import ContactMap from '@/components/home/ContactMap'

export default function HomePage() {
  return (
    <>
      <Hero />
      <SalonAbout />
      <ServicesMenu />
      <Team />
      <BrandLogos />
      <ContactMap />
    </>
  )
}
