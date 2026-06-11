# CF Cabeleireiro 💈

Plataforma desenvolvida a dois para o salão CF Cabeleireiro, em Braga.
Inclui site de marcações para clientes, back-office de gestão para o cabeleireiro, e uma API partilhada.

## Estrutura do projeto

| Pasta | Descrição |
|-------|-----------|
| client/ | Site público — pesquisa de serviços, marcações e área de cliente |
| admin/ | Back-office — agenda, clientes, serviços e relatórios |
| backend/ | API REST — lógica de negócio e notificações |

## Stack
- Frontend (client + admin): Next.js 14, Tailwind CSS, TypeScript
- Backend: Node.js, Express, TypeScript
- Base de dados + Auth: Supabase (PostgreSQL)
- Email: Resend
- SMS: Twilio
