---
title: "Entendendo Variáveis CSS "
resume: Por um longo tempo foi necessário o uso de ferramentas externas para dar
  dinamicidade as folhas de estilos, porém o CSS possui essa funcionalidade de
  maneira nativa.
date: 2022-07-20 10:53:47
image: assets/img/0_rt32mflutfl2-ig0.png
category: CSS
tagColor: "#8e44ad"
---
Atualmente as aplicações web tem se tornado cada vez mais robustas e consequentemente a quantidade de CSS tem crescido bastante. Isso faz com que a possibilidade de código duplicado aumente consideravelmente, em sua maioria com repetição de pequenos valores, como uma cor ou um espaçamento.

Em diversos momentos você já deve ter se deparado com uma folha de estilos da seguinte forma:

```css
...

.header {
  background-color: #8e44ad;
  padding: 10px 15px;
  ...
}

.button {
  border-color: #8e44ad;
  color: #8e44ad;
  padding: 10px 15px;
  ...
}

.footer {
  background-color: #8e44ad;
  ...
}
```

Exemplo bem simples onde temos o mesmo hexadecimal sendo utilizado em diversos lugares. Também temos as mesmas medidas de padding sendo utilizadas em mais de um lugar. É normal existir essa repetição, pois queremos manter uma uniformidade no nosso layout.

Agora pense na seguinte situação, o produto que trabalhamos acabou de passar por um rebranding (mudança de marca)  e precisamos alterar todas as cores da nossa aplicação. Pense o quanto isso seria trabalhoso... sair alterando valores em todos os N arquivos css que temos espalhados ao longo do projeto. 

Posso dar um exemplo mais prático... Este blog em que você se encontra tem várias paletas de cores.

![Print do blog atual na cor vermelha](assets/img/blog-red.png)

![Print do blog atual na cor azul](assets/img/blog-blue.png)

Imagine o quão trabalhoso seria alterar as cores de cada detalhezinho... Um processo muito repetitivo que geralmente os programadores tentam evitar. Seria muito mais simples se isso estivesse centralizado de uma forma que a manutenção e as mudanças fossem facilitadas. 

Foi pensando nesse cenário que os primeiros pre-processadores(sass, less, stylus) trouxeram a possibilidade de termos variáveis nas nossas folhas de estilos e logo em seguida isso acabou tornando-se algo nativo do próprio CSS.

