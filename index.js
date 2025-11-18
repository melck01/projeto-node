/* 
    - Query params => meusite.com/users?name=rodolfo&age=28
    - Route params => /users/2    // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECIFICO
    - Request Body => {"name": "melck", "age": 24}
    - GET > buscar informaçao no back-end
    - POST > Criar informação no back-end
    - PUT / PATH > alterar/atualizar informação no back-end
    - DELETE > deletar informação no back-end
    - Middleware > INTERCEPTADOR > Tem o poder de parar ou alterar dados da requisição
    */
 // console.log(request.query)
    // const {name, age} = request.query // destructuring assignment
    
    
    // const name = request.query.name
    // const age = request.query.age
    
    
    
    // return response.json({name, age})


const express = require('express')
const uuid = require('uuid')

const port = 3000
const app = express()
app.use(express.json())

const users = []

const checkUserId = (request, response, next) =>{
    const {id} = request.params
    const index = users.findIndex(user => user.id === id)
    if(index < 0 ) {
        return response.status(404).json ({error:"User not found"})
    }

    request.userIndex = index
    request.userId = id
    next()
}

app.get('/users', (request, response) => {

    console.log('A rota foi chamada')

    return response.json(users)

})

app.post('/users', (request, response) => {
try{
    
    
    const {name, age} = request.body
    if(age < 18) throw new Error("Only allowed users over as 18 years old");
    
    
    console.log(uuid.v4())
    
    const user = {id:uuid.v4(), name, age}
    
    users.push(user)
    
    
    
    return response.status(201).json(user)

} catch(err){
    return response.status(400).json({error:err.message})
} finally {
    console.log("Execução completada com sucesso")
}

})

app.put('/users/:id', checkUserId, (request, response) => {
    
    const {name, age} = request.body
    const index = request.userIndex
    const id = request.userId

    const updateUser = {id, name, age}

    
    console.log(index)

    users[index] = updateUser

    return response.json(updateUser)

})

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index,1)

    return response.status(204).json()

})


app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`)
})


