---
title: "Padrões React: Higher-Order Components"
resume:
date: 2023-08-30 08:20:03
image:
category: Geral
---

Fala, galera! Esse artigo faz parte de uma série focada em padrões do React. Recomendo dar uma conferida no último post sobre o padrão [container & presentational](https://www.cristiano.dev/blog/2023-08-23-react-patterns-container-presentational).

Hoje iremos falar sobre um padrão que segundo a própria documentação do React não é um padrão utilizado com frequência no desenvolvimento de aplicações modernas.

![Print da documentação do react falando sobre hocs](/assets/img/hoc-unused.png)

Porém, ao longa sua carreira você não vai se deparar apenas com código que utiliza a última versão do React ou aquela tecnologia super em alta que todo mundo tá falando... Você vai encontrar muito código que foi construído quando as soluções disponíveis eram outras. Por isso é importante aprender alguns padrões mais antigos, mesmo que você não os utilize com frequência.

O padrão que iremos abordar é o [Higher-Order Component](https://pt-br.legacy.reactjs.org/docs/higher-order-components.html), ou apenas HOC. Um padrão que você provavelmente já usou, ou passou por projetos que já utilizaram e eu posso provar...

- Você já utilizou alguma lib que tinha uma sintaxe assim `export default withTheme(App)`?
- Ou assim `export default withRouter(Header)`?
- E assim `connect()(Meu componente)`?
- Já esbarrou em qualquer trecho de código React que utilizava o `withAlgumaCoisa(MeuComponent)`?

Se a resposta pra alguma das perguntas foi sim, então você já teve contato com um HOC. Se a resposta for não, chegou o momento de usar um HOC.

### O que é um Higher-Order Component

É importante saber que HOC não faz parte da api do React, ele é apenas um padrão que faz uso da [composição](https://pt-br.legacy.reactjs.org/docs/composition-vs-inheritance.html) disponível no React.

Os Higher-Order Component são baseados nas [Higher Order Functions](https://www.alura.com.br/artigos/high-order-functions), um padrão de desenvolvimento que é comumente aplicado no javascript.

> Uma Higher Order Function, ou função de primeira classe, é apenas uma função que pode receber uma função como argumento e retornar outra função.

**No React todos os componentes são funções**, então a lógica é a mesma. Um component de ordem superior é apenas um component que recebe um component e retornar outro component. Antes de retornar o novo component podemos fazer verificações(uma autenticação, por exemplo) e/ou executar qualquer trecho de código que quisermos.

Essa história de receber componente e retornar componente ficou confusa? Não se preocupe, pois chegou a hora da prática.

### Criando um HOC

Vamos criar nosso primeiro HOC que terá o objetivo de buscar as permissões de um usuário na api e repassar essa informação para um component de comentários. Com base nessas permissões iremos exibir ou não um botão de apagar comentário.

![Lista de comentários](/assets/img/hoc-example.png)

#### A implementação do HOC fica assim:

```jsx
function withPermissions(WrappedComponent, userId) {
  function ComponentWithPermissions(props) {
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
      const userPermissions = getUserPermissions(userId);
      setPermissions(userPermissions);
    }, []);

    return (
      <WrappedComponent {...props} permissions={permissions} userId={userId} />
    );
  }
  return ComponentWithPermissions;
}

// Função que faz o papel de uma chamada na api que retorna as permissões do usuário
function getUserPermissions(userId) {
  const userListPermissions = {
    1: ["read"],
    2: ["read", "delete"],
  };

  return userListPermissions[userId];
}
```

Esse foi nosso HOC(a função `withPermissions`), e nele recebemos 2 argumentos. O primeiro é componente que queremos tratar(encapsular com uma lógica) e o segundo é o id de um usuário qualquer.
Dentro do HOC declaramos um novo componente(`ComponentWithPermissions`) que será responsável por buscar as permissões na api e depois repassar essas permissões para o component que foi recebido como argumento. No nosso caso eu repassei todas as propriedades padrões do component usando `{...props}` e adicionei duas novas props chamadas `permissions` e `userId`. No final da função `withPermissions` nosso component `ComponentWithPermissions` é retornado com toda lógica aplicada.

#### Para usar o HOC é bem simples, basta utilizá-lo como uma função normal passando os argumentos que ele necessita.

```jsx
const CommentsUser1 = withPermissions(CommentComponent, 1);
const CommentsUser2 = withPermissions(CommentComponent, 2);

export default function App() {
  return (
    <div className="App">
      <CommentsUser1 />

      <CommentsUser2 />
    </div>
  );
}
```

Para ficar um pouco mais claro fiz esse desenho que ilustra como um HOC e um component encapsulado funcionam juntos. Pense em uma máquina onde uma coisa entra, passa por um processo de transformação e no final sai características diferentes:

![Lista de comentários](/assets/img/hoc-desenho.png)

Para entender mais sobre o funcionamento você pode ver e editar o código que acabamos de construir:

<iframe src="https://codesandbox.io/embed/hoc-react-sdfjqk?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="HOC - React"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### Devo utilizar um HOC?

Os HOCs são uma ótima solução para manter uma lógica centralizada com a possibilidade aplicá-la para N componentes, porém esse padrão é um pouco confuso, principalmente na gestão de props que irão ser repassadas para o componente encapsulado pelo HOC.

Atualmente existem formas melhores de resolver o mesmo problema que um HOC se propões utilizando o padrão de hooks, mas esse é um papo para um próximo post.

É importante entender que apesar de não ser um padrão muito recomendado, ainda é muito comum encontrar HOCs em aplicações modernas, um exemplo clássico são os HOCs que cuidam da autenticação e autorização de usuários.

Sem contar os HOCs de libs externas como o [redux](https://redux.js.org/) que estão presentes em um imensidão de projetos react.

### Isso é tudo, pessoal!

Fico feliz que você chegou até aqui e espero que tenha aprendido algo novo ao longo dessa leitura. Em breve irei trazer mais artigos abordando outros padrões do react. Até mais!

### Referências

- [Higher-Order Components Pattern](https://javascriptpatterns.vercel.app/patterns/react-patterns/higher-order-component)
- [Documentação do react](https://legacy.reactjs.org/docs/higher-order-components.html)
