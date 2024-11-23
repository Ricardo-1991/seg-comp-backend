# API REST para Cadastro de Estudantes

Esta é uma API REST desenvolvida com Node.js e TypeScript para o cadastro de estudantes. O projeto utiliza as seguintes dependências:

## Dependências

- **uuid**
- **prisma**
- **zod**
- **axios**
- **express**
- **jsonwebtoken**
- **swagger**


### Dev Dependencies

- **@types/bcryptjs**
- **@types/jsonwebtoken**

## Instalação

Para instalar as dependências do projeto, execute o seguinte comando:

```bash
npm install
```

## Modo de Desenvolvimento
Para rodar a aplicação em modo de desenvolvimento com o recurso de Watch, utilize:

```bash
npm run start:dev
```

## Iniciar o servidor
Para iniciar o servidor utilize:

```bash
npm run start
```
## Endpoints

A API possui os seguintes endpoints para o cadastro de estudantes:

- **POST /user/creae**: Cria um novo usuario.
- **GET /user**: Lista os usuarios.
- **AUTH /auth/login: autenticação do usuario.

