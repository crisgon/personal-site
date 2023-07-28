---
title: Typescript - Uma breve introdução - Type utilities - Parte 1
resume: >-
  No último artigo aprendemos um pouco sobre classes. Hoje vamos aprender a
  melhorar nosso fluxo de trabalho usando type utilities.
date: "2020-10-29 09:31:06"
image: /assets/img/ts-js.png
category: Typescript
tagColor: "#130f40"
---

![Javascript|Typescript](/assets/img/ts-js.png)

Nos artigos anteriores nós vimos um pouco sobre tipos básicos, enums, type assertions , interfaces, type aliases e classes. Recomendo dar uma conferida neles, caso não se sinta confortável com esses conceitos.

- [Typescript - Uma breve introdução](https://www.crisgon.dev/typescript-uma-breve-introdu%C3%A7%C3%A3o/)
- [Typescript - Uma breve introdução - Tuplas, Enums e Type Assertion](https://www.crisgon.dev/typescript-uma-breve-introdu%C3%A7%C3%A3o-parte-2/)
- [Typescript - Uma breve introdução - Interfaces](https://www.crisgon.dev/typescript-uma-breve-introdu%C3%A7%C3%A3o-interfaces/)
- [Typescript - Uma breve introdução - Type Aliases](https://www.crisgon.dev/typescript-uma-breve-introdu%C3%A7%C3%A3o-type-aliases/)
- [Typescript - Uma breve introdução - Classes](https://www.crisgon.dev/typescript-uma-breve-introdu%C3%A7%C3%A3o-classes/)

### Type Utilities

Type utilities são um conjunto de utilitários que o typescript nos oferece para manusear tipos de forma simples. Esses utilitários são disponíveis globalmente e conhece-los são de extrema importância pra que você não olhe um código typescript e fique voando.

O padrão dos utilitários é `NOME<ARGUMENTOS>`. É como se estivéssemos invocando uma função, porém usando <>.

#### Partial<Type>

Esse utilitário faz com que todas as propriedades de uma interface se tornem opcionais.

Seu uso é bastante simples, basta passar o tipo como "argumento" `Partial<MeuTipo>`

```typescript
interface Music {
  name: string;
  artist: string;
  duration: number;
}

type newMusic = Partial<Music>;
// É isso que newMusic representa
// interface newMusic {
//   name?: string;
//   artist?: string;
//   duration?: number;
// }

const song: newMusic = {
  name: "yura yura ",
};
```

#### Required<Type>

Faz exatamente o oposto do `Partial`. Com eles todas as propriedades de um tipo se tornam obrigatórias.

```typescript
interface User {
  name?: string;
  age?: number;
}

const oldUser: User = {
  name: "Cristiano",
};

const newUser: Required<User> = {
  name: "Cristiano",
};
// Aqui vamos ter um pequeno erro

//Property 'age' is missing in type '{ name: string; }' but required in type 'Required<User>'.
```

#### Readonly<Type>

Conforme o nome sugere, esse utilitário faz com que todos os itens de um tipo sejam apenas de leitura. Isso impossibilita que um valor seja reatribuído em tempo de execução. Ou seja, você não consegue alterar um valor enquanto desenvolve, mas é possível fazer reatribuições depois que o typescript for compilado para javascript, pois no fim das contas o objeto não é congelado com [Object.freeze](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze).

```typescript
interface Music {
  name: string;
  artist: string;
  duration: number;
}

type newMusic = Readonly<Music>;

const song: newMusic = {
  name: "re: re",
  artist: "Asian kung -u generation",
  duration: 5.32,
};

song.duration = 5.33;
// Aqui vamos ter um pequeno erro
// Cannot assign to 'duration' because it is a read-only property
```

![Playground typescript](/assets/img/Captura de tela de 2020-11-03 23-59-04.png "Resultado do typescript compilado")

A imagem acima mostra lado a lado os códigos typescript e javascript. Note que o typescript apresenta um erro de compilação e isso falharia com nosso build, mas meu foco é apenas o javascript após uma compilação de sucesso... veja que eu tenho uma reatribuição e um console no meu javascript. Logo abaixo temos o resultado do console e você pode ver que consegui alterar a `duration` de `5.32` para `5.33`. É muito importante entender que o `Readonly` não substitui o [Object.freeze](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze).

### Record<Keys, Type>

O `Record` recebe dois "parâmetros" que são utilizados para construir uma nova interface. Os parâmetros são as keys, que serão as propriedades da interface, e o o type que vai ser usado como o tipo de cada uma das propriedades. É meio confuso, mas com os exemplos vai ser fácil de absorver a ideia.

```typescript
interface Character {
  name: string;
  level: number;
}

type Classes = "mage" | "paladin" | "warrior";

type TeamType = Record<Classes, Character>;

const team: TeamType = {
  mage: { name: "Cris", level: 1 },
  paladin: { name: "Jon", level: 5 },
  warrior: { name: "Maria", level: 22 },
};
```

No código acima declaramos o `TeamType` que seria equivalente a declarar a interface abaixo:

```typescript
interface TeamType {
  mage: {
    name: string;
    level: number;
  };
  paladin: {
    name: string;
    level: number;
  };
  warrior: {
    name: string;
    level: number;
  };
}
```

Mas porque usar `Record` ao invés de simplesmente declarar uma interface? Usando o `Record` temos algo mais dinâmico, pense o seguinte: atualmente temos apenas as classes de rpg **mage**, **paladin** e **warrior**. E se futuramente as classes **barbarian** e **shaman** forem introduzidas? Com `Record` só precisamo alterar o nosso type Classes ao invés de criar 2 novas interfaces.

### Pick<Type, Keys>

Com esse utilitário nós podemos criar um tipo escolhendo quais partes de um tipo base queremos utilizar. Os "argumentos" que o `Pick` recebe são os mesmos do `Record`, um tipo e uma lista de chaves separadas por `|`.

```typescript
interface Music {
  name: string;
  artist: string;
  duration: number;
  style: string;
}

type Artist = Pick<Music, "artist" | "style">;

const newArtist: Artist = {
  artist: "Emicida",
  style: "Rap",
};
```

### Omit<Type, keys>

O `Omit` faz exatamente o contrário do `Pick`. Ele extrai todas as propriedades de um tipo, com exceção das que forem passadas como argumento. Quando escolher omit ao invés do pick? Isso é simples, não faz sentido listar todas as propriedades de um tipo com pick, quando podemos apenas passar as propriedades que não queremos.

```typescript
type Artist = {
  name: string;
};
interface MovieDetails {
  name: string;
  poster: string;
  year: number;
  duration: number;
  category: string;
  rate: number;
  sinopse: string;
  casting: Artist[];
}

type Movie = Omit<MovieDetails, "casting">;

const newmovie: Movie = {
  name: "O Castelo Animado",
  category: "animation",
  poster: "https://castelo.png",
  year: 2004,
  duration: 1.59,
  rate: 4.6,
  sinopse: "Uma bruxa lança uma terrível maldição sobre a jovem Sophie...",
};
```

Seria bem mais trabalhoso se a gente usasse pick para listar todas as propriedades que iriamos reaproveitar no nosso tipo.

### NonNullable<Type>

Esse é um utilitário bem simples, pois ele apenas remove `null` e `undefined` do nosso tipo. Vale lembrar que se temos uma interface com uma propriedade null/undefined e usarmos o `NonNullable` nada irá acontecer.

```typescript
// Caso onde NonNullable funciona
type GenericType = string | number | undefined | null | boolean[];

const someThing: NonNullable<GenericType> = null;
// Aqui vamos ter um pequeno erro
//Type 'null' is not assignable to type 'string | number | boolean[]'.

interface User {
  name: undefined;
  age: number;
}

// Caso onde NonNullable não funciona

const newUser: NonNullable<User> = {
  age: 22,
};

// Aqui vamos ter um pequeno erro
//Property 'name' is missing in type '{ age: number; }' but required in type 'User'.
```

### Isso é tudo pessoal!

![Isso é tudo pessoal](https://i.pinimg.com/originals/2a/82/1e/2a821ee45ca3cbc384c0b70f730248ae.gif)

Obrigado por chegar até aqui!! Espero que tenha conseguido te ajudar de alguma forma. 😊

A lista de utilitários é grande, por isso resolvi dividir esse tópico em duas partes.

Em breve irei escrever mais conteúdo sobre Typescript.

Então... Até mais!

### Links importantes

- [Typescript HandBook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Typescript Playground](https://www.typescriptlang.org/play/index.html)
- [You Dont Know Js](https://github.com/getify/You-Dont-Know-JS)
- [Mini-curso de Typescript do Willian Justen](https://www.youtube.com/playlist?list=PLlAbYrWSYTiPanrzauGa7vMuve7_vnXG_)
