'use strict'

const restaurantCards = document.querySelector('.cards');
const goodsContainer = document.querySelector('.goods').querySelector('.container');

const getData = async function(url) {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Ошибка по адресу ${url}, 
		статус ошибки ${response.status}!`)
	}

	return await response.json();
}

function createRestaurantCard({ 
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

function createCategoryElement({category_id, name}) {
    const category = document.createElement('h3');
    category.id = category_id;
    category.className = 'goods-category';
    category.textContent = name;
    return category;
}

function addCategoryInNavigation({category_id, name}) {
    const menuNavList = document.querySelector('.menu-nav-list');
    const innerHtml = `
        <li class="menu-nav-item">
            <a class="menu-nav-item-link" href="#${category_id}">
                ${name}
            </a>
        </li> 
    `;
    menuNavList.insertAdjacentHTML('beforeend', innerHtml);
}

function createGoodCategory({
    category_id,
    name,
    goods}) {
        const categoryElem = createCategoryElement({category_id, name});
        goodsContainer.insertAdjacentElement('beforeend', categoryElem);
        addCategoryInNavigation({category_id, name});

        let innerHtml = ``;
        if (goods.length) {
            const rowElem = document.createElement("div");
            rowElem.className = "row";
            
            function createGoodCard({
                name,
                description,
                cost,
                img
            }) {
                innerHtml = `
                    <div class="col-xs-12 col-sm-6">
                        <div class="good-card">
                            <div class="good-info">
                                <div class="good-info__up">
                                    <h4 class="good-name">${name}</h4>
                                    <div class="good-description">${description}</div>
                                </div>
                                <p class="good-cost good-info__down">${cost} ₽</p>
                            </div>
                            <img class="good-img" src="${img}" alt="${name}">
                        </div>
                    </div>
                `;
    
                rowElem.insertAdjacentHTML('beforeend', innerHtml);
            }
    
            goods.forEach(createGoodCard);  
            categoryElem.insertAdjacentElement('afterend', rowElem);
        }
        else {
            innerHtml = `
            <div class="good-description">
                В этой категории еще нет блюд. Загляните позже :)
            </div>`;
            categoryElem.insertAdjacentHTML('afterend', innerHtml);
        }
}

function init() {
    getData('./db/restaurants.json').then(data => data.forEach(createRestaurantCard));
    getData('./db/goods.json').then(data => data.forEach(createGoodCategory));
}

init();
