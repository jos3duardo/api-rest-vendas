## API de Gestão de Vendas

## Funcionalidades

Cadastro de:
 - Produtos
 - Clientes
 - Pedidos de Compra
 - Gestão de Usuarios:
    - Autenticação via token JWT
    - Recuperação de senha por email
    - atualização de perfil
    - atualização de avatar


subindo container com banco de dados postgres
```bash
docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```


Generating a UUID in Postgres for Insert statement
```bash
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

criando uma migration
```bash
yarn typeorm migration:create -n CreateProducts
```

Rodando a migration
```bash
yarn typeorm migration:run
```
