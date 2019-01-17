export default function Config() {
    switch (process.env.NODE_ENV) {
        case 'development':
            return {
                PORT: process.env.PORT,
                GITHUB_TOKEN: process.env.GITHUB_PERSONAL_TOKEN
            }
        default: throw new Error('Cannot find ENV variable')
    }
}