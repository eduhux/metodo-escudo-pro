# Método Escudo PRO — Plataforma de Curso

Plataforma própria para vender e entregar o curso **Método Escudo PRO** (desenvolvimento de escudos esportivos no CorelDRAW, do zero ao avançado). Inclui uma landing page de vendas e um portal do aluno.

Construída com **Next.js 15, React 19, TypeScript, Tailwind CSS, Shadcn/UI, Framer Motion, Firebase (Auth + Firestore)**, com pagamento via **Kiwify** (webhook) e vídeos no **Panda Video**. Pronta para **GitHub + Vercel**.

---

## ✨ Recursos

- **Landing page premium** (dark theme, glassmorphism, micro-animações): hero, benefícios, conteúdo do curso, para quem é, depoimentos, garantia, FAQ e CTA final.
- **Autenticação** com Firebase: login, recuperação e definição de senha.
- **Portal do aluno**: dashboard com progresso e "continuar assistindo", página do curso em duas colunas com player do Panda, marcar aula como concluída, materiais para download e navegação entre aulas.
- **Perfil**: dados da conta, alterar senha, sair.
- **Webhook da Kiwify**: cria o usuário, libera acesso e envia o e-mail de definição de senha automaticamente após o pagamento aprovado.
- **Modo mock**: rode tudo localmente sem configurar Firebase/Panda.

---

## 🚀 Começando (modo demonstração)

```bash
npm install
npm run dev
```

Abra http://localhost:3000. O projeto já vem com `NEXT_PUBLIC_MOCK_MODE=true` como padrão quando não há chaves — no login, **qualquer e-mail e senha** entram na plataforma. Perfeito para ver o design e o fluxo antes de plugar os serviços reais.

Copie `.env.example` para `.env.local` para começar a configurar.

---

## 🔑 Configuração de produção

### 1. Firebase

1. Crie um projeto em https://console.firebase.google.com
2. Ative **Authentication → Email/senha** e o **Firestore Database**.
3. Em *Configurações do projeto → Seus apps (Web)*, copie as credenciais para o `.env.local` (variáveis `NEXT_PUBLIC_FIREBASE_*`).
4. Em *Contas de serviço*, gere uma nova chave privada (JSON) e preencha `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL` e `FIREBASE_PRIVATE_KEY`.
5. Defina `NEXT_PUBLIC_MOCK_MODE=false`.

**Estrutura do Firestore:**

```
users/{uid}          -> { nome, email, acessoLiberado, kiwifyOrderId, ultimaAulaId, criadoEm }
progress/{uid}       -> { aulasConcluidas, ultimaAulaId, percentual, atualizadoEm }
courses/{id}         -> curso, módulos e aulas (opcional; hoje em src/data/course.ts)
```

> O conteúdo do curso vive em `src/data/course.ts`. Para gerenciar pelo Firestore, migre essa estrutura para a coleção `courses` — as interfaces em `src/types` já refletem o modelo.

### 2. Panda Video

1. Faça upload dos vídeos no Panda Video.
2. Copie o **subdomínio do player** (algo como `player-vz-xxxx`) para `NEXT_PUBLIC_PANDA_PLAYER_SUBDOMAIN`.
3. Em `src/data/course.ts`, troque cada `pandaVideoId` (`DEMO-VIDEO-ID-*`) pelo ID real do vídeo. O player carrega automaticamente ao abrir a aula.

### 3. Kiwify

1. Configure o botão **Comprar Agora** definindo `NEXT_PUBLIC_KIWIFY_CHECKOUT_URL` com a URL do seu checkout.
2. No painel da Kiwify, cadastre o **webhook** apontando para:
   `https://SEU-DOMINIO/api/webhooks/kiwify`
3. Copie o **token do webhook** para `KIWIFY_WEBHOOK_TOKEN` (usado para validar a assinatura HMAC-SHA1).

Quando um pagamento é aprovado, o webhook cria o usuário no Firebase, marca `acessoLiberado: true` e envia o e-mail de definição de senha.

### 4. E-mail (opcional, recomendado)

Para envio real dos e-mails, crie uma conta na [Resend](https://resend.com), gere uma API key e preencha `RESEND_API_KEY` e `EMAIL_FROM`. Sem isso, o link de definição de senha é apenas registrado no log do servidor (útil em desenvolvimento).

---

## 📦 Deploy (GitHub + Vercel)

1. Suba o projeto para um repositório no GitHub:

   ```bash
   git init
   git add .
   git commit -m "feat: plataforma Método Escudo PRO"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/metodo-escudo-pro.git
   git push -u origin main
   ```

2. Em https://vercel.com, clique em **Add New → Project** e importe o repositório.
3. Em **Environment Variables**, adicione todas as variáveis do `.env.example` com os valores reais (defina `NEXT_PUBLIC_MOCK_MODE=false` e `NEXT_PUBLIC_SITE_URL=https://seu-dominio`).
4. Clique em **Deploy**. A Vercel detecta o Next.js automaticamente.
5. Depois do deploy, atualize a URL do webhook na Kiwify com o domínio da Vercel.

---

## 🗂️ Estrutura do projeto

```
src/
├── app/
│   ├── (marketing)/        # Landing page + layout público
│   ├── (auth)/             # login, recuperar-senha, definir-senha
│   ├── (app)/              # dashboard, curso/[aulaId], perfil (protegido)
│   ├── api/webhooks/kiwify # endpoint do webhook
│   └── layout.tsx          # root (tema dark, fontes, providers)
├── components/
│   ├── ui/                 # Shadcn/UI (button, card, accordion, ...)
│   ├── marketing/          # seções da landing
│   ├── course/             # player Panda, lista de aulas
│   ├── dashboard/          # anel de progresso
│   ├── app/                # navbar do portal
│   └── shared/             # logo, animações, seções
├── context/auth-context.tsx
├── lib/                    # firebase, kiwify, email, progress, config, utils
├── data/                   # course.ts (conteúdo) e site.ts (copy)
└── types/                  # tipagens (User, Course, Module, Lesson, Progress)
```

---

## 🎨 Design

Dark theme inspirado em Apple, Linear e Vercel: glassmorphism discreto, bordas suaves, tipografia Inter, espaçamento generoso e micro-animações com Framer Motion. As cores e tokens ficam em `src/app/globals.css` (variáveis CSS) e `tailwind.config.ts`. A cor de destaque (âmbar) pode ser trocada ajustando a variável `--primary`.

---

## 📝 Checklist para ir ao ar

- [ ] `NEXT_PUBLIC_MOCK_MODE=false`
- [ ] Variáveis do Firebase (client e admin) preenchidas
- [ ] `pandaVideoId` reais em `src/data/course.ts`
- [ ] `NEXT_PUBLIC_KIWIFY_CHECKOUT_URL` e `KIWIFY_WEBHOOK_TOKEN`
- [ ] Webhook cadastrado na Kiwify
- [ ] Provider de e-mail (Resend) configurado
- [ ] Textos, depoimentos e preço revisados em `src/data/site.ts`
```
