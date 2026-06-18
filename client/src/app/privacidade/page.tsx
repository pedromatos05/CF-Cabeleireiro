import type { Metadata } from 'next'
import { LegalPage, LegalSection } from '@/components/legal/Legal'
import { business, cnpd } from '@/data/legal'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description:
    'Como o CF Cabeleireiro recolhe, utiliza e protege os seus dados pessoais, nos termos do RGPD.',
}

export default function PrivacidadePage() {
  return (
    <LegalPage title="Política de Privacidade" lastUpdated={business.lastUpdated}>
      <LegalSection n={1} title="Responsável pelo tratamento">
        <p>
          O responsável pelo tratamento dos seus dados pessoais é o{' '}
          <strong>{business.legalName}</strong> (NIF {business.nif}), com morada em{' '}
          {business.addressLine1}, {business.addressLine2}, {business.country}. Para qualquer
          questão relacionada com a proteção de dados, pode contactar-nos através do email{' '}
          <strong>{business.email}</strong> ou do telefone {business.phone}.
        </p>
      </LegalSection>

      <LegalSection n={2} title="Dados que recolhemos">
        <p>Tratamos apenas os dados necessários para lhe prestar os nossos serviços:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Nome;</li>
          <li>Endereço de email;</li>
          <li>Número de telemóvel;</li>
          <li>Pedidos e histórico de marcações (serviços, profissional, data e hora).</li>
        </ul>
      </LegalSection>

      <LegalSection n={3} title="Finalidades e fundamento legal">
        <p>Utilizamos os seus dados para:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Gerir a sua conta de cliente e autenticação (execução do contrato);</li>
          <li>
            Processar e gerir os seus pedidos de marcação e contactá-lo sobre os mesmos (execução
            do contrato);
          </li>
          <li>Cumprir obrigações legais e fiscais aplicáveis (obrigação legal);</li>
          <li>Responder a contactos e pedidos de informação (interesse legítimo).</li>
        </ul>
      </LegalSection>

      <LegalSection n={4} title="Conservação dos dados">
        <p>
          Conservamos os seus dados apenas durante o período necessário às finalidades acima
          descritas e pelos prazos legais aplicáveis. Quando deixarem de ser necessários, os dados
          são eliminados ou anonimizados. Pode também solicitar a eliminação da sua conta a
          qualquer momento na sua área de cliente.
        </p>
      </LegalSection>

      <LegalSection n={5} title="Partilha com terceiros">
        <p>
          Não vendemos os seus dados pessoais. Os dados podem ser tratados por prestadores de
          serviços que nos apoiam (por exemplo, fornecedores de alojamento e de base de dados), que
          atuam como subcontratantes, apenas seguindo as nossas instruções e com garantias adequadas
          de segurança. Podemos ainda comunicar dados a autoridades quando legalmente exigido.
        </p>
      </LegalSection>

      <LegalSection n={6} title="Os seus direitos">
        <p>
          Nos termos do RGPD, tem direito a aceder, retificar, apagar, limitar ou opor-se ao
          tratamento dos seus dados, bem como o direito à portabilidade. Para exercer estes
          direitos, contacte-nos através do email <strong>{business.email}</strong>.
        </p>
        <p>
          Caso considere que o tratamento dos seus dados não cumpre a lei, pode apresentar
          reclamação junto da{' '}
          <a
            href={cnpd.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brown-700 underline hover:text-brown-900"
          >
            {cnpd.name}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection n={7} title="Cookies">
        <p>
          Este site utiliza cookies estritamente necessários ao seu funcionamento e à sua sessão de
          cliente. Não utilizamos cookies de publicidade ou de seguimento sem o seu consentimento.
          Pode gerir os cookies nas definições do seu navegador.
        </p>
      </LegalSection>

      <LegalSection n={8} title="Segurança">
        <p>
          Adotamos medidas técnicas e organizativas adequadas para proteger os seus dados contra
          acesso, perda ou divulgação não autorizados.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
