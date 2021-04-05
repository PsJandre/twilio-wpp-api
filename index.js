
const express = require('express')
const app = express()
const port = 3000

app.post('/sendWPP', (req, res) => {
    const accountSid = 'AC6d518caf79f7155886c74cf244140ee5';
    const authToken = '552e53b7779c14ad57f9ccf136138055';
    const client = require('twilio')(accountSid, authToken);
    client.messages
        .create({
            body: 'Your Yummy Cupcakes Company order of 1 dozen frosted cupcakes has shipped and should be delivered on July 10, 2019. Details: http://www.yummycupcakes.com/',
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+553199650413'
        })
        .then(message => res.send(`A mensagem para ${JSON.stringify(message.to)} foi enviada`))
        .done();
        
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
