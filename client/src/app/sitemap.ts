import type { MetadataRoute } from 'next'
import { brands } from '@/data/brands'
import { siteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages = ['', '/noivas', '/trabalhos', '/tendencias', '/privacidade', '/termos']

  const pages: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.7,
  }))

  const brandPages: MetadataRoute.Sitemap = brands.map((brand) => ({
    url: `${siteUrl}/marcas/${brand.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...pages, ...brandPages]
}
