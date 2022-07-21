 var LeafIcon = L.Icon.extend({
   options: {
       iconSize:     [30, 40],
       shadowSize:   [30, 30],
       iconAnchor:   [22, 94],
       shadowAnchor: [4, 62],
       popupAnchor:  [-3, -76]
   }
});

var iconMasyarakat = new LeafIcon({iconUrl: 'marker-red.png'}),
iconPosko = new LeafIcon({iconUrl: 'marker-blue.png'})

L.icon = function (options) {
return new L.Icon(options);
};

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
     var markerArray1 = []
     var markerArray2 = []
     var markerArray3 = []

     //indeks 0 diskip karena header
     for(i=1;i<values.length;i++){
        var idLokasi = values[i][0];
        var lat = values [i][1];
        var long = values [i][2];
        var namaTempat = values [i][3];
        var keterangan = values [i][4];
        var label = values [i][5];
        var namaTempatReplace = namaTempat.replace(/\s/g, '+')
        var formattedString = keterangan.split(",").join("<br />")
        if (label == "masyarakat"){
             markerArray1.push(L.marker([lat, long], {icon: iconMasyarakat}).bindPopup(`<p><b>${namaTempat}</b><br><a href=https://www.google.com/maps/dir//${namaTempatReplace}/@${lat},${long}>Lokasi</a><br>Dampak:<br>${formattedString}</p>`).openPopup());
        }else if (label == "posko"){
             markerArray2.push(L.marker([lat, long], {icon: iconPosko}).bindPopup(`<p><b>${namaTempat}</b><br><a href=https://www.google.com/maps/dir//${namaTempatReplace}/@${lat},${long}>Lokasi</a><br>Dampak:<br>${formattedString}</p>`).openPopup());
        }else{
             markerArray3.push(L.marker([lat, long], {icon: iconMasyarakat}).bindPopup(`<p><b>${namaTempat}</b><br><a href=https://www.google.com/maps/dir//${namaTempatReplace}/@${lat},${long}>Lokasi</a><br>Dampak:<br>${formattedString}</p>`).openPopup());        }
         //document.getElementById("demo").innerHTML += alamat;
     }
     var masyarakat = L.layerGroup(markerArray1);
     var posko = L.layerGroup(markerArray2);
     var jembatan = L.layerGroup(markerArray3);
     
       var map = L.map('map', {
          center: [-7.2162751,107.8990084],
          zoom: 13,
          layers: [masyarakat, posko, jembatan]
       });

   var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

  
     var layerControl = L.control.layers().addTo(map);
     layerControl.addOverlay(masyarakat, "Masyarakat").addTo(map);
     layerControl.addOverlay(posko, "Posko");
     layerControl.addOverlay(jembatan, "Jembatan");
  
  });



// L.marker([-7.218248255832053, 107.90181558304212]).addTo(map)
// .bindPopup('<b>Titik II</b><br />SDN Regol 10.<br><a href=https://www.google.com/maps/dir//SDN+Regol+10/@-7.218248255832053,107.90181558304212,18.04z>Lokasi</a>').openPopup();


function onMapClick(e) {
popup
.setLatLng(e.latlng)
.setContent('You clicked the map at ' + e.latlng.toString())
.openOn(map);
}