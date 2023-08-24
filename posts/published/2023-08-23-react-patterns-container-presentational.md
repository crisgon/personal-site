---
title: "Padrões React: Container & Presentational"
resume:
date: 2023-08-23 08:20:03
image:
category: Geral
---

Fala, galera! Hoje vou começar uma pequena série focada em padrões.

Inicialmente ela vai ser focada em padrões do React, mas futuramente pretendo expandir para padrões de projetos de modo geral.

Um ponto super importante é que antes de tentar aplicar qualquer padrão de código/projeto etc é preciso entender qual problema ele vai resolver. Nunca aplique um padrão(pattern) só por capricho, pois toda escolha técnica é rodeada por prós e contras.

### Qual o problema?

![Linha de montagem](/assets/img/linha-de-montagem.jpg)

Uma das premissas dos frameworks frontends modernos, como o nosso querido react, é componentizar e escrever código com responsabilidades bem definidas. É como as antigas linhas de montagem, onde cada pessoa tem seu papel muito bem definido e essa pessoa é especialista em executar uma única função em diversos cenários. Uma pessoa especialista em apertar parafusos vai conseguir apertar o parafuso de um carro ou de um computador.
Sei que é um exemplo bem abstrato... Mas o grande ponto é entender que a separação de responsabilidades pode e deve ser aplicada na construção das suas aplicações e esse tipo de separação facilita o reaproveitamento.

Depois dessa explicação você nota algum problema ao analisar o código abaixo?

```tsx
function MusicList() {
  const [musics, setMusics] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, [
    function getMusics() {
      ... alguma regra de negócio antes de buscar músicas
      setLoading(true);
      fetch("api-de-musicas.com")
        .then(res => res.json())
        .then(res => {
          setMusics(res.musics);
          setLoading(false);
        });
    },
  ]);

  if (props.loading) {
    return <p>Carregando..</p>;
  }
  return (
    <div>
      {props.musics.map(music => (
        <li key={music.id}>
          <h3>{music.name}</h3>
          <h4>{music.artist}</h4>
        </li>
      ))}
    </div>
}
```

### O padrão Container & Presentational

O código acima tem um component que faz mais de uma coisa... ele não é "especialista" em nada. O padrão **Container & Presentational** tem o objetivo de resolver esse problema, separando lógica e regras de negócios em components do tipo container e interface em components do tipo presentational.

Ainda não entendeu o que diferencia um component container de um component presentational?

- **Container:** Se você precisa exibir uma lista de músicas o component container não vai se preocupar em **como você vai exibir**, ele vai se preocupa com **o que vai ser exibido**. A chamada na api para buscar as músicas, o agrupamento das músicas por categoria ou qualquer tipo de tratamento será feito por esse tipo de component.

- **Presentational:** Esse é um component apenas de apresentação, onde seu único objetivo é exibir informações em tela e cuidar das interações com o usuário. No exemplo da lista de músicas esse component vai ser responsável por exibir as músicas em formato de grade ou lista, exibir a capa do album quadrada ou arredondada e tudo que diz respeito a forma que a informação será apresentada, pois esse é um presentational component(component de apresentação).

Vamos reescrever o mesmo trecho de código que vimos anteriormente, mas agora aplicando o padrão que acabamos de aprender.

Exemplo de um component container:

```tsx
function MusicListContainer() {
  const [musics, setMusics] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, [
    function getMusics() {
       ... alguma regra de negócio antes de buscar músicas
      setLoading(true);
      fetch("api-de-musicas.com")
        .then(res => res.json())
        .then(res => {
          setMusics(res.musics);
          setLoading(false);
        });
    },
  ]);

  return <MusicList musics={musics} loading={loading} />;
}
```

Exemplo de um component presentational:

```tsx
function MusicList(props) {
  if (props.loading) {
    return <p>Carregando..</p>;
  }
  return (
    <div>
      {props.musics.map(music => (
        <li key={music.id}>
          <h3>{music.name}</h3>
          <h4>{music.artist}</h4>
        </li>
      ))}
    </div>
  );
}
```

### O que ganho fazendo isso?

Esse é um padrão bem simples, mas que traz alguns ganhos interessantes, são eles:

- Separação das responsabilidades. No exemplo acima ficou bem claro qual component era responsável por cuidar de regras de negócio e qual é responsável apenas por apresentar dados para o usuário.

- Reutilização. Nosso component de MusicList pode ser utilizado em diversos cenários em que precisamos exibir músicas. Sejam músicas de resultados de uma busca ou as músicas favoritas de um usuário.

- Testabilidade. Testar components de apresentação sem regra de negócio é muito simples, pois precisamos apenas passar props e nos preocupar com o comportamento do component e não com chamadas de api e etc.

### Devo utilizar sempre esse padrão?

É importante sempre tentar separar ao máximo as responsabilidades do seu código, porém o padrão Container & Presentational não é algo mais recomendado pela comunidade, pois conseguimos fazer esse mesmo tipo de separação utilizando hooks de uma maneira bem mais elegante.

Mas não se espante se encontrar projetos que ainda utilizem essa abordagem, pois ela resolveu muitos problemas em tempos de components de classes. Apesar de não ser algo que você vai sair aplicando em todos os cenários no seu dia a dia, conhecer como os padrões do react foram evoluindo é essencial para entender como estamos resolvendo os problemas atuais.

### Isso é tudo, pessoal!

Fico feliz que você chegou até aqui e espero que tenha aprendido algo novo ao longo dessa leitura. Em breve irei trazer mais artigos abordando outros padrões do react. Até mais!

### Referências

- [Issue - React Hooks and Container/Presenter Component Pattern #545](https://github.com/kentcdodds/ama/issues/545)
- [Container/Presentational Pattern](https://javascriptpatterns.vercel.app/patterns/react-patterns/conpres)
