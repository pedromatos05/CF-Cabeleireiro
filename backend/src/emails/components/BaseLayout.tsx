import * as React from 'react'
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Link,
  Hr,
} from '@react-email/components'
import { brand, fontStack } from '../theme'

interface BaseLayoutProps {
  /** Texto de pré-visualização (snippet) mostrado na caixa de entrada. */
  previewText: string
  children: React.ReactNode
}

/**
 * Layout base reutilizável por TODOS os emails (confirmação, "pedido
 * recebido" futuro, etc.). Para criar um novo template, embrulhe o conteúdo
 * em <BaseLayout previewText="...">...</BaseLayout> — não é preciso mexer aqui.
 *
 * Usa primitivas do React Email (tabelas + estilos inline) para máxima
 * compatibilidade com Gmail / Outlook / clientes móveis.
 */
export function BaseLayout({ previewText, children }: BaseLayoutProps) {
  return (
    <Html lang="pt">
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          {/* ---- Cabeçalho (faixa castanha com o nome do salão) ---- */}
          <Section style={headerStyle}>
            {/*
              TODO(logo): quando houver um URL público (após o deploy), trocar
              o texto abaixo por:
              <Img src="https://cfcabeleireiro.pt/logo.png" alt="CF Cabeleireiro"
                   width="180" style={{ margin: '0 auto' }} />
            */}
            <Text style={headerTitleStyle}>CF Cabeleireiro</Text>
          </Section>

          {/* ---- Conteúdo ---- */}
          <Section style={contentStyle}>{children}</Section>

          <Hr style={hrStyle} />

          {/* ---- Rodapé ---- */}
          <Section style={footerStyle}>
            <Text style={footerBrandStyle}>CF Cabeleireiro</Text>
            <Text style={footerMutedStyle}>
              {/* TODO: substituir pela morada e telefone reais do salão */}
              Morada do salão, 0000-000 Localidade · +351 9XX XXX XXX
            </Text>
            <Text style={footerMutedStyle}>
              {/* TODO: confirmar o handle real do Instagram */}
              <Link style={footerLinkStyle} href="https://instagram.com/cfcabeleireiro">
                @cfcabeleireiro
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// ---- Estilos inline (email-safe) -------------------------------------------

const bodyStyle: React.CSSProperties = {
  backgroundColor: brand.cream100,
  fontFamily: fontStack,
  margin: 0,
  padding: '24px 0',
}

const containerStyle: React.CSSProperties = {
  backgroundColor: brand.white,
  borderRadius: 12,
  overflow: 'hidden',
  maxWidth: 560,
  margin: '0 auto',
  border: `1px solid ${brand.brown100}`,
}

const headerStyle: React.CSSProperties = {
  backgroundColor: brand.brown600,
  padding: '28px 32px',
  textAlign: 'center',
}

const headerTitleStyle: React.CSSProperties = {
  color: brand.cream50,
  fontSize: 24,
  fontWeight: 700,
  letterSpacing: 0.5,
  margin: 0,
}

const contentStyle: React.CSSProperties = {
  padding: '32px',
}

const hrStyle: React.CSSProperties = {
  borderColor: brand.brown100,
  margin: 0,
}

const footerStyle: React.CSSProperties = {
  padding: '24px 32px',
  textAlign: 'center',
}

const footerBrandStyle: React.CSSProperties = {
  color: brand.brown600,
  fontSize: 14,
  fontWeight: 700,
  margin: '0 0 4px',
}

const footerMutedStyle: React.CSSProperties = {
  color: brand.brown400,
  fontSize: 12,
  lineHeight: '18px',
  margin: 0,
}

const footerLinkStyle: React.CSSProperties = {
  color: brand.brown500,
  textDecoration: 'underline',
}
