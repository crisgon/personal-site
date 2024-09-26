---
title: "Entendendo renderização no browser: CSSOM"
resume:
date: 2024-09-26 08:20:03
image:
category: Geral
---

Hey, esse artigo faz parte de uma série sobre renderização no browser. Se você ainda não leu os artigos passados, da uma conferida nos links abaixo:

- [Entendendo renderização no browser: DOM](https://www.cristiano.dev/blog/2024-09-17-processo-renderizacao-no-browser)

No último artigo, exploramos como o HTML é processado pelo navegador através da DOM (Document Object Model), que define a estrutura da página web. Porém, uma página web não é feita apenas de HTML e algo que muitos ainda não sabem é que o CSS também possui sua própria representação em forma de objeto, chamada CSSOM (CSS Object Model).

O navegador utiliza a CSSOM em conjunto com a DOM para construir a página, combinando estrutura (HTML) e estilos (CSS), resultando em uma apresentação visual harmoniosa.

Neste artigo, vamos aprofundar nosso conhecimento sobre a CSSOM, entendendo sua estrutura, importância e como ela pode ser manipulada.

### O que é o CSSOM?

Assim como a DOM, o CSSOM é uma estrutura de dados hierárquica, mas sua função é representar o CSS de um documento web.

O CSSOM é gerado pelos navegadores após o carregamento e processamento dos arquivos de estilo. Embora seja construído separadamente da DOM, ambos trabalham em conjunto para que o navegador possa montar a página com a estrutura correta (DOM) e aplicar os estilos apropriados (CSSOM).

A principal função do CSSOM é fornecer ao navegador um "mapa" detalhado dos estilos que devem ser aplicados a cada elemento da página.

Veja abaixo uma representação visual do CSSOM:

![Representação da árvore CSSOM](/assets/img/cssom-tree.png)

No código essa representação ficaria assim:

```css
body {
  font-size: 16px;
}

div {
  width: 200px;
  height: 100px;
  background: blue;
}

a {
  color: red;
  text-decoration: none;
}

h1 {
  font-weight: bold;
}
```

E a árvore DOM referente ao CSSOM que vimos anteriormente é representada da seguinte forma:

![Representação da árvore DOM](/assets/img/dom-tree-2.png)

#### Manipulando o CSSOM

Os navegadores nos fornecem um conjunto de APIs que permitem a manipulação do CSS utilizando javascript. Ela é semelhante a API do DOM, mas para CSS ao invés de HTML.

Com o uso dessa API nós conseguimos ler e manipular o CSS de uma página de forma dinâmica.

A maneira mais simples de você manipular estilos é por meio da propriedade style presente no document.

Para acessar e manipular um elemento do CSSOM pela primeira vez, abra o console do navegador e execute o seguinte código:

```js
document.body.style.background = "gray";
console.log(document.body.style.background); // gray
```

Após executar o trecho de código acima recomendo que inspecione os elementos da página e analisem o body. Notem que agora o nosso body tem um estilo inline e vai estar mais ou menos dessa forma:

```html
<body style="background: gray;"></body>
```

Isso acontece porque alterar a propriedade style de um elemento só tem efeito para estilos inlines.
A mesma lógica se aplica para leitura de propriedades do style. Se você executar o código abaixo não vai ter nenhum retorno, pois nenhum momento definimos a propriedade color usando estilo inline.

```js
console.log(document.body.style.background); // '''
```

> Conseguimos adicionar ou alterar qualquer propriedade CSS da nossa página seguindo sempre o padrão elemento.style.nomeDaProprieda.

Outra forma de manipular os estilos inline são por meio de alguns métodos presentes no style.

- setProperty: com esse método você consegue adicionar ou altera o valor de uma propriedade inline.

```js
document.body.style.setProperty("background", "red");

// Agora execute o próximo comando

document.body.style.setProperty("background", "blue");
```

- getPropertyValue: com esse método você consegue acessar o valor de uma propriedade inline.

```js
document.body.style.getPropertyValue("background"); // blue
```

- removeProperty: com esse método você consegue remover uma propriedade inline.

```js
document.body.style.removeProperty("background");
```

> O getComputedStyle funciona apenas para leitura. Você conseguirá acessar a informação sobre estilo de qualquer elemento ou pseudo elemento, mas não conseguirá fazer alterações.

#### E os estilos que não são inlines?

Escrever estilos inline não é algo muito comum, por isso também conseguimos acessar os estilos computados, aquele que definimos na nossa folha de estilo. Para isso podemos acessar e manipular diretamente nossa folha de estilos.

Execute o trecho de código abaixo no console do seu navegador:

```js
document.styleSheets;
```

Com ele você vai ter acesso a todas as folhas de estilos declaradas no head do seu html.

Essas folhas de estilos são retornada em formato de lista(parece, mas não é um array) e você pode acessar por meio do índice.

```js
document.styleSheets[1];
```

Daqui em diante recomendo executar os testes em outro local, pois esse blog é feito com tailwind css e a manipulação da folha de estilo fica mais complicada.

Acesse essa [página](https://crisgon.github.io/30Days30Sites/email/index.html) e execute os comando no console dela.

```js
document.styleSheets[0].cssRules;
```

Ao executar o código acima você terá acesso a todos o css presentes na folha de estilo. Seguindo a mesma lógica anterior você pode acessar os elementos por meio de índice.

```js
document.styleSheets[0].cssRules[3];
```

No código acima eu estou acessando a declaração de estilo do body da página.

```js
document.styleSheets[0].cssRules[3].style.background = "red";
```

Acessando a propriedade style conseguimos adicionar ou alterar qualquer propriedade CSS, mas sem escrever estilos inlines.

Recomendo que brinque um pouco mais com essa api mudando os índices e alterando o CSS de diversos elementos.

### Conclusão

Assim como o DOM o CSSOM é uma representação em forma de arvore utilizada pelos navegadores para o processo de renderização.

Podemos acessar todo o CSS da página e manipulá-lo livremente utilizando javascript. Saber executar esse tipo de operação é essencial para compreender ferramentas de CSS como styled componentes, linária etc.

O conhecimento de base é o mais importante, mas é constantemente negligenciado.
No contexto do desenvolvimento web, conhecer html, css, javascript e como o navegador funciona é essencial. Com essa base sólida, você vai conseguir aprender qualquer tecnologia que derive desses fundamentos.

### Muito obrigado!!

Obrigado por ter chegado até aqui!

Espero que tenha aprendido algo novo ao longo dessa leitura.

Até a próxima!

### Referências

[CSS Object Model](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model)

[Constructing the Object Model](https://web.dev/articles/critical-rendering-path/constructing-the-object-model?hl=pt-br#document_object_model_dom)

[CSSOM — Modelo de Objeto CSS](<https://unicorncoder.medium.com/cssom-modelo-de-objeto-css-88ec27adf193#:~:text=O%20que%20%C3%A9%20o%20Modelo%20de%20Objeto%20CSS%20(CSSOM)%3F&text=Assim%20como%20o%20DOM%20permite,CSS%20aplicados%20a%20esses%20elementos.>)

[An Introduction and Guide to the CSS Object Model (CSSOM)](https://css-tricks.com/an-introduction-and-guide-to-the-css-object-model-cssom/?ref=dailydev)
