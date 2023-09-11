import { deleteMoney, noMoney, checkRemoveAddClass, getDigFormat } from "./functions";
import { startData } from "./startData";
import { config_game, drawAirplaneCoeff } from './script';


const heroItems = document.querySelectorAll('[data-hero] img');


const dataPrice1 = document.querySelector('[data-price="1"]');
const dataPrice2 = document.querySelector('[data-price="2"]');
const dataPrice3 = document.querySelector('[data-price="3"]');

const dataItem1 = document.querySelector('[data-item="1"]') as HTMLElement;
const buttonItem1 = dataItem1?.querySelector('[data-shop-button]');

const dataItem2 = document.querySelector('[data-item="2"]') as HTMLElement;
const buttonItem2 = dataItem2?.querySelector('[data-shop-button]');

const dataItem3 = document.querySelector('[data-item="3"]') as HTMLElement;
const buttonItem3 = dataItem3?.querySelector('[data-shop-button]');



if (document.querySelector('.shop')) {
	drawStartItem();
	drawStartCurrentItem();
	drawPrices();
	checkBoughtItems();
	removeSelectedItems();
	writeSelected();
}

function drawStartItem() {
	if (!localStorage.getItem('item-1')) localStorage.setItem('item-1', '1');
}
export function drawStartCurrentItem() {
	if (!localStorage.getItem('current-item')) localStorage.setItem('current-item', '1');
}

function drawPrices() {
	dataPrice1 ? dataPrice1.textContent = getDigFormat(startData.prices.price_1) : false;
	dataPrice2 ? dataPrice2.textContent = getDigFormat(startData.prices.price_2) : false;
	dataPrice3 ? dataPrice3.textContent = getDigFormat(startData.prices.price_3) : false;
}

function checkBoughtItems() {

	if (localStorage.getItem('item-1')) {
		if (dataItem1 && !dataItem1.classList.contains('_selected') && buttonItem1) {
			const span = buttonItem1.querySelector('span');
			if (span) span.textContent = 'Select';
		}
		dataItem1.classList.add('_bought');
	}
	if (localStorage.getItem('item-2')) {
		if (dataItem2 && !dataItem2.classList.contains('_selected') && buttonItem2) {
			const span = buttonItem2.querySelector('span');
			if (span) span.textContent = 'Select';
		}
		dataItem2.classList.add('_bought');
	}
	if (localStorage.getItem('item-3')) {
		if (dataItem3 && !dataItem3.classList.contains('_selected') && buttonItem3) {
			const span = buttonItem3.querySelector('span');
			if (span) span.textContent = 'Select';
		}
		dataItem3.classList.add('_bought');
	}

}

function removeSelectedItems() {
	const blocks = document.querySelectorAll('[data-item]');

	blocks.forEach(block => {
		if (block.classList.contains('_selected')) block.classList.remove('_selected');
	})
}

function writeSelected() {
	document.querySelectorAll('[data-shop-button]').forEach(btn => {
		if (btn.closest('._bought') && !btn.closest('._selected')) {
			const span = btn.querySelector('span');
			if (span) span.textContent = 'Select';
		}
	})

	if (Number(localStorage.getItem('current-item')) === 1 && buttonItem1) {
		const span = buttonItem1.querySelector('span');
		if (span) span.textContent = 'Selected';
		dataItem1.classList.add('_selected');
	} else if (Number(localStorage.getItem('current-item')) === 2 && buttonItem2) {
		const span = buttonItem2.querySelector('span');
		if (span) span.textContent = 'Selected';
		dataItem2.classList.add('_selected');
	} else if (Number(localStorage.getItem('current-item')) === 3 && buttonItem3) {
		const span = buttonItem3.querySelector('span');
		if (span) span.textContent = 'Selected';
		dataItem3.classList.add('_selected');
	}
	writeCurrentHero();
	drawCurrentHeroCoeff(Number(localStorage.getItem('current-item')));
}

