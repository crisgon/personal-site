---
title: "Entendendo renderização no browser: Reflow e Repaint"
resume:
date: 2025-09-02 08:20:03
image:
category: Geral
---

Hey, esse artigo faz parte de uma série sobre renderização no browser. Se você ainda não leu os artigos passados, da uma conferida nos links abaixo:

- [Entendendo renderização no browser: DOM](https://www.cristiano.dev/blog/2024-09-17-processo-renderizacao-no-browser)
- [Entendendo renderização no browser: CSSOM](https://www.cristiano.dev/blog/2024-09-26-processo-renderizacao-no-browser-cssom)
- [Entendendo renderização no browser: Como o DOM é gerado?](https://www.cristiano.dev/blog/2024-09-26-processo-renderizacao-no-browser-como-o-dom-e-gerado)
- [Entendendo renderização no browser: Layout e Paint](https://www.cristiano.dev/blog/2025-02-20-processo-renderizacao-no-browser-layout-paint)

Nos últimos artigos eu expliquei sobre layout e repaint, dois processos que o browser executa antes de exibir seu site, mas antes de prosseguir vou refrescar sua memória com todas as etapas que o navegador executou para chegar até aqui:

1 - Converter bytes em caracteres

2 - Criar DOM

3 - Criar CSSOM

4 - Criar render tree

5 - Layout para calcular tamanhos e posições

6 - Paint para desenhar pixels na tela

![Browser flow](/assets/img/browser-flow.png)

Porém, após os processos de layout e paint, o trabalho do navegador não termina, pois, enquanto você navega, suas interações podem ser gatilhos para o repaint e o reflow.

<h3 style="font-size: 30px">Nesse momento, você se questiona: Repaint e reflow?</h3>

![Homem com duvida](/assets/img/will.gif)

### Reflow

O reflow acontece sempre que o navegador precisar recalcular posições e o tamanho dos elementos na página. Um reflow pode acontecer quando você muda o tamanho da tela, quando adiciona um elemento ou quando faz alguma mudança que afeta a estrutura da página.

Esses são alguns eventos que disparam um reflow(e consequentemente um repaint):

- Alterar dimensões: width, height, min-width, max-height etc
- Alterar posicionamento: top, left, right, bottom
- Mudar display (ex: none → block)
- Alterar font-size ou font-family
- Adicionar ou remover elementos do DOM
- Alterar o conteúdo de texto (textContent, innerText)
- Alterar bordas que mudam o tamanho (ex: border-width)

### Repaint

O repaint acontece quando o visual muda sem fazer mudanças estruturais na página. Ele pode acontecer ao mudar background, bordas, cor do texto etc.

Esses são alguns eventos que disparam um repaint:

- Alterar cor de fundo (background-color)
- Alterar cor do texto (color)
- Alterar sombras (box-shadow, text-shadow)
- Alterar bordas que não mudam tamanho (ex.: border-color)
- Alterar visibilidade (visibility: hidden / visible)

> De forma super resumida, o repaint atualiza pixels e o reflow recalcula posições e tamanhos.

Abaixo você encontra alguns trechos de código que são gatilhos para repaint e reflow:

```html
<div id="box" style="width: 100px; height: 100px; background: red;"></div>

<script>
  const box = document.getElementById("box");

  // === REPAINT ===
  box.style.backgroundColor = "blue"; // repaint (mudou cor de fundo)
  box.style.borderColor = "green"; // repaint (mudou cor da borda)
  box.style.boxShadow = "5px 5px 10px gray"; // repaint (sombra)

  // === REFLOW ===
  box.style.width = "200px"; // reflow (mudou largura → recalcula layout)
  box.style.fontSize = "20px"; // reflow (mudou tamanho de fonte)
  box.style.display = "none"; // reflow (mudou fluxo do layout)
  box.textContent = "Novo texto"; // reflow (mudou conteúdo → afeta tamanho)
  box.style.borderWidth = "5px"; // reflow (mudou largura da borda)

  // === INSERIR NOVO ELEMENTO ===
  const newEl = document.createElement("p");
  newEl.textContent = "Elemento novo";
  document.body.appendChild(newEl); // reflow (mudou estrutura da página)
</script>
```

### O que o navegador faz?

Ao disparar um reflow, o browser precisa refazer algumas tarefas executadas anteriormente:
layout, paint e, em alguns casos, o render tree.

![Reflow](/assets/img/reflow.png)

Com o repaint é mais simples, pois ele não recalcula posições e vai direto para a etapa de paint, mas, em casos de mudança de visibility, ele pode refazer o render tree.

![Repaint](/assets/img/repaint.png)

### Cuidado com a performance!

Sempre que possível tente minimizar a quantidade de reflow e repaint, pois isso irá diminuir a necessidade de processamento do navegador e evitar impactos negativos na experiência do usuário.

Mas que tipo de cuidado eu devo tomar? Vamos analisar o código abaixo:

```js
const items = document.querySelectorAll(".item");

items.forEach(item => {
  item.style.width = "200px";
  const h = item.clientHeight;
  item.style.height = h + 20 + "px";
});
```

<h4>Consegue enxergar algum problema?</h4>

No código acima temos 3 pequenos problemas:

1 - Um loop onde misturamos leitura e escrita no dom

2 - Para cada item do loop o navegador pode precisar recalcular todo layout

3 - Se existirem 100 itens pode acabar acontecendo 100 reflow

<h4>E como melhorar esse código?</h4>

```js
const items = document.querySelectorAll(".item");
const heights = [];

items.forEach(item => {
  heights.push(item.clientHeight);
});

items.forEach((item, index) => {
  item.style.width = "200px";
  item.style.height = heights[index] + 20 + "px";
});
```

O código acima permite que o navegador faça alterações em lote.
No primeiro loop, que tem apenas leitura do dom, o navegador faz todos os calculos em apenas um reflow. Logo em seguida o navegador faz mais um reflow com as escritas em lote.

Ou seja... a gente saiu de um cenário onde a quantidade de reflows aumenta com a quantidade de itens para um cenário em que teremos apenas 2 reflows.

### Conclusão

Entender todo o fluxo de trabalho do navegador é importante para conseguir compreender bem os problemas que o desenvolvimento frontend oferecem ao longo do dia, o contexto do desenvolvimento web, conhecer html, css, javascript e como o navegador funciona é essencial. Com essa base sólida, você vai conseguir aprender qualquer tecnologia que derive desses fundamentos.

Antes de finalizar irei deixar um vídei interessante que ilustra o processo de reflow feito pelo navegador.

<iframe width="560" height="315" src="https://www.youtube.com/embed/dndeRnzkJDU?si=RLFc64s1xWdfmLMs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Muito obrigado!!

Obrigado por ter chegado até aqui!

Espero que tenha aprendido algo novo ao longo dessa leitura.

Até o próximo artigo, onde irei falar sobre reflow e repaint!

### Referências

[Construção, layout e pintura da árvore de renderização](https://web.dev/articles/critical-rendering-path/render-tree-construction?hl=pt-br)

[Análise detalhada de um navegador da Web moderno](https://developer.chrome.com/blog/inside-browser-part3?hl=pt-br#paint)

[Understanding Reflow and Repaint in the browser](https://dev.to/gopal1996/understanding-reflow-and-repaint-in-the-browser-1jbg)
