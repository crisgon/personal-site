---
title: Criando um CSS do BEM - Parte 2
resume: >-
  Dando continuiade aos estudos com BEM, hoje vamos ver alguns detalhes sobre organização de arquivos seguindo essa metodologia.
date: "2018-03-02 13:41:00"
image: assets/img/frustrated_man.jpg
category: CSS
tagColor: "#8e44ad"
---

# Criando Um CSS Do BEM - Parte 2

Na [parte 1](https://www.crisgon.dev/criando-um-css-do-bem-parte-1/) desse artigo falamos um pouco sobre como nomear uma classe significativa e reaproveitável utilizando BEM, porém existem mais alguns pontos importantes para escrever um CSS seguindo essa metodologia, como a organização de arquivos, um dos assuntos que iremos ver por aqui.

![Logo do BEM](assets/img/bemlogo.png "Logo do BEM")

#### Algumas considerações importantes

Não basta simplemente criar uma classe separada por (\_\_) para ter um CSS no padrão BEM, por isso listei algumas informações importantes:

- Nem todo bloco precisa ter um elemento.

  ```html
  <button class="”button-sucess" button-small”>Enviar<button></button></button>
  ```

- Todo elemento precisa fazer parte de um bloco.

- Um elemento pode ter outro elemento aninhado, porém o seu nome deve ser referente ao bloco.

```html
<form class="search-form">
  <div class="search-form__content">
    <input class="search-form__input" />
    <button class="search-form__button">Pesquisa</button>
  </div>
</form>
```

- Um bloco pode conter outros blocos.

- Os modificadores são opcionais .

- Crie um bloco quando o mesmo não depender de outros componentes para ser reutilizado.

- Crie um elemento quando o mesmo não puder ser reutilizado fora do bloco em que faz parte.

### Estrutura de arquivos

![Uma mão deslizando sobre livros em uma prateleira](assets/img/books.jpg "Estante com muitos livros")

A estrutura de arquivos do BEM é tão peculiar quanto a forma em que suas classes são nomeadas, porém existe uma lógica por trás de tudo. Os arquivos são bem fragmentados, o que pode facilitar na manutenção, pois quando existir algum problema você pode ir direto no arquivo do bloco em questão.

#### Algumas diretrizes para a estrutura de arquivos de um projeto BEM

- Os projetos são divididos em níveis.
- Os blocos são implementados em arquivos separados.
- Os arquivos são agrupados por significado e não por tipo.

#### Os projetos são divididos em níveis

Os projetos são divididos em níveis e não existe uma quantidade máxima para isso. Em outras palavras, podemos ter diversas pastas com diversos níveis de hierarquia.  
Exemplo:

```
project/
    common.blocks/  # Diretório para blocos do projeto
    library.blocks/ # Diretório para blocos da biblioteca

```

#### Os blocos são implementados em arquivos separados

Cada bloco tem seu css implementado em um arquivo único. Por exemplo, se criarmos um bloco formulario, seu css deve ser armazenado em um arquivo formulario.css.

Exemplo:

```
project
    common.blocks/
        input.css   # CSS para o bloco input
```

O código dos elementos e modificadores também são armazenados em arquivos separados. Dessa forma conseguimos incluir apenas os elementos e modificadores necessários para a implementação do bloco em questão.

Exemplo:

```
project
    common.blocks/
        input.css            # CSS para o bloco input
        input_theme_sun.css  # CSS para o modificador input_theme_sun
        input__clear.css     # CSS para o elemento input__clear
```

#### Os arquivos são agrupados por significado e não por tipo

Cada bloco possui uma pasta onde todos os arquivos referentes a ele são agrupados, seja arquivos css ou js.

Exemplo:

```
project
    common.blocks/
        input/            # Diretório para o bloco input
            input.css     # CSS para o bloco input
            input.js      # JavaScript para o bloco input
        popup/            # Diretório para o bloco popup
            popup.css     # CSS para o bloco popup
            popup.js      # JavaScript para o bloco popup

```

Também podemos criar uma pasta para modificadores de blocos que possuem mais de um valor.  
Exemplo:

```
project
    common.blocks/                     # Diretório para os blocos
        input/                         # Diretório para o bloco input
            _type/                     # Diretório para o modificador input_type
                input_type_search.css  # CSS para o modificador input_type
                input_type_pass.css    # CSS para o modificador input_type
            input.css                  # CSS para o bloco input
            input.js                   # JavaScript para o bloco input
        popup/                         # Diretório para o bloco popup
```

### Na metodologia BEM os arquivos podem ser organizados de três maneiras:

- Nested
- Flat
- Flex

#### Nested

Uma abordagem clássica do projeto BEM, usada nos projetos [bem-core](https://github.com/bem/bem-core/tree/v4.2.1/common.blocks/page) e [bem-components](https://github.com/bem/bem-components/tree/v6.0.0/common.blocks/button). Essa abordagem segue algumas diretrizes:

- Cada bloco corresponde a um diretório.
- Os arquivos de elementos e modificadores são escritos separadamentes e em diretŕoios separados.
- O diretório do bloco é a raiz dos subdiretórios de seus elementos e modificadores.
- O nome dos diretórios de elementos começam com um duplo sublinhado (\_\_).
- O nome dos diretórios dos modificadores começam com um sublinhado único (\_).

Exemplo:

```
project
    common.blocks/                            # Diretório para os blocos
        input/                                # Diretório para o bloco input
            _type/                            # Diretório para o modificador input_type
                input_type_search.css         # CSS para o modificador input_type
            __clear/                          # Diretório para o elemento input__clear
                _visible/                     # Diretório para o modificador input__clear_visible
                    input__clear_visible.css  # CSS para o modificador input__clear_visible
                input__clear.css              # CSS para o elemento input__clear
                input__clear.js               # JavaScript para o elemento input__clear
        input.css                             # CSS para o bloco input
        input.js                              # JavaScript para o bloco input
```

#### Flat

Essa é uma versão simplificada, onde os blocos, elementos ou modificadores não possuem diretórios.  
Elementos e modificadores são implementados em arquivos separados ou no arquivo do bloco principal.

Exemplo:

```
project
    common.blocks/
        input_type_search.css     # CSS para o modificador input_type_search modifier
        input_type_search.js      # Javascript para o modificador input_type_search
        input__clear.js           # Elemento opicional para o bloco input
        input.css
        input.js
        popup.css
        popup.js
        popup.png
```

#### Flex

Essa é uma combinação entre nested e o flat. Blocos simples usam flat e blocos com a estrutura maior usam nested. Ou seja, se o bloco possuir vários elementos e modificadores, usamos o nested, caso o bloco não possua nada disso, usamos o flat.

- Cada bloco corresponde a um diretório.
- Elementos e modificadores podem ser implementados em arquivos de bloco ou em arquivos separados.

Exemplo:

```
project
    common.blocks/
        input/                                # Diretório para o bloco input
            _type/                            # Diretório para o modificador input_type
                input_type_search.css         # CSS para o modificarod input_type
            __clear/                          # Diretório para o elemento input__clear
                _visible/                     # Diretório para o modificador input__clear_visible
                    input__clear_visible.css  # CSS para o modificador input__clear_visible
                input__clear.css              # CSS para o elemento input__clear
                input__clear.js               # JavaScript para o elemento input__clear
            input.css                         # CSS para o bloco input
            input.js                          # JavaScript para o bloco input
        popup/                                # Diretório para o bloco popup
            popup.css
            popup.js
            popup.png
```

### BEM, isso é tudo pessoal.

Esse foi meu apanhado sobre a metodologia BEM, existe muito mais informações que você pode conferir na [documentação](https://en.bem.info) do BEM.

Eu particularmente não curto a forma que os arquivos são organizados com o BEM, acho que é por falta de familiriadade, pois entendo o problema que ele vem resolver e os benefícios que essa abordagem proporciona para o desenvolvedor. Enfim, acredito que toda essa questão de organização seja algo que pode ser adaptado e combinado com a equipe, caso esteja trabalhando com uma.

Eu fiz um pequeno projeto utilizando BEM, incluindo a parte de organização de arquivos, é algo bem simples e deve ter muita coisa errada, mas você pode dar uma conferida no meu [github](https://github.com/crisgon/control-panel/tree/gh-pages).

Obrigado por ler até aqui!! Se curtiu esse post compartilha com seus amigos e deixa um comentário caso tenha alguma sugestão do que posso melhorar.
