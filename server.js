const express = require('express');
const app = express();
const sass = require('node-sass');
const bodyParser = require('body-parser');

app.use((req, res, next) => {
  res.header({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-type',
  });
  next();
});

app.use((req, res, next) => {
  req.headers['content-type'] = 'application/json';
  next();
});

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => res.json(true));

app.post('/', (req, res) => {
  const source = req.body.source;
  sass.render(
    {
      data: source,
    },
    (error, result) => {
      if (error) {
        return res.json({
          error,
          source,
        });
      }

      return res.json({
        source,
        result: result.css.toString(),
      });
    }
  );
});

const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
