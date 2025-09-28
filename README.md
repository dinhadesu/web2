# Projeto Web2

## Sobre

Este workspace contém dois projetos principais:

- **backendapi**: API REST desenvolvida em Java com Spring Boot, responsável pelo gerenciamento dos produtos.
- **WEB2**: Interface web simples, desenvolvida em HTML, CSS e JavaScript, que consome a API para exibir os produtos.

---

## Como Iniciar os Projetos

### 1. Iniciando o Backend (API)

1. **Pré-requisitos**:
   - Java 21 instalado
   - Maven instalado (ou utilize o wrapper incluso)

2. **Passos para rodar:**

   No terminal, navegue até a pasta `backendapi`:

   ```sh
   cd backendapi
   ```

   Execute o comando abaixo para iniciar a API:

   ```sh
   ./mvnw spring-boot:run
   ```

   Ou, no Windows:

   ```sh
   mvnw.cmd spring-boot:run
   ```

   A API ficará disponível em: [http://localhost:8080/api/produtos](http://localhost:8080/api/produtos)

   O console do banco H2 pode ser acessado em: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)  
   Usuário: `adm`  
   Senha: `123`

---

### 2. Iniciando o Frontend (WEB2)

1. **Pré-requisitos**:
   - Um navegador web moderno

2. **Passos para rodar:**

   Basta abrir o arquivo `WEB2/inicio.html` no navegador.

   > **Obs:** Certifique-se de que a API backend esteja rodando antes de abrir o frontend, pois ele consome os dados da API.

---

## Estrutura dos Projetos

### backendapi (API Spring Boot)

- **src/main/java/com/ifce/backendapi/**
  - **BackendapiApplication.java**  
    - Classe principal para inicialização da aplicação Spring Boot.
  - **controller/**
    - **ProdutoController.java**  
      - Controlador REST responsável por expor os endpoints relacionados a produtos (CRUD).
  - **model/**
    - **Produto.java**  
      - Classe de modelo que representa a entidade Produto, com seus atributos e anotações JPA.
  - **repository/**
    - **ProdutoRepositorio.java**  
      - Interface que estende JpaRepository, responsável pela comunicação com o banco de dados para a entidade Produto.

- **src/main/resources/application.properties**  
  Arquivo de configuração da aplicação, onde estão definidos parâmetros como porta, configurações do banco H2, usuário e senha.

- **pom.xml**  
  Arquivo de configuração do Maven, com as dependências do projeto.

### WEB2 (Frontend)

- **inicio.html**  
  - Página principal do frontend. Estrutura HTML para exibição dos produtos e interação com o usuário.

- **script.js**  
  - Script JavaScript responsável por consumir a API backend, buscar e exibir os produtos na página, além de manipular eventos do usuário.

- **style.css**  
  - Arquivo de estilos CSS para personalização visual da página.
