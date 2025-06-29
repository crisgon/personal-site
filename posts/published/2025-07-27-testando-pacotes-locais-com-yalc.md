---
title: "Testando pacotes locais com Yalc"
resume:
date: 2025-07-27 08:20:03
image:
category: Geral
---

Nos últimos anos sempre que precisei testar alterações em pacotes locais eu recorria ao npm link. Até então essa abordagem sempre me atendeu e acredito que essa ainda é a solução mais adequada para a maioria dos casos. Porém, na última semana esbarrei com um cenário que me fez procurar alternativas ao simples link do pacote.

### O problema

Estava desenvolvendo um pacote npm que seria utilizado por diversos projetos e para garantir o funcionamento por completo eu tinha que testar o pacote em todos os projetos. Porém, o fluxo de trabalho se tornou algo bastante moroso... Estava funcionando assim:

1. Executava o build no pacote npm e fazia o npm link
2. Abria o projeto A, B, C e D e executava o npm link
3. Se surgia a necessidade de alteração no pacote npm eu precisava refazer o link em todos os projetos

Só esse ponto já era o suficiente para que eu buscasse algo que facilitasse o meu trabalho, porém encontrei outro agravante.

Ao executar o link surgiram problemas relacionados a múltiplas instâncias do react + react-dom.

```text
Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.
```

Esse problema ocorre, pois o pacote local tem um `node_modules` próprio e no momento em que fazemos o link passamos a ter duas instâncias do react, quebrando a regra do React de que só pode haver **uma instância única do React em runtime**. Para resolver esse problema podemos executar o link no `react` e no `react-dom`, para garantir que **a mesma instância** seja usada por todos os projetos.

```bash
# Vá para o seu pacote local
cd MEU_PACOTE_LOCAL
npm link
npm install

# Linkar a instância de react e react-dom do seu projeto principal
cd node_modules/react
npm link
cd ../react-dom
npm link

# Vá para o seu projeto principal
cd PROJETO_A
npm link MEU_PACOTE_LOCAL
npm link react
npm link react-dom
```

A abordagem acima resolve o problema, mas esse é um tipo de problema que só acontece em desenvolvimento e que também gera um trabalho manual em cada projeto que eu precisar testar o pacote. É aí que entra o uso do yalc.

### Vamos a solução

Antes de falar como o yalc funciona eu preciso falar um pouco mais sobre o funcionamento npm link. O npm link cria links simbólicos (atalhos/apontamentos) entre os `node_modules` e não faz nenhuma alteração no `package.lock`. Ou seja, não temos algo perto do mundo real, pois qualquer tipo de atualização no nosso node_modules (`npm i`) fará com que o link seja perdido.

No exemplo abaixo temos a seguinte situação.

1. Na direita o pacote local com o npm link entre 2 projetos.
2. Na esquerda o mesmo projeto sofreu uma atualização e não temos o link dessa nova versão entre os projetos. O que exige que um novo npm link seja executado em todos os projetos.

![Npm link flow](/assets/img/npm-link-flow.png)

### Como o yalc funciona

O yalc funciona com gestão de arquivos locais. Ao contrário do npm link, com o yalc não tenhos nenhuma manipulação no nosso node_modules. Ao publicar nossa lib o yalc faz o armazenamento em um repositório local, geralmente na pasta ~/.yalc, e em todos os projetos que o consomem temos uma referência entre arquivos.

No nosso package.json teremos algo assim na nossa listagem de dependências:

```json
"dependencies": {
 "MEU_PACOTE_LOCAL": "files:.yalc/MEU_PACOTE_LOCAL",
 ... outras dependências
}
```

Além disso, uma pasta `.yalc/MEU_PACOTE_LOCAL` e um arquivo `yalc.lock` serão criados para cuidar da gestão do pacote.

![Estrutura yalc](/assets/img/yalc.png)

A estrutura do yalc é algo semelhante à imagem abaixo. Onde temos o pacote publicado globalmente sendo distribuído para todos os projetos que fazerem uso do mesmo.

![Yalc flow](/assets/img/yalc-flow.png)

### Utilizando o yalc

Para publicar um pacote com yalc é muito simples. Inicialmente precisamos ter o yalc instalado globalmente com:

```bash
 npm i yalc -g
```

Tendo o pacote instalado navegue até seu projeto, faça o build e execute o comando para publicá-lo:

```bash
cd MEU_PACOTE_LOCAL
npm run build
yalc publish
```

Agora vá ao projeto que deseja fazer uso do seu pacote e o adicione:

```bash
cd MEU_PROJETO
yalc add MEU_PACOTE_LOCAL
```

Com o pacote linkado você pode prosseguir tranquilamente com o seu fluxo de trabalho, instalando quantas dependências forem necessárias e fazendo `npm install` sem perder o link com seu pacote local.

Se precisar atualizar sua lib com um simples comando, você propaga todas as mudanças aos projetos que estiverem fazendo uso.

```bash
cd MEU_PACOTE_LOCAL
npm run build
yalc push
```

E para remover o pacote basta executar `yalc remove MEU_PACOTE_LOCAL` na raiz do seu projeto.

### Devo usar o yalc sempre?

Para grande maioria dos casos um simples `npm link` já resolve seu problema. Opte por utilizar o `yalc` se precisar fazer a gestão desse pacote em múltiplos projetos localmente ao mesmo tempo, e se quiser ter algo o mais próximo da versão de produção.

### Muito obrigado!!

Obrigado por ter chegado até aqui!

Espero que tenha aprendido algo novo ao longo dessa leitura.

### Referências

[Yarn link: invalid hook call](https://andreaswilli.github.io/wiki/yarn-link-invalid-hook-call)

[Github - Yalc](https://github.com/wclr/yalc)

[yalc: Melhor que o npm link para desenvolver plugins e componentes front-end](https://www.cnblogs.com/ygunoil/p/14870542.html)
