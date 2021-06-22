# test cmd

```sh
#get
node -e "http.get('http://localhost:3000/bicycle/1', (res) => res.setEncoding('utf8').once('data', console.log))"

#delete
node -e "http.request('http://localhost:3000/bicycle/1', { method: 'delete', headers: {'content-type': 'application/json'}}, (res) => console.log(res.statusCode)).end()"

#put
node -e "http.request('http://localhost:3000/bicycle/99', { method: 'put', headers: {'content-type': 'application/json'}}, (res) => console.log(res.statusCode)).end(JSON.stringify({data: {brand: 'VanMoof', color: 'black'}}))"

#post
node -e "http.request('http://localhost:3000/bicycle/99', { method: 'post', headers: {'content-type': 'application/json'}}, (res) => console.log(res.statusCode)).end(JSON.stringify({data: {brand: 'VanMoof', color: 'black'}}))"

```

# fastify (this final example based on fastify framework)
```sh
mkdir demo
cd demo
npm init fastify
npm install
npm install fastify-sensible fastify-http-proxy fastify-reply-from got point-to-view handlebars hn-latest-stream fastify-static
```

# final example
```
/articles:      test for hn-latest-stream lib
/bicycle:       restful api for bicycle model (get, post, put, delete / schema validation)
/deny:          forbide request if request path start from /deny
/hello:         test for view
/mock_bicycle:  communicate with other API
/reply_from:    reply from remote server (/reply_from?url=***)
/stream_data:   pipe stream data
/proxy:         proxy for https://news.ycombinator.com/
```
