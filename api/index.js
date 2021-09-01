const app = require('express')();
const screenshot = require('../lib/screenshot');
const response = require('../lib/response');
const staticData = require('../data/static.json');
const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const templates = {
    static: Handlebars.compile(
        fs.readFileSync(path.join(__dirname, '..', 'templates', 'static.handlebars'), 'utf8')
    ),
    user: Handlebars.compile(
        fs.readFileSync(path.join(__dirname, '..', 'templates', 'user.handlebars'), 'utf8')
    ),
    organization: Handlebars.compile(
        fs.readFileSync(path.join(__dirname, '..', 'templates', 'organization.handlebars'), 'utf8')
    ),
};

app.get('/api/static/:slug', async (req, res) => {
    const file = await screenshot(
        templates.static({
            baseUrl: req.protocol+'://'+req.header('Host'),
            ...staticData[req.params.slug],
        })
    );

    response(res, file);
});

app.get('/api/user/:id', async (req, res) => {
    const file = await screenshot(
        templates.user(req.params)
    );

    response(res, file);
});

app.get('/api/organization/:id', async (req, res) => {
    const file = await screenshot(
        templates.organization(req.params)
    );

    response(res, file);
});

app.use(function(err, req, res, next) {
    console.error(err);
    res
        .status(500)
        .setHeader('Content-Type', 'text/text')
        .end('Something broke!');
});

module.exports = app;