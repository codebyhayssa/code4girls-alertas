# Code4Girl — Alertas Automáticos de Arte 💜

Sistema que envia e-mail automático para os designers da comunidade **5 dias antes** de cada data comemorativa do calendário tech 2026.

A cada alerta, uma designer é sorteada por rodízio como responsável pela arte do post. As demais recebem em cópia para acompanhar.

---

## Como funciona

Todo dia às **9h (horário de Brasília)**, o GitHub Actions executa o script. Se algum evento estiver a exatamente 5 dias, um e-mail é enviado automaticamente com:

- Nome e data do evento
- Categoria (Design, Programação, IA & Dados etc.)
- Prazo de entrega da arte (véspera do evento)
- Descrição do tema para inspirar a criação
- Nome da designer sorteada como responsável

---

## Configuração passo a passo

### 1. Criar conta Gmail para a comunidade

Crie uma conta Gmail exclusiva para os alertas, por exemplo `codefgirls@gmail.com`.

Em seguida, gere uma **senha de app**:

1. Acesse [myaccount.google.com](https://myaccount.google.com) com a conta criada
2. Ative a **Verificação em duas etapas** em Segurança
3. Na barra de pesquisa do topo, busque por **senhas de app**
4. No campo que aparecer, digite `code4girl-alertas` e clique em **Criar**
5. Copie a senha de 16 caracteres gerada — ela só aparece uma vez

---

### 2. Criar repositório no GitHub

1. Crie um repositório público no GitHub (ex: `code4girl-alertas`)
2. Suba todos os arquivos deste projeto pelo terminal:

```bash
cd code4girl-alertas
git init
git remote add origin https://github.com/seu-usuario/code4girl-alertas.git
git add .
git commit -m "add: projeto code4girl-alertas"
git push origin master:main --force
```

Confirme que a estrutura ficou assim:

```
code4girl-alertas/
├── .github/
│   └── workflows/
│       └── alertas.yml
├── src/
│   └── alertas.js
├── .gitignore
├── LICENSE
├── package.json
└── README.md
```

---

### 3. Configurar os secrets no GitHub

No repositório, vá em **Settings → Secrets and variables → Actions → New repository secret** e adicione:

| Secret | Valor | Exemplo |
|--------|-------|---------|
| `GMAIL_USER` | E-mail da conta Gmail da comunidade | `codefgirls@gmail.com` |
| `GMAIL_APP_PASSWORD` | Senha de app gerada no Google (sem espaços) | `abcdabcdabcdabcd` |
| `DESIGNERS_EMAILS` | E-mails das designers separados por vírgula | `ana@gmail.com,bia@gmail.com` |

---

### 4. Testar manualmente

1. Vá em **Actions** no repositório
2. Clique em **Alertas Code4Girl**
3. Clique em **Run workflow** → **Run workflow**
4. Acompanhe o log em tempo real

Quando um evento estiver a exatamente 5 dias, o log mostrará:

```
📅 Verificando alertas — 20/05/2026
📧 Designers: ana@gmail.com, bia@gmail.com

🔔 Alerta: "Dia do Geek" em 5 dias (25/05/2026)
  👩 Responsável sorteada: ana@gmail.com
  ✅ Enviado! Responsável: ana@gmail.com | Cópia: bia@gmail.com

✨ Concluído. 1 alerta(s) enviado(s).
```

---

## Adicionar ou remover designers

Atualize o secret `DESIGNERS_EMAILS` no GitHub com os e-mails separados por vírgula:

```
ana@gmail.com,bia@gmail.com,carol@outlook.com
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

## Rodízio de designers

A cada evento, o script sorteia automaticamente uma designer responsável pela arte em sistema de rodízio — garantindo distribuição equilibrada ao longo do ano. As demais recebem o e-mail em cópia para acompanhar sem precisar criar a arte.

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

- **[Nodemailer](https://nodemailer.com)** — envio de e-mails via Gmail
- **[GitHub Actions](https://docs.github.com/actions)** — agendamento e execução automática
- **Node.js** — script principal

---

*Feito com 💜 para a comunidade Code4Girl*
