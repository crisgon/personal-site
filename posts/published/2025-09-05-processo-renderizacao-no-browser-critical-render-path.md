---
title: "Entendendo renderização no browser: Critical Render Path"
resume:
date: 2025-09-05 08:20:03
image:
category: Geral
---

Hey, esse artigo faz parte de uma série sobre renderização no browser. Se você ainda não leu os artigos passados, da uma conferida nos links abaixo:

- [Entendendo renderização no browser: DOM](https://www.cristiano.dev/blog/2024-09-17-processo-renderizacao-no-browser)
- [Entendendo renderização no browser: CSSOM](https://www.cristiano.dev/blog/2024-09-26-processo-renderizacao-no-browser-cssom)
- [Entendendo renderização no browser: Como o DOM é gerado?](https://www.cristiano.dev/blog/2024-09-26-processo-renderizacao-no-browser-como-o-dom-e-gerado)
- [Entendendo renderização no browser: Layout e Paint](https://www.cristiano.dev/blog/2025-02-20-processo-renderizacao-no-browser-layout-paint)
- [Entendendo renderização no browser: Reflow e Repaint](https://www.cristiano.dev/blog/2025-09-02-processo-renderizacao-no-browser-repaint-reflow)

![Browser flow](/assets/img/crp.png)

Ao longo dos últimos artigos, nós abordamos diversas etapas do processo de renderização do navegador e, indiretamente, você já foi apresentado ao Critical Render Path (CRP). A tradução de CRP seria algo como “caminho crítico para renderização”. O nome é bem sugestivo: ele se refere a todo o processo que o navegador precisa executar até o primeiro pixel ser exibido em tela.

De forma simplificada esse processo é composto pelas macro etapas abaixo:

- DOM
- CSSOM
- Render tree
- Layout
- Paint

<!-- ![Browser flow](/assets/img/browser-flow.png) -->

Esse processo de renderização pode acontecer várias vezes, à medida que interações e recursos que afetam a página ficam disponíveis. O navegador pode realizar o processo por completo ou apenas parte dele, como vimos com reflow e repaint.

### Por que “Critical”?

Você já entrou em um site e teve uma tela branca por um longo período de tempo antes de ter acesso ao conteúdo?

Esse problema pode estar ligado ao tráfego de dados, mas também a uma má otimização da renderização do seu site. E isso é algo extremamente crítico, já que pesquisas indicam que os usuários costumam considerar sites que demoram mais de 3 segundos para carregar como lentos.

> 53% das visitas são abandonadas se um site para dispositivos móveis demora mais de 3 segundos para carregar.
> **Fonte: [Think with Google](https://www.thinkwithgoogle.com/consumer-insights/consumer-trends/mobile-site-load-time-statistics/)**

Outro ponto importante é o SEO da página, pois a velocidade da página é importante para o ranqueamento nos mecanismos de buscas, pois o google utiliza [métricas de web vitals](https://developers.google.com/search/docs/appearance/core-web-vitals?hl=pt-br) na classificação das páginas.

### Rede X CRP

Antes de continuar com o CRP, é preciso entender que existe uma diferença entre carregamento de recursos e renderização de conteúdo.
A primeira pergunta que me fiz ao começar a estudar sobre CRP foi: “O recebimento dos bytes do HTML etc. não faz parte do CRP?”. E a resposta é: não diretamente!
Não, pois o CRP se refere apenas ao trabalho executado pelo navegador, independentemente da rede. Podem existir cenários em que os recursos são carregados rapidamente devido a uma alta velocidade de banda, mas o CRP é extremamente demorado.

Em resumo, a rede não afeta o CRP, mas define quando os processos que o compõem vão ser iniciados. Isso ficará mais claro quando a gente falar sobre recursos bloqueantes!

### Recursos que fazem parte do CRP

O navegador precisa aguardar o download de alguns recursos antes de finalizar a renderização inicial. Esses recursos são:

- Partes do HTML
- CSS bloqueante (no elemento `<head>`)
- JS bloqueante (no elemento `<head>`)

Para a renderização inicial, o navegador não espera por:

- HTML completo
- Fontes
- Imagens
- JS não bloqueante
- CSS não bloqueante

> O navegador não precisa aguardar por todo o HTML para iniciar a renderização, pois ele processa o HTML de forma contínua. Assim, à medida que recebe qualquer trecho de HTML, ele já começa a processá-lo.

### Recursos bloqueantes

![Browser waiting for html and css](/assets/img/navegador-esperando.png)

O navegador considera alguns recursos críticos a ponto de travar a renderização da página até que sejam processados. O CSS faz parte desse grupo seleto de recursos. Sempre que o navegador encontra um CSS inline, em uma tag `<style>` ou em um link externo, ele interrompe a renderização até que o processamento de todo o CSS seja concluído.

> Por padrão, o CSS é um recurso bloqueante, mas o atributo media pode transformá-lo em não bloqueante. Um CSS com media="print" não vai bloquear a renderização da visualização padrão.

Geralmente, as folhas de estilo são essenciais para evitar aquela sensação de “piscar” na tela para o usuário. Se toda a renderização fosse concluída sem o CSS, o primeiro contato que você teria com a página seria algo mais ou menos como na imagem abaixo.

Lembre-se de que o CSS não é responsável apenas por criar um design incrível, mas também por realizar tarefas mais básicas, como posicionamento dos elementos, definição de larguras etc.

![Page without css](/assets/img/without-css.png)

> Nem todo CSS da sua aplicação vai ser considerado critica pelo navegador. Apenas o css necessário para renderização do primeiro conteúdo que o usuário vai ter contato, esse conteúdo é conhecido como "above the fold".

### Cuidados para manter um bom CRP

Encurtar o Critical Rendering Path (CRP) é fundamental, pois ele define a primeira impressão que o usuário terá ao acessar o site.
Você pode melhorar a velocidade de carregamento controlando bem os recursos críticos e não críticos.

Adie o download do que não for essencial utilizando async ou defer, remova arquivos desnecessários e, sempre que possível, coloque os scripts no final do body. Para recursos importantes, utilize preload.

Além disso, comprima suas imagens e arquivos CSS, aplique lazy loading em imagens e reduza o número de dependências externas que podem atrasar a renderização do conteúdo.

### Conclusão

Entender todo o fluxo de trabalho do navegador é importante para conseguir compreender bem os problemas que o desenvolvimento frontend oferecem ao longo do dia, o contexto do desenvolvimento web, conhecer html, css, javascript e como o navegador funciona é essencial. Com essa base sólida, você vai conseguir aprender qualquer tecnologia que derive desses fundamentos.

### Muito obrigado por ter chegado até aqui!

Espero que tenha aprendido algo novo ao longo desses 6 artigossérie sobre o funcionamento do browser, pois eu aprendi bastante!

Vejo você nos próximos estudos que faremos!

### Referências

[Caminho de renderização crítico](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Critical_rendering_path)

[Optimizing The Critical Rendering Path](https://www.debugbear.com/blog/optimizing-the-critical-rendering-path)

[What is Critical Rendering Path?](https://dev.to/betelgeuseas/what-is-critical-rendering-path-3k73)
