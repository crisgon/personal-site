---
title: Coerção de tipos em javascript
resume: >-
  Por não ter uma tipagem estática o javascript acaba trasformando seus dados sem algumas situações específicas.
date: "2018-04-30 20:41:00"
image: https://i.imgur.com/M4BaTpn.png
category: JS
tagColor: "#f1c40f"
---

Comecei a leitura do excelente livro [You Dont Know JS](https://github.com/cezaraugusto/You-Dont-Know-JS) e resolvi ir escrevendo pequenos posts sobre as coisas interessantes que for aprendendo. Hoje vou falar sobre coerção de tipos, esse é um assunto que a princípio parece ser bem simples, mas que é de extrema importância para entender como o javascript se comporta em diversas situações, evitando pequenas dores de cabeça no futuro.

![Javascript - Comparação estrita entre um número e uma string retornando falso](https://i.imgur.com/M4BaTpn.png)

### Coerção? Explicita e Implicita?

Coerção, no javascript, se refere ao ato de converter tipos de valores, como converter a string “42” para o number 42. No javascript temos dois tipos de coerção:

**Coerção explícita:** Quando usamos algum artifício da linguagem para forçar uma coerção. Um exemplo é o uso do `` parseInt(“42”)`, que resulta no number 42. **Coerção implícita:** Essa coerção acontece nos bastidores, sendo fruto de alguma operação, como a de comparação.` ``

```javascript
42 \== "42" // true
```

### Comparações

Fazer comparações no javascript é algo que aprendemos logo ao iniciarmos com a linguagem,porém precisamos ficar atentos ao que acontece quando comparamos dois valores.  
Temos 4 operadores para fazer comparações: igual `(==)` , diferente `(!=)`, estritamente igual `(===)` e estritamente diferente `(!==)`.

```javascript
// Caso 1
42 == "42"; // true

// Caso 2
42 === "42"; // false
```

A primeira coisa que pensamos é que no caso 1, usando `(==)`, é testado apenas o valor e no caso dois , usando `(===)`, é testado o valor e depois o tipo. Mas na verdade não é isso que realmente acontece… O que realmente acontece é a permissão ou não da coerção de tipos. No primeiro caso, o operador de igualdade permite a coeração, então nos bastidores teremos uma comparação assim:

```javascript
// Nossa comparação ->  42 == "42"
// Nos bastidores -> 42 == 42
```

No segundo caso, quando usamos o operador estritamente igual `(===)`, não acontece a coerção, logo teremos uma comparação entre um number e uma string, que retorna falso.

```javascript
// Nossa comparação ->  42 === "42"
// Nos bastidores -> 42 === "42"
```

OBS: Tudo dito anteriormente também se aplica aos operadores de diferença != e !==.

#### Comparações relacionais

Também possuímos os operadores relacionais, são eles: menor que `(<)`, maior que `(>)`, menor ou igual que `(<=)` e maior ou igual que `(>=)`. Eles podem ser utilizados para numbers ou strings, no segundo caso usando regras alfabéticas.

```javascript
3 < 4; // true
"bar" < "foo"; // true
```

#### E a coerção?

Ela acontece com todos os operadores relacionais, pois não existe nenhum operador relacional estrito, `<==` não existe.

```javascript
let a = 41,
  b = "42",
  c = "43";

// Caso 1
a < b; // true

// Caso 2
a < c; // true

// Caso 3
b < c; // true
```

No caso 3 ambos são comparados de forma alfabética, pois são strings. Já no caso 1 e 2, quando temos um número e um texto, existe uma coerção de string para number.

#### E a comparação entre tipos que não podem virar números?

```javascript
let a = 42,
  b = "foo";

// Caso 1
a > b; // false

// Caso 2
a < b; // false

// Caso 3
a == b; // false
```

![Furutama meme - Algo de errado não está certo](/assets/img/deolho.jpg)

#### Não, não tem nada errado! Mas essa é uma grande pegadinha!!

**Lembra que eu falei que as comparações relacionais permitem coerção?** Logo nos 3 casos o javascript tenta converter “foo” para um número e o que recebemos não é um número (`NaN`).  
A especificação diz que o `NaN` não pode ser maior, menor ou igual a um número. Na verdade,um NaN não é maior, menor ou igual nem a outro `NaN`.

**O que acontece nos bastidores é algo assim:**

```javascript
// Caso 1
42 > NaN; // false

// Caso 2
42 < NaN; // false

// Caso 3
42 == NaN; // false
```

### Concluindo…

Até aqui aprendemos um pouco sobre a importância de entender como o javascript se comporta quando executamos algum tipo de comparação. Ter um entendimento não superficial sobre a linguagem pode ser o que vai impedir que fiquemos horas e horas presos em pequenos problemas que são simples, mas que podem ser uma pedra no sapato de quem não faz ideia do que esteja acontecendo.

Em breve trarei mais postagens sobre Javascript, estava meio atolado de tarefas da faculdade, mas estou me organizando pra gerenciar tudo da melhor forma.

#### [](#Minha-referencia-para-esse-conteudo "Minha referência para esse conteúdo:")Minha referência para esse conteúdo:

[Livro You Dont Know JS](https://github.com/cezaraugusto/You-Dont-Know-JS/)

Obrigado por ler até aqui!! Se curtiu esse post compartilha com seus amigos e deixa um comentário caso tenha alguma sugestão do que posso melhorar.
