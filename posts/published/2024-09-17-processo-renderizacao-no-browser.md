---
title: "Entendendo renderização no browser: DOM"
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

Hoje vamos começar uma jornada para entender o processo realizado pelos navegadores cada vez que criamos uma tag HTML, manipulamos algo com JavaScript ou mudamos uma cor com CSS.

### O que é renderização?

Quando construímos uma casa, passamos por diversas etapas.
Primeiro, fazemos a fundação, depois construímos as paredes, adicionamos o telhado, fazemos o acabamento (reboco, piso etc.) e, por fim,
adicionamos os móveis e eletrodomésticos.
A construção de um site segue um processo semelhante. Primeiro, criamos a fundação (HTML), depois adicionamos o acabamento (CSS) e, por fim, a interatividade (JavaScript).
Em outras palavras, a renderização é o processo pelo qual o navegador transforma o código em algo visual e interativo para o usuário.

### O processo de renderização

A renderização de uma página web é um processo complexo, por isso o navegador divide essa renderização em pequenas atividades, como construção do DOM e do CSSOM, paint, repaint, flow e reflow.

**São muitos conceitos, porém hoje iremos focar nosso estudo no DOM.**

#### DOM

O DOM (Document Objet Model) é uma representação em forma de estrutura de dados utilizada para representar hierarquicamente um documento html. A palavra hierarquicamente é importante, pois o DOM tem o visual de uma árvore, onde cada elemento é um nó que pode ter filhos que também podem ter filhos. Exatamente como na imagem abaixo:

![Representação da árvore DOM](/assets/img/dom-tree.png)

No código essa representação ficaria assim:

```html
<!doctype html>
<html>
  <head>
    <title>Um título</title>
  </head>
  <body>
    <a href="#">Um link</a>
    <h1>Um cabeçalho</h1>
  </body>
</html>
```

> Os navegadores utilizam essa representação, seguindo os padrões W3C [DOM](https://dom.spec.whatwg.org/) e [WHATWG DOM](https://dom.spec.whatwg.org/), como um guia para identificar quais elementos devem ser renderizados na tela e qual a hierarquia eles devem seguir.

#### Estrutura do DOM

O DOM é composto por diversos objetos, são eles: document, nodes, elements, attributes e texto.

- Document(documento): Essa é a raiz da nossa árvore, a tag `<html>`
- Node(nó): Cada parte da nossa árvore é um nó. O document é um nó, um elemento é um nó e os filhos desse elemento também é um nó.
- Element(elemento): O nó do tipo elemento representa uma tag. A tag `<p>` é um nó do tipo elemento.
- Attribute(atributo): Esse objeto representa o atributo de cada elemento. Class é o atributo da nossa tag div `<div class="minha-classe">`.
- Text(texto): Geralmente esse é o último nível da árvore. O texto que vai ser exibido em tela.

> Todos os objetos que compõem o DOM podem ser manipulados utilizando javascript através da api DOM disponível em todos os navegadores modernos.

#### Manipulando o DOM

No desenvolvimento moderno, com ferramentas como React, Vue ou Angular, a necessidade de manipular diretamente o DOM tem se tornado cada vez mais rara.

Isso ocorre porque cada atualização no DOM é um processo custoso em termos de desempenho. Tecnologias como React foram criadas justamente para otimizar essas operações, permitindo a manipulação eficiente da interface sem sacrificar a performance. No entanto, há cenários específicos em que a manipulação direta do DOM ainda será necessária, e quando esse momento chegar, é importante estar preparado(a).

Para acessar e manipular um elemento do DOM pela primeira vez, abra o console do navegador e execute o seguinte código:

```js
const elemento = document.getElementById("estruturadodom");
elemento.textContent = "Manipulando o DOM";
```

1. Na primeira linha buscamos um elemento que tem o id `estruturadodom`, cada seção do meu blog tem o titulo como id.

2. Na segunda linha alteramos a propriedade textContent do nosso elemento.

Esse trecho foi para exemplificar, por isso a simplicidade. Grande parte das iterações que você encontra ao longo da internet acontecem por meio de alterações e atualizações do DOM.

Recomendo acessar os sites que você já tem costume e começar a analisar as iterações que acontecem e se possível tente replicá-las. Esse é um ótimo exercício para aumentar sua fluência
em manipulação de DOM.

### Conclusão

O DOM é uma representação em forma de arvore utilizada pelos navegadores para o processo de renderização.

Podemos acessar elementos dessa árvore e manipulá-los livremente utilizando javascript. Saber executar esse tipo de operação é essencial para compreender frameworks e bibliotecas como react, angular e vue.

O conhecimento de base é o mais importante, mas é constantemente negligenciado.
No contexto do desenvolvimento web, conhecer html, css, javascript e como o navegador funciona é essencial. Com essa base sólida, você vai conseguir aprender qualquer tecnologia que derive desses fundamentos.

### Muito obrigado!!

Obrigado por ter chegado até aqui!

Espero que tenha aprendido algo novo ao longo dessa leitura.

Até a próxima!

### Referências

[MDN - O que é o DOM](https://developer.mozilla.org/pt-BR/docs/Web/API/Document_Object_Model/Introduction)

[Alura - O que é o DOM](https://www.alura.com.br/artigos/o-que-e-o-dom)

[Hostinger - O que é o DOM](https://www.hostinger.com.br/tutoriais/dom-o-que-e)
