---
title: Typescript - Uma breve introdução - Type utilities - Parte 2
resume: >-
  Hoje vamos dar continuidade aos type utilities para melhorar o nosso fluxo de
  trabalho na criação de interfaces e types.
date: "2020-12-06 09:31:06"
image: /assets/img/ts-js.png
category: Typescript
tagColor: "#130f40"
---

![](/assets/img/ts-js.png)

Nos artigos anteriores nós vimos um pouco sobre tipos básicos, enums, type assertions , interfaces, type aliases, classes e type utilities. Recomendo dar uma conferida neles, caso não se sinta confortável com esses conceitos.

- [Typescript - Uma breve introdução](https://www.crisgon.dev/typescript-uma-breve-introdu%C3%A7%C3%A3o/)
- [Typescript - Uma breve introdução - Tuplas, Enums e Type Assertion](https://www.crisgon.dev/typescript-uma-breve-introdu%C3%A7%C3%A3o-parte-2/)
- [Typescript - Uma breve introdução - Interfaces](https://www.crisgon.dev/typescript-uma-breve-introdu%C3%A7%C3%A3o-interfaces/)
- [Typescript - Uma breve introdução - Type Aliases](https://www.crisgon.dev/typescript-uma-breve-introdu%C3%A7%C3%A3o-type-aliases/)
- [Typescript - Uma breve introdução - Classes](https://www.crisgon.dev/typescript-uma-breve-introdu%C3%A7%C3%A3o-classes/)
- [Typescript - Uma breve introdução - Type utilities - Parte 1](https://www.crisgon.dev/typescript-uma-breve-introdu%C3%A7%C3%A3o-type-utilities/)

### Exclude<Type, Keys>

Se funcionamento é muito simples. Esse utilitário cria um novo tipo removendo tudo que é passado na lista de keys.

```typescript
type Tiers = "Ferro" | "Bronze" | "Prata" | "Mestre" | "Desafiante";
type LowTiers = Exclude<Tiers, "Mestre" | "Desafiante">;
// LowTiers aceita os valores 'Ferro' | 'Bronze' | 'Prata'
```

O interessante é que além das keys, também podemos dizer quais tipos primitivos queremos excluir.

```typescript
type GenericType = (() => number) | number | string | (() => void);
type NewGenericType = Exclude<GenericType, Function>;

// NewGenericType é um tipo que aceita number e string, sem as funções.
```

No exemplo acima eu criei um novo `type` excluindo todas as funções que estavam presentes no nosso `type`base.

### Extract<Type, Keys>

O funcionamento não é tão diferente do `Exclude`. Aqui criamos um `type` usando apenas as keys que passarmos como argumentos. Vale lembrar que aqui podemos escolher tipos primitivos para extrair.

```typescript
type GenericType = (() => number) | number | string | (() => void);
type NewGenericType = Extract<GenericType, Function>;

// NewGenericType é um tipo que aceita apenas funções.
```

### Parameters<Type>

Constrói uma tupla com base nos parâmetros de uma função(tipagem da função) fornecida. Recomendo dar uma olhadinha nesse [artigo](https://www.crisgon.dev/typescript-uma-breve-introdu%C3%A7%C3%A3o-parte-2/), caso não esteja familiarizado com tuplas.

```typescript
type GenericFunctionType = (a: string, b: number, c: boolean) => void;

type GenericType = Parameters<GenericFunctionType>;

// GenericType é uma tupla com a seguinte estrutura [string, number, boolean]

const tupla: GenericType = ["zero", 1, false];
```

### ReturnType<Type>

Esse utilitário recebe a tipagem de uma função e cria um `type` com base no retorno da mesma.

```typescript
type GenericFunction = () => number;

type GenericType = ReturnType<GenericFunction>;

const tupla: GenericType = 1;
```

### Isso é tudo pessoal!

![Isso é tudo pessoal](https://i.pinimg.com/originals/2a/82/1e/2a821ee45ca3cbc384c0b70f730248ae.gif)

Obrigado por chegar até aqui!! Espero que tenha conseguido te ajudar de alguma forma. 😊

Existem outros utilitários do typescript, porém, eles não são tão convencionais e acredito que as chances de você precisar usar um deles é muito remota. Mas basta acessar a [documentação](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype), caso queira conhecer a lista completa.

Em breve irei escrever mais conteúdo sobre Typescript.

Então... Até mais!

### Links importantes

- [Typescript HandBook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Typescript Playground](https://www.typescriptlang.org/play/index.html)
- [You Dont Know Js](https://github.com/getify/You-Dont-Know-JS)
- [Mini-curso de Typescript do Willian Justen](https://www.youtube.com/playlist?list=PLlAbYrWSYTiPanrzauGa7vMuve7_vnXG_)
