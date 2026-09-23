---
title: "Leitura - Livro building micro frontends"
resume:
date: 2026-09-23 08:20:03
image:
category: Geral
---

Hoje vou dar início ao meu primeiro artigo trazendo aprendizados sobre uma leitura.Eu não costumo/nunca fui a pessoa que estuda por livros. Minha preferência sempre foram cursos e no máximo artigos. Porém, esse ano decidi fazer algumas leituras tech visando o crescimento da minha carreira.

![Capa do livro building microfrontends](/assets/img/livro-mfe.jpg)

O primeiro livro de 2026 veio sob demanda em um momento onde eu estava como chapter frontend e precisava tomar uma decisão sobre usar ou não microfrontends em um projeto da empresa onde trabalho, a Aarin.Foi um momento onde todos estavam falando sobre o tema e que o futuro era MFE, mas eu queria tirar minhas próprias conclusões, foi então que fiz a leitura do livro Building Micro-frontends. Irei listar alguns aprendizados que tive com esse livro, mas com certeza o maior deles foi descobrir que eu já trabalhava com um MFE, só não sabia... Pois, existem diversas formas de construir um MFE e não existe certo ou errado.

### O que aprendi

#### MFE Horizontal x MFE Vertical

Esse com certeza era um dos conceitos mais importantes de se entender quando começamos a estudar sobre microfrontends.De maneira bem resumida, pense que quando trabalhamos com microfrontends horizontais temos 2 ou mais microfrontens existindo em tela ao mesmo tempo, conforme a imagem abaixo.

Já quando trabalhamos com microfrontends verticais temos apenas 1 microfrontend sendo exibido em tela por vez. Pra esse caso é muito comum ser um MFE por url.
Eu trabalho com um MFE nesse estilo, baseado em "rotas" ou DNS.

![Microfrontends horizontais e verticais](/assets/img/horizontal-vertical.png)

#### Composição de um Microfrontend

Esse é bem simples de entender, é basicamente em que lugar iremos fazer a montagem das "peças de lego", onde cada MFE é uma dessas peças.
Nós podemos ter a composição client side, server side ou edge side.
Na composição client side basicamente um código javascript vai ser executado no computador do cliente e vai montar a visão do MFE.

Na composição server side vai ser bem parecido, a diferença é que a montagem vai acontecer no servidor e o usuário vai receber o MFE pronto.

E a composição edge side, ou composição na borda, vamos ter uma ferramenta como um cloudfront ou cloudflare definindo quando e quais MFEs devem ser entregues para o usuário.

![Microfrontends tipos de composição](/assets/img/mfe-composition.png)

#### Comunicação entre MFEs

Existem diversas formas de comunicar dois microfrontends.
Podemos nos comunicar via custom events do navegador, uma abordagem bem comum.

Podemos nos comunicar via pub/sub, que é bem semelhante a comunicação via custom events.

![Microfrontends comunicação via eventos](/assets/img/mfe-communicate-1.png)

Podemos nos comunicar via localstorage,sessionstorage e cookies. Sendo bem comum utilizar cookies para transitar tokens etc entre os MFEs.

![Microfrontends comunicação via storage](/assets/img/mfe-communicate-2.png)

Podemos nos comunicar via query string.

![Microfrontends comunicação via query string](/assets/img/mfe-communicate-3.png)

Todas essas formas são válidas e vão resolver problemas especificos. O que eu mais vi e mais utilizei foram custom events + storage do navegador + query string.

#### Existem várias formas de fazer um MFE

Eu já tinha mexido com MFE em outros momentos, mas não sabia que era um MFE... Isso porque eu não tinha muito bem os conceitos bem claros na minha mente.
Mas é basicamente uma aplicação sendo executada dentro de outra aplicação.
Quando usamos o iframe do google maps em nossos projetos, de certa forma, estamos usando um microfrontend.
Você pode projetar um microfrontend via rotas/urls, via libs, via iframe ou via ferramentas que organizam códigos JS de forma remota na estrutura de um MFE como é o caso do Module Federation ou Single SPA.

#### Arquitetura de decisão

Por fim, aprendi sobre um processo chamado arquitetura de decisão para MFEs.Ela consiste basicamente em antes de iniciar um MFE definir os pontos abaixo:

1. Tipo de MFE: Horizontal ou Vertical
2. Forma de composição: Client, Server ou Edge
3. Forma de comunicação entre os MFEs: Events, pubsub? Não vai existir?

![Microfrontends arquitetura de decisão](/assets/img/mfe-decision.png)

### Conclusão

Após essa leitura meu maior ganho foi ter conseguido conhecimento e confiança o suficiente para utilizar e falar sobre MFE no meu dia a dia. Aqui eu só trouxe um resuminho de algumas coisas, mas não é nem a ponta do iceberg... Talvez, em outros momentos eu me aprofunde sobre determinados temas que vi no livro que tem mais de 300 páginas de muito conteúdo.

Uma coisa interessante pra compartilhar é que depois da leitura desse livro eu tive insumos o suficiente para utilizar a estrutura de MFE horizontais para fazer uma migração de um sistema legado com o padrão strangler.

É isso, obrigado por chegar até aqui e até a próxima!!
