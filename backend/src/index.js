const express = require('express');
const redis = require('redis');
const { nanoid } = require('nanoid');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
const client = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

client.on('error',(err) => console.log('Redis Client Error', err));
client.connect().then(() => console.log('Conectado a Redis'));

app.post('/acortador', async (req, res)=>{
    const { longUrl } = req.body;
    const shortId = nanid(6);
    await client.set({ shortUrl: `http://localhost:3000/${shortId}` });
});

app.get('/id', async (req, res) =>{
    const { id } = req.params;
    const longUrl = await client.get(id);
    if (longUrl) return res.redirect(longUrl);
    res.status(404).send('URL no encontrada');
});

app.listen(3000, () => console.log('Servidor en puerto 3000'));