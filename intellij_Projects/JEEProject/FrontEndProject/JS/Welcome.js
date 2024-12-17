let map = L.map('map').setView([0, 0], 2);
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
            token = data.accessToken;
            console.log(token) ;
            return fetch("http://localhost:8000/airports/get",{
                method : 'GET',
                headers:({
                    'Content-type':'application/json',
                    'Authorization' : `Bearer ${token}`
                })
            }).then(response => response.json())
                .then(data =>{
                    airports = data
                    console.log(airports) ;


                    return fetch('http://localhost:8000/airplanes/get', {
                        method :'GET',
                        headers:({
                            'Content-type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        })
                    }).then(response => response.json())
                        .then(data =>{
                            airplanes = data;

                            airports.forEach(airport => {
                                airportsMarker(airport.coordinate.latitude, airport.coordinate.longitude);
                            });

                        })
                })
        })
})

function airportsMarker(latitude, longitude){
    return L.marker([latitude, longitude], {color: 'blue'}).addTo(map);
}