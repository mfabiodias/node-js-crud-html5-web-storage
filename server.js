const express = require("express")
const app = express()


// For Heroku Deploy
const port = process.env.PORT || 8082

// Responsável por servir todos os arquivos estáticos desta pasta (.) 
app.use(express.static('.'))

app.listen(port, () => console.log(`Executando na porta ${port}`))




