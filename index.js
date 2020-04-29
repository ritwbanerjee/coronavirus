const express = require('express'),
      morgan = require('morgan'),
      helmet = require('helmet'),
      cors = require('cors'),
      compression = require('compression');

// Require routes
const recovered = require('./server/routes/recovered'),
      deaths = require('./server/routes/deaths'),
      confirmed = require('./server/routes/confirmed');

const connectDB = require('./server/db/connection');

require('dotenv').config();

const app = express();

app.use(compression());
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));

connectDB();


app.use(express.json());
// Sets up the routes for Recovered, Deaths and confirmed
app.use('/api/recovered', recovered);
app.use('/api/deaths', deaths);
app.use('/api/confirmed', confirmed);
app.use('/api/user', require('./server/routes/user'));

// Init all cron jobs
const getCases = require('./server/services/getCases');
getCases.setConfirmedCases();
getCases.setDeathCases();
getCases.setRecoveredCases();
getCases.setAllCases();


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });