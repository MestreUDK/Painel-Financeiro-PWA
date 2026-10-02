# Meu Painel Financeiro — PWA

Aplicativo financeiro pessoal em PWA, publicado pelo GitHub Pages.
Acesse: https://mestreudk.github.io/Painel-Financeiro-PWA/

## Versão 2 — planejamento financeiro

Além do controle original de receitas, despesas, reservas, categorias, limites, gráficos e exportações, esta versão adiciona:

- lançamentos recorrentes automáticos;
- cartões de crédito, fechamento, vencimento e parcelamento;
- calendário financeiro;
- contas/carteiras e saldos;
- fundos separados e objetivos de reserva;
- controle de dívidas;
- previsão do saldo mensal;
- comparação com o mês anterior e médias de 3 e 6 meses;
- simulador de economia por categoria;
- indicadores de saúde financeira, sem nota ou ranking;
- centro de avisos/resumos financeiros (substitui a ideia de conquistas);
- regras automáticas de categorização;
- importação de extratos CSV/XLSX;
- fechamento mensal;
- últimos 5 backups locais automáticos;
- PIN local e opção de desbloqueio do dispositivo quando o navegador oferecer WebAuthn;
- notificações locais opcionais enquanto o app estiver em execução.

## Atualização sem perder dados

A versão 2 continua usando a chave `painelFinanceiro_v1` no `localStorage` para migrar automaticamente os dados da versão anterior quando o PWA permanece no mesmo endereço do GitHub Pages. Novos campos são preenchidos com valores padrão.

Mesmo assim, faça um **backup JSON manual antes de atualizar**.

## Estrutura do repositório

- `index.html` — aplicativo principal
- `manifest.webmanifest` — nome, ícones e instalação
- `sw.js` — Service Worker/cache offline
- `icons/` — ícones do PWA
- `.nojekyll` — evita processamento pelo Jekyll

## Dados e privacidade

Os dados financeiros continuam armazenados no `localStorage` do navegador e não são enviados ao repositório GitHub.

O PIN/desbloqueio do dispositivo funciona como **trava de acesso à interface**. Ele não criptografa o `localStorage`.

## Backups

O app mantém os últimos 5 estados anteriores no próprio navegador e continua permitindo exportar um backup JSON completo. Backups locais também são apagados quando o usuário escolhe apagar todos os dados.

## Importação de extratos

O importador aceita `.csv`, `.xlsx` e `.xls`. Ele procura cabeçalhos equivalentes a **Data**, **Descrição/Histórico** e **Valor** e aplica as regras de categorização cadastradas. Registros com a mesma data, descrição, valor e tipo são ignorados para reduzir duplicações.

## Offline e atualização

O Service Worker usa o cache `painel-financeiro-v2`. Abra o PWA ao menos uma vez com internet para que o app e as bibliotecas externas sejam armazenados em cache. Após publicar uma atualização grande, altere novamente o nome do cache (`v3`, `v4` etc.) para forçar a renovação dos arquivos.
