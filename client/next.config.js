/** @type {import('next').NextConfig} */

// Content-Security-Policy
// - 'unsafe-inline' em script/style é necessário porque o Next (App Router)
//   injeta scripts/estilos inline na hidratação e o site é estático (sem nonce,
//   que obrigaria a renderização dinâmica). Como não há input de utilizador
//   nem backend, o risco de XSS é mínimo.
// - 'unsafe-eval' SÓ em desenvolvimento: o React usa eval() para ferramentas de
//   debug no `next dev`. Em produção nunca usa eval(), por isso fica de fora
//   (CSP mais restrito e seguro no site publicado).
// - frame-src google.com: permite o embed do mapa em ContactMap.
const isDev = process.env.NODE_ENV !== 'production'
const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
  : "script-src 'self' 'unsafe-inline'"

const csp = [
  "default-src 'self'",
  scriptSrc,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "frame-src https://www.google.com https://maps.google.com",
  "connect-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  // Impede que o browser "adivinhe" tipos de ficheiro (MIME sniffing)
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Clickjacking: ninguém pode meter o site dentro de um iframe externo
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Não envia o caminho completo como referrer para outros sites
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Força HTTPS durante 2 anos (inclui subdomínios)
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  // Desliga APIs do browser que o site não usa
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
]

const nextConfig = {
  async headers() {
    return [
      {
        // Aplica os cabeçalhos a todas as rotas
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

module.exports = nextConfig
