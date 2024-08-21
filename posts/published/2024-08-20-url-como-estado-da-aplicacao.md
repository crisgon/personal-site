---
title: "O poder da URL como state"
resume:
date: 2024-08-20 08:20:03
image:
category: Geral
---

Com o passar dos anos, as aplicações web se tornaram cada vez mais interativas, e controlar o estado delas virou algo essencial. Frameworks como React, Vue e Angular ganharam popularidade porque facilitam a gestão de estados complexos. Um simples useState, por exemplo, já nos dá total controle sobre o estado da aplicação. Mas hoje, não vou falar sobre useState ou qualquer outra solução que venha de um framework. Quero focar em um dos principais pilares da web, que sempre esteve presente em todas as mudanças e continuará sendo essencial no futuro: a URL!

_Para exemplificar o uso da URL como state de uma aplicação irei abordar exemplos utilizando o react, porém a ideia central pode ser aplicada com qualquer outro framework/lib ou usando apenas JS_.

### Sem mais delonga, vamos ao que interessa!

Você acabou de receber uma tarefa em que é necessário construir uma página com os seguintes requisitos:

- A pagina deve exibir uma listagem
- A pagina deve ter um filtro de busca que filtra os dados da tela
- A pagina deve ter um filtro de stock que filtra os dados da tela
- A pagina deve ter um filtro de status que filtra os dados da tela

![Listagem com filtros](/assets/img/lista-de-produtos.png)

Ao analisar a imagem e os requisitos da tarefa, identificamos a necessidade de pelo menos três estados apenas para controlar o que será exibido na tela. São eles:

- Estado para stock
- Estado para categoria
- Estado para busca

Até aqui nenhum problema... Podemos simplesmente definir 3 useStates e vida que segue:

```tsx

export function HomePage() {
  const [stock, setStock] = useState();
  const [category, setCategory] = useState();
  const [search, setSearch] = useState();

  ...
}

```

Sua tarefa foi finalizada, porém surgiu a necessidade de persistir os dados ao atualizar a página. Para resolver esse problema, você decide salvar as informações dos filtros no localStorage, garantindo a persistência dos dados mesmo quando a página for atualizada.

```tsx
export function HomePage() {
  const [stock, setStock] = useState(getAndParseFromLocalStorage("stock"));
  const [category, setCategory] = useState(getAndParseFromLocalStorage("category"));
  const [search, setSearch] = useState(getAndParseFromLocalStorage("search"));

  function getAndParseFromLocalStorage(key: string) {
    const data = localStorage.getItem(key);

    if(!data) return null;

    return JSON.parse(data);
  }
  ...
}
```

Algumas semanas se passaram e, além de persistir os dados ao atualizar a tela, o cliente reportou que, ao aplicar o filtro e enviar o link da tela para seus colegas de trabalho, o filtro precisa ser refeito. Isso é ruim, pois seria muito mais prático compartilhar exatamente a mesma visão que ele teve ao aplicar os filtros, como acontece quando ele pesquisa no Google e envia o link para alguém.

