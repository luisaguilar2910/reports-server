const healthcheck = (req, res) => {
    res.send({
        status: 200
    })
}

export default {
    healthcheck: healthcheck
}