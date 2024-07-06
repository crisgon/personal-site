---
title: "Gerenciando dados locais com IndexDB"
resume:
date: 2024-07-05 08:20:03
image:
category: Geral
---

### O que são os hooks?

Os react hooks são funções especiais, sempre nomeadas com o prefixo "use", que são utilizadas pelo react para adicionar interatividade a componentes funcionais. Mas esse não é a única utilidade dos hooks, com eles podemos:

- gerenciar estado e ciclo de vida dos componentes com uma api simplificada.
- reutilizar a lógica com estado sem alterar a hierarquia dos componentes.
- extrair lógica de componentes e testá-las de forma independente.

E muito mais!! Se quiser um pouco mais de detalhes sobre alguns hooks específicos, recomendo conferir minha série de artigos focadas em [react hooks](https://cristiano.dev/blog/2021-02-04-iniciando-com-react-hooks-usestate).

### Hook pattern

Ok... até agora falamos resumidamente sobre os hooks e sobre alguns benefícios, porém não falamos do "padrão hooks".

Quando falamos em hooks a primeira coisa que as pessoas pensam são useState e useEffect. Se o assunto for custom hooks o pensamento é o de escrever hooks genéricos que vão ficar na pastinha hooks esquecidos para serem utilizados em situações pontuais, como hooks de manipulação de DOM, por exemplo.

Uma forma muito comum de utilizar custom hooks é para escrever código que vai ser compartilhado em diversos contextos. Um bom exemplo seria um hook responsável por verificar se o navegador está online ou offline.

#### Essa seria a implementação do hook:

```jsx
import { useEffect, useState } from "react";

export function useHasInternetConnection() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    function handleStatusChange() {
      setIsOnline(navigator?.onLine);
    }

    window.addEventListener("online", handleStatusChange);

    window.addEventListener("offline", handleStatusChange);

    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, [isOnline]);

  return {
    isOnline,
  };
}
```

#### E esse seria o uso do hook

```jsx
function App() {
  const { isOnline } = useHasInternetConnection();
  return <h1>Você está {isOnline ? "online" : "offline"}</h1>;
}
```

### Indo além

> Podemos sair do uso óbvio e ir além quando falamos de hooks. Basta você lembrar que hooks são funções e, conforme vimos no artigo [Padrões React: Render Props](https://www.cristiano.dev/blog/2023-09-14-react-patterns-render-props), funções javascript são de primeira classe. Ou seja, podemos retornar funções e receber funções como argumentos, logo, é possível compor hooks que recebem funções e/ou retornam funções.

Você pode utilizar custom hooks para extrair lógica de negócio de seus componentes e separar responsabilidades, mesmo que esse lógica não seja reaproveitada em N lugares.

Por exemplo, o código abaixo representa um todo list com as funcionalidades e adicionar, remover e completar tarefas. É uma lógica simples, mas imagine que ela é mais complexa, existem chamadas na api e tratamentos de erros para cada uma das ações.

```jsx
import { useState, useMemo } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [list, setList] = useState([]);

  function addTodo() {
    if (!todo) return;

    const newTodo = {
      value: todo,
      id: crypto.randomUUID(),
      completed: false,
    };
    setList(oldState => [...oldState, newTodo]);
    setTodo("");
    // chamada na api
    // tratamentos de erros
  }

  function removeTodo(id) {
    setList(oldState => oldState.filter(t => t.id !== id));
    // chamada na api
    // tratamentos de erros
  }

  function toggleTodo(id, checked) {
    setList(oldState =>
      oldState.map(t => {
        if (t.id === id) return { ...t, completed: checked };
        return t;
      }),
    );
    // chamada na api
    // tratamentos de erros
  }

  return (
    <>
      <h1>Todo</h1>
      <div className="card">
        <input value={todo} onChange={e => setTodo(e.target.value)} />
        <button type="submit" onClick={addTodo}>
          adicionar
        </button>
        <ul className="todo-list">
          {list.map(item => (
            <li key={item.id}>
              <input
                type="checkbox"
                onChange={e => toggleTodo(item.id, e.target.checked)}
              />
              <div
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                }}
              >
                {item.value}
              </div>
              <button onClick={() => removeTodo(item.id)}>🗑️</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
```

#### Ao usar custom hooks teremos o seguinte resultado:

Em um arquivo teremos toda nossa lógica de negócios e estados concentrados em um custom hook:

```jsx
import { useState } from "react";

export function useTodo() {
  const [todo, setTodo] = useState("");
  const [list, setList] = useState([]);

  function addTodo() {
    if (!todo) return;

    const newTodo = {
      value: todo,
      id: crypto.randomUUID(),
      completed: false,
    };
    setList(oldState => [...oldState, newTodo]);
    setTodo("");
    // chamada na api
  }

  function removeTodo(id) {
    setList(oldState => oldState.filter(t => t.id !== id));
    // chamada na api
  }

  function toggleTodo(id, checked) {
    setList(oldState =>
      oldState.map(t => {
        if (t.id === id) return { ...t, completed: checked };
        return t;
      }),
    );
    // chamada na api
  }

  return {
    todo,
    list,
    addTodo,
    removeTodo,
    toggleTodo,
    hanldleTodo: setTodo,
  };
}
```

E no arquivo de UI teremos o seguinte código:

```jsx
import "./App.css";
import { useTodo } from "./useTodo";

function App() {
  const { todo, list, addTodo, removeTodo, toggleTodo, hanldleTodo } =
    useTodo();

  return (
    <>
      <h1>Todo</h1>
      <div className="card">
        <input value={todo} onChange={e => hanldleTodo(e.target.value)} />
        <button type="submit" onClick={addTodo}>
          adicionar
        </button>
        <ul className="todo-list">
          {list.map(item => (
            <li key={item.id}>
              <input
                type="checkbox"
                onChange={e => toggleTodo(item.id, e.target.checked)}
              />
              <div
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                }}
              >
                {item.value}
              </div>
              <button onClick={() => removeTodo(item.id)}>🗑️</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
```

Dessa forma teremos uma separação muito clara entre lógica de negócios e camada de apresentação. Também conseguimos escrever um teste que valide apenas a regra de negócio e um teste que valide nossa UI de forma independentes.

Algumas vantagens ao utilizar hooks patterns:

✅ Possibilidade de construir componentes com lógica e estados sem utilizar classes.

✅ Simplificação dos componentes, pois é possível construir um componente que só é responsável por renderizar UI.

✅ Compartilhar e reutilizar lógica não visual entre componentes sem utilizar Render Props ou HOCs

✅ Com hooks não precisamos utilizar o padrão [Container & Presentational](https://www.cristiano.dev/blog/2023-08-23-react-patterns-container-presentational) para separar lógica de negócio da apresentação

✅ Hooks tornam o código mais conciso e legível, especialmente para componentes mais complexos, pois a lógica de negócio pode ser abstraída em custom hooks que serão testados de forma independentes.

### Quando utilizar?

A ideia de separar lógica de negócio em custom hooks não é algo que eu costumo ver sendo compartilhado com frequência, pois, ao pesquisar por esse tema vejo várias pessoas utilizando [Container & Presentational](https://www.cristiano.dev/blog/2023-08-23-react-patterns-container-presentational) para separar lógica da apresentação.

Eu descobri a possibilidade de utilizar custom hooks para separar lógica de negócios da apresentação enquanto navegava no site do [Kent C. Dodds](https://kentcdodds.com/) , desde então, sempre que sinto que meu componente possui muitos estados, funções e lógica de negócio de modo geral, tento fazer uma separação entre apresentação e lógica usando custom hooks.

Geralmente meus componente ficam dessa forma:

```jsx
📁src/
|-- 📁components/
|-- 📁modules/
| |-- 📁cart/
| | |-- 📄Cart.tsx
| | |-- 📄Cart.css
| | |-- 📄useCart.ts
| |-- 📁checkout/
| | |-- 📄Checkout.tsx
| | |-- 📄Checkout.css
| | |-- 📄useCheckout.ts
|-- 📁services/
| |-- 📄api.js
```

Fazer esse tipo de separação me ajuda a manter o código organizado e conciso. Outro ganho que sinto ao utilizar custom hooks para extrair regras de negócio é que durante esse processo eu sempre me questiono se o meu hook tem muita responsabilidade ou se ele deveria se tornar N outros hooks.

Além disso, utilizar custom hooks me dá a possibilidade de escrever testes focados apenas em regra de negócio ou apenas focado em UI fazendo mocks dos meus custom hooks.

### Caso queira ver o código final em ação

<iframe src="https://stackblitz.com/edit/vitejs-vite-pxhby2?ctl=1&embed=1&file=src%2FuseTodo.ts&hideNavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="render-props"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Isso é tudo, pessoal!

Fico feliz que você chegou até aqui e espero que tenha aprendido algo novo ao longo dessa leitura. Em breve irei trazer mais artigos sobre o universo frontend. Até mais!

### Referências

- [Hooks Pattern](https://javascriptpatterns.vercel.app/patterns/react-patterns/hooks-pattern)
- [Documentação do react](https://legacy.reactjs.org/docs/render-props.html)
