# test cmd

```sh
node -e "http.get('http://localhost:3000/bicycle/1', (res) => res.setEncoding('utf8').once('data', console.log))"

node -e "http.request('http://localhost:3000/bicycle/1', { method: 'delete', headers: {'content-type': 'application/json'}}, (res) => console.log(res.statusCode)).end()"

node -e "http.request('http://localhost:3000/bicycle/99', { method: 'put', headers: {'content-type': 'application/json'}}, (res) => console.log(res.statusCode)).end(JSON.stringify({data: {brand: 'VanMoof', color: 'black'}}))"

node -e "http.request('http://localhost:3000/bicycle/99', { method: 'post', headers: {'content-type': 'application/json'}}, (res) => console.log(res.statusCode)).end(JSON.stringify({data: {brand: 'VanMoof', color: 'black'}}))"

```
