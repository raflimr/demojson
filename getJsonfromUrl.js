let url = 'https://my-json-server.typicode.com/raflimr/demojson/dataKoordinat';

fetch(url)
.then(res => res.json())
.then((out) => {
  console.log('Checkout this JSON! ', out);
})
.catch(err => { throw err });