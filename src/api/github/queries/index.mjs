const userDataQuery = `
    query {
        viewer {
            login,
            issues (states: [OPEN], first: 5, orderBy: {field: UPDATED_AT, direction: DESC}) {
                edges {
                    node {
                        title,
                        lastEditedAt
                    }
                }
            },
            pullRequests (states: [OPEN, MERGED, CLOSED], first: 5, orderBy: {field: UPDATED_AT, direction: DESC}) {
                edges {
                    node {
                        title,
                        lastEditedAt,
                        commits (last: 5) {
                            edges {
                                node {
                                    commit {
                                        message,
                                        pushedDate
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

export default {
    userDataQuery: userDataQuery
}