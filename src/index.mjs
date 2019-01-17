import express from 'express'
import Config from './config'
import healthcheck from './handlers/healthcheck'

const config = Config()
const app = express()
const port = config.PORT

app.get('/', (req, res) => {
    res.send('Ping me')
})

app.get('/healthcheck', healthcheck.healthcheck)

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})