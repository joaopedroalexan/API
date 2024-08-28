const express = require('express') //importa o módulo express
const { use } = require('express/lib/application')

//Define uma class para organizar a lógica da aplicação

class AppControllers{
    constructor(){
        //Cria uma novo instância do express dentro da class
        this.express = express()
        //chama o método middlewares para configurar os middlewares
        this.middlewares()
        //chama o método routes para definir as rotas da API
        this.routes()
    }
    middlewares(){
        //permitir que a aplicação receba dados em formato JSON nas requisições
        this.express.use(express.json())
    }
    //Define as rotas da nossa API
    routes(){
        const users = []

        this.express.post("/users", (req,res)=>{
            const {id, nome, email, senha} = req.body
            users.push({id,nome,email,senha})
            console.log(users);
            res.status(200).send({menssage:"Usuário cadastrado com sucesso"})
        })  

        this.express.post("/auth", (req,res)=>{
            const {email, senha} = req.body

            const user_email = users.find((user_email) => user_email.email == email)
            console.log(user_email)
            if(user_email){

                const user_senha = users.find((user_senha) => user_senha.senha == senha)
                console.log(user_senha)
                if(user_senha){
                    res.status(200).send({message:"Usuário logado!"})
                } 
                else {
                    res.status(400).send({menssage:"Usuário não encontrado"})
                }
            } 
            else {
                res.status(400).send({menssage:"Usuário não encontrado"})
            }

            
        })  
        
        
        this.express.get("/users/:id", (req,res)=>{
            const{id} = req.params;
            const user = users.find((user) => user.id == id)

            if(user){
                res.status(200).send(user)
            } else {
                res.status(400).send({menssage:"Usuário não encontrado"})
            }
        })  



        //Define uma rota Get para o caminho health
        this.express.get("/health/", (req, res)=>{
            res.send({
                nome: "Joao pedro alexandre",
                idade: "17 anos",
                CPF: "43604104840"
             })
        }) //Essa rota é usada para verificar se a API está OK
    }
}

// Exportando a instância de Express configurada, para que seja acessada em outros arquivos
module.exports = new AppControllers().express