// Marcas utilizadas no salão. Cada marca tem a sua própria página em /marcas/[slug].
//
// ⬇️ PARA ADICIONAR/TROCAR FOTOS DOS PRODUTOS:
// 1. Coloca a imagem em /client/public/  (ou numa subpasta) e atualiza `image`.
// 2. Atualiza `width` e `height` com as dimensões reais da imagem (para manter a proporção).

export type BrandGama = {
  name: string
  description?: string
  image?: string
  width?: number
  height?: number
}

export type Brand = {
  slug: string
  name: string
  parent?: string
  logo: string
  imgClass?: string // ajuste fino do logótipo dentro do círculo (homepage)
  shortDescription: string // mostrado na homepage
  intro: string // mostrado no topo da página da marca
  productLayout: 'square3' | 'natural2' // square3 = 3 colunas quadradas; natural2 = 2 colunas formato natural
  gamas: BrandGama[]
}

export const brands: Brand[] = [
  {
    slug: 'system-professional',
    name: 'System Professional',
    parent: 'Wella Professionals',
    logo: '/SystemProfessional.png',
    shortDescription:
      'Cuidados capilares de alta performance e personalizados para o seu cabelo. Utilizamos fórmulas científicas avançadas para reparar profundamente a fibra capilar e garantir um brilho saudável e duradouro.',
    intro:
      'A System Professional, da Wella Professionals, oferece cuidados capilares à medida, com diagnóstico personalizado. Cada gama responde a uma necessidade específica do cabelo e do couro cabeludo, com fórmulas de alta cosmética para resultados duradouros.',
    productLayout: 'square3',
    gamas: [
      {
        name: 'Produtos Icónicos',
        description: 'Os produtos de referência da System Professional.',
        image: '/SystemPro_01_Produtos-Iconicos.jpg',
        width: 2977,
        height: 2105,
      },
      {
        name: 'Color Save',
        description: 'Proteção e brilho para cabelo pintado.',
        image: '/SystemPro_06_Color-Lock-Emulsion.jpg',
        width: 1488,
        height: 2105,
      },
      {
        name: 'LuxeOil',
        description: 'Suavidade e brilho com tratamento à base de óleos.',
        image: '/SystemPro_03_LuxeOil-Reconstructive-Elixir.jpg',
        width: 1488,
        height: 2105,
      },
      {
        name: 'Balance Energy',
        description: 'Cuidado e equilíbrio do couro cabeludo.',
        image: '/SystemPro_04_Balance-Energy-Serum.jpg',
        width: 1488,
        height: 2105,
      },
      {
        name: 'Alpha Energy',
        description: 'Energia e vitalidade para o cabelo.',
        image: '/SystemPro_05_Alpha-Energy.jpg',
        width: 1488,
        height: 2105,
      },
      {
        name: 'Liquid Hair',
        description: 'Reconstrução molecular do cabelo frágil e sensibilizado.',
        image: '/SystemPro_02_Liquid-Hair.jpg',
        width: 1488,
        height: 2105,
      },
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
    productLayout: 'natural2',
    gamas: [
      {
        name: 'Dark Oil',
        description:
          'Suavidade e brilho sem peso. Óleo de styling icónico, champô, condicionador e bruma para um acabamento sedoso.',
        image: '/Sebastian_01_Dark-Oil.jpg',
        width: 2912,
        height: 1199,
      },
      {
        name: 'No Breaker',
        description:
          'Força e anti-quebra. Tratamentos que reforçam as ligações do cabelo e reduzem a quebra.',
        image: '/Sebastian_02_No-Breaker.jpg',
        width: 2912,
        height: 1199,
      },
      {
        name: 'Penetraitt',
        description:
          'Reparação profunda. Nutre e preenche o cabelo danificado, estressado ou com coloração.',
        image: '/Sebastian_03_Penetraitt.jpg',
        width: 2912,
        height: 1199,
      },
      {
        name: 'Hydre',
        description: 'Hidratação intensa e anti-frizz para um cabelo suave e com movimento.',
        image: '/Sebastian_04_Hydre.jpg',
        width: 2912,
        height: 1199,
      },
      {
        name: 'Volupt',
        description: 'Máximo volume com movimento, ideal para cabelo fino, com leveza e corpo.',
        image: '/Sebastian_05_Volupt.jpg',
        width: 2912,
        height: 1199,
      },
      {
        name: 'Twisted',
        description:
          'Cuidado e definição para cabelo encaracolado, com flexibilidade e controlo do frizz.',
        image: '/Sebastian_06_Twisted.jpg',
        width: 2912,
        height: 1199,
      },
      {
        name: 'Potion 9',
        description:
          'Nutrição e multibenefícios. O creme de styling tudo-em-um com 9 ingredientes botânicos.',
        image: '/Sebastian_07_Potion-9.jpg',
        width: 1488,
        height: 2105,
      },
      {
        name: 'Texturizers · Sprays',
        description: 'Sprays de textura, fixação e brilho.',
        image: '/Sebastian_08_Texturizers-Sprays.jpg',
        width: 2912,
        height: 1199,
      },
      {
        name: 'Texturizers · Géis & Mousse',
        description: 'Géis e mousses para acabamento, fixação e controlo.',
        image: '/Sebastian_09_Texturizers-Geis-Mousse.jpg',
        width: 2912,
        height: 1199,
      },
      {
        name: 'Texturizers · Ceras',
        description: 'Ceras e pastas para textura e definição.',
        image: '/Sebastian_10_Texturizers-Ceras.jpg',
        width: 2912,
        height: 1199,
      },
      {
        name: 'Shapers',
        description:
          'Lacas e sprays de fixação para dar forma, moldar e manter o penteado todo o dia.',
        image: '/Sebastian_11_Shapers.jpg',
        width: 1488,
        height: 1305,
      },
      {
        name: 'Specialists',
        description: 'Gama multitarefa para cabelo, barba e corpo.',
        image: '/Sebastian_12_Specialists.jpg',
        width: 2912,
        height: 1199,
      },
      {
        name: 'Cellophanes',
        description:
          'Brilho com cor. Coloração semi-permanente translúcida (serviço de salão), sem amoníaco.',
        image: '/Sebastian_13_Cellophanes.jpg',
        width: 1548,
        height: 2105,
      },
    ],
  },
]

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug)
}
