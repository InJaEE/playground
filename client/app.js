const http = require('http');
// const https = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// const port = dev ? 3000 : 443;
const port = 3000;

/*
const options = {
    key : fs.readFileSync('./keys/key.pem'),
    cert : fs.readFileSync('./keys/cert.pem')
}
*/

app.prepare().then(() => {
	http
		.createServer((req, res) => {
			const parsedUrl = parse(req.url, true);
			// const { pathname, query } = parsedUrl;
			handle(req, res, parsedUrl);
		})
		.listen(port, err => {
			if (err) throw err;
			console.log('NextJS Server On!');
		});
	/*
	https
		.createServer(options, (req, res) => {
			const parsedUrl = parse(req.url, true);
			const { pathname, query } = parsedUrl;
			handle(req, res, parsedUrl);
		})
		.listen(port2, err => {
			if (err) throw err;
			console.log('> Ready on http://localhost:' + port2);
		});
        */
});
