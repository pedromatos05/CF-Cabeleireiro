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

      <LegalSection n={2} title="Dados que tratamos">
        <p>
          Este site é meramente informativo: não dispõe de formulários, registo de conta nem
          marcação online, pelo que não recolhe dados pessoais que nos forneça diretamente através
          do site. Apenas tratamos dados pessoais quando nos contacta voluntariamente — por
          telefone, email ou redes sociais — e, nesse caso, apenas os dados que nos transmitir (por
          exemplo, nome e contacto) para lhe responder.
        </p>
      </LegalSection>

      <LegalSection n={3} title="Finalidades e fundamento legal">
        <p>Quando nos contacta, utilizamos os seus dados apenas para:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Responder ao seu contacto e prestar a informação ou marcação solicitada (diligências
            pré-contratuais e interesse legítimo);
          </li>
          <li>
            Cumprir obrigações legais e fiscais aplicáveis, quando haja prestação de serviços
            (obrigação legal).
          </li>
        </ul>
      </LegalSection>

      <LegalSection n={4} title="Conservação dos dados">
        <p>
          Conservamos os dados que nos transmitir apenas durante o tempo necessário para responder
          ao seu contacto e pelos prazos legais aplicáveis. Quando deixam de ser necessários, os
          dados são eliminados. Pode solicitar a eliminação dos seus dados a qualquer momento
          através do email <strong>{business.email}</strong>.
        </p>
      </LegalSection>

      <LegalSection n={5} title="Terceiros e mapa">
        <p>
          Não vendemos os seus dados pessoais. Este site incorpora um mapa do Google Maps para
          indicar a nossa localização; ao carregar esse mapa, o Google pode recolher dados (como o
          seu endereço IP) nos termos da política de privacidade do Google. O alojamento do site
          pode ser assegurado por prestadores que atuam como subcontratantes, seguindo as nossas
          instruções. Podemos ainda comunicar dados a autoridades quando legalmente exigido.
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
          Este site utiliza apenas cookies estritamente necessários ao seu funcionamento. O mapa do
          Google Maps incorporado pode, contudo, definir cookies próprios do Google. Não utilizamos
          cookies de publicidade ou de seguimento. Pode gerir os cookies nas definições do seu
          navegador.
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
