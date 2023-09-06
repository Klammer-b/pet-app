const express = require('express');
const cors = require('cors');
const router = require('./routes');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method);
  next();
});

app.use('/api/v1', router);

app.get('/', (req, res, next) => {
  res.send('hello world');
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