> [Uma pesquisa no google por vídeos com duração de 4-20 minutos sobre o que é uma URL](https://www.google.com/search?q=o+que+%C3%A9+uma+url&sca_esv=fb518e85c273ed51&sca_upv=1&tbs=dur:m&tbm=vid&sxsrf=ADLYWIKMFKUsyMV9rclKYheZyfEap7N6mA:1723198462234&tbas=0&source=lnt&sa=X&ved=2ahUKEwjD99_B1ueHAxUspJUCHdlVARQQpwV6BAgCEA0&biw=1920&bih=962&dpr=2)
>
> Ao acessar essa URL acima você vai ter acesso a mesma pesquisa que eu ou que qualquer outra pessoa.

Você já deve ter entendido que para resolver esse e os outros problemas citados anteriormentes podemos usar o poder da URL.

### Persistindo dados na URL

Antes de prosseguir é importante entender sobre a composição de uma URL.
`https://www.youtube.com/results?search_query=dance+music`

Ao analisar a url acima, podemos dividi-la em 6 partes, sendo elas:

- Protocolo (`https://`)
- Subdomínio: (`www`)
- Domínio: (`youtube`)
- Top-Level Domain: (`com`)
- Caminho do recurso: (`results`)
- Query String: (`search_query=dance+music`)

Nesse cenário, o que mais nos interessa é a query string, a parte final da URL.
Uma query string é um conjunto de `chave=valor` separado por um `=`. O trecho de query string é separado do resto da url por um `?` e podemos ter várias query strings separadas por um `&`.

Alguns exemplos de ulr com query string:

- `https://www.youtube.com/results?search_query=dance+music`
- `https://www.facebook.com/games/instantgames/category?category=248343760122557&sort_type=new_releases`
- `https://github.com/vercel/next.js/issues?page=2&q=arrow+function`

![URL explicada](/assets/img/url.png)

Para saber mais sobre a estrutura de uma URL recomendo a leitura do artigo [Anatomia de uma URL](https://ibrahimcesar.cloud/blog/anatomia-de-uma-url/).

#### Como usar a URL como state?

Nas URLs acima você pode ter notado algumas informações interessantes, como categoria selecionada ou número da página. Podemos facilmente recuperar e atualizar essas informações em nossa aplicação.

Pensando no nosso problema inicial, nossa URL poderia ficar dessa forma:
`https://www.meusite.com/pagina-da-produtos?stock=2&category=beauty&search=lipstick`

- stock=2
- category=beauty
- search=lipstick

E o nosso código ficaria assim:

```tsx
import { useSearchParams } from 'react-router-dom';

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  function submitForm(e) {
    e.preventDefault();
    const search = e.currentTarget['search']?.value;
    const category = e.currentTarget['category']?.value;
    const stock = e.currentTarget['stock']?.value;

    setSearchParams({ search, category, stock });
  }

  ....
}
```

Por fim, nossa listagem precisa capturar as informações da URL. Podemos fazer isso usando o `searchParams`, que é retornado pelo`useSearchParams()`. Ao recuperar essas informações e aplicar os filtros, nosso código ficará assim:

```tsx
import { useSearchParams } from 'react-router-dom';

export function Home() {
  const [data, setData] = React.useState([]);
  const [searchParams] = useSearchParams();
  function filterData(data) {
    let filterValues = {};

    // Populando filterValues com os parâmetros de busca
    searchParams.forEach((v, k) => {
      filterValues[k] = v;
    });

    // Se não houver nenhum filtro, retorna a lista completa
    if (Object.keys(filterValues).length === 0) {
      return data;
    }

    return data.filter((item) => {
      let isMatch = true;

      // Verificação dos filtros
      if (filterValues.category && item.category !== filterValues.category) {
        isMatch = false;
      }

      if (filterValues.stock && item.stock !== Number(filterValues.stock)) {
        isMatch = false;
      }

      if (
        filterValues['search'] &&
        !item.description
          .toLowerCase()
          .includes(filterValues['search'].toLowerCase())
      ) {
        isMatch = false;
      }

      return isMatch;
    });
  }
```

Para entender mais sobre o funcionamento você pode ver e editar o código que acabamos de construir no stackblitz. Importante ressaltar que para funcionar você deve abrir o projeto em uma nova aba.

<iframe src="https://stackblitz.com/edit/vitejs-vite-es2dfy?ctl=1&embed=1"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="render-props"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

### URL State não é bala de prata!

Como qualquer tecnologia, é importante analisar cuidadosamente antes de utilizar o URL State.

Aqui estão alguns casos em que o URL State pode ser útil:

- Cenários em que precisamos manter a persistência de filtros ou estados entre o histórico de navegação.
- Situações em que compartilhar a URL com filtros ou estados aplicados é uma exigência.
- Cenários em que é necessário um bom SEO e onde diversos estados de uma aplicação precisam ser indexáveis.

Por outro lado, existem cenários em que o uso do URL State pode não ser a melhor alternativa. Alguns exemplos são:

- Quando o estado é muito grande e complexo. As URLs são ótimas para informações simples, mas se você precisa armazenar um estado complexo, com vários níveis de aninhamento, a URL não é a melhor opção.
- Quando o estado contém dados sensíveis. Nesses casos, para garantir a segurança e a privacidade, não é aconselhável expor essas informações na URL.

Além desses pontos, é importante ter cuidado com o uso excessivo do URL State. Dependendo de como a URL é manipulada, pode haver impacto no desempenho da aplicação, especialmente se o estado for muito grande ou precisar ser processado frequentemente. Em alguns casos, cada alteração na URL pode causar a rerenderização de toda a cadeia de componentes, como no React, por exemplo.

Na maioria dos casos, você não precisará usar a URL como state. Analise cuidadosamente cada cenário antes de adicionar estado às suas URLs, pois, apesar dos benefícios, há desvantagens a serem consideradas, além do custo de manutenção.

### Muito obrigado!!

Obrigado por ter chegado até aqui!

Espero que tenha aprendido algo novo ao longo dessa leitura.

Até a próxima!
