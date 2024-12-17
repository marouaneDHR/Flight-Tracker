let token;
let airplanes;

document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            username: "Mahdi",
            password: "2006"
        })
    }).then(response => response.json())
        .then(data => {
            token = data.accessToken;
            return fetch('http://localhost:8000/airplanes/get', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        }).then(response => response.json())
        .then(data => {
            airplanes = data;
            addAirplanes(airplanes);
        })
        .catch(error => {
            console.error('Error:', error);
        });

});

    function fetchAndDisplayAirplanes() {
        fetch('http://localhost:8000/airplanes/get', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization':`Bearer ${token}` ,
            },
        }).then(response => response.json())
            .then(data => {
                airplanes = data;
                addAirplanes(airplanes);
            })
            .catch(error => console.error('Error fetching airplanes:', error));
    }

    function addAirplanes(list) {
        var tbody = document.getElementById("AirplaneTableBody");
        tbody.innerHTML = '';

        list.forEach(a => {
            console.log("airplanes : ", a) ;
            var row = tbody.insertRow();

            for (var i = 0; i < 7; i++) {
                var cell = row.insertCell(i);
                switch (i) {
                    case 0:
                        cell.textContent = a.idAvion;
                        break;
                    case 1:
                        cell.textContent = a.name;
                        break;
                    case 2:
                        cell.textContent = a.capacity;
                        break;
                    case 3:
                        cell.textContent = a.consumption;
                        break;
                    case 4:
                        cell.textContent = a.autonomy;
                        break;
                    case 5:
                        cell.textContent = a.typeAvion;
                        break;
                    case 6:
                        var btn = document.createElement("button");
                        btn.type = "button";
                        btn.className = "btn btn-info";
                        btn.innerHTML = "HISTORIC";
                        btn.addEventListener("click", function () {
                            getHistory(a.idAvion);
                        });
                        cell.appendChild(btn);
                        var cell7_2 = row.insertCell(7);
                        cell7_2.className = "d-flex justify-content-between";

                        var btn1 = document.createElement("button");
                        var btn2 = document.createElement("button");
                        btn1.type = "button";
                        btn2.type = "button" ;
                        btn1.className = "btn-danger mr-2";
                        btn2.className = "btn-warning mr-2";
                        btn1.innerHTML = "DELETE";
                        btn2.innerHTML = "UPDATE";
                        btn1.addEventListener("click", function () {
                            supprimerAvion(a.idAvion);
                        });
                        btn2.addEventListener("click", function () {
                            fillUpdateForm(a);
                        });

                        cell7_2.appendChild(btn1);
                        cell7_2.appendChild(btn2);
                        break;
                    default:
                        break;
                }
            }
        });
    }

    function ajouterAvion() {
        const nameElement = document.getElementById('name');
        const typeElement = document.getElementById('type');
        const capacityElement = document.getElementById('capacity');
        const consumptionElement = document.getElementById('consumption').value;
        const autonomyElement = document.getElementById('autonomy').value;
        const latitudeElement = document.getElementById('latitude').value;
        const longitudeElement = document.getElementById('longitude').value;

        if (
            nameElement && typeElement && capacityElement &&
            consumptionElement && autonomyElement &&
            latitudeElement && longitudeElement
        ) {
            const name = nameElement.value;
            const type = typeElement.value;
            const capacity = parseFloat(capacityElement.value);
            const consumption = parseFloat(consumptionElement.value);
            const autonomy = parseFloat(autonomyElement.value);
            const latitude = parseFloat(latitudeElement.value);
            const longitude = parseFloat(longitudeElement.value);

            fetch('http://localhost:8000/airplanes/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}` ,
                },
                body: JSON.stringify({
                    name: name,
                    typeAvion: type,
                    capacity: capacity,
                    consumption: consumption,
                    autonomy: autonomy,
                    coordinate: {
                        latitude: latitude,
                        longitude: longitude,
                    }
                })
            }).then(response => response.text())
                .then(data => {
                    console.log(data);
                    fetchAndDisplayAirplanes();
                })
                .catch(error => {
                    console.error('Erreur:', error);
                })

        }else {
            console.error("Certains éléments n'existent pas dans le DOM.");
        }
    }



    function supprimerAvion(idAvion) {
    console.log("idAvion a supprimé :", idAvion) ;
        fetch(`http://localhost:8000/airplanes/delete/${idAvion}`, {
            method: 'DELETE',
            headers :({
                'Content-type': 'application/json' ,
                'Authorization':`Bearer ${token}` ,
            })
        })
            .then(response => {
                if (response.ok) {
                    alert('Avion supprimé avec succès!');
                    fetchAndDisplayAirplanes();
                } else {
                    alert('Erreur lors de la suppression de l\'avion. Veuillez réessayer.');
                }
            })
            .catch(error => {
                console.error('Erreur lors de la suppression de l\'avion:', error);
                alert('Erreur lors de la suppression de l\'avion. Veuillez réessayer.');
            });
    }

    function fillUpdateForm(airplane) {
        document.getElementById('updateName').value = airplane.name;
        var typeSelect = document.getElementById('updateType');

        for (var i = 0; i < typeSelect.options.length; i++) {
            if (typeSelect.options[i].value === airplane.typeAvion) {
                typeSelect.options[i].selected = true;
                break;
            }
        }

        document.getElementById('updateCapacity').value = airplane.capacity;
        document.getElementById('updateConsumption').value = airplane.consumption;
        document.getElementById('updateAutonomy').value = airplane.autonomy;
        document.getElementById('updateLatitude').value = airplane.coordinate.latitude;
        document.getElementById('updateLongitude').value = airplane.coordinate.longitude;

        $('#updateAirplaneModal').modal('show');

        document.getElementById('updateAirplaneForm').addEventListener('submit', function (event) {
            event.preventDefault();
            updateAvion(airplane.idAvion);
        });
    }


    function updateAvion(idAvion) {
        const updatedName = document.getElementById('updateName').value;
        const updatedType = document.getElementById('updateType').value;
        const updatedCapacity = document.getElementById('updateCapacity').value;
        const updatedConsumption = document.getElementById('updateConsumption').value;
        const updatedAutonomy = document.getElementById('updateAutonomy').value;
        const updatedLatitude = document.getElementById('updateLatitude').value;
        const updatedLongitude = document.getElementById('updateLongitude').value;

        const updatedAirplane = {
            idAvion : idAvion,
            name: updatedName,
            typeAvion: updatedType,
            capacity: updatedCapacity,
            consumption: updatedConsumption,
            autonomy: updatedAutonomy,
            coordinate: {
                latitude: parseFloat(updatedLatitude),
                longitude: parseFloat(updatedLongitude),
            }
        };

        fetch(`http://localhost:8000/airplanes/edit/${idAvion}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}` ,
            },
            body: JSON.stringify({
                idAvion : idAvion ,
                name: updatedName,
                typeAvion: updatedType,
                capacity: updatedCapacity,
                consumption: updatedConsumption,
                autonomy: updatedAutonomy,
                coordinate: {
                    latitude: parseFloat(updatedLatitude),
                    longitude: parseFloat(updatedLongitude),
                }
            }),
        })
            .then(response => {
                if (response.ok) {
                    alert('Avion mis à jour avec succès!');
                    response.json();
                    fetchAndDisplayAirplanes();
                } else {
                    alert('Erreur lors de la mise à jour de l\'avion. Veuillez réessayer.');
                }
            }).then(data =>
                console.log(data)
            ).catch(error => {
                console.error('Erreur lors de la mise à jour de l\'avion:', error);
                alert('Erreur lors de la mise à jour de l\'avion. Veuillez réessayer.');
            });

        $('#updateAirplaneModal').modal('hide');
    }

function getHistory(idAvion) {
    fetch(`http://localhost:8000/airplanes/getFlights/${idAvion}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    }).then(response => response.json())
        .then(data => {
            console.log("Flights : ", data) ;
            showFlightHistoryModal(data);
        })
        .catch(error => console.error('Error fetching flight history:', error));
}

function showFlightHistoryModal(flightHistory) {
    var tbody = document.getElementById("flightHistoryTableBody");
    tbody.innerHTML = '';
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };

    flightHistory.forEach(flight => {
        var row = tbody.insertRow();

        for (var key in flight) {
            if (key !== "altitude") {
                var cell = row.insertCell();
                const formatDate = (timestamp) => {
                    const date = new Date(timestamp);
                    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
                };
                cell.textContent = key === "timeStamp" ? formatDate(flight[key]) : flight[key];
            }
        }
    });

    $('#flightHistoryModal').modal('show');
}

