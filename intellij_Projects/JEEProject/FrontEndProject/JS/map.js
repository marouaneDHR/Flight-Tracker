var Coordinates ;
var token ;
var MyIcon = L.icon({
    iconUrl: '../image/Airplane.png',
    iconSize : [35,35],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
})

var map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

document.addEventListener('DOMContentLoaded', ()=> {
    fetch("http://localhost:8000/login", {
        method :"POST",
        headers:({
            "Content-type" : "application/json"
        }),
        body :JSON.stringify({
            username : "Mahdi",
            password : "2006"
        })
    }).then(response => response.json())
        .then(data =>{
            token = data.accessToken ;
            console.log(token) ;
            return fetch("http://localhost:8000/airports/coordinates ",{
                method : 'GET',
                headers:({
                    'Content-type':'application/json',
                    'Authorization' : `Bearer ${token}`
                })
            }).then(response => response.json())
                .then(data =>{
                    Coordinates = data ;
                    console.log(Coordinates)
                    page =
                    Coordinates.forEach(c=>
                        airportsMarker(c.coordinate.latitude, c.coordinate.longitude, c.name)
                    ) ;
                    for(var i=0; i<Coordinates.length; i++){
                        for(var j=1; j<Coordinates.length; j++){
                            Routing(Coordinates[i].coordinate.latitude, Coordinates[i].coordinate.longitude,
                                Coordinates[j].coordinate.latitude, Coordinates[j].coordinate.longitude) ;
                        }
                    }
                })
        })
})

function airportsMarker(latitude, longitude, name){
    L.marker([latitude, longitude], {color: 'blue'})
        .addTo(map)
        .bindPopup(name);
}

function Routing(SLA, SLO, ELA, ELO){
    e = L.latLng(ELA, ELO) ;
    L.geoJSON({
        type: 'LineString',
        coordinates: [
            [SLO, SLA],
            [ELO, ELA]
        ]
    }, {
        style: {
            color: 'blue',
            weight: 1
        }
    }).addTo(map);
}






