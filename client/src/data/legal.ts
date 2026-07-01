// Dados legais e de identificação do estabelecimento.
// ⬇️ EDITA AQUI: preenche os campos marcados como [PREENCHER] com os dados reais.
// Estes dados são exigidos por lei em Portugal (DL 7/2004, RGPD, Lei 144/2015, DL 156/2005).

export const business = {
  // Designação legal / comercial
  legalName: 'CF Cabeleireiro', // [PREENCHER se o nome jurídico for diferente, ex.: "Nome Unipessoal, Lda."]
  brandName: 'CF Cabeleireiro',

  // Número de Identificação Fiscal (obrigatório identificar o prestador)
  nif: '519 060 792',

  // Morada
  addressLine1: 'R. Victor de Sá, 59',
  addressLine2: '4715-213 Braga',
  city: 'Braga',
  country: 'Portugal',

  // Contactos
  phone: '+351 962 902 306',
  phoneHref: 'tel:+351962902306',
  email: 'cfcabeleireiroo@gmail.com',
  instagram: '@cf.cabeleireiroo',
  instagramUrl: 'https://www.instagram.com/cf.cabeleireiroo',

  // Última atualização dos documentos legais
  lastUpdated: '18 de junho de 2026',
}

// Livro de Reclamações eletrónico (obrigatório — DL 156/2005)
export const livroReclamacoes = 'https://www.livroreclamacoes.pt/inicio'

// Entidade de Resolução Alternativa de Litígios de Consumo (Lei 144/2015).
// Para Braga, a entidade competente é o CIAB — Tribunal Arbitral de Consumo.
export const ral = {
  name: 'CIAB — Tribunal Arbitral de Consumo',
  description:
    'Centro de Informação, Mediação e Arbitragem de Consumo (Tribunal Arbitral de Consumo)',
  url: 'https://www.ciab.pt',
  phone: '+351 253 617 604',
}

// Autoridade de proteção de dados
export const cnpd = {
  name: 'Comissão Nacional de Proteção de Dados (CNPD)',
  url: 'https://www.cnpd.pt',
}
