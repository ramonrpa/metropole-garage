# Metropole Garage

Sistema de garam para o servidor **Metrópole**, utilizando **TypeScript**, **React** e **Mysql**

## 🎥 Vídeo de Demonstração

Veja o sistema em funcionamento:  
[![Vídeo de demonstração](https://cdn.ramonrpa.com.br/public/metropole-garage.png)](https://cdn.ramonrpa.com.br/public/metropole-garage.mp4)
[Ver vídeo](https://cdn.ramonrpa.com.br/public/metropole-garage.mp4)

## 🚀 Tecnologias Utilizadas

- **Frontend**: React, TypeScript, TailwindCSS e VIte
- **Backend**: TypeScript
- **Banco de dados**: MySQL

## ⚙️ Requisitos

- FxServer
- Node.js (v20 ou superior)
- Docker

## 🛠️ Instalação

1. Clone o repositório:

```
git clone https://github.com/ramonra/metropole-garage.git
```

2. Instale as dependências:

```
yarn install
```

3. nicie o container MySQL com Docker:

```
docker-compose up -d
```

4. Configure o diretório de build:

- No arquivo `config.json`, altere o valor da chave `output` para apontar para a pasta `resources` do seu servidor.

5. Compile o projeto:

```
yarn build
```

6. Adicione no seu server.cfg:

```
ensure garage
```

7. Inicie o servidor e verifique se a garagem está funcionando corretamente.

## 💻 Comandos Disponíveis

| Comando        | Descrição                            |
| -------------- | ------------------------------------ |
| `/garage`      | Abre a interface de garagem          |
| `/car <plate>` | Faz o spawn de um veículo pela placa |

## Permissões ACE

Para utilizar o comando `/car <plate>`, é necessário ter a permissão `permissão garage.admin`. Exemplo de configuração:

```
add_ace identifier.license:XXXXXX garage.admin allow
```
