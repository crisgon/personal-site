---
title: Iniciando com React Hooks - useCallback
resume: Ter uma aplicação performática é uma das grandes preocupações do mundo
  web e React nos ajuda a cuidar disso com alguns hooks.
date: 2021-06-02 10:21:26
image: /assets/img/react.png
category: React
tagColor: "#3498db"
---

Hey, esse artigo faz parte de uma série sobre react hooks. Se você ainda não leu os artigos passados, da uma conferida nos links abaixo:

- [Iniciando com React Hooks - useState](https://www.cristiano.dev/blog/2021-02-04-iniciando-com-react-hooks-usestate)
- [iniciando com React Hooks - useEffect](https://www.cristiano.dev/blog/2021-04-14-iniciando-com-react-hooks-usememo)
- [iniciando com React Hooks - useMemo](https://www.cristiano.dev/blog/2021-04-14-iniciando-com-react-hooks-usememo)

Estamos sempre procurando alternativas para deixar nossas aplicações cada vez melhores e uma das formas de fazer isso é as tornando performáticas.

Anos atrás quando se falava no assunto performance no frontend as únicas coisas que as pessoas pensavam eram no tamanho das imagens, no tamanho do seu css minificado e no tamanho do seu javascript, também minificado. Porém, isso mudou bastante! Mas isso não quer dizer que tudo que citei anteriormente tenha deixado de ter atenção, na verdade, tudo isso se tornou o mínimo esperado. O foco agora são nas informações que aparecem depois que sua aplicação já foi carregada, pois, as aplicações frontend ganharam uma grande responsabilidade ao lidar e manipular grandes massas de dados complexos.

Hoje vamos aprender sobre useCallback, mas tome muito cuidado para não confundir com useMemo. Eles se parecem, mas o useMemo memoriza valores e o useCallback memoriza funções.

Antes de prosseguir é importante ressaltar que devemos sempre evitar [otimização prematura](https://woliveiras.com.br/posts/como-evitar-a-otimizacao-prematura/)! Por padrão o react já é extremamente rápido e na maioria das vezes não vamos precisar fazer uso de um hook como o useCallback. Antes de sair utilizando useCallback em todas as funções da sua aplicação lembre-se que isso tem um custo e pode ser que seja um custo alto para um ganho baixo.

### O que faz esse useCallback

Seu uso é bastante simples e bem fácil de entender!

Basicamente, o hook useCallback memoiza(guarda) sua função e evita que ela seja redeclarada sempre que componentes filhos que utilizam essa função sejam renderizado. A função só vai ser redeclarada quando algum dos valores do array de dependência forem atualizados.

Ai você se questiona... "Mas qual o real objetivo do useCallback?"

![Will smith com dúvida](/assets/img/will.gif "Will smith com dúvida")

Para explicar isso é preciso entender um pouco sobre igualdade de funções no javascript.

### Igualdade de funções no javascript

```javascript
function calc() {
  return (a, b) => a + b;
}

const soma = calc();
const soma2 = calc();

soma(2, 2); // 4
soma2(2, 2); // 4

soma === soma2; // false
soma2 === soma2; // false
```

Uma breve explicação sobre o trecho de código acima. Basicamente temos uma função `calc`que ao ser executada retorna uma função que recebe 2 argumentos. Ou seja, soma ficaria assim `const soma = (a,b) => a + b;` . O mesmo acontece com soma2.

As duas funções(soma e soma2) fazem exatamente a mesma coisa e retornam valores iguais quando recebem os mesmos argumentos, porém o javascript nos diz que elas são diferentes. Isso acontece, pois no javascript funções são objetos e cada nova instância de um objeto é diferente da outra.

### E onde o React entra nisso?

Quando criamos uma função que é utilizada em um componente ela é sempre uma nova instância de objeto a cada renderização.

```javascript
function MyComponent() {
  // handleClick é criado a cada renderização
  const handleClick = () => {
    console.log('Clicado!');
  };
```

Para reescrever essa função usando useCallback seria assim

```javascript
function MyComponent() {
  // handleClick é sempre a mesma a cada renderização
  const handleClick = useCallback(() => {
    console.log('Clicado!');
  }, []);
```

Você deve ter notado que a estrutura do useCallback é como a de outros hooks, sempre recebendo uma função como primeiro parâmetro e um array de dependências como segundo argumento.

> Importante!! A funcão declarada com useCallback só vai ser redeclarada quando um dos itens do array de dependencia forem modificados. Caso contrário a funcão vai se manter a mesma caso o componente seja rerenderizado.

### Quando useCallback é uma boa escolha

Imagine que temos uma página com uma lista de filmes que são buscados em uma api com base em uma categoria. Nessa mesma página também podemos filtrar os filmes por status (lançado ou não).

Você concorda que a função que trata categoria só deveria ser redeclarada quando a categoria mudar? E não quando a lista for atualizada por conta do status?

É exatamente isso que o useCallback abaixo faz. A função onMovieClick só vai ser redeclarada quando a categoria altera, logo, não importa quantas vezes você alterar o filtro de status, essa função vai se manter a mesma.

```javascript
function MovieList({ category, handleMovieClick }) {
  const movies = getMovies(category);

  const map = movie => <div onClick={handleMovieClick}>{movie}</div>;

  return <div>{movies.map(map)}</div>;
}

export default function Container({ category }) {
  const onMovieClick = useCallback(
    event => {
      console.log("Clicou", event.currentTarget);
    },
    [category],
  );

  return <MovieList category={category} handleItemClick={onMovieClick} />;
}
```

### Muito cuidado!!

É preciso tomar muito cuidado ao optar por usar useCallback pelos seguintes motivos:

- você vai adicionar mais complexidade ao seu código e talvez o custo de manutenção seja maior que o ganho em desempenho.
- algumas funções são simples e aceitáveis de serem rerenderizadas.
- otimização prematura pode ser problemática

### Isso é tudo pessoal!

![Isso é tudo pessoal](https://i.pinimg.com/originals/2a/82/1e/2a821ee45ca3cbc384c0b70f730248ae.gif)

Obrigado por chegar até aqui!! Espero que tenha conseguido te ajudar de alguma forma. 😊

Fique atento(a) aqui no blog e no meu [twitter](https://twitter.com/Gonkristiano) que em breve irei postar mais artigos sobre hooks.

### Links importantes

- [Documentação do react](https://pt-br.reactjs.org/docs/getting-started.html)
- [Your Guide to React.useCallback()](https://dmitripavlutin.com/dont-overuse-react-usecallback/)
- [When to useMemo and useCallback](https://kentcdodds.com/blog/usememo-and-usecallback)
- [How to useCallback in React](https://www.robinwieruch.de/react-usecallback-hook)