> Na [programação](https://pt.wikipedia.org/wiki/Programa%C3%A7%C3%A3o "Programação"), uma **variável** é um objeto (uma posição, frequentemente localizada na [memória](https://pt.wikipedia.org/wiki/Mem%C3%B3ria_(computador) "Memória (computador)")) capaz de reter e representar um valor ou expressão.[](https://pt.wikipedia.org/wiki/Vari%C3%A1vel_(programa%C3%A7%C3%A3o)#cite_note-:0-1)
>
> [Wikipédia](https://pt.wikipedia.org/wiki/Vari%C3%A1vel_(programa%C3%A7%C3%A3o))
>
>
>
> Você pode encontrar pessoas e lugares que utilizam a expressão propriedades customizadas ou variáveis CSS. 😎

### Como utilizar variáveis no CSS

Você deve se lembrar que no javascript precisamos fazer o uso de palavras-chave para declarar uma variável :

```javascript
var a = 1;
let b = 2;
const c = 3;
```

No CSS temos algo muito mais simplificado, pois precisamos apenas escrever o nome da nossa propriedade personalizada precedida de um duplo hífen(--):  `--cor-do-background` e logo depois podemos utilizar qualquer valor válido de CSS. 

É importante saber que uma propriedade personalizada precisa ser declarada dentro de algum escopo do CSS, ou seja, dentro de `{ }` . Aqui também seguimos a regra de escopo, então a variável declarada dentro de um elemento, só vai estar disponível para ele ou seus filhos.

Para conseguir acessar o valor dessas novas propriedades precisamos utilizar a função `var()` passando a propriedade como argumento.

```css
div {
 --cor-do-background: red;
  background: var(--cor-do-background); /*red*/
}
```

### Regra dos Escopos

No javascript temos escopos de bloco, de função e global. Aqui temos algo bastante semelhante, pois podemos optar por tornar uma propriedade customizada acessível para todo nosso código ou disponível em apenas um trecho.

Veja a seguir um exemplo onde a regra de escopos vai ficar mais clara:

**Todos os exemplos que você verá a seguir usam como base o seguinte HTML**

```html
<p>Aprendendo sobre variáveis CSS</p>
<h4>CSS é legal!</h4>
```

```css
p {
  --main-color: blue;
  --big-font-size: 50px;
  color: var(--main-color);
}

h4 {
  color: var(--main-color);
  font-size: var(--big-font-size);
}
```

O resultado seria o seguinte. Nosso H4 não iria ter nenhum valor para `color`ou `font-size`, pois elas estão fora do seu escopo, logo são inacessíveis.

![Resultado do uso de variáveis fora de escopo](assets/img/css-variable-scope.png)

Uma prática muito utilizada é declarar as variáveis de forma global, usando a pseudo-class `:root`. Dessa forma, as variáveis podem ser acessadas de qualquer local das nossas folhas de estilo.

```css
:root {
  --main-color: blue;
  --big-font-size: 50px;
}

p {
  color: var(--main-color);
}

h4 {
  color: var(--main-color);
  font-size: var(--big-font-size);
}
```

O mesmo trecho de código com as variáveis declaradas globalmente teriam o seguinte resultado:

![Resultado do uso de variáveis com escopo global](assets/img/css-variables-1.5x.png)

### C de Cascata

Você já deve saber que o C da sigla CSS significa Cascading e a sigla por completo é Cascading Style Sheet, no português, folha de estilos em cascata. Recomendo uma visita ao [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade) para mais detalhes sobre esse conceito. 

Para o entendimento das variáveis CSS você só precisa saber que elas seguem regras de cascata, ou seja, podemos redefinir a mesma variável em vários níveis de especificidade e a ordem da declaração vai contar.

```css
:root {
  --main-color: blue;
}

p {
  --main-color: green;
  color: var(--main-color);
}

h4 {
  color: var(--main-color);
}
```

![Resultado do uso de variáveis com valor redefinido](assets/img/css-variables-cascading.png)

No exemplo acima a regra da cascata foi aplicada, pois no parágrafo o valor da `-main-color` foi redefinido. É importante relembrar que a gente poderia ter uma situação onde um novo root é definido e os valores são sobrepostos devido à cascata. No código abaixo nosso parágrafo seguiria verde, mas nosso H4 e tudo que utilizasse a `--main-color` na sequência teriam a cor rosa

```css
:root {
  --main-color: blue;

}

p {
  --main-color: green;
  color: var(--main-color);
}


:root {
  --main-color: pink;
}

h4 {
  color: var(--main-color);
}
```

> A regra da cascata é ótima para utilizar com medias-queries, pois podemos redefinir os valores de uma propriedade customizada para diversos dispositivos diferentes.

### Fallbacks

Podem existir situações onde nossa variável não foi definida com um valor correto ou não foi declarada. Para esses casos a função` var()` permite que um segundo argumento seja passado, ele será o valor padrão que deve ser utilizado sempre que ocorrer algum problema com a propriedade customizada informada.

Segue um exemplo com às duas situações:

```css
:root {
  --big-font-size: red;
}

p {
  color: var(--main-color, blue);
  /*A main-color não foi definida, nosso p vai ter a cor azul*/
}

h4 {
  font-size: var(--big-font-size, 16px);
  /*Estamos tentando utilizar uma cor como valor para uma font-size. 
  Aqui nosso h4 vai ter uma font-size com valor de 16px*/
}
```

Quando não passamos o segundo argumento o próprio navegador consegue lidar com propriedades  inválidas. O procedimento é bem simples e em duas etapas:

1. O navegador verifica se a propriedade é valida, caso não seja ele procura se existe uma propriedade válida no pai do elemento.
2. Se não existir uma propriedade no pai ele utiliza um valor padrão, preto para a propriedade color.

### Conclusão

Essa não é nenhuma novidade do CSS... está disponível faz bastante tempo. Porém é algo ainda pouco explorado e em diversos momentos vejo as pessoas instalando [styled-components](https://styled-components.com/) ou algo semelhante para tarefas simples que poderiam ser facilmente resolvidas com o próprio CSS. 

Mesmo sendo uma funcionalidade conhecida, se você chegou até aqui é porque estava na esperança de aprender algo novo. Espero que você tenha consolidado ainda mais seus conhecimentos sobre frontend depois dessa leitura!!

Muito obrigado e até a próxima!

### Links importantes

* [Variáveis ​​CSS - Por que você deveria se importar?](https://developer.chrome.com/blog/css-variables-why-should-you-care/)
* [Using CSS custom properties](https://deploy-preview-35--crisgon.netlify.app/iniciando-com-react-hooks-usereducer/)
* [Understanding CSS Variables](https://medium.com/techradiant/understanding-css-variables-a0f956b281e0)
* [What are CSS-Variables?](https://dev.to/shiv1998/what-are-css-variables-3bc8)