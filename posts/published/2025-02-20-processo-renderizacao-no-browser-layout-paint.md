---
title: "Entendendo renderização no browser: Layout e Paint"
resume:
date: 2025-02-19 08:20:03
image:
category: Geral
---

Hey, esse artigo faz parte de uma série sobre renderização no browser. Se você ainda não leu os artigos passados, da uma conferida nos links abaixo:

- [Entendendo renderização no browser: DOM](https://www.cristiano.dev/blog/2024-09-17-processo-renderizacao-no-browser)
- [Entendendo renderização no browser: CSSOM](https://www.cristiano.dev/blog/2024-09-26-processo-renderizacao-no-browser-cssom)
- [Entendendo renderização no browser: Como o DOM é gerado?](https://www.cristiano.dev/blog/2024-09-26-processo-renderizacao-no-browser-como-o-dom-e-gerado)

Nos últimos artigos você aprendeu sobre todo processo que o browser executa até ter uma estrutura chamada de render tree. Porém, isso ainda não é o suficiente para que sua página seja carregada.

Até você ver os primeiros pixels em tela o navegador ainda vai precisar executar mais alguns passos...

Antes de prosseguir vou refrescar sua memória com as etapas que o navegador executou para chegar até aqui:

1 - Converter bytes em caracteres

2 - Criar DOM

3 - Criar CSSOM

4 - Criar render tree

![Render path](/assets/img/render-path.png)

Agora que você já sabe os passos executados até o momentos vamos entender o que mais falta para o navegador conseguir exibir algo em tela.

### Layout

Até agora o navegador só fez os calculos para saber quais nós devem ser visiveis e quais seus estilos, mas ele ainda não fez nenhum calculo que indica o tamanho da janela de visualização, o tamanho de cada elemento irá ocupar, a posição que eles irão aparecer etc.

Isso vai acontecer em uma etapa chamada de layout, onde o navegador vai executar alguns calculos e uma nova árvore vai ser gerada, pois é... Mais uma árvore!!

Agora o navegador vai ter uma árvore chamada de layout tree. Ela é parecida com a dom tree, porém nela só existem informações referentes a cordenadas x e y, tamanho de elementos e informações da box-model(padding, margin etc).

![Layout tree](/assets/img/layout-tree.png)

Um ponto super importante é que, ao contrário da render tree, a layout tree só vai conter elementos que vão existir no html final.

Por exemplo, elementos marcados com `display none` não fazem parte da nossa árvore de layout, mas elementos marcados com `visibility hidden` estarão na árvore, mesmo que não sejam visível para o usuário final.

Esse processo pode parecer simples, mas uma simples quebra de linha gera vários calculos, pois além de afetar sua estrutura ela também pode afetar a posição de elementos ao seu redor.

![Quebra de linha no paragrafo](/assets/img/paragrafo-layout.gif)

### Paint

Se você achou que a gente já poderia renderizar a página você se enganou...
Ter um DOM, um estilo e uma árvore de layout não é o suficiente para o navegador e já já você vai entender o motivo.

Veja a imagem abaixo:

![Paint - Menina pensando se pinta o quadrado ou circulo primeiro](/assets/img/paint.png)

Você já sabe o tamanho e a posição do circulo e do quadrado. Mas em qual ordem eles deveriam aparecer na tela?

O primeiro pensamento é: "basta fazer eles aparecerem na ordem que foram definidos".

Faz sentido, mas existe uma coisinha chamada `z-indez` que pode alterar a posição do eixo z de qualquer elemento e isso precisa ser levado em consideração no momento do paint.

Para resolver esse ponto a etapa de pintura percorre por toda árvore de layout e cria os paint records(registros de pintura). Cada um desses registros é uma orientação de como o processo de pintura no navegador deve acontecer. Um exemplo seria: _"primeiro pinte o plano de fundo, depois pinte o circulo na posição xy com a cor vermelha e por fim pinte o quadrado na posição xy com a cor azul"_.

![Fluxo dos registros de pintura](/assets/img/paint-record.png)

### Como visualizar o processo de layout e paint?

Para tornar o processo mais "palpável", se é que dá pra fazer isso... Você pode abrir qualquer site no seu navegador (eu estou usando o chrome) e visualizar a aba de performance. Lá você vai conseguir ver as diversas etapas que o navegador executa e o tempo que cada uma durou.

Vou deixar o print da análise de performance de uma das páginas do meu blog.

![Print da aba de performance do navegador](/assets/img/performance-navegador.png)

### Pipeline de processamento

Até agora você deve ter percebido que todo processo de renderização segue uma ordem lógica e podemos dizer que é uma pipeline de execução.

Por exemplo, se algo muda na árvore de layout(um elemento deixa de ser `display none`) obrigatóriamente um novo registro de pintura vai ser gerado para todas as partes afetadas no documento.

Essas mudanças vão dar inicio aos processos de repaint e reflow. Não irei entrar em detalhes agora, pois isso vai ser o tema do nosso próximo artigo.

### Conclusão

Finalmente, após muitas etapas, conseguimos chegar no momento em que o navegador coloca algo que é visível!

De forma super resumida, agora você já sabe que após gerar o dom e o cssom o navegador executa a etapa de layout para definir onde cada elemento vai aparecer e depois a etapa de paint para definir como cada elemento vai aparecer.

Esse é um conhecimento que poucas pessoas tem, pois é um conhecimento de base muito negligenciado.

Saber como o navegador funciona é essencial, pois todos esses pequenos detalhes vão ser importantes para construir uma base sólida sobre o ecossistema frontend.

### Muito obrigado!!

Obrigado por ter chegado até aqui!

Espero que tenha aprendido algo novo ao longo dessa leitura.

Até o próximo artigo, onde irei falar sobre reflow e repaint!

### Referências

[Construção, layout e pintura da árvore de renderização](https://web.dev/articles/critical-rendering-path/render-tree-construction?hl=pt-br)

[Análise detalhada de um navegador da Web moderno](https://developer.chrome.com/blog/inside-browser-part3?hl=pt-br#paint)
