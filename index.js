const express = require('express'),
      morgan = require('morgan'),
      helmet = require('helmet'),
      cors = require('cors');

// Require routes
const recovered = require('./server/routes/recovered'),
      deaths = require('./server/routes/deaths'),
      confirmed = require('./server/routes/confirmed');

require('dotenv').config();

const app = express();

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send({
        status: 200,
        message: 'Server is working'
    })
});

// Sets up the routes for Recovered, Deaths and confirmed
app.use('/api/recovered', recovered);
app.use('/api/deaths', deaths);
app.use('/api/confirmed', confirmed);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });