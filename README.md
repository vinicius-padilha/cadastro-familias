# Cadastro de Famílias

O projeto busca contribuir com uma plataforma de código aberto que irá gerenciar e tratar os dados inseridos para transformá-los em informações úteis para o melhor atendimento das famílias. 

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e implementações.

Consulte **Implantação** para saber como implantar o projeto.

### 📋 Pré-requisitos

```
- Node.js versão 16.13.2 ou maior
- Yarn versão 3.2.0 ou maior
```

### 🔧 Instalação

Instalação dos pacotes:

```
yarn install
```

Abrir ambiente de desenvolvimento:

```
yarn start
```

Gerar pacote de produção:

```
yarn build
```

## ⚙️ Executando os testes


### 🔩 Analise os testes de ponta a ponta

```
yarn test
```

### ⌨️ E testes de estilo de codificação

```
yarn test
```

## 📦 Desenvolvimento

### Banco de dados

Para a configuração do banco de dados [Cloud Firestore](https://firebase.google.com/products/firestore) (Firebase), é necessario a configuração das chaves no arquivo `index.js`, encontrado na raiz da pasta `src`, o objeto existente pode ser substituido por a novas chaves, um passo a passo detalhado de configuração do Cloud Firestore pode ser encontrado [aqui](https://firebase.google.com/docs/firestore).

## 📺 Implantação

### WEB

Utilize o comando `yarn build` para gerar o pacote de produção, na raiz do diretorio será criado uma pasta chamada `build`, responsavel por conter o pacote otimizado e publicavel do projeto.

### Banco de Dados

Após feitas as configurações do Banco de Dados, consulte **Desenvolvimento**, verifique as configurações de regras de acesso do projeto dentro do Cloud Firestore antes de publicar a web.   

## 🛠️ Construído com

* [Create React App](https://create-react-app.dev/)
* [Firebase - Cloud Firestore](https://firebase.google.com/products/firestore)
