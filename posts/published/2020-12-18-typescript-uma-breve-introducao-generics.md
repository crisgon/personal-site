---
title: Typescript - Uma breve introdução -  Generics
resume: >-
  Neste artigo vamos aprender um pouco sobre uma funcionalidade bastante
  versátil e igualmente confusa para iniciantes. Mas relaxe, pois te garanto que
  no fim desse artigo você vai conseguir ler a tipagem de alguma lib javascript
  famosa sem muitos problemas.
date: "2020-12-17 08:24:27"
image: /assets/img/ts-js.png
category: Typescript
tagColor: "#130f40"
---

Nos artigos anteriores nós vimos um pouco sobre tipos básicos, enums, type assertions , interfaces, type aliases, classes e type utilities. Recomendo dar uma conferida neles, caso não se sinta confortável com esses conceitos.

- [Typescript - Uma breve introdução](https://www.cristiano.dev/blog/2020-03-02-typescript-uma-breve-introducao)
- [Typescript - Uma breve introdução - Tuplas, Enums e Type Assertion](https://www.cristiano.dev/blog/2020-07-23-typescript-uma-breve-introducao-parte-2)
- [Typescript - Uma breve introdução - Interfaces](https://www.cristiano.dev/blog/2020-08-10-typescript-uma-breve-introducao-interfaces)
- [Typescript - Uma breve introdução - Type Aliases](https://www.cristiano.dev/blog/2020-09-05-typescript-uma-breve-introducao-type-aliases)
- [Typescript - Uma breve introdução - Classes](https://www.cristiano.dev/blog/2020-10-20-typescript-uma-breve-introducao-classes)
- [Typescript - Uma breve introdução - Type utilities - Parte 1](https://www.cristiano.dev/blog/2020-10-30-typescript-uma-breve-introducao-type-utilities)
- [Typescript - Uma breve introdução - Type utilities - Parte 2](https://www.cristiano.dev/blog/2020-12-07-typescript-uma-breve-introducao-type-utilities-parte-2)

Nos últimos artigos nós aprendemos a criar tipos e logo em seguida a utilizar esses tipos nas nossas funções, classes ou variáveis, mas até aqui só usamos tipos "estáticos". O que eu quero dizer com "estáticos" é que se criarmos uma interface, ao longo do nosso código ela vai permanecer a mesma em todos os lugares que a gente utilizar(a não ser que a gente reescreva essa interface, mas isso não vem ao caso). Porém, uma das nossas atribuições como programadores e programadoras é escrever códigos que possam ser reaproveitados na maior parte dos casos. O ideal seria que um trecho de código feito para um dado X pudesse ser facilmente adaptado ou reutilizado para um dado Y no futuro. Existem muitas formas de alcançar esse feito e uma delas é utilizando generics.

### O que é um generic?

Tá, mas o que é um generic? Basicamente, um generic é uma forma de passar algum "argumento" de tipo para uma função, classe ou interface fazendo com que eles possam ser utilizados de maneiras diferentes e/ou em cenários diferentes. Uma forma clara de entender um generic é pensando em uma função, então vamos ao exemplo.

```typescript
function showInfo(value: string) {
  console.log({ value });
}

showInfo("Ok"); // {value: "Ok"}
```

No trecho de código acima temos uma função simples para mostrar logs, mas note que por hora ela recebe apenas um argumento do tipo string. E se eu quiser utilizar essa função para mostrar logs numéricos?

```typescript
function showInfo(value: string | number) {
  console.log({ value });
}

showInfo(42); // {value: 42}
```

Problema resolvido! E se agora eu quiser mostrar logs de um tipo `Person` que tem a seguinte estrutura `{name: string; age: number`}? Eu poderia simplesmente adicionar esse tipo na minha função, mas note que isso já começa a se tornar algo muito trabalho... Outra solução seria tipar como any, mas assim vamos perder toda a segurança dos nossos tipos.É ai que entram os generics e a nossa função fica da seguinte forma.

```typescript
function showInfo<MeuTipo>(value: MeuTipo) {
  console.log({ value });
}

interface Person {
  name: string;
  age: number;
}

const umaPessoa: Person = {
  name: "Cris",
  age: 25,
};

showInfo<Person>(umaPessoa);
```

Os generics são "argumentos" passados entre `<>` igualzinho ao que vimos com [type utilities](https://www.cristiano.dev/blog/2020-10-30-typescript-uma-breve-introducao-type-utilities). No exemplo acima dizemos que a função `showInfo` vai receber um generic chamado `MeuTipo` e esse generic vai ser usado como tipo para o argumento `value` da minha função. É como se após invocar a função ela ficasse assim:

```typescript
showInfo<Person>(umaPessoa);

// A função ficaria assim

function showInfo(value: Person) {
  console.log({ value });
}
```

No nosso exemplo eu utilizei `MeuTipo`, mas o comum é encontrar apenas letras como T, U, etc. Vale lembrar que podemos passar mais de um argumento pro nosso generic, basta separar por vírgula.

```typescript
function showOtherValues<T, U>(value: T, otherValue: U): T {
  console.log({ value, otherValue });
  return value;
}

showOtherValues<String, Boolean>(false, false); // Erro! Argument of type 'boolean' is not assignable to parameter of type 'String'.

showOtherValues<String, Boolean>("Cris", false); // A função retorna a string 'Cris'
```

Mais um ponto importante é que caso nenhum tipo seja informado o typescript vai tentar fazer a inferência de tipos e utilizar any quando não conseguir.

```typescript
function showInfo<MeuTipo>(value: MeuTipo) {
  console.log({ value });
}

showInfo(false); // Aqui value vai ser do tipo boolean
showInfo(42); // Aqui value vai ser do tipo number
```

### Só consigo usar generics com funções?

Não, a gente consegue utilizar generics em classes e até para construir interfaces. A ideia é a mesma das funções, você passa os "argumentos" do seu generic logo após o nome da sua classe/interface. Vamos aos exemplos!

```typescript
class GenericClass<T> {
  constructor(value: T) {
    this.value = value;
  }

  value: T;

  changeValue(v: T) {
    this.value = v;
  }

  getValue(): T {
    return this.value;
  }
}

let num = new GenericClass<Number>(0);

num.getValue(); // 0

num.changeValue(10); // 10

let str = new GenericClass<string>("");

str.getValue(); // ''

str.changeValue(10); // Erro! Argument of type 'number' is not assignable to parameter of type 'string'.

str.changeValue("Cris"); // Cris
```

Agora veja um exemplo utilizando interfaces.

```typescript
interface GenericInterface<T> {
  value: T;
  getValue(): T;
}

const myObj: GenericInterface<Number> = {
  value: 0,
  getValue() {
    return this.value;
  },
};
```

### Finalizando...

Generic é uma forma de escrever algo genérico, assim como o nome sugere... Utilizando essa funcionalidade podemos construir tipos fáceis de serem aproveitados para as nossas aplicações. Isso que vimos aqui é apenas o essencial para que você não se assuste quando ver um código como esse que acabei de tirar da tipagem do React.

![Generics na tipagem do React](/assets/img/hooks.png "Generics na tipagem do React")

### Isso é tudo pessoal!

![Isso é tudo pessoal](https://i.pinimg.com/originals/2a/82/1e/2a821ee45ca3cbc384c0b70f730248ae.gif)

Obrigado por chegar até aqui!! Espero que tenha conseguido te ajudar de alguma forma. 😊

Em breve irei escrever mais conteúdo sobre Typescript.

Então... Até mais!

### Links importantes

- [Typescript HandBook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Typescript Playground](https://www.typescriptlang.org/play/index.html)
- [You Dont Know Js](https://github.com/getify/You-Dont-Know-JS)
- [Mini-curso de Typescript do Willian Justen](https://www.youtube.com/playlist?list=PLlAbYrWSYTiPanrzauGa7vMuve7_vnXG_)
- [TypeScript - Entendendo Generics por completo](https://oieduardorabelo.medium.com/typescript-entendendo-generics-por-completo-40a372aeea5)
