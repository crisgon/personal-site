---
title: "Gerando OG:Images dinâmicas com NEXT JS 13"
resume:
date: 2023-08-18 08:20:03
image:
category: Geral
---

Você provavelmente já deve ter compartilhado um link nas N redes sociais e percebido que algumas informações de pré-visualização são carregadas. Título, descrição e até mesmo uma imagem, exatamente como no exemplo abaixo.

<img src="/assets/img/og-image-cristiano.png" alt="Og image twitter" width="550px" >

Também pode ter acontecido um cenário onde o link compartilhado não carregou nada... 🥲

![Og image twitter](/assets/img/without-og-image.png)

O papel de carregar e exibir um preview do conteúdo compartilhado é de uma tecnologia chamada open graph, popularmente conhecida como og.

## O que é Open Graph?

Open graph é um protocolo de internet que foi criado pelo facebook em 2010 para permitir que qualquer site possa transmitir um conjunto de metadados que podem ser utilizados por redes sociais para tornar o compartilhamento de links mais ricos e amigáveis.

> O protocolo Open Graph permite que qualquer página da Web se torne um objeto rico em um gráfico social. Por exemplo, isso é usado no Facebook para permitir que qualquer página da web tenha a mesma funcionalidade que qualquer outro objeto no Facebook.
> [fonte](https://ogp.me/)

No fim das contas, o que vamos ter são algumas tags html que representam uma longa lista de informações que vão ser utilizadas pelas redes sociais de acordo com o tipo de conteúdo.

Se você inspecionar o código head do meu site, ou de qualquer outro, vai encontrar algumas tags como abaixo:

```html
<meta
  content="Gerando OG:Images dinâmicas com NEXT JS 13  | Cristiano Gonçalves"
  property="og:title"
/>
<meta content="article" property="og:type" />
<meta
  content="https://www.cristiano.dev/blog/2023-08-12-gerando-og-images-com-next-js"
  property="og:url"
/>
<meta
  property="og:image"
  content="https://www.cristiano.dev/api/og?title=2023-08-12-gerando-og-images-com-next-js"
/>
```

Essas são as tags obrigatórias e que irão ser responsáveis por gerar aquele card bonitinho que mostrei no inicio do texto.

- **og:title:** o título da página, geralmente colocamos o mesmo título do `<title> </title>`.
- **og:type:** o tipo do conteúdo da sua página.No caso do meu blog o type é article, mas você pode usar um tipo genérico chamado website.
- **og:url:** a url da página atual.
- **og:image:** o link de uma imagem de alta resolução que represente o seu conteúdo.

Agora você já sabe pra que serve o open graph, mas antes de colocar a mão na massa preciso falar um pouco sobre os dois serviços que vamos utilizar para gerar as imagens:

- [@vercel/og](https://www.npmjs.com/package/@vercel/og) para projetos não usam o padrão `"/app"` do next.
- [edge-functions](https://vercel.com/docs/concepts/functions/edge-functions).

O primeiro é um pacote responsável por gerar uma imagem com base em um template e o segundo é um serviço cloud que permite que funções sejam executadas do lado do servidor de maneira extremamente rápida e econômica, pois o servidor responsável por executar a função é sempre o mais próximo do usuário.

_As duas ferramentas são disponibilizadas pela [vercel](https://vercel.com/)_, a criadora e mantenedora do next.

## Gerando imagens dinâmicas

Caso esteja utilizando o padrão `/pages` do next você precisará instalar o `@vercel/og` como dependência do seu projeto:

```bash
npm i @vercel/og
```

Logo após você precisa gerar um endpoint de api no next, criando o arquivo `app/og/route.tsx` se você estiver utilizando o next 13 ou o arquivo `pages/api/og.tsx` para versões inferiores a 13.

A primeira coisa que você precisa fazer no seu arquivo é importar o `ImageResponse`, no meu caso a importação vem `next/server`, mas para usuários do padrão `/pages` a importação vem do `@vercel/og`

```tsx
import { ImageResponse } from "next/server";
```

Na sequência vamos indicar para a vercel que queremos executar nossas funções utilizando o runtime das edge functions.

```tsx
export const runtime = "edge";
```

#### O próximo passo é escrever o trecho principal do nosso código, um método GET, que irá:

- Resgatar o `title` da nossa página, que será passado como parâmetros da url, utilizando o `searchParams`. Esse título será usado para gerar a imagem após ser passado como um query params em uma chamada assim: <small>`https://seusite.com/og?title=titulo-da-sua-pagina`</small>

- Construir o template usando o `ImageResponse`. Esse template tem algumas [limitações de estilização](https://github.com/vercel/satori#css), mas nada que impeça a criação de um layout bonito.

Nesse momento seu código deve ser mais ou menos assim:

```tsx
import { ImageResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get("title") ?? null;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#111",
            fontSize: 32,
            color: "#fff",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          <div style={{ marginTop: 40, width: 500, color: "#ea580c" }}>
            {title}
          </div>
          <div style={{ fontSize: 20, marginTop: 20 }}>Cristiano Gonçalves</div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
```

Se tudo ocorreu bem, você pode a acessar a url <small>`http://locahost:3000/og?title=titulo-da-sua-pagina`</small> você vai receber um resultado mais ou menos assim:

![Og image example](/assets/img/og-image-example.png)

## Utilizando as imagens geradas dinamicamente

Agora que as imagens estão sendo geradas basta fazer uso nas suas páginas, no meu caso eu utilizei o `generateMetadata` do next para gerar e inserir metadados em cada página do meu site.

No exemplo abaixo tem muita informação, mas foque nas linhas iniciais onde eu faço uma chamada na api para gerar uma imagem e logo na sequência faço uso no objeto openGraph.

```tsx
export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  const featuredImage = `https://www.cristiano.dev/api/og?title=${post?.title}&date=${post?.formattedDate}`;
  const description = post?.resume ?? "";
  const url = `https://www.cristiano.dev/blog/${params.slug}`;
  const title = `${post?.title} | Cristiano Gonçalves`;
  const author = "Cristiano Gonçalves";

  return {
    title,
    description,
    openGraph: {
      url,
      images: featuredImage,
      title,
      description,
      type: "article",
      authors: author,
    },
    category: "technology",
    themeColor: "black",
    twitter: {
      site: url,
      images: featuredImage,
      title,
      description,
      card: "summary_large_image",
      creator: author,
    },
  };
}
```

## Isso é tudo, pessoal!

Fico feliz que você chegou até aqui e espero que tenha aprendido algo novo ao longo dessa leitura.
Você pode ver uma aplicação real do que vimos nesse post no repositório do [meu site](https://github.com/crisgon/personal-site).

Qualquer duvida é só me procurar nas redes sociais ou deixar um comentário aqui em baixo.
