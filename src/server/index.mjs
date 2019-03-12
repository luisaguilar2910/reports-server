import express from 'express'
import bodyparser from 'body-parser'
import healthcheck from './controllers/healthcheck'
import api from './controllers/api'
import messenger from './controllers/messenger'

export default class Server {

    constructor(config) {
        this.config = config
    }

    start() {
        this.app = express().use(bodyparser.json())
        this._configRoutes()
        this.app.listen(this.config.PORT, () => console.log(`Server listening in port ${this.config.PORT}`))
    }

    _configRoutes() {
        
        const handlers = {
            healthCheck: healthcheck,
            api: api,
            messenger: messenger
        }

        this.app.get('/healthcheck', handlers.healthCheck.healthcheck)
        this.app.get('/github', handlers.api.getGithubData)
        this.app.get('/messengetWebhook', handlers.messenger.authWebhook)
        this.app.post('/messengetWebhook', handlers.messenger.handleWebhook)
    }

}