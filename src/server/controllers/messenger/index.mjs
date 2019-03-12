import config from '../../../config'
import axios from 'axios'

const handleWebhook  = (req, res) => {
    console.log(req.body)
    let body = req.body
    if(body.object === 'page') {
        body.entry.forEach( entry => {
            let webhook_event = entry.messaging[0]
            console.log(webhook_event.sender)
            let sender_psid = webhook_event.sender.id
            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message)
            } else if (webhook_event.postback) {
                handlePostBack(sender_psid, webhook_event.postback)
            }
        })
    }
    res.status(200).send('EVENT_RECEIVED')
}

const authWebhook = (req, res) => {
    const Config = config()
    let VERIFY_TOKEN = Config.VERIFY_TOKEN

    let mode = req.query['hub.mode']
    let token = req.query['hub.verify_token']
    let challenge = req.query['hub.challenge']

    if (mode && token) {
        if ( mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        }else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);      
          }
    }

}

const handleMessage = (messengerId, received_message) => {
    console.log('handleMessage: ', messengerId, received_message)
    let response = {}
    if (received_message.text) {
        response = {
            "text": `You sent the message: "${received_message.text}".`
        }
    }

    callSendAPI(messengerId, response)
}

const handlePostBack = (messengerId, received_postback) => {
    console.log('handlePostback: ', messengerId, received_postback)
}

const callSendAPI = (messengerId, response) => {
    console.log('handlePostback: ', messengerId, response)
    const Config = config()
    let body = {
        "recipient": {
            "id": messengerId
        }, 
        "message": response
    }

    axios.post('https://graph.facebook.com/v2.6/me/messages', body, {
        params: {
            "access_token": Config.FB_PAGE_ACCESS_TOKEN
        }
    }).then(response => console.log('Message sent ', response.status))
    .catch(err => console.warn(err))

}

export default {
    handleWebhook: handleWebhook,
    authWebhook: authWebhook
}