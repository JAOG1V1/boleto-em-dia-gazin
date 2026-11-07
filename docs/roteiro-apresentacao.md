# Boleto em Dia — roteiro de apresentação

Projeto educacional para o DCC Gazin. Todos os nomes, pagamentos e custos da demonstração são fictícios. O problema foi relatado por João Gabriel; não foram acessados sistemas ou dados da empresa.

## Pitch de aproximadamente 3 minutos

### 0:00–0:25 — Problema

Comece apresentando o problema oralmente.

“Quando eu trabalhava no DCC Gazin, observei casos de clientes que pagavam o mesmo boleto mais de uma vez. Essas situações exigiam a conferência dos pagamentos e o acompanhamento da solução. Escolhemos esse problema para criar uma forma de organizar a análise e reduzir o trabalho manual.”

Se outra pessoa falar, use: “Um integrante da nossa equipe observou esse problema quando trabalhava no DCC Gazin.”

### 0:25–0:45 — Solução

Tela: Painel de casos.

“Nossa proposta é o Boleto em Dia: um painel que reúne os pagamentos, sinaliza possíveis duplicidades e permite acompanhar cada caso. A equipe recebe um alerta, confere os registros e documenta o andamento. O sistema não executa devoluções.”

### 0:45–1:35 — Demonstração

Tela: Painel de casos. Antes de começar, clique em Restaurar demonstração e confirme.

1. Mostre os **10 pagamentos**, os **3 casos em aberto** e os **R$ 2.030 de possível valor adicional**.
2. Abra **Conferir** no boleto **BOL-1001**, de Ana Prado.
3. Compare os pagamentos **PG-001 e PG-002**, de R$ 350 cada, vinculados ao mesmo boleto.
4. Clique em **Iniciar análise**.
5. Escreva: **“Dois pagamentos fictícios conferidos para o mesmo boleto. Caso encaminhado para regularização.”**
6. Clique em **Confirmar duplicidade**. Explique que a confirmação é humana e somente altera o registro da demonstração.
7. Feche a janela e clique em **Simular pagamento repetido**. O painel passa a mostrar **11 pagamentos e 4 casos**, com o novo alerta de Bruno Lima, BOL-1002.

Fala sugerida:

“O painel compara o código do boleto e IDs de pagamentos distintos. Valores iguais, sozinhos, não são suficientes. Aqui temos dois pagamentos fictícios para o mesmo boleto. O funcionário inicia a análise, registra sua observação e confirma a situação. Ao receber outro pagamento, o painel atualiza os casos.”

### 1:35–2:05 — Custos

Mostre a tabela de orçamento deste roteiro em um material separado do sistema.

“Para estimar uma primeira versão profissional, simulamos oito profissionais, incluindo dois desenvolvedores back-end. São 230 horas a R$ 80 por hora: R$ 18.400 de trabalho. Com uma reserva de 20% para imprevistos, o orçamento fica em R$ 22.080. A manutenção foi estimada entre R$ 280 e R$ 450 por mês, para hospedagem, correções e suporte limitado. São valores fictícios. Integrações bancárias precisam de avaliação específica.”

### 2:05–2:40 — Construção técnica

Explique a construção oralmente. Se necessário, mostre o código no VS Code.

“Construímos um site com React e TypeScript. O CSS define o visual. Os registros entram por CSV e ficam salvos apenas neste navegador. A regra agrupa os pagamentos pelo ID do boleto e identifica transações distintas. Se o mesmo pagamento for importado novamente, ele é ignorado. As atualizações dos casos ficam registradas em um histórico.”

### 2:40–3:00 — Uso de IA e próximos passos

Finalize oralmente com o uso de IA e os próximos passos.

“Usamos ChatGPT/Codex para apoiar a proposta, gerar o código, criar os dados fictícios e testar as regras. A identificação usa regras programadas, sem um modelo de IA analisando pagamentos. O objetivo é diminuir o tempo de conferência e melhorar o acompanhamento dos casos. O próximo passo é validar o processo com o DCC e avaliar a implantação com a TI.”

## Construção em etapas: o que foi feito e quando

