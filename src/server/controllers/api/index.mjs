import github from '../../../api/github'
import config from '../../../config'

const getGithubData = async (req, res) => {
    const Github = new github(config())
    const resp = await Github.getUserData()
    const data = resp.data.data
    console.log(data.viewer.login)
    data.viewer.issues.edges.forEach(element => {
        console.log(element)
    });
    data.viewer.pullRequests.edges.forEach(element => {
        console.log(element)
    });
}

export default {
    getGithubData: getGithubData
}