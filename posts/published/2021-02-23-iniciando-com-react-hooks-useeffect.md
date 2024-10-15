---
title: Iniciando com React Hooks - useEffect
resume: Existem situações em que nossa aplicação precisa executar trechos de
  códigos com base em mudanças de estado , esses acontecimentos são  conhecido
  como efeitos colaterais e podem ser controladas utilizando o hook useEffect.
date: 2021-04-06 10:28:46
image: /assets/img/react.png
category: React
tagColor: "#3498db"
---

Hey, esse artigo faz parte de uma série sobre react hooks. Se você ainda não leu os artigos passados, da uma conferida nos links abaixo:

- [Iniciando com React Hooks - useState](https://www.cristiano.dev/blog/2021-02-04-iniciando-com-react-hooks-usestate)

![React JS](/assets/img/hooks-wallpaper.png)

A primeira coisa que precisa ficar clara é que o hook `useEffect` não é uma versão dos ciclos de vida`constructor`, `componentDidMount`, `componentDidUpdate`, e `componentWillUnmount`.

Isso mesmo, provavelmente você entendeu errado... assim como eu. Mas nunca é tarde para aprender, então vamos lá.

### Tá, mas o que é o useEffect?

`useEffect` é um hook que tem como principal objetivo sincronizar estados e executar efeitos colaterais. Esse hook é uma função que pode receber até 2 argumentos, uma função e um array de dependências.

Geralmente o que encontramos por ai é uma explicação que diz o seguinte:

- usar o `useEffect` passando apenas o primeiro `useEffect(function)`

  ❌ Quer dizer que esse `useEffect` vai ser executado sempre que nossa aplicação atualizar, semelhante ao `componentDidUpdate`

  ✅ O correto é dizer que esse `useEffect` vai estar em sincronia com todos os estados do componente.

- usar o `useEffect` passando o segundo argumento como um array vazio `useEffect(function, [])`

  ❌ Quer dizer que esse `useEffect` vai ser executado quando o componente montar, semelhante ao `componentDidMount`

  ✅ O correto é dizer que esse `useEffect` não vai estar em sincronia com nenhum estado do componente, por isso ele vai ser executado apenas uma vez.

- usar o `useEffect` passando uma lista de estados no segundo argumento

  ❌ Quer dizer que esse `useEffect` vai ser executado sempre que os estados atualizarem, semelhante ao `componentDidUpdate.`Também existem algumas explicações que tratam essa forma como uma alternativa ao antigo `componentWillReceiveProps`

  ✅ O correto é dizer que esse `useEffect` vai estar em sincronia com todos os estados que forem passados no segundo argumento.

Pode parecer besteira, mas é importante entender essas pequenas diferenças.

### Ainda não ficou claro? Vamos ao exemplo!

Vamos utilizar um exemplo bem simples utilizando Classes e logo em seguida o mesmo componente utilizando hooks.

```javascript
export class SimpleComponent extends Component {
  componentDidMount() {
    alert("Component montou!");
  }

  componentWillUnmount() {
    alert("Component desmontou");
  }

  render() {
    return <h1>Component Simples</h1>;
  }
}
```

```javascript
export function SimpleComponent() {
  useEffect(() => {
    alert("Component montou!");

    return alert("Component desmontou");
  }, []);

  return <h1>Component Simples</h1>;
}
```

Dois pontos são bem importantes no código acima:

1. O código que vai ser executado quando o componente for desmontar é passado no retorno da função do `useEffect`.
2. O segundo argumento passado para o `useEffect` é um array vazio, pois não queremos que ele sincronize com nenhum estado.

##### Vamos para mais um exemplo!

```javascript
export class PokemonInfo extends Component {
  state = { pokemon: null };

  getPokemon() {
    api.getPokemonInfo(this.props.pokemonNumber).then(pokemon => {
      this.setState({ pokemon });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pokemonNumber !== this.props.pokemonNumber) {
      this.getPokemon();
    }
  }

  render() {
    return (
      <>
        <input
          type="number"
          value={this.props.pokemonNumber}
          onChange={this.props.changePokemonNumber}
        />
        <h1>{this.state.pokemon.name}</h1>
      </>
    );
  }
}
```

```javascript
export function PokemonInfo(props){

  const [pokemon, setPokemon] = useState(null);

  state = { pokemon: null };

   function getPokemon() {
    api.getPokemonInfo(pokemonNumber)
    .then((poke) => {
      setPokemon(poke)
    });
  }

  useEffect(() => {
    getPokemon()
  }, [props.pokemonNumber])

  componentDidUpdate(prevProps){
     if (prevProps.pokemonNumber !== this.props.pokemonNumber) {
      this.getPokemon();
    }
  }

    return (
      <>
      <input type="number" value={props.pokemonNumber} onChange={props.changePokemonNumber} />
      <h1>{pokemon.name}</h1>
      </>
    );
}
```

No exemplo acima é importante notar que nosso hook se `useEffect` recebeu uma prop no array do seu segundo argumento. Isso quer dizer que queremos manter esse `useEffect` em sincronia com a prop chamada `pokemonNumer`.

### Evite ter um único useEffect gigantesco

Isso é algo bastante comum e acontece porque na maioria das vezes confundimos `useEffect` com ciclos de vida do react. Sempre falamos "vou chamar todas as funções aqui porque quero executar apenas quando meu componente montar", mas `useEffect` é sobre sincronizar estados e não sobre ciclos de vida.

Antes dos hooks nós escrevíamos algo assim, pois era baseado em ciclos de vida.

```javascript
class ChatFeed extends React.Component {
  componentDidMount() {
    this.subscribeToFeed();
    this.setDocumentTitle();
    this.subscribeToOnlineStatus();
    this.subscribeToGeoLocation();
  }
  componentWillUnmount() {
    this.unsubscribeFromFeed();
    this.restoreDocumentTitle();
    this.unsubscribeFromOnlineStatus();
    this.unsubscribeFromGeoLocation();
  }
  componentDidUpdate(prevProps, prevState) {
    // ... compare props and re-subscribe etc.
  }
  render() {
    return <div>{/* chat app UI */}</div>;
  }
}
```

Por falta de entendimento do funcionamento do `useEffect` é comum imaginar que a melhor abordagem é escrever o mesmo código em hooks dessa forma:

```javascript
function ChatFeed() {
  React.useEffect(() => {
    subscribeToFeed();
    setDocumentTitle();
    subscribeToOnlineStatus();
    subscribeToGeoLocation();

    return () => {
      unsubscribeFromFeed();
      restoreDocumentTitle();
      unsubscribeFromOnlineStatus();
      unsubscribeFromGeoLocation();
    };
  });

  return <div>{/* chat app UI */}</div>;
}
```

Podemos utilizar um `useEffect` para cada lógica individual!

```javascript
function ChatFeed() {
  React.useEffect(() => {
    subscribeToFeed();
    return () => {
      unsubscribeFromFeed();
    };
  });
  React.useEffect(() => {
    setDocumentTitle();
    return () => {
      restoreDocumentTitle();
    };
  });
  React.useEffect(() => {
    subscribeToOnlineStatus();
    return () => {
      unsubscribeFromOnlineStatus();
    };
  });
  React.useEffect(() => {
    subscribeToGeoLocation();
    return () => {
      unsubscribeFromGeoLocation();
    };
  });
  return <div>{/* chat app UI */}</div>;
}
```

Uma solução bastante elegante é separar tudo em [hooks personalizados](https://pt-br.reactjs.org/docs/hooks-custom.html). Não se preocupe, em breve irei abordar esse assunto aqui.

```javascript
function ChatFeed() {
  // Cada hook customizado tem a lógica necessária e poderia retornar valores
  useFeedSubscription();
  useDocumentTitle();
  useOnlineStatus();
  useGeoLocation();
  return <div>{/* chat app UI */}</div>;
}
```

### Evite criar funções desnecessárias

Nem sempre é necessário criar uma função se ela vai ser utilizada a penas no `useEffect`.

```javascript
import React, {useState, useEffect }  from 'react';

export function PokeInfo(props) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    getPokemonInfo();
  }, [props.id]);

  const getPokemonInfo = useCallback(() => {
    api.getPokemon(props.id).then((poke) => {
      setPokemon(poke);
    }).catch(e => {
      console.error(e.message);
    });
  }, []);


  return <div>{/*Pokemon info*/}<div/>
}
```

Por hora ignore o `useCallback`, em breve teremos um post sobre ele.

```javascript
import React, {useState, useEffect }  from 'react';

export function PokeInfo(props) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
     api.getPokemon(props.id).then((poke) => {
      setPokemon(poke);
    }).catch(e => {
      console.error(e.message);
    });
  }, [props.id]);



  return <div>{/*Pokemon info*/}<div/>
}
```

Toda aquela complexidade desnecessária com uma função que nem estava sendo reaproveitada foi simplificada com o código acima. Lembre-se, o primeiro argumento do `useEffect` já é uma função.

### Isso é tudo pessoal!

![Isso é tudo pessoal](https://i.pinimg.com/originals/2a/82/1e/2a821ee45ca3cbc384c0b70f730248ae.gif)

Obrigado por chegar até aqui!! Espero que tenha conseguido te ajudar de alguma forma. 😊

Fique atento(a) aqui no blog e no meu [twitter](https://twitter.com/Gonkristiano) que em breve irei postar mais artigos sobre hooks.

### Links importantes

- [Documentação do react](https://pt-br.reactjs.org/docs/getting-started.html)
- [Mitos sobre useEffect](https://epicreact.dev/myths-about-useeffect/)