function writeCurrentHero() {
	const currentItem = Number(localStorage.getItem('current-item'));

	if (currentItem > 0 && heroItems.length) {
		heroItems.forEach(image => {
			image.setAttribute('src', `img/shop/shop-${currentItem}.png`);
		})

	}

}

function drawCurrentHeroCoeff(item: number) {
	if (item === 1) config_game.airplane_coeff = 1;
	else if (item === 2) config_game.airplane_coeff = 1.25;
	else if (item === 3) config_game.airplane_coeff = 1.5;
	drawAirplaneCoeff();
}

//========================================================================================================================================================
document.addEventListener('click', (e) => {

	const wrapper = document.querySelector('.wrapper');
	const targetElement = e.target as HTMLElement;
	const money = Number(localStorage.getItem('money'));

	if (targetElement.closest('[data-button="shop-home"]')) {
		wrapper?.classList.remove('_shop');
	}

	if (targetElement.closest('[data-button="shop"]')) {
		wrapper?.classList.add('_shop');
	}

	//===============
	// if (targetElement.closest('[data-shop-button="1"]')) {
	// 	if (money > startData.prices.price_1) {
	// 		deleteMoney(startData.prices.price_1, '.score');

	// 		localStorage.setItem('thing-3', true);
	// 	} else noMoney('.score');

	// }

	// if (targetElement.closest('[data-shop-button="2"]')) {
	// 	if (money > startData.prices.price_2) {
	// 		deleteMoney(startData.prices.price_2, '.score');
	// 		localStorage.setItem('thing-4', true);
	// 	} else noMoney('.score');
	// }

	// if (targetElement.closest('[data-shop-button="3"]') && !configGame.busters.isBonus_3_Buying) {
	// 	if (money > startData.prices.price_3) {
	// 		deleteMoney(startData.prices.price_3, '.score');
	// 		configGame.busters.isBonus_3_Buying = true;
	// 		addHoldIfBuyingBonus();
	// 	} else noMoney('.score');
	// }

	// if (targetElement.closest('.buster-item__button')) {
	// 	if (money >= startData.prices.price_5) {
	// 		deleteMoney(startData.prices.price_5, '.score');
	// 		let buster_5 = +localStorage.getItem('buster-5');
	// 		localStorage.setItem('buster-5', buster_5 + 1);
	// 		writeBusters();
	// 	} else noMoney('.score');
	// }


	if (targetElement.closest('[data-shop-button="1"]') && !dataItem1?.classList.contains('_bought')) {
		if (money >= startData.prices.price_1) {
			deleteMoney(startData.prices.price_1, '.score');
			localStorage.setItem('item-1', 'true');
			checkBoughtItems();
			writeSelected();
		} else noMoney('.score');
	} else if (targetElement.closest('[data-shop-button="1"]') && dataItem1?.classList.contains('_bought')) {
		checkRemoveAddClass('[data-item]', '_selected', dataItem1);
		localStorage.setItem('current-item', '1');
		writeSelected();
	}

	if (targetElement.closest('[data-shop-button="2"]') && !dataItem2?.classList.contains('_bought')) {
		if (money >= startData.prices.price_2) {
			deleteMoney(startData.prices.price_2, '.score');
			localStorage.setItem('item-2', 'true');
			checkBoughtItems();
		} else noMoney('.score');
	} else if (targetElement.closest('[data-shop-button="2"]') && dataItem2?.classList.contains('_bought')) {
		checkRemoveAddClass('[data-item]', '_selected', dataItem2);
		localStorage.setItem('current-item', '2');
		writeSelected();
	}

	if (targetElement.closest('[data-shop-button="3"]') && !dataItem3?.classList.contains('_bought')) {
		if (money >= startData.prices.price_3) {
			deleteMoney(startData.prices.price_3, '.score');
			localStorage.setItem('item-3', 'true');
			checkBoughtItems();
		} else noMoney('.score');
	} else if (targetElement.closest('[data-shop-button="3"]') && dataItem3?.classList.contains('_bought')) {
		checkRemoveAddClass('[data-item]', '_selected', dataItem3);
		localStorage.setItem('current-item', '3');
		writeSelected();
	}

})


