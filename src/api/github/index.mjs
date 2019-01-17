import axios from 'axios'
import queries from './queries'

export default class GithubAPI {

    constructor (config) {
        this.token = config.GITHUB_TOKEN
        this.baseURL = 'https://api.github.com/graphql'
    }

    getUserData () {
        const config = {
            headers: {
                Authorization: `bearer ${this.token}`,
                Accept: `application/json`
            }
        }
        return axios.post(this.baseURL, {
            "query": queries.userDataQuery
        }, config)
    }
}