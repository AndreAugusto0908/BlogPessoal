# 📝 Blog Pessoal

Uma aplicação web desenvolvida com **Angular 19** e **Java Spring Boot**, que permite criar, visualizar, editar e excluir postagens de blog. O projeto também conta com um **dashboard analítico** com estatísticas e gráficos. Esta aplicação foi desenvolvida como parte de uma trilha de formação ofertada pela empresa **Montreal**.

## 🔗 Links do Projeto

- **Frontend (Angular 19):** [Acessar aplicação](https://blog-pessoal-pi-lilac.vercel.app/)
- **Backend (Spring Boot + Swagger):** [Acessar documentação Swagger](https://blogpessoal-production.up.railway.app/swagger-ui/index.html#/)

---

## 📑 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)

---

## 📝 Sobre o Projeto

O **Blog Pessoal** foi desenvolvido como parte de uma trilha de cursos da empresa **Montreal**. Seu principal objetivo é aplicar conceitos de desenvolvimento full stack com integração entre frontend e backend, utilizando boas práticas como **GitFlow**, **UX Design** e **responsividade**.

A aplicação permite o gerenciamento completo de postagens e análise de dados por meio de gráficos, proporcionando uma experiência completa tanto para os autores quanto para os leitores.

---

## 🚀 Tecnologias Utilizadas

### Frontend

- Angular 19
- Angular Material
- TypeScript
- TailwindCSS
- Vercel (Deploy)

### Backend

- Java 21
- Spring Boot
- PostgreSQL
- Swagger (Documentação da API)
- Railway (Deploy)

---

## ⚙️ Funcionalidades

- [x] Criar, visualizar, editar e excluir postagens
- [x] Dashboard com gráficos de postagens por autor
- [x] Estatísticas como número total de postagens e últimas publicações
- [x] Integração completa com API REST
- [x] Interface responsiva e acessível
- [x] Autenticação de usuários (login e cadastro)
- [x] Filtro de postagens por tema, autor e data
- [x] Busca por postagens por meio de palavras-chave

---

## 🏗️ Arquitetura e Design

O projeto segue a arquitetura **MVC (Model-View-Controller)** no backend, garantindo separação de responsabilidades e facilidade de manutenção. No frontend, a aplicação utiliza uma abordagem de **componentização com Angular**, com auxílio do **Angular Material** para criar uma interface moderna, acessível e responsiva.

Durante o planejamento da interface e experiência do usuário (UX), foram definidas três **personas principais**, representando perfis típicos de usuários de um blog. Essas personas guiaram decisões de design e usabilidade:

### 👤 Persona 1: Mariana, a Leitura Curiosa

- **Idade:** 25 anos  
- **Profissão:** Estudante de Letras  
- **Objetivo:** Buscar conteúdos variados, atualizados e de fácil leitura  
- **Necessidade:** Uma interface limpa, organizada e com foco em legibilidade  
- **Decisão de design:** Tipografia bem definida, uso de cards para organização dos posts e navegação fluida entre temas e autores

---

### 👨‍💻 Persona 2: João, o Criador de Conteúdo

- **Idade:** 33 anos  
- **Profissão:** Redator freelancer  
- **Objetivo:** Publicar e gerenciar suas próprias postagens de maneira rápida  
- **Necessidade:** Um painel intuitivo para criar, editar e excluir posts, com feedback visual claro  
- **Decisão de design:** Formulários acessíveis, botões visíveis, sistema de CRUD direto e com confirmação de ações

---

### 📊 Persona 3: Carla, a Gestora de Conteúdo

- **Idade:** 42 anos  
- **Profissão:** Coordenadora de marketing digital  
- **Objetivo:** Acompanhar desempenho de postagens e autores  
- **Necessidade:** Visualizar estatísticas de forma clara e rápida  
- **Decisão de design:** Dashboard com gráficos e dados analíticos sobre autores, número de postagens e últimas atualizações

---

Com base nessas personas, o design da aplicação foi estruturado para atender diferentes níveis de uso: leitura casual, criação de conteúdo e análise gerencial. A interface garante **acessibilidade, clareza visual e desempenho**, oferecendo uma experiência fluida e intuitiva.
