---
title: Typescript - Uma breve introdução - Interfaces
resume: >-
  Nos últimos artigos aprendemos um pouco sobre o básico para iniciar no
  typescript, porém existem momentos em que os tipos básicos não atendem todas
  as nossas necessidades.
date: "2020-08-09 10:02:04"
image: /assets/img/ts-js.png
category: Typescript
tagColor: "#130f40"
---

Nos artigos anteriores a gente viu um pouco sobre tipos básicos, enums e type assertions. Recomendo dar uma conferida neles, caso não se sinta confortável com esses conceitos.

- [Typescript - Uma breve introdução](https://www.cristiano.dev/blog/2020-03-02-typescript-uma-breve-introducao)
- [Typescript - Uma breve introdução - Tuplas, Enums e Type Assertion](https://www.cristiano.dev/blog/2020-07-23-typescript-uma-breve-introducao-parte-2)

Em quase todos os cenários apenas os tipos básicos não vão ser suficientes para que consigamos escrever uma aplicação robusta usando typescript, pois a medida que os nossos dados ficam mais complexos as tipagem tendem a seguir o mesmo caminho. É pensando nesse cenário que o typescript nos oferece as interfaces para a criação de tipos customizados.

### Duck typing

Antes de prosseguir preciso explicar um pouco sobre [Duck typing](https://pt.wikipedia.org/wiki/Duck_typing)(tipagem pato), pois é um conceito importante para entender o funcionamento de interfaces.

O uso do duck typing ou structural subtyping(tipagem estrutural) foca exatamente na forma que os valores apresentam, ela segue o princípio de que se anda como um pato, voa como um pato e grasna como um pato então é um pato. O nome desse conceito é associado ao [teste do pato](https://pt.wikipedia.org/wiki/Teste_do_pato) de [James Whitcomb Riley](https://pt.wikipedia.org/w/index.php?title=James_Whitcomb_Riley&action=edit&redlink=1 "James Whitcomb Riley (página não existe)").

> Suponha que você vê um pássaro andar por volta de uma fazenda. Este pássaro não tem nenhuma placa que diz 'pato'. Mas o pássaro certamente parece a um pato. Também, ele vai ao tanque e você nota que ele nada como um pato. Então ele abre o seu bico e grasna como um pato. Bem, agora você conseguiu provavelmente a conclusão que o pássaro é um pato, mesmo que ele esteja usando uma placa ou não Harv,Immerman,1982, p.102

Isso pode não ter feito muito sentido pra você, mas siga lendo o textinho que logo vai ficar claro como isso se comporta em termos de código.

### Criando nossa primeira interface

Pense que temos uma função que recebe um usuário como argumento e esse usuário precisa ter sempre nome e idade. A função ficaria assim:

```typescript
function showUser(user: { name: string; age: number }) {
  console.log(user.name + "tem " + user.age + " anos de idade");
}

showUser({ name: "Cristiano", age: 25 });
```

Agora imagine que precisamos fazer operações com user em várias partes do nosso código e também precisamos garantir que ele sempre tenha name e age. A gente poderia simplesmente sair reescrevendo o objeto `{name: string, age: number}` em todo lugar que a gente precisar ou então poderíamos extrair isso em uma interface:

```typescript
interface User {
  name: string;
  age: number;
}

function showUser(user: User) {
  console.log(user.name + "tem " + user.age + " anos de idade");
}

const newUser: User = {
  name: "Cristiano",
  age: 25,
};
```

### Tá, mas cadê o duck typing?

Calma... Vamos supor que temos uma função que recebe o nome e o tipo de um pokemon e imprime um dos seus counters.

```typescript
interface Pokemon {
  name: string;
  type: "fogo" | "agua" | "grama";
}

function showPokemonCounter(pokemon: Pokemon) {
  const counters = {
    fogo: "agua",
    agua: "grama",
    grama: "fogo",
  };

  console.log(pokemon.name + " é fraco contra " + counters[pokemon.type]);
}

const charmander = { name: "charmander", type: "fogo" };
showPokemonCounter(charmander); // charmander é fraco contra agua
```

O typescript verifica se o argumento passado para a função `showPokemonCounter` é exatamente um objeto que possuí uma propriedade `name` do tipo string e uma propriedade `type` do tipo 'fogo', 'agua' ou 'grama'.

Até aqui tudo bem... E agora que entra o **duck typing**. O que acontece se eu adicionar mais uma propriedade no argumento que vou passar para `showPokemonCounter` ?

```typescript
interface FullPokemon {
  name: string;
  type: "fogo" | "agua" | "grama";
  pokeNumber: number;
}

const squirtle: FullPokemon = { name: "squirtle", type: "agua", number: 7 };
showPokemonCounter(squirtle); // squirtle é fraco contra grama
```

Opa... Nenhum erro aconteceu! Isso graças a ação do **duck typing**, pois mesmo tendo a propriedade `number`, o pokemon que passamos ainda tem o `name` e o `type` exatamente como a função esperava.

É como se a gente tivesse um pato que voa, nada, grasna e fica invisível. Ele ta fazendo uma coisa diferente..., mas ele ainda faz as coisas que definimos como essenciais para classificá-lo como um pato.

### Interfaces híbridas

Até aqui você já deve ter percebido que as interfaces podem ser compostas por diversos tipos. Number, strings, booleans, functions, etc e até tipos customizados.

```typescript
interface Addres {
  city: string;
  country: string;
}

interface User {
  name: string;
  address: Addres;
  sayHi(): string;
}

const user: User = {
  name: "Cris",
  address: { city: "Alagoinhas", country: "Brasil" },
  sayHi: () => "olá",
};
```

### Propriedades opcionais

Podem existir casos em que algumas propriedades podem existir ou não e é muito fácil de definir isso, basta adicionar um `?` depois do nome da propriedade. Só é preciso tomar cuidado, pois uma propriedade não definida tem o seu valor `undefined`.

```typescript
interface User {
  name: string;
  age?: number;
}

const user = (User = { name: "Cris" });
user.name; // Cris
user.age; // undefined
```

### Propriedade de apenas leitura

Para casos em que uma propriedade não pode ser alterada depois da sua definição a gente pode usar o `readonly`.

```typescript
interface User {
  readonly id: number;
  name: string;
  age?: number;
}

const user: User = { id: 1, name: "Cris" };

user.name = "Cristiano"; // tudo ok
user.id = 2; // Erro! Cannot assign to 'id' because it is a read-only property.
```

### Tipando funções

As interfaces permitem tipar objetos de diversas formas, mas elas também são ótimas para descrever tipos de funções.

```typescript
interface SumType {
  (a: number, b: number): number;
}

const sum: SumType = (a, b) => a + b;
sum("a", 2); // Erro! Argument of type '"a"' is not assignable to parameter of type 'number'.

sum(2, 2); // 4
```

### Estendendo interfaces

Assim como classes, as interfaces podem ser estendidas e isso permite que a gente crie interfaces genéricas e reaproveitáveis.

```typescript
interface User {
  name: string;
  email: string;
}

interface Admin extends User {
  isAdmin: boolean;
}
```

## Interfaces com tipos Indexáveis

Os tipos indexáveis tem uma _assinatura de índice_ que descreve os tipos que podemos usar para indexar em um objeto, exemplo `a[10]` (usa um número como índice) `a['name']`(usa string como índice).

```typescript
interface NumberOrStringDictionary {
  [key: number]: number | string;
}

const array: NumberOrStringDictionary = [1, 2, "a"];

console.log(array[1]); // 2
console.log(array["2"]); // Erro
```

É interessante que se tentarmos fazer um `array.push('b')` vamos ter um erro de tipo, pois `push` não foi definido na interface `NumberOrStringDictionary`. Teríamos que fazer algo assim:

```typescript
interface NumberOrStringDictionary {
  [key: number]: number | string;
  push(val: number | string): number;
}

const array: NumberOrStringDictionary = [1, 2, "a"];
array.push("b");
console.log(array[3]); // b
```

Também podemos usar tipos indexáveis para trabalhar com objetos ou array de objetos que as propriedades são dinâmicas. Eu costumo usar isso com uma certa constância.

```typescript
interface DynamicObject {
  [key: string]: number;
}

const array: DynamicObject[] = [{ one: 1, two: 2 }, { three: 3 }, { four: 4 }];

console.log(array); // [ { "one": 1, "two": 2 }, { "three": 3 }, { "four": 4 } ]
```

### Devo usar classes ou interfaces

Existe a possibilidade de tipar nossos dados utilizando classes, porém quando nosso typescript é transformado em javascript a gente acaba tendo uma classe inútil, pois ela é declarada e não é usada em local nenhum. Isso acontece porque o typescript só fazia uso em tempo de execução. Veja as imagens abaixo.

![Tipagem usando interfaces](/assets/img/tipage-interfaces.png)

A imagem acima mostra o resultado de um código javascript tipado usando interfaces, note que a interface foi descartada e não poluí o nosso código final.

![Tipagem usando classes](/assets/img/tipagem-classes.png")

A imagem acima mostra um código javascript tipado usando classes, note que uma classe é criada, mas não é usada em momento algum no nosso código final.\
**PS: eu precisei iniciar as propriedades com um valor, pois o typescript reclamou que elas não tinham sido inicializadas no construtor.**

Acredito que ficou claro qual opção escolher quando queremos apenas ter a segurança de tipos.

### Isso é tudo pessoal!

![Isso é tudo pessoal](https://i.pinimg.com/originals/2a/82/1e/2a821ee45ca3cbc384c0b70f730248ae.gif)

Obrigado por chegar até aqui!! Espero que tenha conseguido te ajudar de alguma forma. =]

Em breve irei escrever mais conteúdo sobre Typescript.

Então... Até mais!

### Links importantes

- [Typescript HandBook](https://www.typescriptlang.org/v2/docs/handbook/basic-types.html)
- [Typescript Playground](https://www.typescriptlang.org/play/index.html)
- [You Dont Know Js](https://github.com/getify/You-Dont-Know-JS)
- [Classes x Interfaces](https://imasters.com.br/desenvolvimento/typescript-classes-vs-interfaces)
- [TypeScript and Duck Typing](https://medium.com/@ajay.bhosale/typescript-and-duck-typing-7b3d7bb6f03c)
- [Typescript Indexable Types](https://medium.com/@ole.ersoy/typescript-indexable-types-1e08780e5e13)
