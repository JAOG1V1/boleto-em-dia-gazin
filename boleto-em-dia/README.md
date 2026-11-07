# Boleto em Dia — projeto para abrir no VS Code

Versão local do painel de conferência de possíveis pagamentos duplicados, com a mesma interface e funcionalidades do protótipo. Esta cópia usa React, TypeScript e Vite para rodar no computador sem depender da hospedagem do site.

## Começar

1. Instale Node.js 22.13 ou mais recente e o Visual Studio Code.
2. Extraia todo o ZIP antes de abrir o projeto.
3. No VS Code, use **Arquivo > Abrir Pasta** e selecione a pasta **boleto-em-dia**, que contém este README e o package.json. Também pode abrir o arquivo boleto-em-dia.code-workspace.
4. Abra **Terminal > Novo Terminal**, dentro dessa pasta.
5. Instale as dependências com:

```bash
npm install
```

6. Inicie o projeto:

```bash
npm run dev
```

7. Abra o endereço mostrado no terminal, normalmente **http://localhost:5173**. Se a porta estiver ocupada, o Vite mostrará outra.

Mantenha o terminal aberto enquanto usa o sistema. Para encerrar, pressione Ctrl+C. Nas próximas vezes, basta executar npm run dev. A primeira instalação precisa de internet. Não são necessárias conta na hospedagem, chave de API ou conexão com a Gazin.

Este projeto é React/TypeScript: execute pelo terminal com Vite. Abrir index.html diretamente ou usar apenas a extensão Live Server não compila o projeto.

## Arquivos principais

| Arquivo | O que editar |
|---|---|
| src/App.tsx | Telas, textos, interações e apresentação |
| src/styles.css | Cores, tamanhos, espaçamentos e visual responsivo |
| lib/payments.ts | Amostra fictícia, leitura de CSV e regras de duplicidade |
| tests/payments.test.ts | Testes das regras |
| public/pagamentos-exemplo.csv | Exemplo pronto para importar |
| docs/roteiro-apresentacao.md | Falas, sequência de demonstração e orçamento |
| src/main.tsx | Entrada da aplicação React |

## Funcionalidades

- Painel com pagamentos, alertas e possível valor adicional a conferir.
- Busca, filtro por situação e lista de todos os pagamentos.
- Importação de CSV por arquivo ou texto colado.
- Reimportações idênticas são ignoradas; IDs conflitantes são rejeitados.
- Detalhe dos casos, observações e histórico de conferência.
- Fluxo pendente, análise, confirmação, resolução, descarte e reabertura.
- Exportação de casos em CSV e restauração da amostra inicial.
- Roteiro de apresentação e orçamento separados em docs/roteiro-apresentacao.md.

## Ensaiar a demonstração

1. Clique em Restaurar demonstração e confirme.
2. Confira a amostra inicial: 10 pagamentos, 7 boletos, 3 casos e R$ 2.030 de possível valor adicional.
3. Abra o caso BOL-1001 de Ana Prado e compare os pagamentos PG-001 e PG-002.
4. Inicie a análise, escreva uma observação fictícia e confirme a duplicidade.
5. Feche o caso e clique em Simular pagamento repetido: o painel passa a 11 pagamentos e 4 casos.
6. Para o pitch, use o roteiro separado em docs/roteiro-apresentacao.md, incluindo os custos fictícios de R$ 22.080.

## Verificar e gerar versão compilada

```bash
npm test
npm run build
npm run preview
```

A compilação gera dist/. A prévia da compilação mostra o endereço no terminal. O ZIP contém o código-fonte; as dependências serão instaladas no computador do colega.

## Critérios e limites

A identificação agrupa pelo ID do boleto e considera IDs de pagamentos distintos. Valores iguais em boletos diferentes não são misturados. O painel sinaliza uma possibilidade que exige conferência humana. Diferenças de valor ou nome não entram na soma estimada.

Os dados são fictícios e ficam no armazenamento local do navegador, sem sincronização entre computadores. O protótipo não acessa sistemas da Gazin ou de bancos, não autentica funcionários e não executa devoluções. Nenhuma configuração de publicação, credencial ou chave de acesso do site original é necessária nesta cópia.

## Uso de IA

ChatGPT/Codex apoiou a proposta, o código, os dados fictícios e os testes. A identificação de pagamentos usa regras programadas; não há um modelo de IA analisando pagamentos. A equipe deve revisar e compreender o fluxo antes de apresentar.

## Visual Gazin

O menu contém apenas Painel de casos e Pagamentos. O visual utiliza azul institucional, detalhes em laranja e o logotipo disponível no site do Grupo Gazin: https://www.grupogazin.com.br/site/assets/img/logo_topo.png. Esta é uma proposta com dados fictícios.
