---
title: Entendendo Escopo no Javascript - Parte 2
resume: >-
  Desenvolver com javascript é algo aparentemente simples, mas que pode trazer muita dor de cabeça pra quem não entende o real funcionamento da linguagem.
date: "2018-06-30 20:41:00"
image: https://i.imgur.com/rOZuQfr.png
category: JS
tagColor: "#f1c40f"
---

Se você caiu aqui de paraquedas recomendo ler a [parte 1](https://crisgon.github.io/posts/Entendendo-escopo-no-javascript/) desse artigo, lá eu expliquei o que é escopo e como acontece a sua geração. Hoje vou falar sobre escopo léxico, escopo de função e escopo de bloco. Apenas para refrescar a mente de quem já leu o artigo, escopo é um conjunto de regras que definem onde as variáveis podem ser acessadas após seu armazenamento.

### Escopo léxico?

É o escopo definido no local onde as funções são declaradas!  
Na análise léxica da compilação é possível definir onde cada identificador vai estar e onde ele pode ser buscado.

```javascript
function foo(a) {
  let b = 1;
  console.log(a + b);
}
foo(2); // 3
```

Tudo entre `{ }` é o escopo de foo, onde `a` e `b` estão disponíveis, gerando algum erro se tentarmos acessar qualquer uma dessas variáveis fora desse escopo.

### Escopo de função x Escopo de bloco

Quando falamos de escopo pensamos logo em escopo de função, porém existe outra maneira de criar escopo, através de blocos `{…}`. Com a chegada do `let` no ES6, podemos fazer com que nossas variáveis sejam do escopo de declarações como `if`, `for` e etc.

```javascript
// Com var
if (true) {
  var a = 5;
  console.log(a); // 5
}
console.log(a); // 5

// Com let
if (true) {
  let b = 8;
  console.log(b); // 8
}
console.log(b); // Reference error
```

Com `var` uma variável criada em um bloco não faz parte do escopo,podendo ser acessada fora do bloco. Enquanto com `let` a variável passa a ter como escopo o bloco em questão.

### Concluindo

Até aqui vimos a importância de entender sobre escopo, o que pode nos dar um norte na resolução de alguns problemas. Escopo é um assunto relativamente simples, mas seu entendimento é indispensável para o dominio da linguagem javascript. Espero que esse material tenha sido de alguma valid. :D

Esse artigo foi menor que o normal, pois pretendo escrever artigos menos sempre que puder.

#### [Minha referência para esse conteúdo:

[Livro You Dont Know JS](https://github.com/cezaraugusto/You-Dont-Know-JS/)

Obrigado por ler até aqui!! Se curtiu esse post compartilha com seus amigos e deixa um comentário caso tenha alguma sugestão do que posso melhorar.
