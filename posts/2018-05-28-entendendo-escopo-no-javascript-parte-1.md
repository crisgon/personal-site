---
title: Entendendo Escopo no Javascript - Parte 1
resume: >-
  Desenvolver com javascript é algo aparentemente simples, mas que pode trazer muita dor de cabeça pra quem não entende o real funcionamento da linguagem.
date: "2018-05-28 20:41:00"
image: https://i.imgur.com/rOZuQfr.png
category: JS
tagColor: "#f1c40f"
---

Desenvolver com javascript é algo aparentemente simples, mas que pode trazer muita dor de cabeça pra quem não entende o real funcionamento da linguagem, ocasionando situações onde o código apresenta problemas que podem ser difíceis de identificar, pois muitas vezes não estão ligados a sintaxe, mas sim a conceitos fundamentais da linguagem, como o **escopo**.

![Escopo aninhado e analogia com um prédio](https://i.imgur.com/rOZuQfr.png)

### Afinal, o que é escopo?

É basicamente um conjunto de regras que permitem o armazenamento de variáveis em algum lugar para que posteriormente ela possa ser acessada.

### Mas como o escopo funciona?

Para entendermos o escopo é preciso entender que, apesar do javascript ser considerado uma linguagem interpretada, existe um processo de compilação do programa antes da execução do mesmo.  
O processo de compilação é algo bem complexo, mas que a grosso modo é composta de pelo menos os seguintes passos: Tokenização/Análise Léxica, Análise e Geração de código.

#### Tonekinzação/Análise Léxica

É basicamente a quebra de cada trecho do código em tokens, pedaços com significado para a linguagem.

**Exemplo:**  
O código `let a = 2;` seria quebrado em `let | a | = | 2 | ;`. Os espaços em brancos são mantidos quando tem algum significado para a linguagem.

#### Análise

Essa etapa pega um conjunto de tokens(array de tokens) e gera uma árvore de elementos aninhados que representam a estrutura do programa. Essa árvore é conhecida como AST (Abstract Syntax Tree).

**Exemplo:** Para um array de tokens gerados de `let a = 2;` teríamos : Um nó chamado variableDeclaration, que tem um filho chamado identifier e outro filho chamado assigmentExpression que tem um filho chamado numericLiteral.  
Ficou um pouco confuso, mas a imagem deixa tudo mais claro.

![Árvore sintática abstrata](https://i.imgur.com/bAymtdV.png)

#### Geração de código

Esse é o processo em que a árvore AST é transformada em código executável. Esse processo pode ser diferente em cada linguagem.

### Certo, mas cadê o escopo?

Como eu tinha dito anteriormente, o escopo é basicamente um conjunto de regras que definem onde uma variável pode ser buscada e acessada. Essa busca pode ser de dois tipos: **LHS**(left-hand-side) ou **RHS**(right-hand-size), que tem como tradução livre, lado esquerdo e lado direito. Mas lado de que? Lado da atribuição, ou seja, do sinal de igual (=).

**E como essas buscas funcionam?**  
A busca **LHS** tem o objetivo de atribuição, ela verifica se existe uma referência para uma variável. Já a busca **RHS** procura por um valor para leitura.

### Ainda tá meio confuso? Agora não vai ficar mais!

**Vamos analisar o seguinte código:**

```javascript
function myFunction() {
  a = 42;
  console.log(a);
}

myFunction(); // 42
```

Se não estivermos usando o modo estrito(strict), não vai acontecer nenhum erro e o que temos aqui é uma busca **LHS**(busca por referência). O motor do javascript vai perguntar ao escopo se já existe algum referência para a, como não existe ele mesmo cria e não retorna erros.

**Agora vamos analisar esse outro trecho:**

```javascript
function myFunction() {
  let a = 42;
}

myFunction();
console.log(a); // Reference Error
```

Nesse caso vamos ter um erro de referência, pois vamos ter uma busca **LHS** em que o motor vai receber uma resposta negativa do escopo. Pois não existe nenhuma variável chamada `a` no alcance no console. A única variável `a` que temos no nosso código está no escopo de myFunction, com suas regras de que ela só pode ser acessada naquele local.

**Vamos ver um caso diferente:**

```javascript
function myFunction() {
  let a = b;
  console.log(a);
}
myFunction(); // Reference Error
```

Aqui é um caso onde temos uma busca **RHS**(busca por valor), pois precisamos do valor de b. O motor vai perguntar para o escopo qual o valor de b, porém b não existe e não tem valor, o que gera um Reference Error.

#### Escopos aninhados

Quando uma busca não é bem sucedida, uma nova busca é feita no próximo escopo superior ao atual, até chegar ao escopo global.  
Para entender escopos aninhados podemos fazer uma alusão com um pŕedio. Onde o escopo atual é o terreo e caso não encontremos o que queremos nele, vamos para o próximo andar(escopo) até chegar no último andar(escopo global).

**Vamos ver um exemplo:**

```javascript
function myFunction() {
  let a = 2;
  function otherFunction() {
    console.log(a + b);
  }
  otherFunction();
}
let b = 3;
myFunction(); // 5
```

No código acima acontece uma busca **LHS** e uma **RHS** em relação as variáveis `a` e `b`, como elas não foram encontradas no escopo de otherFunction a busca é feita novamente, mas agora no escopo superior, o de myFunction. São encontrados referência e valor para `a`, porém a busca continua para `b` e agora ela é feita no escopo global, onde o valor de `b` é encontrado e a soma é executada.

### Até a próxima pessoal…

Até aqui vimos um pouco sobre o que acontece antes do código javascript ser executado, também vimos que o escopo é um conjunto de regras que define onde uma variável pode ser buscada e manipulada. Por fim vimos sobre escopo aninhado e como as buscas **LHS** e **RHS** funcionam.  
Tudo isso pode parecer só abobrinha e você pode até achar que não precisa saber nada disso pra criar seu programa. E de certa forma você tem razão, não é necessário entender todas essas peculiaridades da linguagem para sair escrevendo um código javascript, porém esse conhecimento pode ser o que vai te salvar de perder horas sem saber o que tá acontecendo com a sua aplicação.

#### E a parte 2 ?

Na próxima parte do artigo eu vou falar sobre escopo léxico, escopo de função e escopo de bloco.

[Parte 2](https://crisgon.github.io/posts/Entendendo-escopo-no-javascript-Parte-2/)

**Espero que tenha aprendido algo com esse pequeno post :D**

#### Minha referência para esse conteúdo:

[Livro You Dont Know JS](https://github.com/cezaraugusto/You-Dont-Know-JS/)

Obrigado por ler até aqui!! Se curtiu esse post compartilha com seus amigos e deixa um comentário caso tenha alguma sugestão do que posso melhorar.
