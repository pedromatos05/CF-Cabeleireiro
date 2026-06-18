import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage, LegalSection } from '@/components/legal/Legal'
import { business, livroReclamacoes, ral } from '@/data/legal'

export const metadata: Metadata = {
  title: 'Termos e Condições',
  description:
    'Termos e condições de utilização do site e do serviço de marcações do CF Cabeleireiro.',
}

export default function TermosPage() {
  return (
    <LegalPage title="Termos e Condições" lastUpdated={business.lastUpdated}>
      <LegalSection n={1} title="Identificação">
        <p>
          Este site é propriedade do <strong>{business.legalName}</strong> (NIF {business.nif}),
          com morada em {business.addressLine1}, {business.addressLine2}, {business.country}.
          Contactos: {business.phone} · {business.email}.
        </p>
      </LegalSection>

      <LegalSection n={2} title="Objeto">
        <p>
          Estes termos regulam a utilização do site e do serviço de pedidos de marcação online do
          CF Cabeleireiro. Ao utilizar o site, declara aceitar os presentes termos.
        </p>
      </LegalSection>

      <LegalSection n={3} title="Pedidos de marcação">
        <p>
          As marcações efetuadas através do site constituem um{' '}
          <strong>pedido de marcação</strong> e não uma reserva confirmada. Cada pedido fica
          sujeito a aceitação ou recusa por parte da profissional a quem o serviço foi pedido.
          Receberá a resposta por email ou na sua área de cliente. Os preços e a duração dos
          serviços podem variar consoante a avaliação no salão.
        </p>
      </LegalSection>

      <LegalSection n={4} title="Conta de cliente">
        <p>
          É responsável por manter a confidencialidade dos seus dados de acesso e pela veracidade
          das informações fornecidas. Pode solicitar a eliminação da sua conta a qualquer momento.
        </p>
      </LegalSection>

      <LegalSection n={5} title="Proteção de dados">
        <p>
          O tratamento dos seus dados pessoais rege-se pela nossa{' '}
          <Link
            href="/privacidade"
            className="font-medium text-brown-700 underline hover:text-brown-900"
          >
            Política de Privacidade
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection n={6} title="Livro de Reclamações">
        <p>
          Nos termos da lei, este estabelecimento dispõe de Livro de Reclamações eletrónico,
          disponível em{' '}
          <a
            href={livroReclamacoes}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brown-700 underline hover:text-brown-900"
          >
            livroreclamacoes.pt
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection n={7} title="Resolução de litígios">
        <p>
          Em caso de litígio de consumo, o consumidor pode recorrer à entidade de resolução
          alternativa de litígios competente:
        </p>
        <p>
          <strong>{ral.name}</strong> — {ral.description}
          <br />
          <a
            href={ral.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brown-700 underline hover:text-brown-900"
          >
            {ral.url}
          </a>{' '}
          · {ral.phone}
        </p>
        <p className="text-sm text-brown-400">
          Mais informações em{' '}
          <a
            href="https://www.consumidor.gov.pt"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-brown-700"
          >
            consumidor.gov.pt
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection n={8} title="Lei aplicável">
        <p>
          Os presentes termos regem-se pela lei portuguesa. Para a resolução de qualquer litígio são
          competentes os tribunais portugueses, sem prejuízo do recurso à resolução alternativa de
          litígios.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
