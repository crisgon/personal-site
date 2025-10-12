---
title: Entendendo affordance na prática
resume:
date: "2018-09-19 13:41:00"
---

Artigo inicialmente publicado no blog da [Training Center](https://medium.com/trainingcenter/entendendo-affordance-na-pr%C3%A1tica-f41ec34dff2)

<figure>
  <img src="/assets/img/door-gif.webp" alt="Um personagem de desenho animado abrindo várias portas." />
  <figcaption>Um personagem de desenho animado abrindo várias portas.</figcaption>
</figure>

Se você, assim como eu, trabalha ou já trabalhou com desenvolvimento de interfaces, mas não tem conhecimentos sobre UX, provavelmente você já aplicou affordance em seus projetos de forma inconsciente.

Um bom entendimento sobre affordance é muito importante para progredir nos demais conceitos relacionados a UX, porém, antes de entendermos o seu significado precisamos deixar bem claro as diferenças entre UX e IHC, já que o affordance se faz presente nas duas disciplinas.

### Diferença entre UX e IHC

De forma bem resumida, a UX ( User Experience ) se trata da experiência do usuário em qualquer cenário, não tratando apenas da interação com um serviço/produto, mas sim com todo o relacionamento. Enquanto a IHC é algo menos abrangente, tratando-se apenas da interação computacional, seja por meio de um sistema ou até mesmo com o uso de algum periférico. Vale lembrar que UX sempre vai estar presente no IHC, já o contrário só acontece em casos onde temos um celular ou computador envolvido.

Um exemplo onde temos apenas UX seria um bom atendimento em uma loja de sapatos e por fim a satisfação com a beleza e o conforto do mesmo. Uma experiência que começou antes mesmo do contato com o produto.

Um exemplo onde temos IHC seria a interação de um jogador com o kinect. Nesse caso a experiência do usuário está diretamente ligada a interação com uma máquina.

### Mas o que é <del>Afrodite</del> Affordance??

O termo affordance foi criado pelo psicólogo James Gibson e, inicialmente, foi pensado apenas para o mundo real, mas depois o conceito foi incorporado ao mundo digital no livro “O Design do Dia-a-Dia”, do Donald Norman. A palavra affordance é um termo inglês que não tem uma tradução concreta para o português, mas pode ser traduzido como “reconhecimento” ou “oportunidade”. De forma prática, Affordance é a capacidade que um objeto ( ou parte de uma interface ) ser reconhecido e utilizado exatamente da maneira que foi projetado, mas sem a necessidade de uma explicação prévia. Um dos exemplos mais clássicos é o da maçaneta de uma porta, pois não precisamos de uma explicação para saber que ao girá-la podemos abrir a porta. Outro exemplo bem comum no nosso dia-a-dia é a tampa de uma garrafa, onde giramos intuitivamente a tampa para abrir a garrafa.

Um affordance também pode se baseado em experiências anteriores, como é o caso do ícone de disquete para salvar documentos, ou o texto azul e sublinhado indicando um [link](https://pt.wikipedia.org/wiki/Affordance).

<figure>
  <img src="/assets/img/macaneta.webp" alt="Maçaneta de uma porta." />
  <figcaption>Maçaneta de uma porta.</figcaption>
</figure>

<figure>
  <img src="/assets/img/elevador.webp" alt="Botões de subir e descer de um elevador." />
  <figcaption>Botões de subir e descer de um elevador.</figcaption>
</figure>

Temos affordances em diversos lugares do nosso cotidiano, então vou deixar mais alguns exemplos que podem ajudar no entendimento.

<figure>
  <img src="/assets/img/macaneta-carros.webp" alt="Maçaneta da porta do carro." />
  <figcaption>Maçaneta da porta do carro.</figcaption>
</figure>

<figure>
  <img src="/assets/img/creme-seda.webp" alt="A tampa de um creme para cabelo também é um affordance." />
  <figcaption>A tampa de um creme para cabelo também é um affordance.</figcaption>
</figure>

### Como categorizar?

O uso de affordance nas interfaces é de extrema importância, pois as pessoas se sentem mais confortáveis ao encontrar padrões que elas conhecem. Existem diversos tipos de affordances, alguns deles são:

- Explícito
- Convencional/Padrão
- Oculto/Escondido
- Metafórico

### Affordance Explicito

Esse é um dos mais fáceis de reconhecer, pois ele geralmente é acompanhado de um texto indicando exatamente o que o usuário deve fazer. Alguns exemplos seriam um botão de “Comprar com 1 clique” ou “Scroll down”.

<figure>
  <img src="/assets/img/click-amazon.webp" alt="Botão de comprar com 1 clique da Amazon." />
  <figcaption>Botão de comprar com 1 clique da Amazon.</figcaption>
</figure>

<figure>
  <img src="/assets/img/scroll-down.webp" alt="O “Scrool down” também é um affordance." />
  <figcaption>O “Scrool down” também é um affordance.</figcaption>
</figure>

### Affordance Convencional/Padrão

Esse é um affordance comum, ele é baseado em experiências anteriores dos usuários. Como é o caso desse [link](https://www.youtube.com/watch?v=dQw4w9WgXcQ), que reconhecemos pelo sublinhado.

### Affordance Oculto

Esse é um affordance que pode ser muito perigoso de se usar, pois o mesmo só aparece por completo quando existe algum evento que o ative, como a interação do usuário. Geralmente ele é utilizado para diminuir a complexidade de uma interface, porém pode tornar a interface difícil de usar se o público não está acostumado com aquele affordance. Um exemplo é o menu dropdown, que só mostra seu conteúdo quando passamos o mouse por cima de um itens do menu. As notificações do facebook ou youtube, que só são reveladas quando clicamos no ícone referente às notificações, também são exemplos de affordance oculto.

<figure>
  <img src="/assets/img/menu.bin" alt="Menu com dropdown é um affordace oculto." />
  <figcaption>Menu com dropdown é um affordace oculto.</figcaption>
</figure>

### Affordance Metafórico

Esse affordance usa de objetos do mundo real como metafóras para auxiliar no entendimento da interface. A muito tempo atrás o design skeumófico usava muito desse artifício. Hoje em dia esse tipo de design não é tão usual, porém o uso da affordance com metáforas continua a todo vapor.

<figure>
  <img src="/assets/img/ios-affordance.webp" alt="Icones do IOS com affordance metafóricas." />
  <figcaption>Icones do IOS com affordance metafóricas.</figcaption>
</figure>

### Aplicando affordance em projetos existentes

Sempre construí minhas aplicações achando que estava fazendo tudo certinho. Mas só precisei estudar um pouco de affordance pra começar a achar vários defeitos que parecem simples, que acabaram passando despercebido e prejudicando a experiência do usuário.

Agora que sei que fiz muita coisa errada até aqui, separei 3 projetos meus para ir fazendo mudanças de usabilidade durante os meus estudos sobre UX. Nessa caminhada eu estou sendo mentorado pela [Livia Gabos](https://x.com/liviagabos)(encontrei ela no [mentoria](https://github.com/training-center/mentoria) do training center :D), a qual me incentivou a compartilhar esse processo escrevendo artigos como esse.

Se você já quer ver o resultado final, é só dar uma conferida nesse [repositório](https://github.com/crisgon/Ux-Experiments). Nele que vou colocar todas as mudanças de usabilidade encontradas em cada etapa dos estudos.

<figure>
  <img src="/assets/img/projeto-affordance-1.gif" alt="Aplicação antes do inicio dos estudos de UX" />
  <figcaption>Aplicação antes do inicio dos estudos de UX</figcaption>
</figure>

Esse é o gif do primeiro projeto que resolvi mudar, o [vue-cart](https://crisgon.github.io/vue-cart/dist/#/). A princípio parece não ter nada errado, porém vou listar alguns problemas pra deixar as coisas mais claras.

- Os cards não possuem nenhuma indicação visual de que estão “selecionados”
- Os cards e as imagens não são clicáveis, forçando o usuário a clicar no nome do produto para ver a página do mesmo.
- O botão “Add to cart” não tem nenhuma indicação visual de que está com o foco.
- Os links do menu não tem nenhuma indicação visual de que estão com foco.

Não conseguiu perceber apenas com o gif? Então faz o teste ao vivo clicando [aqui](https://crisgon.github.io/vue-cart/dist/#/)(esse link foi um affordance explícito).

O gif abaixo mostra o resultado depois da correção dos problemas que listei anteriormente. Você pode conferir as mudanças online no meu [repositório](https://crisgon.github.io/Ux-Experiments/Affordance/vue-cart/dist/#/).

<figure>
  <img src="/assets/img/projeto-affordance-2.gif" alt="Aplicação depois dos estudos e do uso do Affordance" />
  <figcaption>Aplicação depois dos estudos e do uso do Affordance</figcaption>
</figure>

Os problemas não pararam por ai… Os gifs abaixo são da página de checkout, consegue visualizar as falhas de usabilidade?

<figure>
  <img src="/assets/img/projeto-affordance-3.gif" alt="Página de checkout — Antes e depois da revisão do affordance." />
  <figcaption>Página de checkout — Antes e depois da revisão do affordance.</figcaption>
</figure>

<figure>
  <img src="/assets/img/projeto-affordance-4.gif" alt="Página de checkout — Antes e depois da revisão do affordance." />
  <figcaption>Página de checkout — Antes e depois da revisão do affordance.</figcaption>
</figure>

Nessa página de checkout eu tinha basicamente quatro grandes problemas:

- Os produtos da lista não eram clicáveis, isso impedia que o usuário desse uma conferida nos detalhes do produto antes de finalizar a compra.
- Não existia nenhum botão para que o usuário continuasse fazendo a compra, pra isso ele precisava se deslocar até o menu.
- O botão para exclusão de um produto da lista estava bem apagado e podia ser complicado para que alguns usuários o achassem. Ele também passava a impressão de que estava desabilitado.
- Não existia um botão para o usuário finalizar a compra.

### Isso é tudo pessoal…

No final do artigo existe o link para os outros 2 projetos para quem tiver curiosidade ir analisar e tentar descobrir quais foram os problemas de usabilidade que resolvi utilizando affordance.

### Conclusão

Vimos que affordance é a capacidade de algo ou alguma coisa ser interpretada corretamente, sem a necessidade de nenhum tipo de explicação de como ela funciona. Também vimos que o mundo real é repleto de affordances, assim como nas interfaces do mundo digital. Além disso, aprendemos que existem diversos tipos de affordances e vimos alguns exemplos práticos que reforçam a importância do seu uso para uma melhor experiência do usuário.

Antes de finalizar esse artigo quero deixar bem claro que os projetos que estou trabalhando ainda possuem inúmeros problemas de usabilidade. Porém, o foco até agora foi corrigir os problemas com affordance, assunto que acabei de concluir os estudos junto com minha mentora [Livia](https://x.com/liviagabos).

Ah, da uma conferida nos outros projetos clicando [aqui](https://github.com/crisgon/Ux-Experiments).

**Conseguiu entender o que é um affordance? Já usava alguns tipos e não sabia?**

### Referências

[Blog Homem Maquina: O que é Affordance e como projetar pensando nisso](https://www.homemmaquina.com.br/design/o-que-e-affordance/)

[Blog: Ux Design: Sobre Affordances](https://uxdesign.blog.br/affordances-df63a212d413)

[Wikipédia: Affordance](https://pt.wikipedia.org/wiki/Affordance)

[Brasil Ux Design: Ainda faz sentido usar o disquete como ícone de "salvar"?](https://brasil.uxdesign.cc/ainda-faz-sentido-usar-o-disquete-como-%C3%ADcone-de-salvar-3bd2a735025e?gi=96fe4aa18ccc)

[Blog Treina Web: Affordances: Desenhando interfaces intuitivas](https://www.treinaweb.com.br/blog/affordances-desenhando-interfaces-intuitivas/)
