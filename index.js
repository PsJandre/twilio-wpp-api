const express = require('express')
const app = express()
const port = 3000

app.get('/sendWPP', function (req, res) {
    const accountSid = 'AC6d518caf79f7155886c74cf244140ee5';
    const authToken = '552e53b7779c14ad57f9ccf136138055';
    const client = require('twilio')(accountSid, authToken);
    const mensagem = req.query.msg;
    const numero = req.query.num;
    client.messages
        .create({
            body: mensagem,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:+${numero}`
        })
        .then(message => res.send(`Mensagem: ${mensagem}\n enviada para o numero +${numero}`))
        .done();
        
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
