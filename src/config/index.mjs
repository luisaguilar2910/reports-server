export default function Config() {
    switch (process.env.NODE_ENV) {
        case 'development':
            return {
                PORT: process.env.PORT
            }
        default: throw new Error('Cannot find ENV variable')
    }
}