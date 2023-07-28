---
title: Typescript - Uma breve introdução - Classes
resume: >-
  No último artigo aprendemos um pouco sobre como criar tipos personalizados
  utilizando type alias. Hoje vamos aprender a criar tipos personalizados usando
  type aliases.
date: "2020-10-19 01:00:27"
image: /assets/img/ts-js.png
category: Typescript
tagColor: "#130f40"
---

Nos artigos anteriores nós vimos um pouco sobre tipos básicos, enums, type assertions , interfaces e type aliases. Recomendo dar uma conferida neles, caso não se sinta confortável com esses conceitos.

- [Typescript - Uma breve introdução](https://www.crisgon.dev/typescript-uma-breve-introdu%C3%A7%C3%A3o/)
- [Typescript - Uma breve introdução - Tuplas, Enums e Type Assertion](https://www.crisgon.dev/typescript-uma-breve-introdu%C3%A7%C3%A3o-parte-2/)
- [Typescript - Uma breve introdução - Interfaces](https://www.crisgon.dev/typescript-uma-breve-introdu%C3%A7%C3%A3o-interfaces/)
- [Typescript - Uma breve introdução - Type Aliases](https://www.crisgon.dev/typescript-uma-breve-introdu%C3%A7%C3%A3o-type-aliases/)

Antes prosseguirmos gostaria de deixar claro que não vamos abordar orientação a objetos nesse artigo! O objetivo aqui é apresentar algumas das funcionalidades que o typescript nos oferece para trabalhar com classes.

### Classes

> Classes em JavaScript são introduzidas no ECMAScript 2015 e são simplificações da linguagem para as heranças baseadas nos protótipos. A sintaxe para classes **não** introduz um novo modelo de herança de orientação a objetos em JavaScript. Classes em JavaScript provêm uma maneira mais simples e clara de criar objetos e lidar com herança.
>
> _[MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Classes)_

```typescript
class Student {
  constructor(name, n1, n2, n3) {
    this.name = name;
    this.n1 = n1;
    this.n2 = n2;
    this.n3 = n3;
  }

  getAverage() {
    return (this.n1 + this.n2 + this.n3) / 3;
  }
}

const cristiano = new Student("Cristiano", 7, 8, 9);
console.log(cristiano); // {name: "Cristiano", n1: 7, n2: 7, n3: 7}
console.log(cristiano.name); // Cristiano
console.log(cristiano.getAverage()); // 8
```

Até aqui não tem nada de typescript... Todo código acima é vanilla js e você consegue executar ele no console do navegador sem grandes problemas. Recomendo conferir a [documentação do MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Classes), caso não esteja confortável com classes no javascript.

### Tá, mas onde tem typescript?

![Will Smith pensativo](https://media1.tenor.com/images/8ba280cf79c3a988bfb7cce7258e39d6/tenor.gif?itemid=4813460)

Certo, é hora de focar no que o typescript oferece, além do básico de classes que você já deve conhecer. Vamos aprender um pouco sobre modificadores de acesso e classes abstratas.

> Em programação orientada a objetos,**modificador de acesso**, também chamado de **visão de método** ou ainda **visão de atributo**, é a palavra-chave que define um atributo, método ou classe como público, privado ou protegido.
>
> _[Wikipédia](https://pt.wikipedia.org/wiki/Modificador_de_acesso)_

#### Público(public)

Por padrão tudo no typescript é público até que você diga o contrário. Isso quer dizer que conseguimos acessar e manipular os métodos e propriedades(atributos) das nossas classes livremente. É interessante utilizar a palavra-chave `public` de forma explicita para deixar tudo padronizado, mas você verá que é algo opcional.

```typescript
class Employee {
  public name: string;
  public salary: number;

  public constructor(name: string, salary: number) {
    this.name = name;
    this.salary = salary;
  }
}

const programmer = new Employee("John", 12000);

console.log(programmer.name); // John
console.log(programmer.salary); // 12000

programmer.salary = 9999;

console.log(programmer.salary); // 9999
```

Com o modificador public(ou não utilizando nenhum modificador) conseguimos pintar e bordar com nosso objeto. Você notou que conseguimos alterar até o salário depois que instanciamos a classe e criamos o objeto `programmer`?

A classe declarada abaixo tem o **MESMO** efeito da que declaramos anteriormente, a única diferença é que não estamos explicitando que as propriedades são públicas.

```typescript
class Employee {
  name: string;
  salary: number;

  constructor(name: string, salary: number) {
    this.name = name;
    this.salary = salary;
  }
}

const programmer = new Employee("John", 12000);

console.log(programmer.name); // John
console.log(programmer.salary); // 12000
```

#### Privado(private)

Também podemos declarar propriedades e métodos como privado, isso fará com que eles não sejam acessíveis fora da sua classe.

```typescript
class User {
  private username: string;
  private password: string;

  constructor(name: string, pass: string) {
    this.username = name;
    this.password: pass;
  }
};

const admin = new User('Cristiano', '123');
console.log(admin.username); // Property 'username' is private and only accessible within class 'User'.
```

Aqui só conseguimos acessar `username` ou `password` expondo por meio de algum método, ou atributo público.

```typescript
class User {
  private username: string;
  private password: string;

  constructor(name: string, pass: string) {
    this.username = name;
    this.password: pass;
  }

  public getInfo() {
    return {
     username: this.username,
      password: this.passowrd

    }
  }
};

const admin = new User('Cristiano', '123');
console.log(admin.getInfo());
```

#### Protegido(protected)

Métodos e atributos protegidos são semelhantes aos privados. A única diferença é que conseguimos acessá-los em classes derivadas.

Como assim?

```typescript
class User {
  protected username: string;

  constructor(name: string) {
    this.username = name;
  }
}

const user = new User("Cristiano");

user.username; //Property 'username' is protected and only accessible within class 'User' and its subclasse
```

O código acima nos gera um erro, pois estamos tentando acessar uma propriedade protegida que só pode ser acessada na própria classe ou nas classes derivadas dela.

Segue o exemplo:

```typescript
class User {
  protected username: string;

  constructor(name: string) {
    this.username = name;
  }
}

class Employee extends User {
  private salary: number;

  constructor(username: string, salary: number) {
    super(username);
    this.salary = salary;
  }

  getInfo() {
    return `${this.username} recebe o salário de ${this.salary}`;
  }
}

const admin = new Employee("Cristiano", 999);
console.log(admin.username); // Property 'username' is protected and only accessible within class 'User' and its subclasse
console.log(admin.getInfo());
```

A classe `Employee` é derivada de `User`, por isso ela consegue acessar `username` no método `getInfo.` Porém, vamos ter um erro ao tentar acessar `username` em um objeto criado de `Employee.`

#### Apenas leitura(readonly)

Propriedades e métodos readonly são públicos, mas apenas para leitura. Não conseguimos fazer alterações no seu valor depois de iniciados.

```typescript
class User {
  readonly username: string;

  constructor(name: string) {
    this.username = name;
  }
}

const user = new User("Cristiano");
console.log(user.username); // Cristiano
user.username = "João"; // Cannot assign to 'username' because it is a read-only property.
```

### Estática(static)

Até o momento só vimos propriedades que vão aparecer no objeto quando uma classe for instanciada, mas também podemos declarar propriedades visíveis apenas a classe e para uso inter. Pra isso basta utilizar a palavra-chave `static` e para acessar ao invés do `this` usamos o nome da classe.

```typescript
class User {
  static id = "22";
  public username: string;

  constructor(name: string) {
    this.username = name;
  }

  getInfo() {
    console.log({ id: User.id, name: this.username });
  }
}

const user = new User("Cristiano");
user.getInfo(); // { id: "22", name: "Cristiano" }
```

### Classes Abstratas(abstract)

Classes abstratas são classes bases que outras classes podem ser derivadas, porém, não podemos fazer instância de uma classe abstrata. É algo que você pode usar **APENAS** como "inspiração" para criar outras classes.

Para criar uma classe abstrata basta usar a palavra reservada `abstract` e quando você tentar fazer uma instância receberá um erro.

```typescript
abstract class Player {
  jump(): void {
    console.log("jumping");
  }
}

const player1 = new Player(); // Cannot create an instance of an abstract class.
```

Porém, você pode estender essa classe e usar os seus métodos ou propriedades.

```typescript
abstract class Player {
  jump(): void {
    console.log("jumping");
  }
}

class PlayerOne extends Player {
  walk() {
    console.log("walking");
  }
}

const p1 = new PlayerOne();
p1.jump(); // "jumping"
p1.walk(); // "walking"
```

Também podemos criar métodos abstratos sem nenhuma implementação, fazendo isso na classe derivada.

```typescript
abstract class Player {
  abstract attack(): void;

  jump(): void {
    console.log("jumping");
  }
}

class Boss extends Player {
  constructor() {
    super();
  }

  attack() {
    console.log("attacking");
  }
}

const finalBoss = new Boss();
finalBoss.jump(); // "jumping""
finalBoss.attack(); // attacking
```

### Isso é tudo pessoal!

![Isso é tudo pessoal](https://i.pinimg.com/originals/2a/82/1e/2a821ee45ca3cbc384c0b70f730248ae.gif)

Obrigado por chegar até aqui!! Espero que tenha conseguido te ajudar de alguma forma. =]

Em breve irei escrever mais conteúdo sobre Typescript.

Então... Até mais!

### Links importantes

- [Typescript HandBook](https://www.typescriptlang.org/v2/docs/handbook/basic-types.html)
- [Typescript Playground](https://www.typescriptlang.org/play/index.html)
- [You Dont Know Js](https://github.com/getify/You-Dont-Know-JS)
- [Mini-curso de Typescript do Willian Justen](https://www.youtube.com/playlist?list=PLlAbYrWSYTiPanrzauGa7vMuve7_vnXG_)
