// Marcas utilizadas no salão. Cada marca tem a sua própria página em /marcas/[slug].
//
// ⬇️ PARA ADICIONAR FOTOS DOS PRODUTOS:
// 1. Coloca as imagens em /client/public/marcas/<slug-da-marca>/  (ex.: hydrate.jpg)
// 2. Preenche o campo `image` de cada gama com o caminho, ex.: image: '/marcas/system-professional/hydrate.jpg'
// Enquanto não houver imagem, aparece um espaço com o nome da gama.

export type BrandGama = {
  name: string
  description?: string
  image?: string
}

export type Brand = {
  slug: string
  name: string
  parent?: string
  logo: string
  imgClass?: string // ajuste fino do logótipo dentro do círculo (homepage)
  shortDescription: string // mostrado na homepage
  intro: string // mostrado no topo da página da marca
  gamas: BrandGama[]
}

export const brands: Brand[] = [
  {
    slug: 'system-professional',
    name: 'System Professional',
    parent: 'Wella Professionals',
    logo: '/SystemProfessional.png',
    imgClass: '-translate-y-[7%]',
    shortDescription:
      'Cuidados capilares de alta performance e personalizados para o seu cabelo. Utilizamos fórmulas científicas avançadas para reparar profundamente a fibra capilar e garantir um brilho saudável e duradouro.',
    intro:
      'A System Professional, da Wella Professionals, oferece cuidados capilares à medida, com diagnóstico personalizado. Cada gama responde a uma necessidade específica do cabelo e do couro cabeludo, com fórmulas de alta cosmética para resultados duradouros.',
    gamas: [
      { name: 'Hydrate', description: 'Hidratação para cabelo seco.' },
      { name: 'Color Save', description: 'Proteção e brilho para cabelo pintado.' },
      { name: 'Repair', description: 'Reparação profunda de cabelo danificado.' },
      { name: 'Volumize', description: 'Volume e corpo para cabelo fino.' },
      { name: 'Smoothen', description: 'Controlo de frizz e disciplina.' },
      { name: 'LuxeOil', description: 'Tratamento de luxo que nutre e fortalece.' },
    ],
  },
  {
    slug: 'sebastian-professional',
    name: 'Sebastian Professional',
    parent: 'Wella Professionals',
    logo: '/images/brands/sebastian-professional.webp',
    shortDescription:
      'Produtos inovadores para styling irreverente e texturas únicas. Ideais para criar looks modernos, combinando fixação flexível e movimento sem comprometer a saúde do seu cabelo.',
    intro:
      'A Sebastian Professional, da Wella Professionals, é sinónimo de styling criativo e texturas únicas. Combina cuidado e acabamento para criar looks modernos com movimento, brilho e personalidade.',
    gamas: [
      {
        name: 'Dark Oil',
        description:
          'Suavidade e brilho sem peso. Óleo de styling icónico, champô, condicionador e bruma para um acabamento sedoso.',
      },
      {
        name: 'No Breaker',
        description:
          'Força e anti-quebra. Tratamentos que reforçam as ligações do cabelo e reduzem a quebra.',
      },
      {
        name: 'Penetraitt',
        description:
          'Reparação profunda. Nutre e preenche o cabelo danificado, estressado ou com coloração.',
      },
      {
        name: 'Hydre',
        description: 'Hidratação intensa e anti-frizz para um cabelo suave e com movimento.',
      },
      {
        name: 'Volupt',
        description: 'Máximo volume com movimento, ideal para cabelo fino, com leveza e corpo.',
      },
      {
        name: 'Twisted',
        description:
          'Cuidado e definição para cabelo encaracolado, com flexibilidade e controlo do frizz.',
      },
      {
        name: 'Potion 9',
        description:
          'Nutrição e multibenefícios. O creme de styling tudo-em-um com 9 ingredientes botânicos.',
      },
      {
        name: 'Texturizers',
        description:
          'Textura e transformação. Sprays, géis, mousses e ceras para acabamento, fixação e controlo.',
      },
      {
        name: 'Shapers',
        description:
          'Lacas e sprays de fixação para dar forma, moldar e manter o penteado todo o dia.',
      },
      {
        name: 'Specialists',
        description: 'Gama multitarefa para cabelo, barba e corpo.',
      },
      {
        name: 'Cellophanes',
        description:
          'Brilho com cor. Coloração semi-permanente translúcida (serviço de salão), sem amoníaco.',
      },
    ],
  },
]

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug)
}
