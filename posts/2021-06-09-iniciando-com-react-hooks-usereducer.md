---
title: Iniciando com React Hooks - useReducer
resume: É muito comum que nossas aplicações tenham estados complexos onde apenas
  o useState não é o suficiente. Nesses casos o react nos oferece o hook
  useReducer.
date: 2021-06-08 10:26:23
image: /assets/img/hooks-wallpaper.png
category: React
tagColor: "#3498db"
---

Hey, esse artigo faz parte de uma série sobre react hooks. Se você ainda não leu os artigos passados, da uma conferida nos links abaixo:

- [Iniciando com React Hooks - useState](https://www.crisgon.dev/iniciando-com-react-hooks-usestate/)
- [iniciando com React Hooks - useEffect](https://www.crisgon.dev/iniciando-com-react-hooks-useeffect/)
- [iniciando com React Hooks - useMemo](https://www.crisgon.dev/iniciando-com-react-hooks-usememo/)
- [iniciando com React Hooks - useCallback](https://www.crisgon.dev/iniciando-com-react-hooks-usecallback/)

Ao trabalhar com react o padrão quando falamos em gerenciar estado é utilizar o useState, porém essa não é a única forma de trabalhar com estados.

O useReducer é uma alternativa para o useState quando temos estados complexos, muito aninhados ou que precisam sempre do estado anterior antes de uma nova atualização. Porém, antes de focar no nosso objeto de estudo é preciso dar dois passos para trás e entender um pouco sobre redutores, conceito que se popularizou com o surgimento do [redux ](https://redux.js.org/)para gerenciamento de estados.

Você provavelmente já deve ter se esbarrado com algum projeto que utiliza redux, mas se esse for um tema que foge do seu conhecimento, não se assuste. Em breve irei escrever um artigo explicando um pouco sobre redux e a arquitetura flux, mas no momento você só precisa saber que redux é uma biblioteca javascript para gerenciamento de estados de uma aplicação.

Voltando aos redutores... eles basicamente existem para controlar estados de aplicações, exatamente como já conhecemos no react. De maneira bem simplificada, um redutor é uma função que recebe dois argumentos(o **estado** atual da aplicação e uma **ação)** e retorna um **novo estado**.

Exemplo:

```javascript
function counterReducer(count, action) {
  return count + 1;
}
```

A função redutora acima tem um objetivo único que é o de sempre acrescentar 1 ao estado atual e retornar um novo estado.

Analisando mais profundamente o código acima você deve ter percebido que ela é uma função bem direta ao ponto e que sempre vai retornar o mesmo valor se os argumentos passados forem sempre os mesmos.

```javascript
counterReducer(1); // retorno 2
counterReducer(1); // retorno 2
counterReducer(1); // retorno 2
counterReducer(1); // retorno 2
counterReducer(1); // retorno 2
```

Isso quer dizer que ela é uma função pura e que não tem efeitos colaterais. Ou seja, se essa função for executada dez vezes passando sempre o valor 1 o resultado retornado será 2 nas dez vezes. Logo abaixo existe um exemplo de uma função não pura.

```javascript
function counterReducer(count, action) {
  return count + Math.random();
}

counterReducer(1); // 1.7854420380755345
counterReducer(1); // 1.5816188682194945
```

Certo, falamos sobre o primeiro argumento da função redutora, porém ainda não falamos sobre a ação, nosso segundo argumento. A ação costuma ser um objeto com duas propriedades: uma instrução(type) e um novo valor(value ou payload).

Vamos melhorar nosso redutor de contador e tudo vai ficar mais claro

```javascript
function counterReducer(count, action) {
  if (action.type === "INCREASE") {
    return count + 1;
  }

  if (action.type === "DECREASE") {
    return count - 1;
  }

  return count;
}
```

No código acima nossa função redutora pode atualizar o estado de duas formas diferentes e também pode não fazer nada caso o type informado não exista,

```javascript
counterReducer(1, { type: "DECREASE" }); // retorno 0
counterReducer(1, { type: "INCREASE" }); // retorno 2
counterReducer(1, { type: "OPS" }); // retorno 1
```

> Essas adições não mudam a principal característica da função redutora, ser pura e sempre retornar o mesmo valor para os mesmos argumentos.

Outro ponto-chave é que o estado recebido pelas funções redutoras são sempre imutáveis, ou seja, um novo estado será criado para o retorno da função.

Esse ponto fica mais claro se o estado que nossa função redutora receber for um objeto como no exemplo abaixo.

```javascript
function personReducer(person, action) {
  switch (action.type) {
    case "INCREASE_AGE":
      return { ...person, age: person.age + 1 };
    case "CHANGE_LASTNAME":
      return { ...person, lastname: action.value };

    default:
      return person;
  }
}

const person = {
  name: "Cristiano",
  lastName: "Gonçalves",
  age: 27,
};

const action = {
  type: "CHANGE_LASTNAME",
  value: "Santos",
};

const result = personReducer(person, action);

/*
Resultado
{
  name: "Cristiano",
  lastName: "Santos",
  age: 27
}
*/
```

No exemplo acima o funcionamento não mudou, apenas passamos a utilizar um switch ao invés de ifs e note que para o retorno da função sempre criamos um novo objeto. Em nenhum momento fizemos uma reatribuição do person que foi recebido como atributo.

## Mas e o useReducer?

Agora que você já sabe como funciona uma função redutora, você também já sabe como funciona o useReducer! 😎

O hook useReducer é bem semelhante ao useState que retorna dois valores, o estado e uma função que atualiza esse estado. Para o useReducer temos praticamente a mesma coisa... Ele sempre nos retorná um array com o estado(`state`) e uma função(`dispatch`) responsável ela atualização do estado.

![Detalhamento do useReducer](/assets/img/usereducer-2x-1-.png "Detalhamento do useReducer")

Para a aplicação do useReducer ficar mais clara vamos pensar no seguinte cenário, onde temos que armazenar nome, idade, email, nacionalidade e endereço de um usuário. O primeiro pensamento que temos é utilizar um estado para cada campo.

```javascript
const [name, setName] = useState("");
const [age, setAge] = useState(26);
const [email, setEmail] = useState("");
const [nationality, setNationality] = useState("brazilian");
const [address, setAddress] = useState({
  city: "",
  state: "",
  postalCode: "",
});
```

Outra forma de armazenar as mesmas informações seriam com o useReducer e ficaria assim:

```javascript
function reducerPerson(state, action) {
    switch(action.type) {
    case "CHANGE_AGE":
      return {...state, age: action.value};
    case "CHANGE_NAME":
      return {...state, lastname: action.value};
      ... // Resto da implementação
    default:
      return person;
  }
}

const initialPersonState = {
  name: null,
  age: null,
  email: null,
  nationality: null,
  address: null
}
const [personState, dispatch] = useReducer(initialPersonState, reducer);
```

A atualização do estado ficaria da seguinte forma:

```javascript
console.log(personState);
/*
{
  name: null,
  age: null,
  email: null,
  nationality: null,
  address: null
}
*/

dispatch({ type: "CHANGE_AGE", value: 27 });
console.log(personState);
/*
{
  name: null,
  age: null,
  email: null,
  nationality: null,
  address: null
}
*/
```

O useReducer ainda tem mais um detalhe, seu terceiro argumento, que geralmente é pouco utilizado. Esse argumento é o `init`e ele é responsável por controlar o nosso estado inicial, isso é bastante útil para conseguir ter a lógica do estado inicial isolado do useReducer e ainda nos possibilita um reset do estado sem grandes problemas.

```javascript
function init(personState) {
  if(personState.email === null)
     return initialState;
  return personState;
}

function reducerPerson(state, action) {
    switch(action.type) {
    case "RESET":
      return  init(action.value);
      ... // Resto da implementação
    default:
      return person;
  }
}
```

O código acima permite que a gente tenha uma regra de negócio embutida na nossa função de iniciar o estado, onde ela sempre vai garantir que nosso estado só vai ser resetado se o usuário não possuir um email informado.

## Devo trocar useState por useReducer?

Depende da situação... Segundo a própria [documentação do react](https://pt-br.reactjs.org/docs/hooks-reference.html#usestate) o useReducer é a opção mais adequada para gerenciar objetos de estado que contém sub-valores. Mas isso não quer dizer que você deve sair trocando todos os seus useState que possuem objetos por um useReducer, antes de escolher por um ou outro é importante ter em mente os seguintes prós e contras:

### Prós

- Toda a sua atualização de estados fica centralizada em um único lugar, ao invés de ter múltiplas funções de setters.
- As funções redutoras são puras e mais simples de serem testadas.
- Podemos ter um código mais organizado com estado inicial função redutora isolados do resto da nossa aplicação.
- Aliado ao [typescript ](https://www.crisgon.dev/typescript-uma-breve-introdu%C3%A7%C3%A3o-interfaces/)o uso de um dispatch fica muito mais fácil e legivel que um simples setter. `dispatch({ type: "WIDTH", value: "200px" });`

### Contras

- Curva de aprendizado consideravelmente maior que a do `useState`
- Funções mais longas por conta do uso de instruções do switch

### Qual devo escolher?

Por padrão o `useState `ainda deve ser sua primeira escolha, pois, ele vai resolver pelo menos 90% dos seus problemas e vai ser ótimo quando:

- Você precisar lidar com estados simples, como boolean, string, numbers, arrays e objetos simples.
- Existem pouco estado para ser gerenciado ao longo do seu componente/container
- A quantidade de setters ao longo do seu componente/container não tem tornado tudo caótico
- Você não quer adicionar uma camada de complexidade para seu time lidar

## Isso é tudo pessoal!

![](/assets/img/2a821ee45ca3cbc384c0b70f730248ae.gif)

Obrigado por chegar até aqui!! Espero que tenha conseguido te ajudar de alguma forma. 😊

Fique atento(a) aqui no blog e no meu [twitter](https://twitter.com/Gonkristiano) que em breve irei postar mais artigos sobre hooks.

### Links importantes

- [Documentação do react](https://pt-br.reactjs.org/docs/getting-started.html)
- [Javascript Reducers](https://www.robinwieruch.de/javascript-reducer/)
- [React useReducer Hook ultimate guide](https://blog.logrocket.com/react-usereducer-hook-ultimate-guide/)
- [Why use Reducer hooks for state management in React?](https://rajeshnaroth.medium.com/why-use-reducer-hooks-for-state-management-in-react-c9528f615ddf)

  [](https://dmitripavlutin.com/dont-overuse-react-usecallback/)
