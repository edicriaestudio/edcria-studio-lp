# EdCria Studio — Landing Page Cinematográfica & Minisites

Projeto autoral desenvolvido com React, Tailwind CSS, Framer Motion e motor cinematográfico Canvas 60 FPS (Mobile-First).

## Como rodar localmente

`ash
npm install
npm run dev
`

## Como fazer deploy na Vercel

1. Suba esta pasta para um repositório no seu GitHub (ex: edcria-studio-lp).
2. Acesse seu painel na [Vercel](https://vercel.com) e clique em **Add New Project**.
3. Importe o repositório do GitHub.
4. Framework Preset: **Vite** (detectado automaticamente).
5. Clique em **Deploy**.

## Conectar ao Subdomínio Oficial

Após o deploy na Vercel:
1. Vá em **Settings > Domains** na Vercel.
2. Adicione o seu subdomínio (ex: lp.edicria.com.br ou oferta.edicria.com.br).
3. No painel onde está o seu domínio edicria.com.br (ex: Registro.br ou Cloudflare), crie um registro **CNAME**:
   - **Nome:** lp (ou o prefixo escolhido)
   - **Destino / Valor:** cname.vercel-dns.com
4. Em instantes a sua página estará ativa com certificado SSL gratuito e alta autoridade!
