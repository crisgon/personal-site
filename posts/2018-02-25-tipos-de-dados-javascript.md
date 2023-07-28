---
title: Tipos de dados Javascript
resume: >-
  Estive estudando sobre tipos primitivos do javascript e resolvi compartilhar o “pequeno” resumo que fiz durante meus estudos, é algo bem introdutório, mas pode ajudar quem está iniciando.
date: "2018-01-25 10:09:00"
image: /assets/img/javascriptWallpaper.jpg
category: JS
tagColor: "#f1c40f"
---

Como já tinha comentado em outro [post](https://crisgon.github.io/posts/Todo-dia-um-blog-diferente/), esse blog foi criado para documentar e compartilhar meu estudo sobre tecnologias front end. Essa semana eu retomei os estudos sobre Javascript(JS) e decidi começar do básico, pois quero entender bem sobre os princípios da linguagem. Inicialmente eu estudei sobre os tipos primitivos da linguagem e resolvi compartilhar o “pequeno” resumo que fiz durante meus estudos, é algo bem introdutório, mas é um pouco do que entendi sobre o assunto.

![Xícara com desenho do Javascript](/assets/img/javascriptWallpaper.jpg "Xícara com desenho do Javascript")

Antes de falar sobre os tipos primitivos de dados é preciso comentar sobre algo de grande importância na linguagem Javascript. Ela não é uma linguagem fortemente tipada, isso quer dizer que não precisamos declarar o tipo da variável no ato da criação. Ou seja, não precisamos dizer se ela vai ser um inteiro, um caractere, simplismente declaramos um valor.

**Exemplos:**

```c
//Declaração de variaves em C
int numeroDeHoras = 0;
float precoDoQuilo = 10.53;
double  taxaDoDolar = 1.8;
char nomeDoCliente[30] = "Fulano";
```

```javascript
//Declaração de variaves em Javascript
var numeroDeHoras = 0;
var precoDoQuilo = 10.53;
var taxaDoDolar = 1.8;
var nomeDoCliente = "Fulano";
```

Ao criarmos uma variável no Javascript, ela pode assumir valores de diversos tipos. Entre os tipos disponíveis na linguagem os principais são \[number, string, boolean, object, function e undefined].

### [](https://crisgon.github.io/posts/Tipos-de-dados-Javascript/#Number "Number")Number

Ao contrário de algumas linguagens, o JS não define diferentes tipos de números, como interger, float, long e etc. Temos apenas dois tipos, os inteiros e os de ponto flutuante.

**Exemplo:**

```javascript
var num1 = 120; //Esse é um numero inteiro(int)
var num2 = 12.01; //Esse é um numero de ponto flutuante(float)
```

Os números inteiros são preciso até 15 dígitos

**Exemplo:**

```javascript
var num1 = 999999999999999; // num1 vai ser 999999999999999
var num2 = 9999999999999999; // num2 vai ser 10000000000000000.
```

Os números de ponto flutuante aceitam precisamente até 17 casas decimais

**Exemplo:**

```javascript
var num1 = 0.1234567891234568; // 0.1234567891234568
var num2 = 0.123456789123455555588; // 0.12345678912345555
```

Podemos utilizar os números para fazer as operações básicas (soma, subtração, divisão, multiplicação) e também podemos fazer cálculos mais complexos, como raiz quadrada, cosseno, seno e diversos tipos de operações utilizando o [Math](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math) do javascript.

### Quando tratamos de aritmética podemos ter 3 resultados principais:

#### [](https://crisgon.github.io/posts/Tipos-de-dados-Javascript/#Numero-inteiro-ou-com-casas-decimais "Número inteiro ou com casas decimais")Número inteiro ou com casas decimais

**Exemplo:**

```javascript
num1 = 0.5 - 0.5; // 0
num2 = 2 - 1; // 1
num1 = 2 * 3; // 6
num2 = 2 / 2; // 1
```

Existem casos em que a operação não é precisa:

```javascript
num1 = 0.2 + 0.1; // 0.30000000000000004
```

> OBS: Números ‘somados’ a strings geram uma string com a concatenação dosvalores.

**Exemplo:**

```javascript
num1 = "Letra" + 1; // Letra1
num2 = 2 + "numero"; // 2numero
```

Em alguns casos, quando existir uma string na operação o resultado não será uma soma, mas sim uma concatenação.\
\
**Exemplo:**

```javascript
"O resultado é igual a" + 10 + 10; // O resultado é igual a1010
```

Porém o compilador JS funciona da esquerda para direita, podendo fazer uma soma antes da concatenação.\
\
**Exemplo:**

```javascript
num1 = 10 + 20 + "numero"; // 30numero
```

#### [](https://crisgon.github.io/posts/Tipos-de-dados-Javascript/#Numero-inteiro-ou-com-casas-decimais "Número inteiro ou com casas decimais")+ Infinito e - Infinito

O infinito é utilizado para representar números que excedem a capacidade de representação númerica do JS, seja o menor ou o maior número.

```javascript
num1 = 3 / 0; // Infinity
num2 = -3 / 0; // -Infinity
```

> OBS: Podemos verificar o maior e o menor número que podem ser representados com as seguintes propriedades.\
> _Number.MAX_VALUE e Number.MIN_VALUE_, basta executa-los no console do seu navegador.

#### NaN (Not a Number - Não é um número)

O NaN é utilizado para representar o resultado de uma tentativa de operação numérica, mas que não é um número.

**Exemplo:**

```javascript
num1 = 2 * "string"; // NaN
num2 = 2 - "string"; // NaN
num1 = 2 / "String"; // NaN
num2 = 0 / 0; //NaN
```

#### NaN não é igual a NaN

```javascript
NaN == NaN; //Falso
```

Isso acontece, pois o NaN é o resultado de uma operação que não “faz sentido”, logo o resultado de uma operação “sem sentido” não é igual ao resultado de outra operação “sem sentido”.

#### [](https://crisgon.github.io/posts/Tipos-de-dados-Javascript/#Numeros-em-forma-de-strings "Números em forma de strings:")Números em forma de strings:

O JS faz conversão de tipos e em todos os casos que existir duas ou mais strings contendo números ele vai tentar fazer a conversão antes da operação.

\
**Exemplo:**

```javascript
num1 = "10" - "10"; // 0
num2 = "10" * "10"; // 100
num1 = "10" / "10"; // 1
num2 = "10" + "10"; // '1010'
```

Apenas no caso do sinal de + que a conversão não acontece, pois quando existe uma string esse sinal é utilizado para concatenação.

#### [](https://crisgon.github.io/posts/Tipos-de-dados-Javascript/#Declarando-numeros "Declarando números")Declarando números

Números podem ser declarados de duas formas, da forma literal ou na forma de objetos.\
**Forma literal: var num = 10**\
**Forma de objeto: var num = new Number(10)**

Aparentemente, ambas as formas resultam em um número, porém elas tem tipos diferentes. Com a forma literal nós temos um tipo number e com a forma de objetos nós temos um tipo object.

**Exemplo:**

```javascript
var num1 = 2;
var num2 = new Number(2);
typeof num1; // number
typeof num2; // object
```

Se compararmos num1 a num2 teremos o seguinte resultado.

```javascript
num1 == num2; // verdadeiro, pois só verificamos o valor
num1 === num2; // falso, pois possuem o mesmo valor, mas são de tipos diferentes
```

Também temos um problema ao comparar dois números criados em forma de objetos, pois a comparação entre dois objetos sempre retorna falso.

```javascript
var num1 = new Number(2);
var num2 = new Number(2);
num1 == num2; // falso
```

O recomendado é criar números da forma literal, pois eles são do tipo number e possuem a execução mais veloz.

### [](https://crisgon.github.io/posts/Tipos-de-dados-Javascript/#String "String")String

String é um tipo de dado, imutável, do JS que pode ser usado para armazenar e manipular caracteres e textos, podendo conter 0 ou mais caracteres.

Uma string pode ser declarada das seguintes formas:

```javascript
var nome = "Cristiano";
var nome = String("Cristiano");
var nome = new String("Cristiano");
```

As strings podem ser declaradas com aspas “string” ou apóstrofos(aspas simples) ‘string’, porém não podemos iniciar com um tipo e terminar com outro.

```javascript
//Errado
var nome = "string';
```

Podemos também utilizar aspas ou apóstrofos dentro de uma string. Quando precisamos usar aspas dentro da string nós declaramos a mesma com apóstrofos e vice e versa.

```javascript
var frase = 'Segundo fulano: "A frase é boa"';
```

Existe outra forma de utilizar aspas dentro de uma string, que é através do escape de caracteres com a (barra).

**Alguns escapes:**

```javascript
var nome = "Cris\""; // \"  (Cris")
var nome = "Cris\'"; // \' (Cris')
var nome = "Cris\\"; // \\ (Cris\\)
var nome = "Cri\ns"; // \n (Cr
is)
var nome = "Cris\ts"; // \t (Cri		s)
```

#### Juntar strings (Concatenar)

O ato de juntar duas strings é o que chamamos de concatenação, uma das formas de fazer isso é através do uso do sinal de +.

**Exemplo:**

```javascript
var nome = "Cristiano";
var sobrenome = "Gonçalves";
nome + sobrenome; // CristianoGonçalves
nome + "Estudante"; // CristianoEstudante
```

O resultado ficou junto porque espaço em branco também é um caractere.

```javascript
nome + " " + sobrenome; //Cristiano Gonçalves
```

Algumas operações matemáticas podem ser feitas durante a concatenação:

**Exemplo:**

```javascript
nome + 2 + 2 + sobrenome; // Cristiano22Gonçalves
```

Para obtermos a soma antes de concatenar poderíamos utilizar os parênteses

```javascript
nome + (2 + 2) + nome; // Cristiano4Gonçalves
```

#### Strings como objetos

Declarar strings em forma objetos pode nos dá problemos assim como declarar números em forma de objetos, pois o valor será uma string e o tipo será um objeto, logo podemos ter algumas complicações.

**Exemplo:**

```javascript
var nome = new String('Cris').
var nome2 = 'Cris';

nome == nome2;   // Verdadeiro
nome === nome2;  // Falso
```

Uma alternativa é converter um objeto string em uma string utilizando o método `valueOf()`

```javascript
nome === nome2.valueOf(); // Verdadeiro
typeof nome2; // Object
typeof nome2.valueOf(); // String
```

Como uma string é imutável, ela continua sendo um objeto, e apenas nessa instrução é que conseguimos extrair um tipo string através de um objeto.

```javascript
typeof nome2; // Object
```

A única forma de mudar uma string é atribuindo seu valor novamente.

```javascript
nome2 = nome2.valueOf();
typeof nome2; // String
```

#### API String

Existe a [API](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String) da string onde podemos fazer diversas operações com uma string, como:

```javascript
nome.length; //Verificar seu tamanho
nome.charAt(1); //Encontrar um caractere em uma determinada posição
nome.indexOf("i"); //Encontrar a posição de um caractere
```

### Boolean

Esse é um tipo de dado lógico que pode assumir dois valores, true e false (verdadeiro e falso). Ele pode aparecer de diversas formas, uma das mais comuns é quando fazemos alguma operação de comparação.

**Exemplo:**

```javascript
4 > 1; // (4 é maior que 1) Verdadeiro
4 == 2; //(4 é igual a 2) Falso
```

Podemos verificar o valor lógico de alguns dados utilizando o !!. Essa dupla exclamação quer dizer que estamos negando algo duas vezes, logo acessamos o seu valor lógico. Isso quer dizer que, se temos uma sentenssa verdadeira e a negamos (invertemos seu valor lógico), passamos a ter uma sentenssa falso, agora se nergarmos outra vez vamos ter algo verdadeiro novamente.

**Exemplo:**

```javascript
var num1 = true; //Verdadeiro
num1 = !num1; //Antes era verdadeiro e agora é Falso
num1 = !num1; //Antes era Falso e agora é verdadeiro novamente

//Essa é uma forma simplificada de realizar a mesma operação feita anteriormente
var num1 = true; //Verdadeiro
num1 = !!num1; //Verdadeiro

//Esses são alguns valores falsos do JS. Outros valores falsos podem ser criados com comparações.
var num1 = !!false; //Falso é falso
var num1 = !!""; //String vazia é falso
var num1 = !!0; //Zero é falso
var num1 = !!null; //Null é falso
var num1 = !!undefined; //Undefined é falso
var num1 = !!NaN; //NaN é falso
```

Uma aplicação: Vamos supor que presisamos executar um código caso um determinado número seja diferente de zero. O comum seria verificar se o número é diferente de zero, porém podemos passar apenas o número como parâmetro para o if. E se o número for zero, ele tem o valor falso,e sabemos que o if só executa sentessas verdadeiras. Veja o código.

```javascript
// Esse seria a primeira coisa que pensariamos em fazer.
If(num != 0) {
 console.log('Zero é falso, por isso essa instrução não será executada');

}

// Essa é uma forma em que usamos do poder da linguagem e diminuimos um pouco a escrita.

If(num) {
 console.log('Instrução executada, se o número não for zero, pois qualquer número diferente de zero tem um valor verdadeiro.');

}
```

### Object

Os objetos são um tipo de dado do JS que nos permite armazenar diversos tipos de dados em uma única variável.\
Por exemplo, se temos que realizar o cadastro de uma pessoa e pegar nome, idade e sexo. Poderíamos criar uma variável para cada um dos dados. Porém podemos simplificar esse processo criando apenas o objeto pessoa.

**Exemplo:**

```javascript
var pessoa = { nome: "Cristiano", idade: 22, sexo: "M" };
var pessoa = new Object();
```

Os objetos são compostos por uma chave, dois pontos e logo depois o valor para essa chave. Cada chave-valor é separada por uma vírgula.

Podemos acessar as propriedades de cada objeto de várias maneiras.

```javascript
pessoa.nome; // Cristiano
pessoa["nome"]; // Cristiano
```

Essa segunda forma é utilizada para dados dinâmicos ou compostos, como “cor dos olhos”

Também podemos acessar as propriedades através de um loop.

```javascript
for (var item in pessoa) {
  console.log(pessoa[item]);
  //Cris
}
```

É possível adicionar propriedades depois que o objeto for criado.

```javascript
pessoa.bairro = "Barreiro";
pessoa["cidade"] = "Alagoinhas";
```

Ou podemos deletar

```javascript
delete pessoa.idade;
```

> Obs: As chaves de um objeto podem receber todos os tipos de valores, inclusive outros objetos e funções.

**Exemplo:**

```javascript
var meuObjeto = {
  numeros: [1, 2, 3, 4],
  outrosObjetos: { objetoUm: "Um", objetoDois: 2 },
  funcao: function () {
    return "Item de um objeto";
  },
};
```

### Function

Uma função é um bloco de código que executa comandos dentro dos {}

Existem duas formas básicas de criar uma função.

A function declaration:

```javascript
function soma(a, b) {
  return a + b;
}
```

E a function expression

```javascript
var soma = function soma(a, b) {
  return a + b;
};
// Ou
var soma = function (a, b) {
  return a + b;
};
```

A principal diferença entre as duas formas é que com a function declaration podemos invocar a função antes mesmo de declarar, pois o JS carrega as funções antes de interpretar o documento.

```javascript
// Isso é possível
soma();

function soma(a, b) {
  return a + b;
}

// Isso não é possível
soma();

var soma = function (a, b) {
  return a + b;
};
```

As funções do JS são de primeira classe, isso quer dizer que elas podem ser atribuídas a variáveis, ser passadas como parâmetros e podem ser retornadas por outras funções.

```javascript
// Uma passagem de argumentos comum.
soma(1, 2);

function ola() {
  return "ola";
}

// Uma passagem de funções como argumentos.
soma(ola);
```

### Undefined

Basicamente, undefined é um tipo de dado que carrega o valor undefined, quer quer dizer indefinido.\
Undefined também é uma propriedade do objeto global do javascript e carrega o valor de undefined. Porém ele não é uma palavra reservada, isso quer dizer que até podemos usa-la para identificar variáveis, desde que não seja no escopo global.

Um exemplo simples de como podemos receber um valor undefined é quando declaramos uma variável, mas não a iniciamos.

```javascript
var um;
typeof um; //undefined
```

### Null e undefined são a mesma coisa?

Apesar da expressão null == undefined retornar true, os dois tem significados diferentes.\
O undefined quer dizer que um valor ainda não foi definido, já o null quer dizer que o valor de algo é nulo. Vale lembrar que undefined é do tipo undefined, enquanto null é do tipo object.

### [](https://crisgon.github.io/posts/Tipos-de-dados-Javascript/#Finalizando "Finalizando")Finalizando

Esse foi um post com o resumo do que entendi até agora sobre os tipos primitivos do JS, provavelmente algo não foi bem explicado e ficou confuso, se isso aconteceu só deixar um comentário pra que eu possa estudar mais e tentar explicar melhor.

Minhas referências foram:\
[Canal do Rodrigo Branas](https://www.youtube.com/watch?v=093dIOCNeIc&list=PLQCmSnNFVYnT1-oeDOSBnt164802rkegc&index=1)\
[W3school](https://w3schools.com/)\
[Documentação da Mozila](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

Obrigado por ler até aqui!! Se curtiu esse post compartilha com seus amigos e deixa um comentário caso tenha alguma sugestão do que posso melhorar.
