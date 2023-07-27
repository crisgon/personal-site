---
title: Desenhando com box shadow
resume: >-
  Sempre me deparei com uma ou outra pixel art com css e meus primeiros pensamentos eram que eu não conseguiria fazer, que era muito difícil... mas não é bem assim.
date: "2018-02-02 11:41:00"
image: assets/img/wallpaperblog.jpg
category: CSS
tagColor: "#8e44ad"
---

Sempre gostei de admirar o trabalho de outras pessoas, para conseguir inspiração, saber o quanto eu sei ou simplesmente para apreciar a arte. Nesses pequenos momentos de apreciação eu sempre me deparei com uma ou outra pixel art e meus primeiros pensamentos eram que eu não conseguiria fazer, que era muito difícil e que meu conhecimento não era o suficiente. Infelizmente carreguei esse pensamento por um bom tempo e isso me prejudicava, pois eu via todo aquele código e nem tentava entender, porque na minha cabeça aquilo era algo fora do meu alcance, mas essa semana eu eu precisava desenhar alguns heróis para o [dailycssimages](https://codepen.io/collection/DjydKR) e resolvi que era a hora de aprender a criar meus desenhos usando a propriedade `box-shadow.`

#### Essa foi a primeira tentativa

https://codepen.io/crisgon/pen/mXyREW

#### Esse foi um dos ultimos trabalhos

https://codepen.io/crisgon/pen/bLVgpq

Sei que muitas pessoas já passaram por uma situação parecida com a minha, então decidi criar esse post com o objetivo de ajudar o pessoal que tem vontade de fazer trabalhos desse tipo e não sabe por onde começar.

## Chega de papo e vamos ao que interessa!

Antes de continuar queria deixar claro que não aprendi fazendo nenhum curso, apenas li esse [artigo](http://joshnh.com/weblog/drawing-things-with-box-shadow/) e bisbilhotei alguns códigos no [codepen](https://codepen.io), leia muito código e veja como o pessoal constrói determinadas coisas e tente reproduzir, você vai aprender muito, pode confiar.

### A propriedade box-shadow

Essa é uma propriedade muito versátil e que na maioria das vezes não usamos todo potencial dela, digo isso pois sou um dos que faz o uso básico da mesma. Ela é composta por 4 atributos: Deslocamento horizontal da sombra, Deslocamento vertical da sombra, esfumaçado da sombra e cor da sombra.

```css
box-shadow: 0 0 10px #000;
/*Aqui temos uma sombra*/
```

Esse foi o uso básico de uma sombra, porém esse uso pode ir um pouco além com o uso de multiplas sombras.

```css
box-shadow: 0 0 10px #000, 10px 10px 50px #ff0;
/*Aqui temos duas sombras*/
```

**Podemos ter a quantidade de sombras que desejarmos apenas as separando por uma vírgula.**

### Agora vamos criar algo usando o box-shadow

Iremos criar 4 quadrados coloridos, um quadrado será o próprio elemento e os outros três serão criados com as sombras.

```html
<div class="quadrado"></div>
```

```css
.quadrado {
  background: #00cec9;
  width: 40px;
  height: 40px;
  box-shadow:
  /*Linha 1 coluna 2*/ 40px 0 #55efc4, /*Linha 2 coluna 1*/ 0px 40px #00b894,
    /*Linha 2 coluna 2*/ 40px 40px #00cec9;
}
```

O resultado será o seguinte:
![Quadrados com box-shadow](https://i.imgur.com/RGAseeE.png)

#### Explicando o código

A explicação é algo bem simples:

- Todos os quadrados vão ter o tamanho do próprio elemento, 40px por 40px, no nosso caso.
- O primeiro valor vai se referir ao deslocamento horizontal, usamos um deslocamento de 40px para que o quadrado fique ao lado do elemento.
- O segundo valor vai se referir ao deslocamento vertical, podemos usar um deslocamento de 40px para que o quadrado fique em baixo do elemento ou 0 para que ele fique na mesma linha.

Se quisermos criar um elemento 3x3 o código ficará assim:

```html
<div class="quadrado"></div>
```

```css
.quadrado {
  background: #00cec9;
  width: 40px;
  height: 40px;
  box-shadow:
  /*Linha 1 coluna 2*/ 40px 0 #55efc4, /*Linha 1 coluna 3*/ 80px 0px #00cec9,
    /*Linha 2 coluna 1*/ 0px 40px #00b894, /*Linha 2 coluna 2*/ 40px 40px
      #00cec9, /*Linha 2 coluna 3*/ 80px 40px #00b894;
}
```

O resultado será o seguinte:
![Matriz 3x3 com box-shadow](https://i.imgur.com/VZE0KmN.png)

Também podemos transformar esses quadrados em circulos adicionando um `border-radius` no elemento.

![Matriz 3x3 de circulos com box-shadow](https://i.imgur.com/gFWPwwQ.png)

### Certo, mas como crio aquelas imagens maneiras?

Se você entendeu como funciona o esquema do `box-shadow` os próximos passos são:

- Tenha muita paciência, pois a construção é um processo demorado e no fim de tudo o css fica com centenas de linhas.
- Procure uma referência para se basear!! É muito complicado sair desenhando e posicionando sem uma referência, por isso pesquise alguma pixel art e reproduza com css se atentando ao posicionamento das sombras.
  ![Pokebola Pixel Art](https://i.pinimg.com/736x/21/83/95/21839558dff090fc88e1b5756890bb85--pokemon-pokemon-pixel-art-pokemon.jpg)

Essa imagem é um 15x15, é apenas uma versão maior do que criamos anteriormente.
**Se possivel use um pre-processador para abusar das variáves!**

### Só consigo desenhar pixel art? Não!!

Também podemos criar desenhos em outros estilos, da uma olhada nesse exemplo que fiz.

https://codepen.io/crisgon/pen/oEjGjq

## ATENÇÃO!!!

Usar o `box-shadow` para desenhar é muito divertido, porém é algo que você deve evitar usar em produção, pois nem todos os navegadores possuem suporte e sua renderização é uma das mais lentas. Se precisar de um ícone ou desenho prefira usar fonts ou SVG.

#### Se não vou usar no meu trabalho, então por que aprender?

**Por diversão!! Existe motivo melhor que esse?**
Claro que vamos ser beneficiados ao aumentar nosso conhecimento em CSS, pois vamos ter um maior domínio em uma das suas propriedades, mas o prazer de criar alguns desenhos no estilo daqueles que fizeram parte da nossa infância é algo sensacional.

</br>

**Esse [post](http://joshnh.com/weblog/drawing-things-with-box-shadow/) foi uma das bases para o meu artigo, da uma olhada e complemente seus estudos.**

Obrigado por ler até aqui!! Se curtiu esse post compartilha com seus amigos e deixa um comentário caso tenha alguma sugestão do que posso melhorar.
