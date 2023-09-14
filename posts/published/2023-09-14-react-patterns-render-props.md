---
title: "Padrões React: Render Props"
resume:
date: 2023-09-14 08:20:03
image:
category: Geral
---

Fala, galera! Esse artigo faz parte de uma série focada em padrões do React. Recomendo dar uma conferida nos últimos posts:

- [Container & presentational](https://www.cristiano.dev/blog/2023-08-23-react-patterns-container-presentational).
- [Higher-Order Components](https://www.cristiano.dev/blog/2023-08-30-react-patterns-hocs-components-de-ordem-superior).

Hoje iremos falar sobre o padrão render props, mais um padrão que faz uso das características das [funções de primeira classe do javascript](https://diegomariano.com/funcoes-de-primeira-classe-javascript/).

Segundo a [documentação do react](https://pt-br.legacy.reactjs.org/docs/render-props.html):

> O termo “render prop” se refere a uma técnica de compartilhar código entre componentes React passando uma prop cujo valor é uma função.

#### O que isso quer dizer?

De forma bem simplificada, uma render prop é uma função que irá ser responsável por renderizar um componente qualquer. Dessa forma é possível compartilhar estados e funções entre componentes de maneira facilitada.

Essa é um exemplo de uma render prop:

```jsx
<Container render={name => <h1>Hello {name}</h1>} />
```

Para fazer mais sentido, vamos aplicar render props em um exemplo mais detalhado.

#### O problema

Você possui um componente que é responsável por capturar as coordenadas de latitude e longitude do usuário. O código abaixo faz exatamente isso.

```jsx
function Geolocation() {
  const [coords, setCoords] = useState({ lat: null, long: null });

  function getCoords() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(position => {
        setCoords({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      });
    }
  }

  return (
    <div>
      <h1>Coordenadas</h1>
      <button onClick={getCoords}>Pegar coordenadas</button>
      <p>
        {coords.lat} {coords.long}
      </p>
    </div>
  );
}
```

O resultado do código acima é o seguinte:

![Print do resultado do component que captura a localização do usuário](/assets/img/render-props-example-1.png)

Imagine o cenário em que você precisa construir dois cards, um que pega a coordenada do usuário assim que a tela carrega e outro que pega a coordenada apenas quando o usuário clica no botão. Como você resolveria isso?

Uma forma bem simples de resolver esse problema é replicar a lógica nos dois cards.

```jsx
function CardWithGeolocationWhenPageLoad() {
  const [coords, setCoords] = useState({ lat: null, long: null });

  useEffect(() => {
    getCoords();
  }, []);
  function getCoords() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(position => {
        setCoords({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      });
    }
  }

  return (
    <div>
      <h1>Coordenadas quando a página carregar</h1>
      <p>
        {coords.lat} {coords.long}
      </p>
    </div>
  );
}
```

```jsx
function CardWithGeolocationWhenButtonIsClicked() {
  const [coords, setCoords] = useState({ lat: null, long: null });

  function getCoords() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(position => {
        setCoords({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      });
    }
  }

  return (
    <div>
      <h1>Coordenadas quando o botão for clicado</h1>
      <button onClick={getCoords}>Pegar coordenadas</button>
      <p>
        {coords.lat} {coords.long}
      </p>
    </div>
  );
}
```

Problema resolvido, certo?
Imagine que agora nossos cards precisam fazer uma chamada para uma api informando quais coordenadas foram capturadas e qual o horário da captura.

Ai você pensa: **"Só ir nos dois cards e adicionar essa lógica"**. Mas e se mais uma lógica surgir? E se surgir um terceiro card que também precisa dessa lógica? A verdade é que vai chegar um momento que será insustentável manter todo esse código.
E é ai que o render props brilha! Pois com ele vamos conseguir concentrar toda essa lógica de coordenadas em um único lugar e compartilhar com N componentes.

#### Aplicando render props

Com o render props nossa implementação do component `Geolocation` ficaria assim:

```jsx
function Geolocation(props) {
  const [coords, setCoords] = useState({ lat: null, long: null });

  function getCoords() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(position => {
        setCoords({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      });
    }
  }

  return <div>{props.render({ coords, getCoords })}</div>;
}
```

Ao invés de renderizar o botão e as coordenadas, agora nossa função recebe uma prop chamada render. Essa prop é uma função que irá receber um objeto como parâmetro(poderia ser qualquer dado) e nesse objeto iremos enviar o estado coords e a função getCoords que poderão ser utilizados por qualquer componente que for passado na prop `render`.

A aplicação do `Geolocation` para construir o `CardWithGeolocationWhenPageLoad` ficaria assim:

```jsx
function CardWithGeolocationWhenPageLoad(props) {
  useEffect(() => {
    props.getCoords();
  }, []);

  return (
    <div>
      <h1>Coordenadas quando a página carregar</h1>
      <p>
        {props.coords.lat} {props.coords.long}
      </p>
    </div>
  );
}

<Geolocation
  render={({ coords, getCoords }) => {
    return (
      <CardWithGeolocationWhenPageLoad coords={coords} getCoords={getCoords} />
    );
  }}
/>;
```

E a implementação e uso do `CardWithGeolocationWhenButtonIsClicked` também fica extremamente simples.

```jsx
function CardWithGeolocationWhenButtonIsClicked(props) {
  return (
    <div>
      <h1>Coordenadas quando o botão for clicado</h1>
      <button onClick={props.getCoords}>Pegar coordenadas</button>
      <p>
        {props.coords.lat} {props.coords.long}
      </p>
    </div>
  );
}

<Geolocation
  render={({ coords, getCoords }) => {
    return (
      <CardWithGeolocationWhenButtonIsClicked
        coords={coords}
        getCoords={getCoords}
      />
    );
  }}
/>;
```

Notou que agora temos toda a lógica referente a coordenadas em um único local? Possibilitando que diversos componentes façam uso dessa lógica? Agora se a gente precisar fazer qualquer modificação no método `getCoords` só precisamos mexer em um único ponto.

Importante! Aqui no nosso exemplo nós utilizamos uma prop chamada render, porém essa prop pode ser chamada de qualquer coisa que o resultado seria o mesmo. Basta que a prop seja uma função que receba argumentos e retorne um componente.

Também podemos utilizar o render props com os childrens do react. Dessa forma a implementação pode ser feita de uma maneira um pouquinho diferente:

```jsx
function Geolocation(props) {
  const [coords, setCoords] = useState({ lat: null, long: null });

  function getCoords() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(position => {
        setCoords({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      });
    }
  }

  return <div>{props.children({ coords, getCoords })}</div>;
}

<Geolocation>
  {({ coords, getCoords }) => {
    return (
      <CardWithGeolocationWhenButtonIsClicked
        coords={coords}
        getCoords={getCoords}
      />
    );
  }}
</Geolocation>;
```

A ideia é a mesma, pois o children também é uma prop do react. Esse estilo de abordagem é muito comum em libs de animações como o [react-motion](https://github.com/chenglou/react-motion).

Para entender mais sobre o funcionamento você pode ver e editar o código que acabamos de construir:

<iframe src="https://codesandbox.io/embed/render-props-wxzlhy?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="render-props"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
   
### Devo utilizar Render Props?

Assim como os HOCs, Render Props são uma ótima solução para manter uma lógica centralizada com a possibilidade aplicá-la para N componentes.

Atualmente existem formas melhores de resolver o mesmo problema que um Render Props se propões utilizando o padrão de hooks, mas esse é um papo para um próximo post.

É importante entender que apesar de existirem formas mais mordernas de compartilhar lógica entre componentes, ainda é muito comum encontrar Render Props em aplicações modernas, um exemplo clássico são algumas libs de animações como o [react-motion](https://github.com/chenglou/react-motion)..

### Isso é tudo, pessoal!

Fico feliz que você chegou até aqui e espero que tenha aprendido algo novo ao longo dessa leitura. Em breve irei trazer mais artigos abordando outros padrões do react. Até mais!

### Referências

- [Render Props Pattern](https://javascriptpatterns.vercel.app/patterns/react-patterns/render-props)
- [Documentação do react](https://legacy.reactjs.org/docs/render-props.html)
- [React Patterns — Começando pelo Render Props](https://medium.com/collabcode/react-patterns-come%C3%A7ando-pelo-render-props-e0040ef723ce)
