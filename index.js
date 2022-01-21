
const request = require('request');
const express = require('express');
const app = express();


const PORT = process.env.PORT || 3000;
const apiKey = 'ca6d7a740a73bc6b9ebe7923cce2ea5f';

const ScraperApiUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welecome to web scraper');
});

app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const response = await request(`${ScraperApiUrl(apiKey)}&url=https://www.amazon.com/dp/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));