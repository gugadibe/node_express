import express from 'express';
import expressHandlebars from 'express-handlebars';
import { getFortune } from './lib/fortune.js';

const app = express();
const __dirname = import.meta.dirname;
const port = process.env.PORT || 3000;

app.engine('handlebars', expressHandlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about', { fortune: getFortune() });
});

app.use((req, res) => {
    res.status(404);
    res.render('404');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(port, () => {
    console.log(`Express started on http://localhost:${port}; press Ctrl-C to terminate.`);
});