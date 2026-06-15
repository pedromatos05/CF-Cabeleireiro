type ReviewSource = 'Google' | 'Facebook'

type Review = {
  name: string
  rating: number // 1 a 5
  text: string
  source: ReviewSource
}

// ⬇️ EDITA AQUI: substitui pelos textos reais das avaliações do Google/Facebook.
// É só copiar nome, número de estrelas, comentário e a origem.
const reviews: Review[] = [
  {
    name: 'Ana Sofia',
    rating: 5,
    text: 'Profissionais excelentes e super atenciosos. Saí do salão a adorar o resultado, exatamente o que pedi. Recomendo a 100%!',
    source: 'Facebook',
  },
  {
    name: 'Marta Ribeiro',
    rating: 5,
    text: 'O melhor cabeleireiro de Braga, sem dúvida. Ambiente acolhedor, simpatia e um trabalho impecável de cada vez que vou.',
    source: 'Google',
  },
  {
    name: 'Joana Pereira',
    rating: 5,
    text: 'Fiz coloração e fiquei encantada. Cuidado ao detalhe e conselhos honestos sobre o que ficava melhor. Volto de certeza.',
    source: 'Facebook',
  },
  {
    name: 'Catarina Lopes',
    rating: 5,
    text: 'Atendimento simpático e pontual. Adoro o resultado do meu corte, dura semanas com bom aspeto. Equipa fantástica.',
    source: 'Google',
  },
  {
    name: 'Inês Carvalho',
    rating: 5,
    text: 'Espaço lindo e muito bem cuidado. Senti-me em boas mãos do início ao fim. Já é o meu salão de eleição em Braga.',
    source: 'Facebook',
  },
  {
    name: 'Rita Fernandes',
    rating: 5,
    text: 'Sempre que preciso de um look novo é aqui que venho. Ouvem o que queremos e fazem magia. Recomendo a toda a gente!',
    source: 'Google',
  },
]

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${i < rating ? 'text-brown-400' : 'text-cream-200'}`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.37 4.22a1 1 0 0 0 .95.69h4.44c.97 0 1.37 1.24.59 1.81l-3.6 2.61a1 1 0 0 0-.36 1.12l1.37 4.22c.3.92-.75 1.69-1.54 1.12l-3.59-2.61a1 1 0 0 0-1.18 0l-3.59 2.61c-.79.57-1.84-.2-1.54-1.12l1.37-4.22a1 1 0 0 0-.36-1.12L1.64 9.65c-.78-.57-.38-1.81.59-1.81h4.44a1 1 0 0 0 .95-.69L9.05 2.93Z" />
        </svg>
      ))}
    </div>
  )
}

function SourceIcon({ source }: { source: ReviewSource }) {
  if (source === 'Facebook') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#1877F2]" fill="currentColor" aria-label="Facebook">
        <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.25h3.32l-.53 3.49h-2.79V24C19.61 23.08 24 18.09 24 12.07Z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-label="Google">
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.86c2.26-2.09 3.56-5.17 3.56-8.87Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.09Z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42A11.97 11.97 0 0 0 12 0 11.99 11.99 0 0 0 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75Z" />
    </svg>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="w-[320px] shrink-0 px-3">
      <article className="flex h-full flex-col rounded-xl border border-cream-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <Stars rating={review.rating} />
          <SourceIcon source={review.source} />
        </div>
        <p className="flex-1 text-brown-600">“{review.text}”</p>
        <div className="mt-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brown-100 font-semibold text-brown-600">
            {review.name.charAt(0)}
          </span>
          <div>
            <p className="font-medium text-brown-700">{review.name}</p>
            <p className="text-xs text-brown-400">{review.source}</p>
          </div>
        </div>
      </article>
    </div>
  )
}

export default function Reviews() {
  const avg =
    Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10

  return (
    <section className="bg-gradient-to-b from-cream-50 to-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-3 text-center text-3xl font-bold text-brown-800">
          O que dizem os clientes
        </h2>
        <p className="mb-8 text-center text-brown-400">Opiniões reais, resultados reais</p>

        <div className="mb-12 flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold text-brown-700">{avg.toFixed(1)}</span>
            <Stars rating={Math.round(avg)} />
          </div>
          <p className="text-sm text-brown-400">
            Baseado em avaliações no Google e Facebook
          </p>
        </div>
      </div>

      {/* Carrossel contínuo — pausa quando passas o rato por cima para conseguires ler */}
      <div className="group relative overflow-hidden">
        {/* Esbatimento nas margens para a entrada/saída dos cards ser suave */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-cream-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-cream-50 to-transparent" />

        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {[...reviews, ...reviews].map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}
