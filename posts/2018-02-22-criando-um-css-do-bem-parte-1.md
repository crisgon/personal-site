---
title: Criando um CSS do BEM - Parte 1
resume: >-
  Provavelmente você, assim como eu, deve passar por dificuldades ao nomear uma classe CSS e depois de muito esforço cria essa classe com um nome nada legal e com pouco significado.
date: "2018-02-02 13:41:00"
image: /assets/img/frustrated_man.jpg
category: CSS
tagColor: "#8e44ad"
---

Provavelmente você, assim como eu, deve passar por dificuldades ao nomear uma classe CSS e depois de muito esforço cria essa classe com um nome nada legal e com pouco significado. Com a classe criada você inicia a escrita do CSS, gera um arquivo com centenas de linhas e finaliza seu trabalho. A princípio tudo está sob controle, pois o layout ficou do exatamente do jeito que você queria. Depois disso passam-se alguns meses e surge a necessidade de fazer mudanças no seu CSS, mas você demora um certo tempo tentando entender o que cada classe faz, após um tempo buscando entender seu própio CSS você decide criar uma nova seção no seu projeto e essa seção tem alguns elementos que já foram criados anteriormente, mas você não consegue fazer reuso e é levado a copiar todas as regras para uma nova classe que você precisou criar, aumentando ainda mais seu CSS.

Que processo complicado, não? Se para quem escreveu o CSS essa situação já é confusa, imagine para um colega de trabalho ou para alguém da comunidade que quer contribuir com seu projeto e não consegue pois seu código não possui um padrão. E mesmo que alguém resolva contribuir com seu projeto, sem um padrão as coisas só tendem a piorar. É por isso que nesse artigo iremos ver um pouco sobre como padronizar o CSS utilizando a metodologia BEM.

![Programador com as mãos na cabeça em frente ao computador](/assets/img/frustrated_man.jpg)

### BEM ( Block\_\_Element_Modifier)

Criado pelo [Yandex](https://www.yandex.com), site de buscas russo, o BEM é uma entre as diversas metodologias para organização do CSS, segundo a descrição do própio [site](http://getbem.com) o BEM é focado em ajudar na criação de componentes reutilizaveis e no compartilhamento de código no desenvolvimento Front End.
Sua estrutura é dividida em **B**loco, **E**lemento e **M**odificador.

- Bloco
  Um bloco é um algo que tem um significado mesmo sozinho. Ou seja, ele por si só consegue passar a informação de sua funcionalidade.
  **Exemplos:** Menu, Cabeçalho, Formulário, Button, Input, Card, etc.

  ```html
  <label for="”email”">E-mail:</label> <input type="”email”" name="”email”" />
  ```

- Elemento
  O elemento não consegue passar uma informação sozinho. Ele faz parte de um bloco e pode precisar de outros elementos para ter um significado.
  **Exemplos:** Input checkbox ou radio, Label, Item de uma lista ou menu.

  ```html
  <input type="”checkbox”" />
  ```

- Modificador

  Utilizado para mudar a aparência, visibilidade, tamanho ou comportamento de um bloco ou elemento.
  **Exemplos:** Small, Big, Hidden, Error, alert, Fixed, Red, Green.

#### Criando classes

Agora já sabemos de que uma classe é composta ao utilizar a metodologia BEM, porém ainda existe outro ponto importante, responsável pela estranheza e pela grande sacada do BEM.

As classes com BEM são escritas dessa forma **Block\_\_Element_Modifier**, existem algumas variações como essa **Block\_\_Element--Modifier**, mas irei utilizar a primeira forma, pois é a utilizada nos exemplos da documentação.

O bloco é separado pelo elemento com o uso de 2 underlines(\__) e o modificador é separado por 1 underline(_), quando necessário o valor de um modificador é separado por 1 traço (-).

**Vamos ao exemplo:**

```html
<form action="" class="form">
  <input type="text" class="form__name" />
  <input type="email" class="form__email" />
  <button class="form__button_red">Enviar</button>
  <button class="form__button_green">Cancelar</button>
</form>
```

Aqui temos um bloco, 4 elementos e 2 modificadores.

```
.form (Bloco)
.form__name (elemento)
.form__email (elemento)
.form__button_red (elemento com modificador)
.form__button_green (elemento com modificador)
```

Nesse exemplo temos apenas um modificador, mas podemos combinar vários.

```
.form__button_green .form__button_size-small;
```

Você pode conferir um exemplo mais detalhado no meu [codepen](https://codepen.io/crisgon/pen/YeedJo).

#### Mas isso é muito estranho...

**Pode parecer bem estranho, mas essa estranheza tem suas vantagens:**

- Ao "bater o olho" você consegue entender a estrutura. É fácil perceber que <code>.form\_\_name</code> é um elemento do bloco <code>.form</code>.
- Cada elemento tem seu nome, permitindo que uma alteração não afete outro elemento do mesmo tipo.
- Problemas com especificidade são raros, pois só usamos classes e evitamos o aninhamento.
- Existe melhoria no desempenho, pois seletores CSS são lidos da direita para esquerda e no BEM temos apenas uma classe, o que torna a leitura mais rápida.
- Os códigos podem ser fácilmente reaproveitados.

**E também possui desvantagens**

- As classes podem ficar extensas e deixar o HTML poluído.
- O HTML fica com mais mais linhas, tornando o arquivo final maior.
- Frameworks como Bootstrap não utilizam BEM, então a mistura de padrões pode tornar tudo confuso.

#### Concluindo BEM discretamente

Até aqui vimos um pouco sobre a estrutura de classes do BEM e como ela pode ser algo bem estranha logo no primeiro contato, pois as classes ficam bem extensas. Também vimos que criar classes bem descritas facilitam no entendimento do código, porém tornam o HTML mais extenso, mas que esse pequeno aumento do HTML é compensado ao mantermos um CSS bem organizado, fácil de dar manutenção e com grande possibilidade de reaproveitamento de código.

**No próximo artigo irei abordar sobre a convenção para criação dos nomes das classes, sobre aninhamentos e quando criar blocos ou elementos.**

#### Alguns links importantes:

[BEM](http://getbem.com)

[Usando BEM CSS](https://imasters.com.br/front-end/css/usando-bem-css/?trace=1519021197&source=single)

[Learning to love bem](http://mono.company/journal/frontend/learning-to-love-bem/)
