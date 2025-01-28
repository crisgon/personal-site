---
title: "Primeiro faça funcionar"
resume:
date: 2025-01-27 08:20:03
image:
category: Geral
---

Sabe aquela sensação de que algo não está bom o suficiente?

Você passa horas tentando chegar no melhor resultado, mas esse melhor nunca chega? Essa é uma coisa muito comum em quem está em busca do código perfeito. Mas isso é muito prejudicial e, por muitos momentos, essa atitude fez com que minha produtividade fosse afetada.

Por causa disso eu tenho tentado seguir a premissa de "primeiro fazer funcionar".

### Primeiro faça funcionar

Esse “mantra” serve para diversas áreas da nossa vida, mas hoje irei focar na programação.

Quando esbarro em um problema, eu tento focar na **raiz do problema** e não em detalhes de implementação. Enquanto o problema não foi resolvido, pouco importa se você está usando um for ou um forEach para percorrer um array, pouco importa se você está usando um let onde poderia ser uma const, e pouco importa se a variável tem ou não o melhor nome, por exemplo. Muito provavelmente todos esses pontos não mudam em nada o seu fluxo de pensamento.

Todos esses pontos são distrações e, quando você precisa resolver um problema, as **distrações precisam ser eliminadas**, ou você vai perder muito tempo focando no que não importa.

### Melhore gradativamente

Quando o problema for resolvido, aí sim chegou o momento de aplicar melhorias. Um fluxo que gosto de seguir é o seguinte:

1- Resolver o problema

2- Escrever um teste

3- Aplicar melhorias

![Imagem com fluxo de melhoria](/assets/img/primeiro-faca-funcionar.png)

> Após ter resolvido o problema, fica mais fácil ir refinando e aplicando melhorias. E se existir um teste para garantir que nada quebre após uma mudança, fica muito mais fácil.

### Exemplo pratico

Você recebeu uma lista de produtos e será necessário fazer um agrupamento para calcular o total acumulado de cada categoria.

```js
const produtos = [
  { produto: "tablet", categoria: "eletronicos", total: 100 },
  { produto: "entendendo algoritimos", categoria: "livros", total: 50 },
  { produto: "kindle", categoria: "eletronicos", total: 200 },
  { produto: "coca", categoria: "alimentos", total: 80 },
  { produto: "clean code", categoria: "livros", total: 70 },
  { produto: "del vale", categoria: "alimentos", total: 120 },
];
```

#### Resolvendo o problema:

```js
const categoriasTotais = {};

for (let i = 0; i < produtos.length; i++) {
  const produto = produtos[i];

  if (categoriasTotais[produto.categoria]) {
    categoriasTotais[produto.categoria] += produto.total;
  } else {
    categoriasTotais[produto.categoria] = produto.total;
  }
}

console.log(categoriasTotais);
// Saída: { eletronicos: 300, livros: 120, alimentos: 200 }
```

#### Escrevendo um teste

```js
function testandoCategorias(dados) {
  const resultadoEsperado = {
    eletronicos: 300,
    livros: 120,
    alimentos: 200,
  };

  const resultado = calcularCategoriasTotais(dados);

  if (JSON.stringify(resultado) !== JSON.stringify(resultadoEsperado)) {
    console.error(
      `❌ Teste falhou! Resultado esperado: ${JSON.stringify(
        resultadoEsperado,
      )}, mas obteve: ${JSON.stringify(resultado)}`,
    );
    return;
  }

  console.log("✅ Teste passou! A função retornou o resultado esperado.");
}

testandoCategorias(produtos);
```

#### Aplicando uma melhoria

```js
const categoriasTotais = produtos.reduce((acc, produto) => {
  acc[produto.categoria] = (acc[produto.categoria] || 0) + produto.total;
  return acc;
}, {});

console.log(categoriasTotais);
// Saída: { eletronicos: 300, livros: 120, alimentos: 200 }
```

### A entrega de valor é o que realmente importa

É preciso ter em mente que as pessoas envolvidas esperam que o problema seja resolvido, não importa como. O cliente final, o PM ou seu chefe não se importam se o problema foi resolvido com um for in ou um for of. O que importa é que o problema seja resolvido e que ele agregue valor. Então, antes de passar horas querendo "escovar bits", entenda o contexto da demanda e negocie com seu time.

Às vezes é mais interessante liberar a solução e entregar valor rápido com uma implementação mediana do que entregar uma implementação fenomenal, mas fora do tempo.

Importante ressaltar que não estou falando de entregar código ruim! Mas também não estou falando de entregar código no estado da arte… Entenda o contexto da demanda, entregue valor sem comprometer a qualidade, mas não se apegue a pequenos detalhes e distrações que podem prejudicar seu time.

#### Muito obrigado por chegar aqui e até a próxima!!
