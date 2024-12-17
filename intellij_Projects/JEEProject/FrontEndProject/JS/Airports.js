let token ;
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            username: "Mahdi",
            password: "2006"
        })
    }).then(response => response.json())
        .then(data => {
            token= data.accessToken
            fetchData('http://localhost:8000/airports/get', addAirports);
        })
        .catch(error => console.error('Error fetching data:', error));
});

function fetchData(url, callback) {
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization':`Bearer ${token}` ,
        },
    })
        .then(response => response.json())
        .then(data => {
            callback(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}
function addAirports(data) {
    const airportList = document.getElementById('airportList');

    data.forEach(airport => {
        const col = document.createElement('div');
        col.className = 'col-md-4';

        const card = document.createElement('div');
        card.className = 'card';
        card.style.width = '100%';



        const img = document.createElement('img');
        img.src = `../image/${airport.image}.jpg`;
        img.className = 'card-img-top';
        img.alt = 'Aéroport Image';


        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = airport.name;

        /*const id = document.createElement('p');
        id.className = 'card-text';
        id.textContent = `ID: ${airport.idAeroport}`;*/

        /*const coordinate = document.createElement('p');
        coordinate.className = 'card-text';
        coordinate.innerHTML = `Latitude: ${airport.coordinate.latitude}<br>Longitude: ${airport.coordinate.longitude}`;*/

        const detailsButton = document.createElement('button');
        detailsButton.className = 'btn btn-info';
        detailsButton.textContent = 'DETAILS';

        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'detail';

        const otherDetails = document.createElement('div');
        otherDetails.innerHTML = `<p><b>AIRPORT ID :</b> ${airport.idAeroport}</p>
                                  <p><b>LATITUDE</b> ${airport.coordinate.latitude}</p>
                                  <p><b>LONGITUE:</b> ${airport.coordinate.longitude}</p>
                                  <p><b>NUMBER OF PARKING STANDS:</b> ${airport.nbr_de_solles}</p>`;

        detailsDiv.appendChild(otherDetails);

        detailsDiv.style.display = 'none';

        detailsButton.addEventListener('click', () => {
            detailsDiv.style.display = (detailsDiv.style.display === 'none') ? 'block' : 'none';
        });

        cardBody.appendChild(title);
        //cardBody.appendChild(id);
        //cardBody.appendChild(coordinate);
        cardBody.appendChild(detailsButton);
        cardBody.appendChild(detailsDiv);

        card.appendChild(img);
        card.appendChild(cardBody);

        col.appendChild(card);

        airportList.appendChild(col);
    });
}