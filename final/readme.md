# test cmd

```sh
node -e "http.get('http://localhost:3000/bicycle/1', (res) => res.setEncoding('utf8').once('data', console.log))"

node -e "http.request('http://localhost:3000/bicycle/1', { method: 'delete', headers: {'content-type': 'application/json'}}, (res) => console.log(res.statusCode)).end()"

node -e "http.request('http://localhost:3000/bicycle/99', { method: 'put', headers: {'content-type': 'application/json'}}, (res) => console.log(res.statusCode)).end(JSON.stringify({data: {brand: 'VanMoof', color: 'black'}}))"

node -e "http.request('http://localhost:3000/bicycle/99', { method: 'post', headers: {'content-type': 'application/json'}}, (res) => console.log(res.statusCode)).end(JSON.stringify({data: {brand: 'VanMoof', color: 'black'}}))"

```

# fastify
```sh
mkdir demo
cd demo
npm init fastify
npm install
npm install fastify-sensible fastify-http-proxy fastify-reply-from got point-to-view handlebars hn-latest-stream fastify-static
```

# epress
```sh
npm install -g express-generator@4
express --hbs express-web-server
cd express-web-server
npm install
```
