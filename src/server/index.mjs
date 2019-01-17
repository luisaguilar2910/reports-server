import express from 'express'
import healthcheck from './controllers/healthcheck'

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
            healthCheck: healthcheck
        }

        this.app.get('/healthcheck', handlers.healthCheck.healthcheck)
    }

}