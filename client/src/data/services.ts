// ⬇️ EDITA AQUI: tabela de serviços mostrada na homepage (sem preços).
export type MenuCategory = {
  name: string
  items: string[]
}

export const serviceMenu: MenuCategory[] = [
  {
    name: 'Styling',
    items: ['Lavar e Secar', 'Ondas Prancha', 'Ondas Babyliss'],
  },
  {
    name: 'Corte',
    items: ['Corte Feminino', 'Corte Masculino', 'Corte Infantil', 'Suplemento de Corte'],
  },
  {
    name: 'Cor',
    items: [
      'Coloração',
      'Matização',
      'Coloração + Matização',
      'Coloração + Corte',
      'Matização + Corte',
    ],
  },
  {
    name: 'Técnicos',
    items: ['Nuances', 'Balayage', 'Blond Balayage'],
  },
  {
    name: 'Tratamentos',
    items: [
      'Hidratação Botox',
      'Hidratação Liss',
      'Hidratação Reconstrutora (Âmpola)',
      'Aplicação de Âmpola',
    ],
  },
  {
    name: 'Aplicações & Outros',
    items: ['Alisamento', 'Extensões (Banda)', 'Manutenção de Extensões'],
  },
  {
    name: 'Penteados',
    items: ['Penteado', 'Penteado Noiva (Salão)', 'Penteado Noiva (Domicílio)'],
  },
  // ⬇️ Serviços de Estética (Sandrinha) — sem preços
  {
    name: 'Massagens',
    items: [
      'Massagem Relaxamento',
      'Pack Massagem Corpo Completo',
      'Pack Massagem Corpo Localizada',
      'Massagem Relaxamento Costas',
    ],
  },
  {
    name: 'Tratamentos de Rosto & Corpo',
    items: ['Tratamento de Rosto', 'Tratamento Exfoliante Corpo'],
  },
  {
    name: 'Manicure & Pedicure',
    items: [
      'Manicure Gelinho',
      'Manicure Completa',
      'Manicure (Pintar)',
      'Pedicure Completa',
      'Pedicure (Pintar)',
      'Pedicure Completa + Gelinho',
    ],
  },
  {
    name: 'Epilação',
    items: [
      'Sobrancelha',
      'Buço',
      'Buço + Queixo',
      'Maçãs do Rosto',
      'Virilhas',
      'Axilas',
      'Perna - Meia',
      'Perna - Completa',
      'Peito',
      'Costas',
      'Epilação Completa',
    ],
  },
  {
    name: 'Maquilhagem',
    items: [
      'Maquilhagem',
      'Maquilhagem com Pestanas',
      'Maquilhagem Noiva (Salão)',
      'Maquilhagem Noiva (Domicílio)',
    ],
  },
]
