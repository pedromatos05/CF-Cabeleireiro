export type ServiceCategory = {
  slug: string
  name: string
  image: string
  description: string
}

// ⬇️ EDITA AQUI: categorias mostradas na homepage. As fotos vão para
// /client/public/images/services/ com os nomes abaixo.
export const serviceCategories: ServiceCategory[] = [
  {
    slug: 'styling',
    name: 'Styling',
    image: '/images/services/styling.jpg',
    description: 'Lavar, secar e ondas para um acabamento perfeito.',
  },
  {
    slug: 'corte',
    name: 'Corte',
    image: '/images/services/corte.jpg',
    description: 'Cortes femininos, masculinos e infantis.',
  },
  {
    slug: 'cor',
    name: 'Cor',
    image: '/services/Loiro.jpg',
    description: 'Coloração e matização à medida do seu estilo.',
  },
  {
    slug: 'tecnicos',
    name: 'Técnicos',
    image: '/images/services/tecnicos.jpg',
    description: 'Nuances, balayage e blond balayage.',
  },
  {
    slug: 'tratamentos',
    name: 'Tratamentos',
    image: '/images/services/tratamentos.jpg',
    description: 'Hidratação e reconstrução que regeneram o cabelo.',
  },
  {
    slug: 'aplicacoes',
    name: 'Aplicações & Outros',
    image: '/images/services/aplicacoes.jpg',
    description: 'Alisamento, extensões e manutenção.',
  },
  {
    slug: 'penteados',
    name: 'Penteados',
    image: '/Services/Casamento.png',
    description: 'Penteados para eventos, noivas e ocasiões especiais.',
  },
]

export type ServiceItem = {
  id: string
  name: string
  category: string // slug da categoria
  duration: number // minutos
  price: number // euros
}

// ⬇️ EDITA AQUI: serviços de exemplo até a lista vir do backend.
export const services: ServiceItem[] = [
  { id: 'lavar-secar', name: 'Lavar + Secar', category: 'styling', duration: 30, price: 12 },
  { id: 'lavar-secar-ondas', name: 'Lavar + Secar + Ondas', category: 'styling', duration: 45, price: 16 },
  { id: 'corte-feminino', name: 'Corte Feminino', category: 'corte', duration: 45, price: 18 },
  { id: 'corte-masculino', name: 'Corte Masculino', category: 'corte', duration: 30, price: 12 },
  { id: 'corte-infantil', name: 'Corte Infantil', category: 'corte', duration: 30, price: 10 },
  { id: 'coloracao-raiz', name: 'Coloração de Raiz', category: 'cor', duration: 60, price: 28 },
  { id: 'coloracao-completa', name: 'Coloração Completa', category: 'cor', duration: 90, price: 40 },
  { id: 'matizacao', name: 'Matização', category: 'cor', duration: 45, price: 20 },
  { id: 'nuances', name: 'Nuances', category: 'tecnicos', duration: 90, price: 45 },
  { id: 'balayage', name: 'Balayage', category: 'tecnicos', duration: 120, price: 60 },
  { id: 'blond-balayage', name: 'Blond Balayage', category: 'tecnicos', duration: 150, price: 75 },
  { id: 'hidratacao', name: 'Hidratação Profunda', category: 'tratamentos', duration: 45, price: 22 },
  { id: 'reconstrucao', name: 'Reconstrução Capilar', category: 'tratamentos', duration: 60, price: 30 },
  { id: 'alisamento', name: 'Alisamento', category: 'aplicacoes', duration: 120, price: 80 },
  { id: 'extensoes', name: 'Aplicação de Extensões', category: 'aplicacoes', duration: 120, price: 120 },
  { id: 'manutencao-extensoes', name: 'Manutenção de Extensões', category: 'aplicacoes', duration: 60, price: 40 },
  { id: 'penteado-evento', name: 'Penteado para Eventos', category: 'penteados', duration: 60, price: 35 },
  { id: 'penteado-noiva', name: 'Penteado de Noiva', category: 'penteados', duration: 90, price: 60 },
]
