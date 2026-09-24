//node index.js

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok'
    });
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});