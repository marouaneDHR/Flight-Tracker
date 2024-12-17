    let airports ;
    let airplanes ;
    let visited = [];
    let escales = [];
    let token ;
    let Route ;
    let usedAirplane ;
    let Resolve = true , Destination, FlightStart ;
    let StartLatLng, lastPosition, flyState ;
    let GreenIcon = L.icon({
        iconUrl: '../image/NormalAirplane.png',
        iconSize : [35,35],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16]
    })
    let RedIcon = L.icon({
        iconUrl: '../image/RedAirplane.png',
        iconSize : [35,35],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16]
    })
    let airplaneMarker ;

    let map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    document.addEventListener('DOMContentLoaded', ()=> {
        fetch("http://localhost:8000/login", {
            method :"POST",
            headers:({
                'Content-type' : 'application/json'
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
                        addOptions('select1', airports);
                        addOptions('select2', airports);
                        console.log()
                        return fetch('http://localhost:8000/airplanes/get', {
                            method :'GET',
                            headers:({
                                'Content-type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            })
                        }).then(response => response.json())
                            .then(data =>{
                                airplanes = data;
                                console.log(airplanes) ;
                                addOptions('airplaneType', airplanes);
                            })
                    })
            })
    })
    function addOptions(Id, list) {
        var select = document.getElementById(Id);

        var defaultOption = document.createElement('option');
        defaultOption.text = 'SELECT AN OPTION';
        defaultOption.value = '';
        select.add(defaultOption);

        list.forEach(l => {
            var option = document.createElement("option");
            option.text = l.name;
            option.value = l.name;
            select.add(option);
        })
    }

    function addFlight(State, Start, End, Airplane, ESCALES){
        fetch("http://localhost:8000/flights/new",{
            method :'POST',
            headers :({
                'Content-type' : 'application/json' ,
                'Authorization': `Bearer ${token}`,
            }) ,
            body :JSON.stringify({
                idAvion : null ,
                flightState : State,
                altitude : 0 ,
                aeroportDepart : Start ,
                aeroportArrivee : End ,
                airplane : Airplane ,
                airports : ESCALES ,
            })
        }).then(response => response.text())
            .then(data => {})
    }
    function airportsMarker(latitude, longitude,name){
        return L.marker([latitude, longitude], {color: 'blue'})
            .addTo(map)
            .bindPopup(name);
    }

    function Moving(start, end, sn, en) {
         return new Promise(resolve => {
             var startLatLng = L.latLng(start.lat, start.lng);
             var endLatLng = L.latLng(end.lat, end.lng);
             var distance = startLatLng.distanceTo(endLatLng)/1000 ;
             var speed = 2000;
             var duration = (distance/speed)*3600;
             airplaneMarker = L.Marker.movingMarker([startLatLng, endLatLng], [duration], {icon: GreenIcon}).addTo(map) ;

             airplaneMarker.on('end', () => {
                 map.removeLayer(airplaneMarker);
                 map.removeLayer(Marker1);
                 map.removeLayer(Marker2);
                 map.removeLayer(Route);
                 resolve() ;
             });

             Marker1 = airportsMarker(start.lat, start.lng, sn);
             Marker2 = airportsMarker(end.lat, end.lng, en);
             Route = Routing(start.lat, start.lng, end.lat, end.lng);

             airplaneMarker.start();
         })
    }
    function Flight() {
        visited = []
        escales = []
        var start = document.getElementById('select1').value;

        var end = document.getElementById('select2').value;
        airplanes.forEach(a => {
            if(a.name === document.getElementById('airplaneType').value ) {
                usedAirplane = a ;
            }
        })
        airports.forEach(a=>{
            if(a.name === start){
                StartLatLng = a ;
            }
            if(a.name === end) {
                Destination = a;
            }
        })
        flyState = "AUCUN_PROBLEME"
        Fly(start, end, usedAirplane) ;
    }

    async function Fly(start, end, airplane) {
        var SLA, SLO, ELA, ELO, SN, EN, nearOne;
        airports.forEach(c => {
            if (c.name === start) {
                SLA = c.coordinate.latitude;
                SLO = c.coordinate.longitude;
                SN = c.name;
            }
            if (c.name === end) {
                ELA = c.coordinate.latitude;
                ELO = c.coordinate.longitude;
                EN = c.name;
            }
        });

        var SC = L.latLng(SLA, SLO);
        var EC = L.latLng(ELA, ELO);
        var result = CHECK(SLA, SLO, ELA, ELO, airplane);
        if (result === 'DIRECT') {
            await Moving(SC, EC,start, end);
            var airportDepart = document.getElementById("select1").value ;
            var airportDestination = document.getElementById("select2").value ;
            airports.forEach(a=>{
                if(a.name === airportDestination){
                    removePlace(a.idAeroport);
                }
                if(a.name === airportDepart){
                    addPlace(a.idAeroport);
                }
            })
            await addFlight(flyState, airportDepart , airportDestination, airplane, escales);
        } else if (result === 'ESCALE') {
            nearOne = nearAirport(SLA, SLO,airplane, escales, ELA, ELO);
            if(nearOne != null){
                var NOCoordinates = L.latLng(nearOne.coordinate.latitude, nearOne.coordinate.longitude);
                visited.push(start);
                visited.push(nearOne.name)
                await Moving(SC, NOCoordinates, start, nearOne.name);
                escales.push(nearOne);
                await Fly(nearOne.name, EN, airplane, flyState);
            }
            else{
                alert("on ne peut pas continuer le vol avec cet avion! Veuillez choisir un autre type");
            }
        }
    }

    function CHECK(SLA, SLO, ELA, ELO, airplane) {
        var start = L.latLng(SLA, SLO);
        var end = L.latLng(ELA, ELO);
        var distance = start.distanceTo(end) / 1000;
        if (airplane.autonomy >= distance) {
            return 'DIRECT';
        } else {
            return 'ESCALE';
        }
    }

    function Routing(SLA, SLO, ELA, ELO) {
        e = L.latLng(ELA, ELO);
        return L.geoJSON({
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

    async function ChangerDirection() {
        Resolve = false ;
        var problem = document.getElementById("problem");
        problem.style.display = 'none';
        map.eachLayer((layer) => {
            if (layer instanceof L.Marker || layer instanceof L.Marker.MovingMarker || layer === Route) {
                if (layer instanceof L.Marker.MovingMarker) {
                    lastPosition = layer.getLatLng();
                }
                map.removeLayer(layer);
            }
        });
        escales.forEach(e=>{
            visited.push(e.name) ;
        })
        var nearOne = nearAirportProblem(StartLatLng.coordinate.latitude, StartLatLng.coordinate.longitude,lastPosition.lat, lastPosition.lng,
            Destination.coordinate.latitude, Destination.coordinate.longitude,usedAirplane, visited);
        if(nearOne === null){
            alert("AUCUN AEROPORT N'EST ACCESSIBLE DE CE POINT, L'AVION VA CONTINUER DANS CET TRAJECTOIRE");
            var end = L.latLng(Destination.coordinate.latitude, Destination.coordinate.longitude) ;
            var duration = 35000;
            airplaneMarker = L.Marker.movingMarker([lastPosition, end], [duration], {icon: RedIcon}).addTo(map) ;

            airplaneMarker.on('end', () => {
                map.removeLayer(airplaneMarker);
                map.removeLayer(Marker1);
                map.removeLayer(Marker2);
                map.removeLayer(Route);
            });
            Marker1 = airportsMarker(lastPosition.lat, lastPosition.lng, "PROBLEM");
            Marker2 = airportsMarker(Destination.coordinate.latitude, Destination.coordinate.longitude, Destination.name);
            Route = Routing(lastPosition.lat, lastPosition.lng, Destination.coordinate.latitude, Destination.coordinate.longitude);
            airplaneMarker.start();
        }else{
            alert("LA TRAJECTOIRE DE L'AVION VA CHANGER") ;
            var ProblemPosition = L.latLng(lastPosition.lat, lastPosition.lng);
            var newStart = L.latLng(nearOne.coordinate.latitude, nearOne.coordinate.longitude);
            await Moving(ProblemPosition, newStart, "PROBLEM-POSITION", nearOne.name);
            escales = [];
            escales.push(nearOne);
            flyState = "AUCUN_PROBLEME";
            await  Fly(nearOne.name, Destination.name, usedAirplane);
        }
    }

    async function AutochangeDirection() {
        Resolve = false ;
        var problem = document.getElementById("problem");
        problem.style.display = 'none';

        escales.forEach(e=>{
            visited.push(e.name) ;
        })
        var nearOne = nearAirportProblem(StartLatLng.coordinate.latitude, StartLatLng.coordinate.longitude,lastPosition.lat, lastPosition.lng,
                                        Destination.coordinate.latitude, Destination.coordinate.longitude,usedAirplane, visited);
        if(nearOne === null){
            alert("AUCUN AEROPORT N'EST ACCESSIBLE DE CE POINT, L'AVION VA CONTINUER DANS CET TRAJECTOIRE");
            var end = L.latLng(Destination.coordinate.latitude, Destination.coordinate.longitude) ;
            var duration = 35000;
            airplaneMarker = L.Marker.movingMarker([lastPosition, end], [duration], {icon: RedIcon}).addTo(map) ;

            airplaneMarker.on('end', () => {
                map.removeLayer(airplaneMarker);
                map.removeLayer(Marker1);
                map.removeLayer(Marker2);
                map.removeLayer(Route);
            });
            Marker1 = airportsMarker(lastPosition.lat, lastPosition.lng, "PROBLEM");
            Marker2 = airportsMarker(Destination.coordinate.latitude, Destination.coordinate.longitude, Destination.name);
            Route = Routing(lastPosition.lat, lastPosition.lng, Destination.coordinate.latitude, Destination.coordinate.longitude);
            flyState = "PROB_METEO";
            addFlight(flyState, StartLatLng.name, Destination.name,usedAirplane, escales);
            airplaneMarker.start();
        }else{
            alert("LA TRAJECTOIRE DE L'AVION VA CHANGER") ;
            var ProblemPosition = L.latLng(lastPosition.lat, lastPosition.lng);
            var newStart = L.latLng(nearOne.coordinate.latitude, nearOne.coordinate.longitude);
            await Moving(ProblemPosition, newStart, "PROBLEM-POSITION", nearOne.name);
            escales = [];
            escales.push(nearOne);
            flyState = "AUCUN_PROBLEME"
            await  Fly(nearOne.name, Destination.name, usedAirplane);
        }
    }

    function lowSpeed() {
        airplaneMarker.pause();
        airplaneMarker._currentDuration = 50000;
        airplaneMarker.setIcon(RedIcon);
        airplaneMarker.start();
        Resolve = true ;
        flyState = "PROB_METEO"
        var problem = document.getElementById("problem");
        problem.style.display = 'inline';
            setTimeout(()=>{
                if(Resolve === true){
                    map.eachLayer((layer) => {
                        if (layer instanceof L.Marker || layer instanceof L.Marker.MovingMarker || layer === Route) {
                            if (layer instanceof L.Marker.MovingMarker) {
                                lastPosition = layer.getLatLng();
                            }
                            map.removeLayer(layer);
                        }
                    })
                    airplaneMarker.pause();
                    setTimeout(()=>{
                        AutochangeDirection() ;
                    }, 500)
                }
            }, 10000);
    }

    function nearAirport(SLA, SLO, airplane, listeEscale, ELA, ELO) {
        var nearOne ;
        var maxDistanceToAirport = 0;
        var minDistanceToDestination = Infinity;
        var start = L.latLng(SLA, SLO);

        airports.forEach(a => {
            if ((a.coordinate.latitude !== SLA && a.coordinate.longitude !== SLO) && !listeEscale.includes(a.name) && a.name !== FlightStart) {
                var end = L.latLng(a.coordinate.latitude, a.coordinate.longitude);
                if (end) {
                    var distanceToAirport = start.distanceTo(end) / 1000;
                    var distanceToDestination = end.distanceTo(L.latLng(ELA, ELO)) / 1000;
                    if ((airplane.autonomy >= distanceToAirport) && (distanceToAirport >=maxDistanceToAirport) && (distanceToDestination <= minDistanceToDestination)) {
                        maxDistanceToAirport = distanceToAirport;
                        minDistanceToDestination = distanceToDestination ;
                        nearOne = a;
                    }
                } else {
                    console.log("the end don't exists");
                }
            }else {
                nearOne = null ;
            }
        });
        return nearOne ;
    }

    function addAirplane(){
        fetch(`http://localhost:8000/airplanes/new`,{
            method : 'POST',
            headers :({
                'Content-type': 'application/json',
                'Authorization' : `Bearer ${token}`,
            }),
            body: JSON.stringify({
                name: 'test' ,
                typeAvion: 'SHORT' ,
                capacity : 0,
                consumption : 0,
                ActualConsumption : 0,
                qtiteCarburant : 0,
                autonomy : 0 ,
                coordinate:({
                    latitude:0,
                    longitude:0,
                }),
                z:0,
                TargetAltitude : 0 ,
            })
        }) .then(response => response.text())
            .then(data => {
                console.log(data) ;
            }) ;
    }

    function  removePlace(idAvion){
        fetch(`http://localhost:8000/airports/removePlace/${idAvion}`,{
            method :"POST" ,
            headers:({
                'Content-type' : 'application/json' ,
                'Authorization' : `Bearer ${token}`,
            }),
        }).then(response => response.text())
            .then(data =>{
                console.log(data) ;
            })
    }

    function  addPlace(idAvion){
        fetch(`http://localhost:8000/airports/addPlace/${idAvion}`,{
            method :"POST" ,
            headers:({
                'Content-type' : 'application/json' ,
                'Authorization' : `Bearer ${token}`,
            }),
        }).then(response => response.text())
            .then(data =>{
                console.log(data) ;
            })
    }

    function nearAirportProblem(SLA, SLO, PLA, PLO, ELA, ELO,airplane, listeEscale){
        var nearOne ;
        var maxDistanceToAirport = 0;
        var minDistanceToDestination = Infinity;
        var start = L.latLng(SLA, SLO);
        var problem = L.latLng(PLA, PLO) ;
        airports.forEach(a => {
            if ((a.coordinate.latitude !== SLA && a.coordinate.longitude !== SLO) && !listeEscale.includes(a.name) && a.name !== FlightStart) {
                var end = L.latLng(a.coordinate.latitude, a.coordinate.longitude);
                if (end) {
                    var distanceFromStart = start.distanceTo(problem) / 1000;
                    var distanceToAirport = problem.distanceTo(end) / 1000;
                    var distanceToDestination = end.distanceTo(L.latLng(ELA, ELO)) / 1000;
                    var newAutonomy = airplane.autonomy - distanceFromStart;
                    if ((newAutonomy >= distanceToAirport) && (distanceToAirport >=maxDistanceToAirport) && (distanceToDestination <= minDistanceToDestination)) {
                        maxDistanceToAirport = distanceToAirport;
                        minDistanceToDestination = distanceToDestination ;
                        nearOne = a;
                    }
                } else {
                    console.log("the end don't exists");
                }
            }else {
                nearOne = null ;
            }
        });
        return nearOne ;
    }