1. **Definição:** escolha do problema relatado e delimitação do protótipo com dados fictícios.
2. **Dados:** definição das colunas CSV e criação de pagamentos normais e repetidos.
3. **Regras:** agrupamento por boleto, validação dos registros, deduplicação por ID e detecção de transações distintas.
4. **Interface:** métricas, busca, filtros, lista de pagamentos e detalhes dos casos.
5. **Acompanhamento:** análise, confirmação, descarte, resolução, justificativas e histórico.
6. **Validação:** testes automatizados das regras e conferência das interações na tela.
7. **Pitch:** problema, solução, demonstração, custos, explicação técnica e declaração de uso de IA.

Essas são etapas de construção, não horários reais de trabalho. A equipe deve executar o roteiro e compreender cada explicação antes de apresentar.

## Orçamento simulado

| Profissional | Horas | Custo a R$ 80/h |
|---|---:|---:|
| Gestão de projetos e análise de requisitos | 20 | R$ 1.600 |
| Designer UX/UI | 20 | R$ 1.600 |
| Desenvolvedor front-end | 40 | R$ 3.200 |
| Desenvolvedor back-end 1 | 40 | R$ 3.200 |
| Desenvolvedor back-end 2 | 40 | R$ 3.200 |
| Especialista em banco de dados | 20 | R$ 1.600 |
| Analista de testes | 30 | R$ 2.400 |
| Infraestrutura/DevOps | 20 | R$ 1.600 |
| **Trabalho profissional** | **230** | **R$ 18.400** |
| Reserva para imprevistos (20%) | — | R$ 3.680 |
| **Total** | — | **R$ 22.080** |

A hipótese contempla uma primeira versão com importação simples. O protótipo do hackathon não representa essa contratação. A implantação real depende de escopo e orçamento de fornecedores. Manutenção de R$ 280 a R$ 450/mês considera suporte limitado, hospedagem e correções; integrações precisam de avaliação específica.

O valor pago em duplicidade não é automaticamente uma perda definitiva da empresa. Para estimar o custo do problema, levantar horas de conferência, retrabalho e tempo de resolução. Não foi medido ganho financeiro real.

## Testes para a equipe ensaiar

- A amostra inicial deve exibir 10 pagamentos, 7 boletos, 3 casos e R$ 2.030 de possível valor adicional.
- Ana Prado e Diego Santos possuem valores iguais em boletos diferentes; o sistema não deve misturá-los.
- Reimporte o CSV de exemplo: nenhum registro novo deve ser adicionado, e as 10 linhas existentes devem ser ignoradas.
- Simule o pagamento de Bruno: o painel deve passar a 11 pagamentos e 4 casos.
- Confirmar, descartar e resolver sem observação deve ser bloqueado.
- Resolver um caso antes de confirmar a duplicidade deve ser bloqueado.
- Uma nova transação para um caso encerrado deve reabrir a análise.
- As atualizações devem persistir ao recarregar no mesmo navegador, quando o armazenamento local estiver habilitado.
- Valores ou nomes divergentes devem exigir conferência e ficar fora da soma estimada.
- Exportar casos deve gerar um arquivo CSV.

## Perguntas possíveis

**O painel impede um segundo pagamento?** Nesta versão, detecta registros depois da importação. Bloquear pagamentos antes do processamento dependeria de integração com a emissão e o processamento dos boletos.

**A IA decide quem recebe devolução?** Não. A identificação usa regras e a confirmação é humana. Não há transações financeiras.

**Ele acessa a Gazin ou o banco?** Não. Só utiliza dados fictícios por CSV. Uma implantação precisa de autorização, autenticação, permissões, dados compartilhados e integrações autorizadas.

**Os R$ 2.030 foram recuperados?** Não. É uma estimativa de possíveis pagamentos adicionais da amostra, usada para priorizar a conferência.

**Por que oito profissionais?** É uma composição de orçamento por especialidade, com participação parcial e dois back-ends em módulos diferentes. Uma equipe menor poderia acumular funções, alterando cronograma e estimativa.

**A manutenção cobre mudanças ilimitadas?** Não. É uma hipótese de suporte limitado, cujo escopo e número de horas precisariam ser definidos antes da contratação.
