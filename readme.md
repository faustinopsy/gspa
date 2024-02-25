# GSPA - Evolução do Projeto

Este repositório contém a evolução de um projeto de Single Page Application (SPA) chamado GSPA, onde cada branch representa uma versão mais simples do projeto, avançando para versões mais complexas com novas funcionalidades e melhorias.

O propósito é guiar estudantes em um desenvolvimento moderno, onde a performance, a otimização, o SEO e o reaproveitamento de código e organização são prioridades.

## Branches e Evolução do Projeto

### [SPA-1-evolucao-OOP](https://github.com/faustinopsy/gspa/tree/SPA-1-evolucao-OOP)
- Primeira versão do projeto.
- Implementação básica do SPA em modo funcional.

### [SPA-2-evolucao-OOP](https://github.com/faustinopsy/gspa/tree/SAP-2-evolucao-OOP)
- Organização do código em classes para melhor organização e modularidade.
- Refatoração para uso de classes.

### [SPA-3-evolucao-OOP](https://github.com/faustinopsy/gspa/tree/SPA-3-evolucao-OOP)
- Organização de pastas para melhor estrutura do projeto.
- Refatoração de nomes de classes para seguir melhores práticas.

### [SPA-4-evolucao-OOP](https://github.com/faustinopsy/gspa/tree/SPA-4-evolucao-OOP)
- Criação dos slides e cards.
- Modularização dos slides e cards para melhor reutilização.

### [SPA-5-Evolucao-OOP](https://github.com/faustinopsy/gspa/tree/SPA-5-Evolucao-OOP)
- Adicionado cache/offline/PWA/Servicework.
- Implementação de técnicas para cache e melhor experiência offline.

### [SPA-6-evolucao-OOP](https://github.com/faustinopsy/gspa/tree/SPA-6-evolucao-OOP)
- Técnicas para otimização de SEO e para os robots.
- Implementação de técnicas avançadas de SEO para melhor indexação.

### [SPA-7-evolucao-OOP](https://github.com/faustinopsy/gspa/tree/SPA-7-evolucao-OOP)
- Adicionada nova página extra.
- Slide/Card "reaproveitamento" para mostrar a reutilização de componentes em diferentes páginas, alterando seus estilos ou layout.

### [SPA-8-evolucao-OOP](https://github.com/faustinopsy/gspa/tree/SPA-8-evolucao-OOP)
- Adicionadas funcionalidades extras e melhorias.
- Versão final do projeto, com todas as funcionalidades implementadas e melhorias realizadas.

### [SPA-9-evolucao-OOP-bonus](https://github.com/faustinopsy/gspa/tree/SPA-9-evolucao-OOP-bonus)
- Adicionadas tradução em três línguas e menu de preferências pessoais.
- Versão final com bonus do projeto, com todas as funcionalidades implementadas e melhorias realizadas.


## O projeto gSPA

### Single Page Application (SPA) com JavaScript Puro e Modularização

As Single Page Applications (SPAs) revolucionaram a forma como os aplicativos web são desenvolvidos e utilizados. Essa abordagem permite que os usuários naveguem em uma aplicação sem a necessidade de recarregar a página, proporcionando uma experiência fluida e altamente interativa.

Neste projeto, exploramos a construção de uma SPA utilizando apenas JavaScript puro, sem a necessidade de bibliotecas ou frameworks adicionais. Isso permite aos estudantes compreenderem os fundamentos da linguagem JavaScript e como ela pode ser aplicada no desenvolvimento web moderno.

### Modularização de Componentes e Reaproveitamento de Código

Um dos principais princípios dessa abordagem é a modularização de componentes, onde cada parte da aplicação é encapsulada em módulos independentes, facilitando a manutenção e a reutilização do código. Neste projeto, demonstramos como dividir a aplicação em componentes distintos, como slides ->slideimages ->controleSlide, cards e outros elementos, e como esses componentes podem ser facilmente reaproveitados em diferentes partes da aplicação.

### Orientação a Objetos no Frontend

Embora seja comum associar a orientação a objetos principalmente ao desenvolvimento backend, neste projeto, introduzimos conceitos básicos de orientação a objetos no frontend. Isso permite uma organização mais estruturada do código, com a definição de classes para representar objetos e suas funcionalidades específicas. Por exemplo, a classe SlideImages pode encapsular a lógica relacionada à exibição de slides na aplicação e na ultima branch houve uma restruturação dela para ser possivel enviar array de imagens de páginas diferentes o que poderá projetar slides diferetes assim como o card que a home e a página extra mostra os cards mas com layot diferentes sem alterar o componente especifico, deixando o componente lidar com a renderização de cartões de conteúdo.

### Integração com Servidor Backend

Além disso, destacamos a flexibilidade da abordagem SPA, que pode ser facilmente integrada a um servidor backend para fornecer dados dinâmicos. No projeto, exemplificamos como consumir um arquivo JSON localmente, mas essa lógica pode ser facilmente adaptada para recuperar dados de uma API remota, simplesmente alterando a URL de onde os dados são solicitados.

Em resumo, este projeto oferece uma introdução abrangente à construção de SPAs com JavaScript puro, enfatizando a modularização de componentes, o reaproveitamento de código e conceitos básicos de orientação a objetos no frontend, preparando os estudantes para explorarem ainda mais as possibilidades do desenvolvimento web moderno, sem ficaram presos a uma estrutura fixa de algum framework.

---

Este projeto é apenas um exemplo modelo para expansão e estudos, mas mostra a evolução passo a passo de um projeto de Single Page Application (SPA/PWA) cache otimizado e SEO otimizado, demonstrando como cada nova versão adiciona funcionalidades e melhorias.