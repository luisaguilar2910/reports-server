export default function Config() {
    switch (process.env.NODE_ENV) {
        case 'development':
            return {
                PORT: process.env.PORT,
                GITHUB_TOKEN: process.env.GITHUB_PERSONAL_TOKEN,
                FB_PAGE_ACCESS_TOKEN: process.env.FB_PAGE_ACCESS_TOKEN,
                FB_VERIFY_TOKEN: process.env.FB_VERIFY_TOKEN
            }
        default: throw new Error('Cannot find ENV variable')
    }
}