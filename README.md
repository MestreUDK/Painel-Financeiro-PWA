# Meu Painel Financeiro — PWA

Este repositório contém a versão PWA do Painel Financeiro Pessoal.
Acesse: https://mestreudk.github.io/Painel-Financeiro-PWA/

## Estrutura

- `index.html` — aplicativo principal
- `manifest.webmanifest` — configura nome, ícones e modo de instalação
- `sw.js` — Service Worker para cache/offline
- `icons/` — ícones 192, 512 e maskable
- `.nojekyll` — evita processamento desnecessário pelo Jekyll no GitHub Pages

## Instalar no celular

Abra o endereço publicado pelo GitHub Pages em um navegador compatível. No Android com Chrome, o navegador poderá oferecer **Instalar app**; o próprio painel também exibe o botão `📲 Instalar app` quando o navegador disponibiliza o prompt de instalação.

## Dados e backups

Os dados do painel continuam sendo gravados no `localStorage` do navegador. Eles **não ficam dentro do repositório GitHub**.

Importante: os dados salvos quando você abriu o arquivo HTML diretamente no aparelho não migram automaticamente para a versão publicada no GitHub Pages, pois é uma origem diferente. Antes da mudança, exporte um backup JSON no HTML antigo e depois use **Importar JSON** na versão PWA.

## Offline

O Service Worker guarda o aplicativo e tenta guardar também as bibliotecas externas usadas por gráficos e exportações. Para preparar o uso offline, abra o PWA ao menos uma vez com internet e aguarde o carregamento completo.

## Atualizações

O navegador verifica automaticamente mudanças no `sw.js`. Para uma atualização grande de arquivos em cache, você também pode alterar no começo de `sw.js`:

`const CACHE_NAME = "painel-financeiro-v1";`

para, por exemplo:

`const CACHE_NAME = "painel-financeiro-v2";`

Depois faça commit/push normalmente.
