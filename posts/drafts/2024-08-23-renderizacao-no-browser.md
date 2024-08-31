---
title: "Entendendo renderização no browser: Paint, layout, repaint e reflow."
resume:
date: 2024-08-23 08:20:03
image:
category: Geral
---

Conhecer bem a ferramenta com a qual trabalhamos é um passo importante
para evoluir em nossa carreira. Já imaginou um eletricista que não entenda
como a corrente elétrica funciona? E já pensou em um desenvolvedor front-end que não compreenda
como os navegadores funcionam? Pois é, isso é algo muito comum. Pouquíssimos desenvolvedores front-end
entendem o processo que o navegador segue para montar uma página. E, apesar de ser um processo simples,
ele é muito importante e, infelizmente, ignorado.

Hoje vamos entender o processo realizado pelos navegadores cada vez que criamos uma tag HTML, manipulamos algo com
JavaScript ou mudamos uma cor com CSS.

### O que é renderização?

Quando construímos uma casa, passamos por diversas etapas.
Primeiro, fazemos a fundação, depois construímos as paredes, adicionamos o telhado, fazemos o acabamento (reboco, piso etc.) e, por fim,
adicionamos os móveis e eletrodomésticos.
A construção de um site segue um processo semelhante. Primeiro, criamos a fundação (HTML), depois adicionamos o acabamento (CSS) e, por fim, a interatividade (JavaScript).
Em outras palavras, a renderização é o processo pelo qual o navegador transforma o código em algo visual e interativo para o usuário.

### O processo de renderização

A renderização de uma página web é um processo complexo, por isso o navegador divide essa renderização em pequenas atividades. Esse processo acontece nas seguintes etapas:

1 - O navegador tem acesso a árvores DOM e CSSOM.

2 - O navegador faz a combinação entre a DOM e a CSSOM, gerando uma árvore de renderização.Essa combinação considera todo conteúdo visível e todas as informações de estilos da página. Para construir a árvore o navegador segue o processo abaixo:

- Percorre cada nó da árvore DOM ignorando tudo que nao for visível(head, scripts etc). Os nós com estilo display none também são ocultados do resultado final.
- Encontra e aplica as regras CSSOM disponíveis para cada nó.
- Retorna uma árvore com nós visíveis e estilos calculados.

3.

✅ https://desenvolvimentoparaweb.com/miscelanea/desenvolvedor-frontend-renderizacao-paginas-web/

https://tableless.com.br/repaint-reflow-e-layout-thrashing-performance-alem-do-carregamento/

https://blog.taller.net.br/entendendo-processo-renderizacao-pagina-web/

https://dev.to/gopal1996/understanding-reflow-and-repaint-in-the-browser-1jbg

https://web.dev/articles/critical-rendering-path/render-tree-construction?hl=pt-br

### Muito obrigado!!

Obrigado por ter chegado até aqui!

Espero que tenha aprendido algo novo ao longo dessa leitura.

Até a próxima!
