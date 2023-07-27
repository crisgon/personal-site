---
title: Consumindo uma API de pokemon com Javascript
resume: >-
  Essa semana eu estava dando uma olhada em algumas vagas no Front End Brasil e notei que muitas vagas pediam experiência com o uso de API’s. Mas o que é isso? Como ter Experiência com API’s?
date: "2018-02-03 13:41:00"
image: https://i.imgur.com/bXGuv94.png
category: JS
tagColor: "#f1c40f"
---

Essa semana eu estava dando uma olhada em algumas vagas no [Front End Brasil](https://github.com/frontendbr/) e notei que muitas vagas pediam **experiência com o uso de API's**. Fui correndo pro fórum do Front End Brasil e perguntei: "Como saber se tenho Experiência com API's?"
Com a contribuição do pessoal eu consegui entender um pouco mais sobre API's e resolvi compartilhar um pouco do meu aprendizado.
Esse artigo foi inspirado em [How to connect to an api with javascript](https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript/) e nele vou mostrar como consumir e manipular os dados de uma API com informações sobre pokemons.

Caso queira já pode dar uma olhada no que será construído nesse artigo.

- [Demonstração](https://crisgon.github.io/pokeinfo)
- [Códigos](https://github.com/crisgon/pokeinfo)

### O que é uma API?

**Se dermos uma "googlada" vamos dar de cara com a seguinte descrição no wikipedia:**

_"Interface de Programação de Aplicações (português europeu) ou Interface de Programação de Aplicação (português brasileiro)), cujo acrônimo API provém do Inglês Application Programming
Interface, é um conjunto de rotinas e padrões estabelecidos por um software para a utilização
das suas funcionalidades por aplicativos que não pretendem envolver-se em detalhes da implementação do software, mas apenas usar seus serviços.
De modo geral, a API é composta por uma série de funções acessíveis somente por programação, e que permitem utilizar características do software menos evidentes ao utilizador tradicional."_

De forma mais crua, uma API provê uma interface que permite que um software se comunique com outro software sem que seja necessário ter conhecimento do que acontece por de baixo dos panos.
Ou seja, uma API pode permitir que tenhamos acesso a geolocalização sem que precisemos saber que blocos de códigos são executadas para que essa geolocalização seja fornecida, pode permitir que seja possível criar contas utilizando o facebook, google ou twitter, ou pode simplismente nos fornecer informações sobre livros.

Vale ressaltar que as API's não se limitam apenas a WEB, elas estão presentes em diversos outros cenários, como o dos SO's, dos embarcados e vários outros. Porém se tratando do cenário WEB as API's se baseiam em requisições e respostas HTTP (requests e responses), que na maioria das vezes seguem o padrão XML ou JSON.

**Para entender sobre API's de forma mais clara faça a leitura desses artigos:**

- [O que é API](https://canaltech.com.br/software/o-que-e-api/)
- [Nobody introduced me to the API](https://www.robinwieruch.de/what-is-an-api-javascript/).
- [Interface de programação de aplicações](https://pt.wikipedia.org/wiki/Interface_de_programação_de_aplicações)

## Hey! Oh!, let's go!

**Antes de iniciar quero deixar claro que essa aplicação foi totalmente desenvolvida por mim, então é capaz de conter pequenos bugs e também pode ser que as técnicas que utilizei não tenham sido as melhores, porém senti a necessidade de compartilhar o conhecimento sobre API's que consegui até agora.**

Vamos construir uma pequena aplicação que recebe o nome ou o número de um pokemon e retorna algumas informações sobre o mesmo.

![Print da aplicação](https://i.imgur.com/bXGuv94.png "Aplicação utilizando dados de pokemons")

Vamos utilizar os dados da [pokeapi](https://pokeapi.co), toda informação adicional necessária se encontra na documentação da API.

#### O HTML e o CSS

O foco desse artigo é o javascript, então não vou explicar sobre o HTML e CSS, mas basicamente temos o seguinte HTML:

```html
<main class="container">
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
    alt="Pokemon Logo"
  />

  <form action="" class="search">
    <input
      type="search"
      class="search-input"
      placeholder="Search about a pokemon using name or pokedex number"
    />
    <button class="search-button">Search</button>
  </form>

  <section class="pokemon"></section>
  <span class="error">Not Found!</span>
</main>
```

Além do form, temos uma section que irá receber os dados dos pokemons e um span que irá aparecer quando uma busca não for bem sucedida.

Caso queira pode fazer o download do [HTML](https://github.com/crisgon/pokeinfo/blob/gh-pages/index.html) e do [CSS](https://github.com/crisgon/pokeinfo/blob/gh-pages/pokemons.css)

#### O Javascript

A primeira coisa que iremos fazer é definir uma constante(também pode ser uma variável) com o URL da API, que também é chamada de endpoint.

```javascript
// API endpoint
const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
```

Agora iremos criar uma pequena função para diminuir a escrita na hora de pegar os elementos HTML.

```javascript
function getElement(element) {
  return document.querySelector(element);
}
```

Logo em seguida iremos capturar os elementos HTML e criar 3 variáveis globais que usaremos futuramente.

```javascript
// Get Elements
const searchInput = getElement(".search-input"),
  searchButton = getElement(".search-button"),
  container = getElement(".pokemon"),
  erroMessage = getElement(".error");

var pokeName, // Nome ou numero passado na caixa de busca
  pokemon, // Responsavel por guardar os dados recebidos da API
  card; // Responsavel por receber o HTML
```

**Você pode dar um console.log() em cada uma das constantes para verificar se a captura foi feita corretamente.**

Agora vamos estabelecer nossa primeira conexão com a API. Existem diversas maneiras de fazer isso, uma bem usual é utilizando o XMLHttpRequest(), porém utilizaremos o fetch por sua praticidade.

```javascript
fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

**Abra o console do seu navegador e veja que agora temos um objeto com informações sobre o pokemon pikachu.**

> Uma explicação rápida sobre o fetch: Ele é composto por [promisses](https://braziljs.org/blog/promises-no-javascript/) javascript, e basicamente o primeiro .then() recebe a resposta da requisição e por meio de uma função transformamos essa resposta em um json, logo depois o segundo .then() recebe essa resposta, e a imprime no console. Por fim temos o catch que só é executado caso aconteça algum erro na operação e a imprime uma mensagem de erro console.

Agora já sabemos como fazer uma requisição! Se você se atentou, precisamos apenas mudar a URL para conseguir informações sobre outro pokemon. Faça o teste substituindo pikachu por outro nome ou algum número.

#### Vamos fazer algumas alterações no nosso código e ele deve ficar assim:

```javascript
// API endpoint --------------------------------------------
const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

// Get Elements --------------------------------------------
const searchInput = getElement(".search-input"),
  searchButton = getElement(".search-button"),
  container = getElement(".pokemon"),
  erroMessage = getElement(".error");

var pokeName, // Nome ou numero passado na caixa de busca
  pokemon, // Responsavel por guardar os dados recebidos da API
  card; // Responsavel por receber o HTML

// Build Functions --------------------------------------------

// Função para reduzir a escrita na captura de elementos HTML
function getElement(element) {
  return document.querySelector(element);
}

// Função responsavel por fazer requisições para a API e inserir as respostas na variavel pokemon
function requestPokeInfo(url, name) {
  fetch(url + name)
    .then(response => response.json())
    .then(data => {
      pokemon = data;
    })
    .catch(err => console.log(err));
}

console.log(pokemon); // Execute o console para verificar os dados no console
```

Já sabemos como receber os dados de um pokemon, porém ainda não temos nada dinâmico... Então vamos pegar o valor da caixa de pesquisa e utiliza-lo para pesquisar por um pokemon. Para isso vamos adicionar um evento de click ao botão e atribuir o valor do input para a variável pokeName, que será passada como argumento para nossa função que faz a requisição para a API.

```javascript
searchButton.addEventListener("click", event => {
  event.preventDefault();
  pokeName = searchInput.value.toLowerCase();
  /* A api só aceita nomes minusculos, então vamos usar a função toLowerCase para garantir que nenhuma letra maiuscula seja passada. */
  requestPokeInfo(baseUrl, pokeName);
});
```

**Agora podemos escrever o nome de um pokemon e receber dados sobre ele no console do navegador. Faça o teste!! Eai, funcionou?**

Agora vamos trazer os dados que estão no console para o nosso documento HTML, pois ninguém quer ficar abrindo o console pra ficar visualizando informações. 😃

> A nossa resposta é um objeto, então podemos acessar suas propriedades como em qualquer objeto javascript. Para recuperarmos o nome do pokemon podemos executar pokemon.name, para o número usamos o pokemon.id e todas as outras informações seguem a mesma lógica.

Vamos criar uma função que irá montar um HTML. Recomendo que pesquise por [template strings](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/template_strings) caso ache a sintaxe \${} estranha.

```javascript
function createCard() {
  card = `
    <div class="pokemon-picture">
      <img src="${pokemon.sprites.front_default}" alt="Sprite of ${
    pokemon.name
  }">
    </div>
    <div class="pokemon-info">
        <h1 class="name">Name: ${pokemon.name}</h1>
        <h2 class="number">Nº ${pokemon.id}</h2>
        <h3 class="type">Type: ${pokemon.types
          .map(item => " " + item.type.name)
          .toString()}</h3>
        <h3 class="skill">Skills: ${pokemon.moves
          .map(item => " " + item.move.name)
          .toString()}</h3>
        <h3 class="weight">Weight: ${pokemon.weight / 10}kg</h3>
        <h3 class="height">Height: ${pokemon.height / 10}m</h3>
    </div>`;
  return card;
}
```

> O weight e o height (peso e altura) eles vem multiplicados por 10, descobri isso comparando as informações com as do site oficial do Pokemon. Por isso estou dividindo ambos por 10. Outra coisa importante são as informações type e skills (tipo e habilidades). Ambas podem conter um valor ou vários, sendo retornadas como um array. Então utilizei o map para criar um novo array com espaços e logo em seguida converti tudo em string.

Logo em seguida adicione esse pequeno trecho `container.innerHTML = createCard();` na
função do addEventListener do botão, atualize a página e pesquise por um pokemon. Ocorreu algum erro? Certo, vamos corrigir!

O erro acontece porque a função que cria o HTML foi executada antes da requisição terminar, logo temos a mensagem de que não podemos acessar propriedades de undefined. Para resolver isso precisamos fazer com que nossa função que cria o HTML espere um pouco antes de ser executada, vamos utilizar o setTimeout, porém recomendo que pesquise sobre [javascript assíncrono](https://braziljs.org/blog/tag/javascript-assincrono/).

Criaremos uma função principal que será responsável por fazer a chamada de todas as outras funções existentes.

```javascript
// Função que faz a chamada das principais funções e inicia o app
function startApp(pokeName) {
  requestPokeInfo(baseUrl, pokeName);

  // A função que cria o HTML só será executada 2 segundos depois que a função startApp for executada
  setTimeout(function() {
    container.innerHTML = createCard();
  }, 2000);
}
```

Faça uma mudança na função de click do botão, faça com que a única função a ser executada seja a startApp.

#### Com as alterações feitas nosso código deve ficar assim

```javascript
// API endpoint --------------------------------------------
const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

// Get Elements --------------------------------------------
const searchInput = getElement(".search-input"),
  searchButton = getElement(".search-button"),
  container = getElement(".pokemon"),
  erroMessage = getElement(".error");

var pokeName, // Nome ou numero passado na caixa de busca
  pokemon, // Responsavel por guardar os dados recebidos da API
  card; // Responsavel por receber o HTML

// Build Functions --------------------------------------------

// Função para reduzir a escrita na captura de elementos HTML
function getElement(element) {
  return document.querySelector(element);
}

// Função responsavel por fazer requisições para a API e inserir as respostas na variavel pokemon
function requestPokeInfo(url, name) {
  fetch(url + name)
    .then(response => response.json())
    .then(data => {
      pokemon = data;
    })
    .catch(err => console.log(err));
}

// Função responsavel por montar o HTML exibido na pagina
function createCard() {
  card = `
    <div class="pokemon-picture">
      <img src="${pokemon.sprites.front_default}" alt="Sprite of ${
    pokemon.name
  }">
    </div>
    <div class="pokemon-info">
        <h1 class="name">Name: ${pokemon.name}</h1>
        <h2 class="number">Nº ${pokemon.id}</h2>
        <h3 class="type">Type: ${pokemon.types
          .map(item => item.type.name)
          .toString()}</h3>
        <h3 class="skill">Skills: ${pokemon.moves
          .map(item => " " + item.move.name)
          .toString()}</h3>
        <h3 class="weight">Weight: ${pokemon.weight / 10}kg</h3>
        <h3 class="height">Height: ${pokemon.height / 10}m</h3>
    </div>`;
  return card;
}

// Função que faz a chamada das principais funções e inicia o app
function startApp(pokeName) {
  requestPokeInfo(baseUrl, pokeName);

  setTimeout(function() {
    container.innerHTML = createCard();
  }, 2000);
}

// Add Events --------------------------------------------
searchButton.addEventListener("click", event => {
  event.preventDefault();
  pokeName = searchInput.value.toLowerCase();
  startApp(pokeName);
});
```

#### Já podemos dar o nosso APP como finalizado, então o que vem a seguir é opcional.

**A primeira grande mudança que iremos fazer é na função principal**

```javascript
function startApp(pokeName) {
  requestPokeInfo(baseUrl, pokeName);

  setTimeout(function() {
    //Exibe uma mensagem caso o pokemon pesquisado não exista
    if (pokemon.detail) {
      erroMessage.style.display = "block";
      container.style.display = "none";
    } else {
      erroMessage.style.display = "none";
      container.style.display = "flex";
      container.innerHTML = createCard();
    }
  }, 2000);
}
```

Quando uma pesquisa é mal sucedida o retorno é a informação detail. Então verificamos se existe o detail no objeto pokemon, caso exista nós mudamos o display da tag que contém a mensagem de erro para block e mudamos o display da section com as informações do pokemon para none.
Se a propriedade detail não existir, significa que a busca foi bem sucedida, então escondemos a mensagem de erro, mostramos a section com as informações e chamamos a função que monta o html.

**A próxima grande mudança é no evento de click**

```javascript
// Add Events --------------------------------------------
searchButton.addEventListener("click", event => {
  event.preventDefault();
  pokeName = searchInput.value.toLowerCase();
  startApp(pokeName);
  container.classList.add("fade");

  // Reseta o efeito fade removendo a classe fade
  setTimeout(() => {
    container.classList.remove("fade");
  }, 3000);
});
```

Aqui estamos adicionando a classe 'fade' ao nosso container, essa classe é responsável por fazer um efeito de transição suave.
Logo depois utilizamos o `setTimeout()` para remover a classe fade depois de 3 segundos para que ela possa ser adicionada novamente no próximo evento de click.

#### No fim de tudo o código deve ficar assim

```javascript
// API endpoint --------------------------------------------
const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

// Get Elements --------------------------------------------
const searchInput = getElement(".search-input"),
  searchButton = getElement(".search-button"),
  container = getElement(".pokemon"),
  erroMessage = getElement(".error");

var pokeName, // Nome ou numero passado na caixa de busca
  pokemon, // Responsavel por guardar os dados recebidos da API
  card; // Responsavel por receber o HTML

// Build Functions --------------------------------------------

// Função para reduzir a escrita na captura de elementos HTML
function getElement(element) {
  return document.querySelector(element);
}

// Função responsavel por fazer requisições para a API e inserir as respostas na variavel pokemon
function requestPokeInfo(url, name) {
  fetch(url + name)
    .then(response => response.json())
    .then(data => {
      pokemon = data;
    })
    .catch(err => console.log(err));
}

// Função responsavel por montar o HTML exibido na pagina
function createCard() {
  card = `
    <div class="pokemon-picture">
      <img src="${pokemon.sprites.front_default}" alt="Sprite of ${
    pokemon.name
  }">
    </div>
    <div class="pokemon-info">
        <h1 class="name">Name: ${pokemon.name}</h1>
        <h2 class="number">Nº ${pokemon.id}</h2>
        <h3 class="type">Type: ${pokemon.types
          .map(item => item.type.name)
          .toString()}</h3>
        <h3 class="skill">Skills: ${pokemon.moves
          .map(item => " " + item.move.name)
          .toString()}</h3>
        <h3 class="weight">Weight: ${pokemon.weight / 10}kg</h3>
        <h3 class="height">Height: ${pokemon.height / 10}m</h3>
    </div>`;
  return card;
}

// Função que faz a chamada das principais funções e inicia o app
function startApp(pokeName) {
  requestPokeInfo(baseUrl, pokeName);

  setTimeout(function() {
    //Exibe uma mensagem caso o pokemon pesquisado não exista
    if (pokemon.detail) {
      erroMessage.style.display = "block";
      container.style.display = "none";
    } else {
      erroMessage.style.display = "none";
      container.style.display = "flex";
      container.innerHTML = createCard();
    }
  }, 2000);
}

// Add Events --------------------------------------------
searchButton.addEventListener("click", event => {
  event.preventDefault();
  pokeName = searchInput.value.toLowerCase();
  startApp(pokeName);
  container.classList.add("fade");

  // Reseta o efeito fade removendo a classe fade
  setTimeout(() => {
    container.classList.remove("fade");
  }, 3000);
});
```

### Isso é tudo, pessoal!!

Esse artigo foi um pouco mais extenso que o normal, mas foi muito enriquecedor para mim, espero que tenha acrescentado algo nos seus estudos. Provavelmente eu devo ter me equivocado em algum momento ou deixado alguma informação confusa, caso tenha visto algo do tipo é só me avisar, isso vai ajudar muito na minha caminhada para ser um Front End Developer!

Todo esse conteúdo foi feito com base nos seguintes links:

- [How to connect to an api with javascript](https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript/)
- [O que é API](https://canaltech.com.br/software/o-que-e-api/)
- [Nobody introduced me to the API](https://www.robinwieruch.de/what-is-an-api-javascript/).
- [Interface de programação de aplicações](https://pt.wikipedia.org/wiki/Interface_de_programação_de_aplicações)
- [Front End Brasil](https://github.com/frontendbr/forum/issues)

Obrigado por ler até aqui!! Se curtiu esse post compartilha com seus amigos e deixa um comentário caso tenha alguma sugestão do que posso melhorar.
