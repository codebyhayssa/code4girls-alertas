const nodemailer = require('nodemailer');

// ─── Configuração ────────────────────────────────────────────────────────────
const ANO = 2026;

const DESIGNERS = process.env.DESIGNERS_EMAILS
  ? process.env.DESIGNERS_EMAILS.split(',').map(e => e.trim())
  : [];

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

// ─── Eventos do Calendário Code4Girl 2026 ────────────────────────────────────
const EVENTOS = [
  { mes: 0,  dia: 1,  nome: 'Dia da Programação',             desc: 'Celebrado no 1° dia do ano — todas as devs começam o código.',                          tipo: 'Programação' },
  { mes: 0,  dia: 14, nome: 'Dia do Lógico',                  desc: 'Homenagem a lógicos e matemáticos que fundaram a computação.',                           tipo: 'IA & Dados' },
  { mes: 0,  dia: 28, nome: 'Dia do Dev de Dados',            desc: 'Dados e IA: carreiras em crescimento para mulheres em tech.',                            tipo: 'IA & Dados' },
  { mes: 1,  dia: 11, nome: 'Mulheres na Ciência',            desc: 'Dia Internacional da Mulher e Menina na Ciência (ONU) — celebração central do Code4Girl.', tipo: 'Mulheres em tech' },
  { mes: 1,  dia: 14, nome: 'Dia da Tipografia',              desc: 'Celebração ao design tipográfico e às fontes que moldam o visual digital.',              tipo: 'Design' },
  { mes: 2,  dia: 4,  nome: 'Dia Nacional do Programador',    desc: 'Reconhecimento às programadoras brasileiras.',                                           tipo: 'Programação' },
  { mes: 2,  dia: 8,  nome: 'Dia Internacional da Mulher',    desc: 'Data icônica — com foco especial em mulheres na tecnologia.',                            tipo: 'Mulheres em tech' },
  { mes: 2,  dia: 12, nome: 'Dia do Software Livre',          desc: 'Open source é porta de entrada para mulheres em tech.',                                  tipo: 'Open Source' },
  { mes: 2,  dia: 14, nome: 'Pi Day',                         desc: 'π = 3,14159... — incentivo à matemática e engenharia para meninas.',                     tipo: 'Cultura tech' },
  { mes: 2,  dia: 25, nome: 'Aniversário da Web',             desc: 'A web abriu espaço para inúmeras mulheres desenvolvedoras.',                             tipo: 'Desenvolvimento Web' },
  { mes: 3,  dia: 4,  nome: 'Dia da Internet',                desc: 'Acesso digital é pauta de inclusão — relevante para a comunidade.',                      tipo: 'Programação' },
  { mes: 3,  dia: 22, nome: 'Dia do Design Gráfico',          desc: 'Celebração ao design gráfico, identidade visual e criatividade.',                        tipo: 'Design' },
  { mes: 3,  dia: 23, nome: 'Dia do Livro Técnico',           desc: 'Incentivo ao estudo e desenvolvimento profissional.',                                    tipo: 'IA & Dados' },
  { mes: 4,  dia: 25, nome: 'Dia do Geek',                    desc: 'Identidade geek feminina é forte no Code4Girl.',                                         tipo: 'Cultura tech' },
  { mes: 5,  dia: 6,  nome: 'Dia do Python',                  desc: 'Python é a linguagem mais acessível para iniciantes — muito usada no Code4Girl.',        tipo: 'Programação' },
  { mes: 5,  dia: 12, nome: 'Dia do Dev Mobile',              desc: 'Mobile é área de alta empregabilidade para mulheres devs.',                              tipo: 'Desenvolvimento Web' },
  { mes: 5,  dia: 27, nome: 'Dia Mundial do UX',              desc: 'UX e design centrado em pessoas: área com muitas mulheres.',                             tipo: 'Design' },
  { mes: 5,  dia: 28, nome: 'Dia do Dev Front-end',           desc: 'Front-end é uma das entradas mais comuns de mulheres em tech.',                          tipo: 'Desenvolvimento Web' },
  { mes: 6,  dia: 17, nome: 'Dia do Emoji',                   desc: 'Comunicação digital e cultura — muito aderente ao público.',                             tipo: 'Design' },
  { mes: 6,  dia: 20, nome: 'Dia do Game',                    desc: 'Mulheres na indústria de games é pauta crescente e relevante.',                          tipo: 'Cultura tech' },
  { mes: 6,  dia: 30, nome: 'Dia do LLM & IA Generativa',    desc: 'IA generativa é tendência essencial para o desenvolvimento de carreira.',                 tipo: 'IA & Dados' },
  { mes: 7,  dia: 9,  nome: 'Dia da Juventude em TI',         desc: 'Incentivo a jovens mulheres em tecnologia — alinhado ao propósito.',                     tipo: 'Mulheres em tech' },
  { mes: 7,  dia: 12, nome: 'Dia do Cientista da Computação', desc: 'Valoriza a ciência — inclui pioneiras como Grace Hopper.',                               tipo: 'IA & Dados' },
  { mes: 7,  dia: 29, nome: 'Dia do Dev Back-end',            desc: 'Back-end precisa ser desmistificado para mulheres — ótima pauta.',                       tipo: 'Desenvolvimento Web' },
  { mes: 8,  dia: 13, nome: 'Dia do Programador',             desc: '256° dia do ano = 2⁸ — celebração geek das programadoras.',                              tipo: 'Programação' },
  { mes: 8,  dia: 16, nome: 'Dia da Ciência de Dados',        desc: 'Data science tem crescimento expressivo entre mulheres.',                                tipo: 'IA & Dados' },
  { mes: 8,  dia: 22, nome: 'Dia do QA',                      desc: 'QA é porta de entrada muito comum para mulheres em tech.',                               tipo: 'Qualidade' },
  { mes: 8,  dia: 24, nome: 'Dia do Design de Produto',       desc: 'Product design é área de destaque para mulheres.',                                       tipo: 'Design' },
  { mes: 9,  dia: 4,  nome: 'Aniversário de Alan Turing',     desc: 'História da computação — incluindo figuras como Grace Hopper.',                          tipo: 'IA & Dados' },
  { mes: 9,  dia: 10, nome: 'Ada Lovelace Day',               desc: 'Ada Lovelace é símbolo máximo — data essencial para o Code4Girl.',                       tipo: 'Mulheres em tech' },
  { mes: 9,  dia: 13, nome: 'Dia do Design de Interação',     desc: 'IxD é especialidade muito presente entre mulheres designers.',                           tipo: 'Design' },
  { mes: 9,  dia: 28, nome: 'Dia do Acesso à Internet',       desc: 'Inclusão digital é pauta social relevante para a comunidade.',                           tipo: 'Programação' },
  { mes: 10, dia: 13, nome: 'Dia do UX Writing',              desc: 'UX Writing tem alta representação feminina — ótima pauta.',                              tipo: 'Design' },
  { mes: 10, dia: 30, nome: 'Dia do Dev Web',                 desc: 'Web dev é caminho principal de entrada para devs iniciantes.',                           tipo: 'Desenvolvimento Web' },
  { mes: 11, dia: 9,  nome: 'Dia do Software',                desc: 'Celebração ampla da área — inclui todas as profissionais.',                              tipo: 'Programação' },
  { mes: 11, dia: 13, nome: 'Geek Girl Day',                  desc: 'Data criada para o público exato do Code4Girl — essencial.',                             tipo: 'Mulheres em tech' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const MESES = [
  'janeiro','fevereiro','março','abril','maio','junho',
  'julho','agosto','setembro','outubro','novembro','dezembro'
];

function formatarData(mes, dia) {
  return `${dia} de ${MESES[mes]} de ${ANO}`;
}

function formatarDataCurta(mes, dia) {
  return `${String(dia).padStart(2,'0')}/${String(mes+1).padStart(2,'0')}/${ANO}`;
}

function prazoEntrega(mes, dia) {
  const vespera = new Date(ANO, mes, dia - 1);
  return vespera.toLocaleDateString('pt-BR');
}

function diasAte(mes, dia) {
  const hoje = new Date();
  const hojeMs = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()).getTime();
  const eventoMs = new Date(ANO, mes, dia).getTime();
  return Math.round((eventoMs - hojeMs) / 86400000);
}

// ─── Template do e-mail ───────────────────────────────────────────────────────
function gerarHtml(evento, diasRestantes, responsavel) {
  const dataFormatada = formatarData(evento.mes, evento.dia);
  const prazo = prazoEntrega(evento.mes, evento.dia);

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alerta Code4Girl</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 16px">
    <tr><td align="center">
      <table width="100%" style="max-width:520px;background:#fff;border-radius:16px;overflow:hidden">

        <!-- Header -->
        <tr>
          <td style="background:#D4537E;padding:24px 28px">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <div style="font-size:11px;font-weight:600;color:#F4C0D1;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">Code4Girl · Alerta de Arte</div>
                  <div style="font-size:22px;font-weight:600;color:#fff;line-height:1.2">${evento.nome}</div>
                </td>
                <td align="right" style="vertical-align:top">
                  <div style="background:#993556;border-radius:50%;width:52px;height:52px;display:inline-flex;align-items:center;justify-content:center;text-align:center;line-height:1.1">
                    <div style="color:#fff;font-size:18px;font-weight:700">${diasRestantes}</div>
                    <div style="color:#F4C0D1;font-size:9px;margin-top:2px">dias</div>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:24px 28px">

            <p style="margin:0 0 16px;font-size:15px;color:#333;line-height:1.6">
              Oi, designers! 👋
            </p>
            <p style="margin:0 0 20px;font-size:15px;color:#333;line-height:1.6">
              Em <strong>${diasRestantes} dia${diasRestantes !== 1 ? 's' : ''}</strong> teremos o
              <strong style="color:#D4537E">${evento.nome}</strong> (${dataFormatada}).
              Precisamos da <strong>arte do post</strong> para publicação nessa data!
            </p>

            <!-- Info box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#FBEAF0;border-radius:10px;margin-bottom:20px">
              <tr><td style="padding:16px 18px">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-bottom:10px">
                      <div style="font-size:11px;color:#993556;text-transform:uppercase;letter-spacing:.5px;font-weight:600;margin-bottom:3px">Categoria</div>
                      <div style="font-size:14px;color:#72243E;font-weight:500">${evento.tipo}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:10px;border-top:0.5px solid #ED93B1;padding-top:10px">
                      <div style="font-size:11px;color:#993556;text-transform:uppercase;letter-spacing:.5px;font-weight:600;margin-bottom:3px">Data do evento</div>
                      <div style="font-size:14px;color:#72243E;font-weight:500">${dataFormatada}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="border-top:0.5px solid #ED93B1;padding-top:10px">
                      <div style="font-size:11px;color:#993556;text-transform:uppercase;letter-spacing:.5px;font-weight:600;margin-bottom:3px">Arte pronta até</div>
                      <div style="font-size:14px;color:#72243E;font-weight:500">${prazo} (véspera do evento)</div>
                    </td>
                  </tr>
                </table>
              </td></tr>
            </table>

            <!-- Descrição -->
            <p style="margin:0 0 20px;font-size:14px;color:#555;line-height:1.6;border-left:3px solid #D4537E;padding-left:12px">
              ${evento.desc}
            </p>

            <!-- Responsável -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f0f4;border-radius:10px;margin-bottom:20px">
              <tr><td style="padding:14px 18px">
                <div style="font-size:11px;color:#993556;text-transform:uppercase;letter-spacing:.5px;font-weight:600;margin-bottom:4px">Responsável pela arte</div>
                <div style="font-size:15px;font-weight:600;color:#D4537E">${responsavel}</div>
                <div style="font-size:12px;color:#72243E;margin-top:3px">Você foi sorteada para criar o post deste evento.</div>
              </td></tr>
            </table>

            <p style="margin:0 0 6px;font-size:15px;color:#333;line-height:1.6">
              Qualquer dúvida é só falar. Conta com vocês! 💜
            </p>
            <p style="margin:0;font-size:14px;color:#999">Equipe Code4Girl</p>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9f0f4;padding:14px 28px;border-top:1px solid #f0e0e8">
            <p style="margin:0;font-size:11px;color:#aaa;text-align:center">
              Code4Girl · Comunidade de mulheres em tecnologia<br>
              Este é um alerta automático gerado pelo calendário tech 2026.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Lógica principal ─────────────────────────────────────────────────────────
async function verificarEEnviarAlertas() {
  if (DESIGNERS.length === 0) {
    console.error('❌ Nenhum e-mail de designer configurado. Defina a variável DESIGNERS_EMAILS.');
    process.exit(1);
  }

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error('❌ Credenciais do Gmail não configuradas. Defina GMAIL_USER e GMAIL_APP_PASSWORD.');
    process.exit(1);
  }

  console.log(`📅 Verificando alertas — ${new Date().toLocaleDateString('pt-BR')}`);
  console.log(`📧 Designers: ${DESIGNERS.join(', ')}\n`);

  let enviados = 0;
  let rodizioIndex = 0;

  for (const evento of EVENTOS) {
    const dias = diasAte(evento.mes, evento.dia);

    if (dias === 5) {
      console.log(`🔔 Alerta: "${evento.nome}" em ${dias} dias (${formatarDataCurta(evento.mes, evento.dia)})`);

      const responsavelIndex = rodizioIndex % DESIGNERS.length;
      const responsavel = DESIGNERS[responsavelIndex];
      const demais = DESIGNERS.filter((_, i) => i !== responsavelIndex);
      rodizioIndex++;

      console.log(`  👩‍🎨 Responsável sorteada: ${responsavel}`);

      try {
        await transporter.sendMail({
          from: `Code4Girl Alertas <${GMAIL_USER}>`,
          to: responsavel,
          cc: demais.length > 0 ? demais.join(',') : undefined,
          replyTo: GMAIL_USER,
          subject: `[Code4Girl] Você foi sorteada! Arte do post — ${evento.nome} (${formatarDataCurta(evento.mes, evento.dia)})`,
          html: gerarHtml(evento, dias, responsavel),
        });

        console.log(`  ✅ Enviado! Responsável: ${responsavel} | Cópia: ${demais.join(', ') || 'nenhuma'}`);
        enviados++;
      } catch (err) {
        console.error(`  ❌ Erro ao enviar: ${err.message}`);
      }
    } else if (dias > 0 && dias <= 10) {
      console.log(`   · "${evento.nome}" — faltam ${dias} dias (${formatarDataCurta(evento.mes, evento.dia)})`);
    }
  }

  console.log(`\n✨ Concluído. ${enviados} alerta(s) enviado(s).`);
}

verificarEEnviarAlertas();
