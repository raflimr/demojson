var map = L.map('map').setView([-7.2162751,107.8990084], 13);


var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.on('click', onMapClick);  
let url = 'https://sheets.googleapis.com/v4/spreadsheets/1aDehMv2GQmEc6fIeqVfe-MzmwW1pPn3-VYq0cZzQBHo/values/Sheet1?alt=json&key=AIzaSyBfOuQVlrsQdFGA6SInNiyjitEQgiVWwAU';

fetch(url)
.then(response => {
    return response.json();
  })
  .then(data => {
     return data.values; 
  })
  .then(values => {
     console.log(values);
     console.log(values.length);

     //indeks 0 diskip karena header
     for(i=1;i<values.length;i++){
        var idLokasi = values[i][0];
        var lat = values [i][1];
        var long = values [i][2];
        var namaTempat = values [i][3];
        var keterangan = values [i][4];
        var namaTempatReplace = namaTempat.replace(/\s/g, '+')


        console.log(namaTempat);
        L.marker([lat, long]).addTo(map)
        .bindPopup(`<p><b>${namaTempat}</b><br><a href=https://www.google.com/maps/dir//${namaTempatReplace}/@${lat},${long}>Lokasi</a><br>${keterangan}</p>`).openPopup();
        
    
         //document.getElementById("demo").innerHTML += alamat;
     }
  }
  );


// L.marker([-7.218248255832053, 107.90181558304212]).addTo(map)
// .bindPopup('<b>Titik II</b><br />SDN Regol 10.<br><a href=https://www.google.com/maps/dir//SDN+Regol+10/@-7.218248255832053,107.90181558304212,18.04z>Lokasi</a>').openPopup();


function onMapClick(e) {
popup
.setLatLng(e.latlng)
.setContent('You clicked the map at ' + e.latlng.toString())
.openOn(map);
}