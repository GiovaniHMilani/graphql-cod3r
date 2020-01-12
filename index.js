const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  scalar Date

    type Usuario {
        id: ID
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
    }

    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float!
    }

    # Pontos de entrada da sua API!
    type Query {
        ola: String!
        horaCerta: Date!
        usuarioLogado: Usuario
        produto: Produto
    }
`

const resolvers = {
    Usuario: {
        salario(usuario) {
            return usuario.salario_real
        }
    },
    Produto: {
        precoComDesconto(produto) {
            if (produto.desconto) {
                return produto.preco * (1 - produto.desconto)
            }
            return produto.preco
        }
    },
    Query: {
        ola() {
            return 'Bom dia!'
        },
        horaCerta() {
            return new Date;
        },
        usuarioLogado() {
            return {
                id: 1,
                nome: "Ana da web",
                email: "anadaweb@gmail.com",
                idade: 23,
                salario_real: 1234.56,
                vip: true
            }
        },
        produto() {
            return {
                nome: "Produto muito barato",
                preco: 10,
                desconto: 0.15
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`);
})