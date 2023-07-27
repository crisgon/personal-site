---
title: Baby steps com webpack
resume: >-
  Ultimamente tem se tornado cada vez menos comum configurar o webpack do zero
  em algum projeto, principalmente quando falamos de pessoas que estão iniciando
  no desenvolvimento e se deparam com uma imensidão de coisas para estudar.
  Ferramentas como create-react-app, vue-cli, angular-cli e outras alternativas
  tornam toda configuração de um projeto bastante transparente e vemos apenas a
  mágica acontecer...
date: "2020-08-02 10:28:25"
image: assets/img/webpack.png
category: JS
tagColor: "#f1c40f"
---

Antes de iniciar, você pode acessar o código final desse artigo [aqui](https://github.com/crisgon/webpack-basic).

Ultimamente tem se tornado cada vez menos comum configurar o webpack do zero em algum projeto, principalmente quando falamos de pessoas que estão iniciando no desenvolvimento e se deparam com uma imensidão de coisas para estudar. Ferramentas como create-react-app, vue-cli, angular-cli e outras alternativas tornam toda configuração de um projeto bastante transparente e vemos apenas a mágica acontecer... Geralmente elas vão resolver nossos problemas, mas tem momentos em que precisamos fazer uma configuração mais específica e isso nem sempre é algo trivial, pois apesar da simplicidade, escrever um arquivo webpack.js pode ser meio confuso para um inciante.

### O que é?

![Webpack](assets/img/webpack.png)

De forma bem resumida, **o webpack é um empacotador de módulos**. Ele vai cuidar de pegar uma série de arquivos de entrada(com todas as suas dependências), trabalhar em cima desses arquivos(geralmente com ajudas de terceiros) e te oferecer um(ou vários) arquivo(s) de saída. Claro que essa ferramente não se resume apenas a isso, mas a imagem que você viu logo acima é um print do [webpack](https://webpack.js.org/) que ilustra bem o seu funcionamento base.

### O que iremos fazer?

É muito comum encontrar tutoriais em português ensinando a configurar um projeto react, vue ou qualquer coisa do tipo, mas hoje vamos apenas fazer uma configuração básica que pode ser utilizada em diversos cenários.

Nosso ponto de partida será essa a estrutura de pastas abaixo.

![Estrutura inicial de pastas](assets/img/webpack-basic-folder.png "Estrutura inicial de pastas")

Todos os arquivos foram criados manualmente e vazios, com exceção dos `packages` que gerei utilizando o comando `npm init -y` .

Os arquivos estão com o seguinte conteúdo até o momento:

- O index.html tem uma estrutura padrão de html.
- O global.scss tem apenas a definição do background do meu body.

```scss
$red: red;

body {
  font-size: 4rem;
  background-color: $red;
}
```

- O sum.js tem uma função de soma:

  Nos arquivos javascript eu tenho o seguinte código:

```jsx
export function sum(a, b) {
  return a + b;
}
```

- O index.js faz uso do arquivo sum.js e está da seguinte forma:

```jsx
import { sum } from "./sum.js";

const body = document.querySelector("body");

const value = sum(2, 3);

body.innerHTML += value;
```

Agora que estamos devidamente alinhados, vamos ao que interessa!

### Configurando o webpack

A primeira coisa que precisamos é fazer a instalação de duas dependências no nosso projeto, o webpack e o webpack-cli com o seguinte comando `npm install —save-dev webpack webpack-cli`. Também é interessante fazer a instalação global com o seguinte comando `npm install --global webpack`. Agora vamos trabalhar apenas no nosso arquivo `webpack.config.js` , que tem basicamente a exportação de um objeto onde cada propriedade será uma parte da nossa configuração final.

```jsx
module.exports = {};
```

### Entry

Nosso ponto de partida é com propriedade entry, que basicamente informa ao webpack onde ele deve começar a fazer o empacotamento. Desse arquivo em diante ele vai caminhando na árvore de arquivos buscando cada dependência até que não exista mais nenhum. No nosso caso, o ponto de entrada é o nosso `index.js` que faz uso do arquivo `sum.js` que não faz uso de mais nenhum arquivo.

```jsx
module.exports = {
  entry: "./src/modules/index.js",
};
```

### Output

Já tivemos o arquivo de entrada, agora precisamos definir o arquivo de saída. Aqui basicamente declaramos um objeto com duas propriedades bem intuitivas.

- path: que se refere ao caminho da pasta que nosso arquivo final vai ocupar. Caso a pasta não exista o webpack irá criá-la.
- filename: que se refere ao nome do nosso arquivo de saída.

Note que aqui fazemos uso da biblioteca path para definir qual é o caminho da nossa pasta. O resultado seria `"./public"`, bastante simples e poderíamos simplesmente digitar esse endereço, porém o path vai cuidar dos problemas que podem acontecer em sistemas operacionais diferentes por conta do uso de `\\` ou `/`

```jsx
// Dependência para nos auxiliar com caminho dos arquivos
const path = require("path");

module.exports = {
  // Arquivo de entrada
  entry: "./src/modules/index.js",

  // Arquivo de saída
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
};
```

Nesse ponto já conseguimos gerar um arquivo `bundle.js` de saída com o seguinte comando `webpack --config webpack.config.js`, porém ainda não faz sentido, pois nosso código não passou por nenhum processo de modificação e é basicamente o mesmo. É ai que entram os loaders...

### Loaders

Por padrão o webpack só consegue trabalhar com arquivos javascript e json, para contornar essa limitação fazemos uso dos loaders, que são responsáveis por dar "super poderes" ao nosso webpack e permitir que ele transforme outros tipos de aquivos em módulos validos que possam ser adicionados na árvore de dependência. Com a ajuda dos loaders também conseguimos transpilar nosso javascript para diferentes versões, essa é uma das tarefas mais comuns e que vamos fazer a seguir.

A primeira coisa que precisamos fazer é a instalação do loader mais famoso desse ecossistema, o babe/loader, que é de longe um dos melhores transpiladores javascript que temos no mercado.

`npm --save-dev babel-loader @babel/core @babel/preset-env`

Com ele o webpack vai conseguir transformar nosso javascript moderno em uma versão compatível com a maioria dos navegadores antes de gerar o arquivo final.

As instruções para fazer uso do babel serão passadas em um array na propriedade chamada `rules` que fica dentro de outra propriedade chama `modules`.

```jsx
module.exports = {
  entry: ...
	modules: {
		rules: [],
	},
  output:...
};
```

A propriedade `rules` recebe um array de objetos que podem conter as seguintes propriedades:

- test: recebe uma regex responsável por verificar a extensão dos arquivos que a configuração vai ser aplicada.
- exclude: também recebe uma regex, mas para informar quais pastas devem ser ignoradas.
- use: aqui definimos as regras do loader que vão ser aplicadas nos arquivos que fizeram match com nosso test
- options: é uma propriedade que pode mudar para cada loader. No nosso caso iremos usá-la para que o babel cuide de tudo e não exista a necessidade de definir quais funcionalidades do JS devem ser ou não.

Até agora nosso webpack.config.js está assim:

```jsx
// Dependência para nos auxiliar com caminho dos arquivos
const path = require("path");

module.exports = {
  // Arquivo de entrada
  entry: "./src/modules/index.js",
  module: {
    // Configurações de loaders
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  // Arquivo de saída
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
};
```

Agora iremos fazer uso de mais alguns loaders para lidar com nosso css/sass, aqui eu optei em não tratar assuntos como auto-prefix ou minificação para não alongar muito o artigo.

Pra isso vai ser necessário que você instale as seguintes dependências: `npm --save-dev sass sass-loader css-loader`

- css-loader: vai ser responsável por lidar com todas as nossas importações @import em arquivos css.
- sass-loader: vai transformar todos os nossos arquivos sass em css.

A configuração para esses loaders ficou assim:

```jsx
{
  test: /\.scss$/,
  use: [
    {
      loader: "css-loader",
     },
     {
      loader: "sass-loader",
     },
    ],
}
```

### Plugins

Podemos utilizar os plugins para executar uma gama imensa de tarefas, como otimizar pacotes, limpar diretórios, inserir variavéis de ambientes, etc. Aqui iremos utilizar um plugin para extrair todo o nosso css em um arquivo único chamao style.css. Para isso vai ser necessário instalar o seguinte plugin `npm install --save-dev mini-css-extract-plugin`

Para usar um plugin precisamos fazer a importação usando o `require` e depois fazer o uso na seção de `plugins` que fica dentro da propriedade `module` e logo abaixo da propriedade `rules`.

```jsx
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: ...
	modules: {
		rules: ...,
		plugins: [
			new MiniCssExtractPlugin({
        filename: "style.css",
      }),
		]
	},
  output:...
};
```

Logo em seguida podemos encadear esse plugin nos nossos loaders:

```scss
{
   test: /\.scss$/,
   use: [
   {
      loader: MiniCssExtractPlugin.loader,
    },
    {
       loader: "css-loader",
     },
     {
       loader: "sass-loader",
      },
    ],
},
```

No código acima os loaders estão encadeados, então o processo que acontece com nosso css seria mais ou menos assim:

1. O css é separado dos arquivos JS
2. Os `@imports` são resolvidos com o `css-loader`
3. Todo sass é transformado em css

Só pra garantir que você ainda não se perdeu... nosso `webpack.config.js` deve está assim:

```jsx
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/modules/index.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
};
```

Pra finalizar iremos utilizar um loader para lidar com imagens, fonts e etc, porém vamos focar apenas nas imagens. Você vai precisar instalar o file-loader `npm install —save-dev file-loader` e partir pra configuração.

```jsx
{
        test: /\.(jpe?g|png|svg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images",
            },
          },
        ],
      },
```

O código acima não tem nenhum bicho de 7 cabeças, estamos fazendo a mesma coisa que fizemos com outros loaders.

1. Testamos se a imagem termina com alguma das extensões da regex
2. Usamos o file-loader para transformar as imagens em um módulo válido pro webpack
3. Salvamos essas imagens em uma pasta chamada images, que vai aparecer lá dentro da nossa pasta public.

É interessante notar como o webpack vai tratar nossas imagens... No nosso arquivo `scss` eu fiz o uso de uma imagem da seguinte forma:

```scss
background-image: url("../images/bg.jpg");
```

Logo após executar o webpack nossa imagem vai ter o nome com um hash e vai ser usada no css da mesma forma.

```css
background-image: url(images/1a9e635a5b3b216d5970a6686071f80f.jpg);
```

Pra trabalhar com fonts seria exatamente igual, você só precisa alterar a regex do test e a pasta de saída. Fica o desafio!

### Isso é tudo, pessoal!!

Muito obrigado por ter chegado até aqui!! Espero que esse artigo tenha te ajudado de alguma forma!

O objetivo desse artigo não foi te incentivar a parar de usar boilerplates, muito pelo contrário... O uso dessas soluções é super recomendada, pois vão facilitar a nossa vida. Porém, é interessante saber ao menos o básico de como funciona aquela solução que usamos no nosso dia a dia, dessa forma vamos ficar tão presos a mesma.

Esse artigo bebeu das seguintes fontes:

[](https://webpack.js.org/)<https://webpack.js.org/>

[](https://dev.to/pixelgoo/how-to-configure-webpack-from-scratch-for-a-basic-website-46a5)<https://dev.to/pixelgoo/how-to-configure-webpack-from-scratch-for-a-basic-website-46a5>

[](https://survivejs.com/webpack/what-is-webpack/)<https://survivejs.com/webpack/what-is-webpack/>
