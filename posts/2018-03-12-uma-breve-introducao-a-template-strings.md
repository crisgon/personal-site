---
title: Uma breve introdução à Template Strings
resume: >-
  Utilizar + para concatenar strings não é algo mais tão moderno, pois atualmente podemos usar algo bem mais bacana chamado template literal.
date: "2018-03-12 20:41:00"
image: /assets/img/javascriptWallpaper.jpg
category: JS
tagColor: "#f1c40f"
---

**Esse artigo é uma adaptação do [texto](http://wesbos.com/javascript-template-strings/) do [Wes Bos](http://wesbos.com)**

No javascript, quando precisamos inserir uma variável em uma string, pensamos logo em fazer uma concatenação, mas isso pode ser uma dor de cabeça a depender do tamanho da nossa string e da quantidade de variáveis que iremos inserir. Pense bem no processo necessário para isso:

1 - Abrimos nossa string.  
2 - Fechamos nossa string.  
3 - Concatenamos com nossa variável.  
4 - Abrimos nossa string.  
5 - Fechamos nossa string.  
6 - Repetimos o processo caso existam mais variáveis.

Exemplo:

```javascript
let nome = "Bob";
let age = 2;
let sentence = "Meu cachorro " + name + " tem " + age * 7 + " anos de idade.";
// Result "Meu cachorro Bob tem 14 anos de idade."
```

Agora pense nos problemas com fechamento de string. Pensou?  
Pense também que precisamos usar \n ou \n\ para pular linhas.

```javascript
let string = 'Essa é \n\
              uma sring \n\
              com quebra \n\
              de linha.';
// Result     "Essa é
              uma sring
              com quebra
              de linha."
```

Diversas linguagens tem a possibilidade de simplesmente colocar suas variáveis dentro de strings e interpretá-las, com a chegada do ES6 o javascript ganhou esse novo poder, chamado de Template Strings.

#### Como funciona?

No javascript podemos criar uma string com aspas duplas(“ ”), aspas simples(‘ ’) e agora também com um par de acentos graves (``). Utilizando os acentos estamos criando um template string e podemos adicionar placeholders. Estes são indicados por um cifrão seguido de chaves \${expressão}.

Dentro do \${ } podemos executar qualquer código javascript, seja uma variável ou a invocação de uma função.

Veja como ficaria o exemplo anterior com o uso de um template string.

Exemplo:

```javascript
let name = "Bob";
let age = 2;
let sentence = `Meu cachoror ${name} tem ${age * 7} de idade.'`;
// Result "Meu cachorro Bob tem 14 anos de idade."
```

**Percebeu como nosso código ficou mais limpo e fácil de ler?**

Essa foi uma abordagem básica sobre Template Strings, existem mais coisas que podem ser feitas com essa nova funcionalidade do javascript, recomendo que façam a leitura desse [material.](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/template_strings)

Antes de finalizar vou deixar um exemplo muito interessante do uso do Template String. Eu gosto muito dessa abordagem, pois ela facilita a criação de trechos HTML.

```javascript
card = `
    <div class="pokemon-picture">
      <img src="${pokemon.sprites.front_default}" alt="Sprite of ${
        pokemon.name
      }">
    </div>
    <div class="pokemon-info">
        <h1 class="name">Name: ${pokemon.name}</h1>
        <h2 class="number">Nº ${pokemon.id}</h2>
        <h3 class="type">Type: ${pokemon.types
          .map(item => " " + item.type.name)
          .toString()}</h3>
        <h3 class="skill">Skills: ${pokemon.moves
          .map(item => " " + item.move.name)
          .toString()}</h3>
        <h3 class="weight">Weight: ${pokemon.weight / 10}kg</h3>a
        <h3 class="height">Height: ${pokemon.height / 10}m</h3>
    </div>`;
```

Como eu havia dito, podemos executar qualquer código javascript dentro de \${ }. Nesse exemplo eu estava consumindo uma API e realizei diversas operações, desde calculos simples até manipulação de arrays.

## Issto é tudo, pessoal!!

Minhas referências foram:

- [An Intro to Template Strings](http://wesbos.com/javascript-template-strings/)
- [MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/template_strings)

Obrigado por ler até aqui!! Se curtiu esse post compartilha com seus amigos e deixa um comentário caso tenha alguma sugestão do que posso melhorar.
