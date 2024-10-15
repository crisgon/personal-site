---
title: Typescript - Uma breve introdução
resume: >-
  Trabalhar com a tipagem dinâmica do javascript é como andar no escuro em um
  labirinto... Você não sabe onde está e quando pensa que sabe tudo pode mudar
  muito rápido e acabar te deixando confuso. É com a premissa de resolver esses
  problemas que o Typescript entra em cena.
date: "2020-03-02 11:30:10"
image: /assets/img/ts-js.png
category: Typescript
tagColor: "#130f40"
---

Um tempo atrás eu fazia cara feia só de ouvir o nome typescript... Pra mim não fazia sentido deixar de aproveitar a tipagem dinâmica nativa do javascript e usar uma tipagem estática e "engessada". Era um pensamento bem nada a ver, mas isso mudou quando a pouco mais de 1 ano aceitei o desafio de trabalhar com typescript e hoje não me sinto tão confortável em utilizar javascript puro.

Javascript é uma linguagem muito permissiva e simples, ela não tem tipagem forte e isso torna seu aprendizado mais fácil, porém, **com grandes poderes vem grandes responsabilidades**. Toda a liberdade que o javascript oferece pode ser muito perigosa caso você não saiba exatamente o que está fazendo.

> “Apesar do JavaScript ser talvez uma das linguagens mais fáceis de se começar, suas excentricidades fazem com que o domínio sólido da linguagem seja muito menos comum do que em outras linguagens. Enquanto se precisa um conhecimento aprofundado em linguagens como C ou C++ para escrever um programa em grande escala, uma aplicação similar em JavaScript pode ser desenvolvida, e muitas vezes é, apenas arranhando parte do que a linguagem pode fazer de verdade”
>
> Kyle Simpson

### Antes de prosseguir acho importante deixar claro dois termos:

- Linguagens tipadas: também conhecidas como fortemente tipadas, são linguagens onde você é obrigado a declarar o tipo do dado. Ex: Java, C++, C#
- Linguagens não tipadas: também conhecidas como fracamente tipadas ou de tipagem dinâmica, são linguagens onde a conversão é feita durante a execução do programa e sem a necessidade do programador forçar a conversão. Ex: PHP, Javascript, Ruby, Python.

Trabalhar com a tipagem dinâmica do javascript é como andar no escuro em um labirinto... Você não sabe onde está e quando pensa que sabe tudo pode mudar muito rápido e acabar te deixando confuso. Recomendo dar uma olhada [nesse](https://www.cristiano.dev/blog/2018-04-30-coercao-de-tipos-em-javascript) artigo que escrevi em outro momento sobre coerção de tipos.

É com a premissa de resolver esses problemas que o Typescript surgiu, mas o que é exatamente Typescript?

## O que é?

É um superset para javascript que adiciona tipagem forte e alguns outros recursos para a linguagem. Ela foi criada pela Microsoft em meados de 2012 e vem caindo no gosto dos programadores. Segundo a [pesquisa do stackoverflow](https://insights.stackoverflow.com/survey/2019#technology) o typescript esteve entre as linguagens mais amadas de 2019, perdendo apenas para rust e python.

![Pesquisa do stack overflow sobre as linguagens mais amadas em 2019.](/assets/img/most-love.png "Pesquisa do stack overflow sobre as linguagens mais amadas em 2019.")

## Como funciona?

Typescript funciona apenas em tempo de execução. O que isso quer dizer? Enquanto você estiver escrevendo seu código ele vai ser typescript, mas quando você fazer o build e acessar no seu navegador ele será exatamente o javascript comum que você já conhece. Tá! Pode não ter ficado tão claro assim, mas vamos ao código.

No javascript a gente simplesmente declara uma variável e o seu tipo é inferido e pode ser alterado em todo nosso código.

```javascript
let name = "Cristiano"; // name é uma string
name = 22; // agora name é um number
```

No typescript a inferência de tipos também acontece, a diferença é que nele, podemos apontar qual o tipo e não conseguimos alterá-lo mais.

```typescript
let name = "Cristiano"; // name é uma string
name = 22; // Isso vai gerar um erro. number
//Type '22' is not assignable to type 'number'.
```

## Tipando o básico

Como eu disse anteriormente, podemos apontar um tipo de forma explicita usando alguns tipos já conhecidos do javascript e alguns tipos "estranhos": `number, string, boolean, null, undefined, any, never e void.`

```typescript
let age: number = 24;
let fullName: string = "Cristiano";
let married: boolean = false;
let isNull: null = null;
let isUndefined: undefined = undefined;
let isObject: object = {};

// Todas as atribuições abaixo geram erros

age = "Cris";
fullName = false;
married = 24;
isNull = {};
isUndefined = null;
isObject = undefined;
```

## Any

Any é exatamente a tradução literal: **qualquer**. Em outras palavras, algo declarado como `any` pode receber um number e depois uma string sem nenhum problema.

```typescript
let someThing: any = 22;
someThing = "Hello";
someThing = false;

// Todas as atribuições acima são válidas
```

## Void

Não é apenas variáveis que podemos tipar, também conseguimos tipar o retorno de uma função ou os parâmetros que ela vai receber. Utilizamos o `void` quando queremos representar o vazio, quando uma função não tem retorno, por exemplo.

```typescript
function someFunction(a: number, b: number): void {
  console.log(a, b);
}

someFunction("1", "2");
// Error!

const someThing = someFunction(1, 2);
// O type de someThing agora é void
```

## Never

O never representa valores que nunca ocorrem, por exemplo, o retorno de uma função com `while(true)`. Algo interessante é que `never` pode ser atribuído para qualquer tipo, porém algo do tipo `never` só aceita valores `never`.

```typescript
function infiniteLoop(): never {
  while (true) {}
}

let age: number = 24;
age = never;

let someThing: never = infiniteLoop();
someThing = "Hello";
//Error
```

## Tipando arrays

Tipar arrays é algo bem simples, basicamente podemos definir um array type de duas formas.

```typescript
const numbers: number[] = [1, 2, 3, 4];
const colors: string[] = ["red", "black", "white"];

// O código acima é equivalente ao código abaixo

const numbers: Array<number> = [1, 2, 3, 4];
const colors: Array<string> = ["red", "black", "white"];
```

## Finalizando...

Esse foi apenas uma introdução bem sucinta. O principal objetivo era apresentar a ferramenta para quem nunca teve contato, espero que tenha ajudado. Se você se interessou por typescript, continua me acompanhando que vou criar mais conteúdo sobre ele, ou então vai direto na fonte no link que deixarei a seguir.

Lembrando que o Typescript tem bem mais poder do que isso que mostrei aqui, em um próximo artigo vou abordar sobres tipos personalizados usando,`interface/types`, `enums` e `assertions.`

\
Obrigado por ler até aqui!

## Links Importantes

- [Typescript HandBook](https://www.typescriptlang.org/v2/docs/handbook/basic-types.html)
- [Typescript Playground](https://www.typescriptlang.org/play/index.html)
- [You Dont Know Js](https://github.com/getify/You-Dont-Know-JS)
