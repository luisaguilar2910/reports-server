import express from 'express'
import Config from './config'

const config = Config()
const app = express()
const port = config.PORT

app.get('/', (req, res) => {
    res.send('Ping me')
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})