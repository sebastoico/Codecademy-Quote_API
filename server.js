const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    res.send({ quote: randomQuote });
})

app.get('/api/quotes', (req, res, next) => {
    const person = req.query.person;
    if (person) {
        const quotesByPerson = quotes.filter(quote => quote.person === person);
        res.send({ quotes: quotesByPerson });
    } else {
        res.send({ quotes: quotes });
    }
})

app.post('/api/quotes', (req, res, next) => {
    const quote = req.query.quote;
    const person = req.query.person;
    if (quote && person) {
        const newQuote = {
            quote: quote,
            person: person
        };
        quotes.push(newQuote);
        res.send({ quote: newQuote });
    } else {
        res.status(400).send();
    }
})

app.listen(PORT, () => console.log('Server is running'));