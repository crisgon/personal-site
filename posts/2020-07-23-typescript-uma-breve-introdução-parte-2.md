---
title: 'Typescript - Uma breve introdução - Tuplas, Enums e Type Assertion'
resume: >-
  No último artigo aprendemos um pouco sobre o básico para iniciar no
  typescript. Dessa vez iremos aprender sobre mais alguns conceitos básicos, mas
  que facilitam muito nosso fluxo de desenvolvimento. 
date: '2020-07-22 10:25:50'
image: assets/img/ts-js.png
category: Typescript
tagColor: '#130f40'
---
No [artigo anterior](https://www.crisgon.dev/typescript-uma-breve-introdu%C3%A7%C3%A3o/) descobrimos como tipar o básico com javascript, number, string, boolean, null, undefined, void, any e never. Dessa vez iremos prosseguir com conceitos básicos e aprender um pouco sobre tuples(tuplas), enums e type assertion.

## Tuplas

Tuplas são utilizadas para representar um array onde sabemos a quantidade exata de elementos, mas queremos tipos específicos para cada um desses elementos.

Vamos supor que eu queira guardar nome, idade e se a pessoa está empregada ou não.

Talvez usar uma tupla não seja a melhor abordagem para armazenar essas informações, mas podemos fazer algo assim:

```typescript
let person: [string, number, boolean];

person = ["Cristiano", 25, true]; // Ok

person = ["Cristiano", 25]  // Erro!

person = [true, 25] // Erro!
```

Algo interessante é que poderíamos recuperar os valores de `person` armazenando em variáveis de forma bem simples através de uma desestruturação.

```typescript
person = ["Cristiano", 25, true];

const [name, age, isEmployed] =  person;

name === "Cristiano"; // true

age === 25; // true

isEmployed === true; // true
```

Um exemplo prático:

```typescript
function useAbobora(a: string): [string] {
  return [a]
}

const [salada] = useAbobora('abobora é bom');

console.log(salada); // abobora é bom
```

No trecho de código acima o `useAbobora` está retornando um array de uma posição, onde o primeiro item desse array é exatamente uma string.  

Um uso real dessa tipagem pode ser encontrada no [useState do React](https://pt-br.reactjs.org/docs/hooks-state.html) que  retorna uma tupla de tamanho 2.  

```typescript
const [name] = useState("Cris");
```

## Enums

O uso de enums pode ser novidade para quem teve contato apenas com JS, mas é algo bem comum pra quem vem de outras linguagens como Java, C, etc.

Um enum é basicamente uma forma de criar um conjunto de contantes com valores pré-definidos de uma maneira bastante legível e fácil de acessar. 

Vamos aos exemplos que tudo vai fazer sentido...

**Suponha que precisamos armazenar alguns dos [elos](https://www.ligadosgames.com/league-of-legends-elo-mmr-pdl/) disponíveis no[ League of Legends](https://br.leagueoflegends.com/pt-br/).** 

Logo de cara eu pensei em guardar tudo em um array da seguinte forma:

```typescript
const elos = [
  "Ferro",
  "Bronze",
  "Prata",
  "Ouro",
  "Platina",
  "Diamante",
]
```

Mas essa não me parece a melhor abordagem... 

* Não queremos fazer nenhuma operação de array, queremos apenas guardar os valores e usar quando necessário.
* Só conseguimos acessar os elos por meio dos índices do array e fica difícil saber qual a posição de um elo apenas por seu nome.

É aí que entram os enums, pois poderíamos armazenar esses valores da seguinte forma:

```typescript
 enum Elos {
  Ferro = 1,
  Bronze, // Bronze terá o valor 2
  Prata, // Prata terá o valor 3
  Ouro, // Ouro terá o valor 4
  Platina, // Platina terá o valor 5
  Diamante, // Diamante terá o valor 6
}
```

E acessar os valores assim:

```typescript
console.log(Elos[2]); // Bronze
console.log(Elos.Ouro); // 4
console.log(`Você é ${Elos[2]} e se encontra na divisão de número ${Elos.Bronze}`)

Elos.Ouro = 199 // Erro!
```

No exemplo acima, nós iniciamos dizendo que ferro tinha o valor 1 e os valores seguintes assumiram um valor incremental de forma automática. Caso ferro não tivesse sido iniciado seu valor seria 0 e os outros teriam um valor incremental(1,2,3...)

Note que podemos acessar um valor a partir da chave ou do seu valor, como nos consoles acima. Também não conseguimos alterar o valor de um enum em tempo de execução, pois ele permite apenas leitura.

*Atenção, é muito importante entender que `Elos[0]` não se refere exatamente a posição 1 como em um array, 0 vai se referir a chave que tiver seu valor. Ao decorrer do artigo isso vai ficar mais evidente.*

### Tipos de Enums

Existem basicamente  três  tipos de enums. Os numéricos, os de texto e os heterogêneos.

#### Numéricos

Conforme vimos no exemplo anterior, os enum numéricos podem ser iniciados ou não e seguem um valor incremental caso os valores seguintes não sejam definidos.

```typescript
enum Cartas {
  As = 1,
  J = 11,
  Q, // Q tem o valor 12
  K // K tem o valor 13
}

console.log(Cartas[11]); // J
console.log(Cartas.As); // 1
```

#### Texto (String)

Enums de strings não possuem o auto-incremento, logo todas as propriedades precisam ser inicializadas obrigatoriamente.

```typescript
// VAI DAR ERRO!! =[
enum Cores {
  RED = '#F00',
  GREEN = '#0F0',
  BLUE = '#00F',
  PINK, // ERROOO
}

// NÃO VAI DAR ERRO! =]
enum Cores {
  RED = '#F00',
  GREEN = '#0F0',
  BLUE = '#00F',
}

console.log(Cores.BLUE); // #00F
```

Usando strings conseguimos acessar seus valores usando apenas o nome de cada chave, aqui não conseguimos fazer o mapeamento reverso como em enums numéricos. Ou seja... não da pra fazer `Cores["#0F0"]`sem receber um errão na cara.

#### Heterogêneos

Esse tipo de enum é basicamente a mistura dos dois anteriores, seu uso não parece ser muito comum, mas da pra criar algo como:

```typescript
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}
```

Só pra matar sua curiosidade, logo abaixo tem uma imagem com o javascript que é gerado quando usamos um enum do typescript.

![Resultado da transpilação de um enum para JS](assets/img/Screenshot from 2020-07-25 02-13-45.png "Resultado da transpilação de um enum para JS")

### Type Assertion

Existem algumas situações em que "sabemos" mais que o typescript, ou simplesmente queremos forçar uma conversão de tipo, nesses casos precisamos recorrer às asserções de tipos(type assertion).

O type assertion é uma forma de falarmos para o compilador  confiar no que estamos escrevendo e que ele não precisa se preocupar fazendo qualquer tipo de verificação. 

```typescript
// Forma 1
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// Forma 2
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

Às duas formas demonstradas logo acima são válidas, porém é mais comum encontrar códigos utilizando a forma 2.

Atenção... Muito cuidado quando você for usar uma type assertion, pois o compilador vai usar a informação que você passou como "a mais pura verdade" e não vai fazer qualquer tipo de verificação. Logo, pode acontecer de você acabar criando alguma inconsistência acidentalmente.

```typescript
let someValue: any; // someValue tem o valor undefined
let strLength: number = (someValue as number) + 2;

console.log(strLength); // NaN
```

### Isso é tudo pessoal!

![Isso é tudo pessoal!](https://i.pinimg.com/originals/2a/82/1e/2a821ee45ca3cbc384c0b70f730248ae.gif)

Obrigado por chegar até aqui!! Espero que tenha conseguido te ajudar de alguma forma. =]

Em breve irei escrever mais conteúdo sobre Typescript. 

Então... Até mais!

### Links importantes

* [Typescript HandBook](https://www.typescriptlang.org/v2/docs/handbook/basic-types.html)
* [Typescript Playground](https://www.typescriptlang.org/play/index.html)
* [You Dont Know Js](https://github.com/getify/You-Dont-Know-JS)
