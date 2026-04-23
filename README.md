# Code4Girl — Alertas Automáticos de Arte 💜

Sistema que envia e-mail automático para os designers da comunidade **5 dias antes** de cada data comemorativa do calendário tech 2026.

---

## Como funciona

Todo dia às **9h (horário de Brasília)**, o GitHub Actions executa o script. Se algum evento estiver a exatamente 5 dias, um e-mail de alerta é disparado automaticamente para os designers com:

- Nome e data do evento
- Categoria (Design, Programação, IA & Dados etc.)
- Prazo de entrega da arte (véspera do evento)
- Descrição do tema para inspirar a criação

---

## Configuração passo a passo

### 1. Criar conta no Resend (envio de e-mails)

1. Acesse [resend.com](https://resend.com) e crie uma conta gratuita
2. Vá em **API Keys** → **Create API Key**
3. Copie a chave gerada (começa com `re_...`)
4. Em **Domains**, adicione e verifique o domínio do Code4Girl (`code4girl.com.br`) — necessário para enviar como `alertas@code4girl.com.br`

> **Plano gratuito**: até 3.000 e-mails/mês — mais do que suficiente para os alertas.

---

### 2. Criar repositório no GitHub

1. Crie um repositório público ou privado no GitHub (ex: `code4girl-alertas`)
2. Faça upload de todos os arquivos deste projeto
3. Confirme que a estrutura está assim:

```
code4girl-alertas/
├── .github/
│   └── workflows/
│       └── alertas.yml
├── src/
│   └── alertas.js
├── package.json
└── README.md
```

---

### 3. Configurar os Secrets no GitHub

No repositório, vá em **Settings → Secrets and variables → Actions → New repository secret** e adicione:

| Secret | Valor | Exemplo |
|--------|-------|---------|
| `RESEND_API_KEY` | Sua chave da API do Resend | `re_abc123...` |
| `DESIGNERS_EMAILS` | E-mails separados por vírgula | `ana@code4girl.com.br,bia@gmail.com` |
| `EMAIL_REMETENTE` | E-mail de envio (do seu domínio) | `alertas@code4girl.com.br` |

---

### 4. Testar manualmente

Para testar sem esperar o horário agendado:

1. Vá em **Actions** no repositório
2. Clique em **Alertas Code4Girl**
3. Clique em **Run workflow** → **Run workflow**
4. Acompanhe o log em tempo real

Se tudo estiver certo, você verá algo assim no log:

```
📅 Verificando alertas — 23/04/2026
📧 Designers: ana@code4girl.com.br, bia@gmail.com

   · "Dia do Geek" — faltam 2 dias (25/05/2026)
   · "Dia do Python" — faltam 8 dias (06/06/2026)

✨ Concluído. 0 alerta(s) enviado(s).
```

Quando um evento estiver a exatamente 5 dias:

```
🔔 Alerta: "Dia do Python" em 5 dias (06/06/2026)
  ✅ E-mail enviado! ID: abc123xyz
```

---

## Adicionar ou remover designers

Atualize o Secret `DESIGNERS_EMAILS` no GitHub com os e-mails separados por vírgula:

```
ana@code4girl.com.br,bia@gmail.com,carol@outlook.com
```

Não precisa alterar código — só o secret.

---

## Adicionar novos eventos

Edite o arquivo `src/alertas.js` e adicione na lista `EVENTOS`:

```js
{ mes: 3, dia: 15, nome: 'Novo Evento', desc: 'Descrição do evento.', tipo: 'Programação' },
```

Os meses começam em 0 (janeiro = 0, dezembro = 11).

---

## Calendário — 36 eventos ativos

| Data | Evento | Categoria |
|------|--------|-----------|
| 01/01 | Dia da Programação | Programação |
| 14/01 | Dia do Lógico | IA & Dados |
| 28/01 | Dia do Dev de Dados | IA & Dados |
| 11/02 | Mulheres na Ciência | Mulheres em tech |
| 14/02 | Dia da Tipografia | Design |
| 04/03 | Dia Nacional do Programador | Programação |
| 08/03 | Dia Internacional da Mulher | Mulheres em tech |
| 12/03 | Dia do Software Livre | Open Source |
| 14/03 | Pi Day | Cultura tech |
| 25/03 | Aniversário da Web | Desenvolvimento Web |
| 04/04 | Dia da Internet | Programação |
| 22/04 | Dia do Design Gráfico | Design |
| 23/04 | Dia do Livro Técnico | IA & Dados |
| 25/05 | Dia do Geek | Cultura tech |
| 06/06 | Dia do Python | Programação |
| 12/06 | Dia do Dev Mobile | Desenvolvimento Web |
| 27/06 | Dia Mundial do UX | Design |
| 28/06 | Dia do Dev Front-end | Desenvolvimento Web |
| 17/07 | Dia do Emoji | Design |
| 20/07 | Dia do Game | Cultura tech |
| 30/07 | Dia do LLM & IA Generativa | IA & Dados |
| 09/08 | Dia da Juventude em TI | Mulheres em tech |
| 12/08 | Dia do Cientista da Computação | IA & Dados |
| 29/08 | Dia do Dev Back-end | Desenvolvimento Web |
| 13/09 | Dia do Programador | Programação |
| 16/09 | Dia da Ciência de Dados | IA & Dados |
| 22/09 | Dia do QA | Qualidade |
| 24/09 | Dia do Design de Produto | Design |
| 04/10 | Aniversário de Alan Turing | IA & Dados |
| 10/10 | Ada Lovelace Day | Mulheres em tech |
| 13/10 | Dia do Design de Interação | Design |
| 28/10 | Dia do Acesso à Internet | Programação |
| 13/11 | Dia do UX Writing | Design |
| 30/11 | Dia do Dev Web | Desenvolvimento Web |
| 09/12 | Dia do Software | Programação |
| 13/12 | Geek Girl Day | Mulheres em tech |

---

## Tecnologias usadas

- **[Resend](https://resend.com)** — envio de e-mails transacionais
- **[GitHub Actions](https://docs.github.com/actions)** — agendamento e execução automática
- **Node.js** — script principal

---

*Feito com 💜 para a comunidade Code4Girl*
