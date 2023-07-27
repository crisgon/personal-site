---
title: Typescript - Uma breve introdução - Type Aliases
resume: >-
  No último artigo aprendemos um pouco sobre como criar tipos personalizados
  utilizando interfaces. Hoje vamos aprender a criar tipos personalizados usando
  type aliases.
date: '2020-09-05 01:10:03'
image: assets/img/ts-js.png
category: Typescript
tagColor: '#130f40'
---
Nos artigos anteriores nós vimos um pouco sobre tipos básicos, enums, type assertions e interfaces. Recomendo dar uma conferida neles, caso não se sinta confortável com esses conceitos.

* [Typescript - Uma breve introdução](https://www.crisgon.dev/typescript-uma-breve-introdu%C3%A7%C3%A3o/)
* [Typescript - Uma breve introdução - Tuplas, Enums e Type Assertion](https://www.crisgon.dev/typescript-uma-breve-introdu%C3%A7%C3%A3o-parte-2/)
* [Typescript - Uma breve introdução - Interfaces](https://www.crisgon.dev/typescript-uma-breve-introdu%C3%A7%C3%A3o-interfaces/)

Hoje vamos aprender um pouco sobre `type aliases`(type alias), mais uma forma oferecida pelo typescript para criar tipos reutilizáveis de maneira bastante simples. 

Em poucas palavras, `type aliases` nos permite dar "apelidos" para tipos primitivos, tuplas, tipos personalizados e qualquer outro tipo que você desejar. Em alguns casos um `type aliase` pode ser semelhante às interfaces, mas ambos tem peculiaridades que vamos entender ao longo deste artigo.

### Criando nosso primeiro type aliase

Para criar uma `type aliase` é muito simples, basta usar a palavra reservada `type`, inserir um nome e um valor. Igualzinho a declaração de uma variável. Um caso clássico para seu uso é quando precisamos que uma variável possa assumir o valor de dois ou mais tipos primitivos.

```typescript
type numberOrString = number | string;

let val: numberOrString = 10;

val = 'olá';
val = false; // error
```

Mas esse não é o único caso de uso... pra ficar mais claro vamos supor que temos uma função que retorna o faturamento diário, semanal e mensal de uma empresa.

PS: Isso é baseado em um caso real...

```typescript
function getRevenue(type:  "daily" | "weekly" | "monthly") {
  api.get(type) // busca na api...
}

let revenueType: "daily" | "weekly" | "monthly" = "daily"

getRevenue(revenueType) 
```

Até aqui tudo bem... Mas vamos supor que agora temos uma função que retorna o total de despesas diário, semanal e mensal de uma empresa.

```typescript
function getExpenses(type:  "daily" | "weekly" | "monthly") {
  api.get(type) // busca na api...
}

let expenseType: "daily" | "weekly" | "monthly" = "weekly"

getExpenses(expenseType) 
```

Agora as coisas já começam a ficar complicadas... Imagine que nosso sistema também vai fornecer informações anuais. Nós precisamos alterar o código acima em pelo menos 4 lugares. Utilizando `type aliases` nós podemos resolver esse problema facilmente, basta concentrar nosso tipo em um único ponto do código.

```typescript
type period = "daily" | "weekly" | "monthly" | "yearly";

function getRevenue(type:  period) {
  api.get(type) // busca na api...
}

let revenueType: period = "daily"

getRevenue(revenueType) 


function getExpenses(type: period) {
  api.get(type) // busca na api...
}

let expenseType: period = "weekly"

getExpenses(expenseType) 
```

Esse foi um caso muito comum para uso de `type aliases`,  mas podemos fazer seu uso em diversas outras situações. 

Daqui pra frente vou mostrar algumas comparações entre interfaces e `type aliases` para facilitar sua compreensão.

### Type Aliases x Interfaces

Um `type aliases` pode se comportar como uma interface, porém com algumas diferenças bem notáveis.

##### Tipos primitivos

As interfaces não se dão muito bem com tipos primitivos...  Quando queremos ter um tipo que aceite múltiplos tipos primitivos `type` é a melhor opção.

```typescript
// usanto type
type id = number | string;


```

Em contra-partida, interfaces são uma ótima pedida quando queremos fazer representação e composição de tipos que são objetos.

##### Extends

Outra grande diferença é a forma que fazemos a junção de dois tipos(estendemos). Com interfaces usamos o `extends` e com o `type aliase` usamos o `&`.

```typescript
// Com interfaces
interface Person {
 name: string;
 age: number;
}

interface PowerInfo {
  power: string[];
  weakness: string[];
}

interface Hero extends Person, PowerInfo {}

// Com type aliases
type Person =  {
 name: string;
 age: number;
}

type  PowerInfo = {
  power: string[];
  weakness: string[];
}

type Hero = Person & PowerInfo;
```

##### Tuplas

Interfaces não funcionam para declaração de tuplas.😅 Você pode até tentar simular, mas logo vai ver que não funciona como esperado...

```typescript
type tuple = [number, boolean, number];
let myTuple: tuple = [0,true, 1];
myTuple = [0,1]; // error
```

##### Merge

Não podemos declarar duas `type aliases` com o mesmo nome em um escopo, isso gera um erro, enquanto duas interfaces declaradas com o mesmo nome são mergeadas(mescladas).

```typescript
interface Person {
 name: string;
}


interface Person {
 age: number;
}

// Agora person é:
interface Person {
 name: string;
 age: number;
}


type Animal = {
 name: string;
}

type Animal = { // Error. Já existe um tipo declarado com o nome Animal
 specie: string;
}
```

### Quando usar type e quando usar interface?

Assim como pra quase toda pergunta da vida... A resposta pra pergunta acima é **DEPENDE**. Sim, depende do seu time e depende do seu objetivo. 

Geralmente  `type aliases` vai te atender 100% e de quebra vai ter dar a segurança de  não fazer merges sem intenção, pois usando interfaces pode acontecer de você fazer uma redeclaração sem querer e acabar bagunçando sua tipagem...  

Mas como eu disse, tudo depende do seu objetivo. Por exemplo, em uma lib pode ser que existam tipos que     precisam ser facilmente extensíveis.

E  por último, mas não menos importante, siga o padrão do seu time. Ele usa interface? Siga o padrão! Não existe a necessidade de sair mudando tudo pra type, pois não vai fazer tanta diferença assim.

### Isso é tudo pessoal!

![Isso é tudo pessoal](https://i.pinimg.com/originals/2a/82/1e/2a821ee45ca3cbc384c0b70f730248ae.gif)

Obrigado por chegar até aqui!! Espero que tenha conseguido te ajudar de alguma forma. =]

Em breve irei escrever mais conteúdo sobre Typescript.

Então... Até mais!

### Links importantes

* [Typescript HandBook](https://www.typescriptlang.org/v2/docs/handbook/basic-types.html)
* [Typescript Playground](https://www.typescriptlang.org/play/index.html)
* [You Dont Know Js](https://github.com/getify/You-Dont-Know-JS)
* [Mini-curso de Typescript do Willian Justen](https://www.youtube.com/playlist?list=PLlAbYrWSYTiPanrzauGa7vMuve7_vnXG_)
