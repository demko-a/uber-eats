'use strict'

const restaurantCards = document.querySelector('.cards');

const getData = async function(url) {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Ошибка по адресу ${url}, 
		статус ошибки ${response.status}!`)
	}

	return await response.json();
}

function createCard({ 
    image, 
    name, 
    kitchens, 
    time_of_delivery: timeOfDelivery }) {
        const cardRow = restaurantCards.querySelector('.row');
        const innerHtml = `
        <div class="col-xs-12 col-md-6 col-lg-4">
            <div class="card">
                <img class="card-img"
                src=${image} alt="${name} img">
                <p class="card-header">
                    ${name}
                </p>
                <p class="card-info">
                    ₽ • 
                    <span class="card-info-kitchens">
                        ${kitchens.join(' • ')}
                    </span>
                </p>
                <p class="card-time">
                    ${timeOfDelivery}
                </p>
            </div>
        </div>
        `;
        cardRow.insertAdjacentHTML('beforeend', innerHtml);
}

function init() {
    getData('./db/restaurants.json').then(data => data.forEach(createCard));
}

init();
