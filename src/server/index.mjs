import express from 'express'
import healthcheck from './controllers/healthcheck'
import api from './controllers/api'

export default class Server {

    constructor(config) {
        this.config = config
    }

    start() {
        this.app = express()
        this._configRoutes()
        this.app.listen(this.config.PORT, () => console.log(`Server listening in port ${this.config.PORT}`))
    }

    _configRoutes() {
        const handlers = {
            healthCheck: healthcheck,
            api: api
        }

        this.app.get('/healthcheck', handlers.healthCheck.healthcheck)
        this.app.get('/github', handlers.api.getGithubData)
    }

}