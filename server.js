const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Webhook verification (Meta will call this initially)
app.get('/webhook', (req, res) => {
    const VERIFY_TOKEN = "your_verify_token";
    if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
        res.send(req.query['hub.challenge']);
    } else {
        res.sendStatus(403);
    }
});

// Receive WhatsApp messages
app.post('/webhook', (req, res) => {
    console.log("Received webhook event:", JSON.stringify(req.body, null, 2));
    res.sendStatus(200); // Acknowledge receipt
});

// Start server
app.listen(3000, () => console.log('Webhook server running on port 3000'));
