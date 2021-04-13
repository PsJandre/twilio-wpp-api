require('dotenv').config()
const express = require('express')
const app = express();
const port = 3000;

app.use(express.urlencoded({extended: false}));

app.post('/sendWPP', function (req, res) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    const mensagem = req.body.msg;
    const numero = req.body.num;

    client.messages
        .create({
            body: mensagem,
            from: process.env.TWILIO_NUMBER,
            to: `whatsapp:+${numero}`
        })
        .then(message => res.send(`Mensagem whatsapp: ${mensagem} enviada para o numero +${numero}`))
        .catch(message => res.status(400).send(`Erro ao enviar mensagem: ${mensagem} numero: ${numero}`))
        .done();
        
})
app.post('/sendSMS', function (req, res) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    const mensagem = req.body.msg;
    const numero = req.body.num;
    client.messages
        .create({
            body: mensagem,
            messagingServiceSid: process.env.TWILIO_MESSAGING_ID,      
            to: `+${numero}`
        })
        .then(message => res.status(201).send(`Mensagem sms: ${mensagem} enviada para o numero ${numero}`))
        .catch(message => res.status(400).send(`Erro ao enviar mensagem: ${mensagem} numero: ${numero}`))
        .done();
        
})
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
