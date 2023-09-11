
import { IStore } from '../../types';


/* Проверка мобильного браузера */
export let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

/* Добавление класса touch для HTML если браузер мобильный */
export function addTouchClass() {
	// Добавление класса _touch для HTML если браузер мобильный
	if (isMobile.any()) document.documentElement.classList.add('touch');
}

// Добавление loaded для HTML после полной загрузки страницы
export function addLoadedClass() {
	window.addEventListener("load", function () {
		if (document.querySelector('body')) {
			setTimeout(function () {
				document.querySelector('body')?.classList.add('_loaded');
			}, 200);
		}
	});
}

// Получение хеша в адресе сайта
export function getHash() {
	if (location.hash) { return location.hash.replace('#', ''); }
}

// Указание хеша в адресе сайта
export function setHash(hash: string) {
	hash = hash ? `#${hash}` : window.location.href.split('#')[0];
	history.pushState('', '', hash);
}

// Вспомогательные модули блокировки прокрутки и скочка ====================================================================================================================================================================================================================================================================================
export let bodyLockStatus = true;

export let bodyLockToggle = (delay: number = 500) => {
	if (document.documentElement.classList.contains('lock')) {
		bodyUnlock(delay);
	} else {
		bodyLock(delay);
	}
}

export let bodyUnlock = (delay: number = 500) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index] as HTMLElement;
				el.style.paddingRight = '0px';
			}
			if (body) body.style.paddingRight = '0px';
			document.documentElement.classList.remove("lock");
		}, delay);
		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}
export let bodyLock = (delay: number = 500) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {

		let lock_padding = document.querySelectorAll("[data-lp]");

		const wrapper = document.querySelector('.wrapper') as HTMLElement;

		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index] as HTMLElement;
			el.style.paddingRight = window.innerWidth - wrapper.offsetWidth + 'px';
		}

		if (body) body.style.paddingRight = window.innerWidth - wrapper.offsetWidth + 'px';
		document.documentElement.classList.add("lock");

		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}

//================================================================================================================================================================================================================================================================================================================
// Прочие полезные функции ================================================================================================================================================================================================================================================================================================================
//================================================================================================================================================================================================================================================================================================================

// Получить цифры из строки
export function getDigFromString(item: string) {
	return parseInt(item.replace(/[^\d]/g, ''))
}

// Форматирование цифр типа 100 000 000
export function getDigFormat(item: number) {
	const separator = ',';
	return item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, `$1${separator}`);
}

// Убрать класс из всех элементов массива
export function removeClasses(array: Element[], className: string) {
	for (var i = 0; i < array.length; i++) {
		array[i].classList.remove(className);
	}
}

//================================================================================================================================================================================================================================================================================================================
//========================================================================================================================================================
// Функции
export function deleteMoney(count: number, block: string, storrName: string = 'money') {
	const money = localStorage.getItem(storrName);
	const items = document.querySelectorAll(block);
	if (money) {
		const newMoney = +money - count;
		localStorage.setItem(storrName, newMoney.toString());

		const newMoneyCountString = localStorage.getItem(storrName);
		const newMoneyCountNumber = +newMoneyCountString!;
		let moneyNew = getDigFormat(newMoneyCountNumber);

		if (items.length > 0) {
			items.forEach(el => {
				el.classList.add('_delete-money');
				el.textContent = moneyNew;
			});
			setTimeout(() => {
				items.forEach(el => el.classList.remove('_delete-money'));
			}, 1400);
		}
	}

}

export function addRemoveClass(block: string, className: string, delay: number) {
	document.querySelector(block)?.classList.add(className);
	setTimeout(() => {
		document.querySelector(block)?.classList.remove(className);
	}, delay);
}

export function checkRemoveAddClass(block: string, className: string, item: Element) {
	document.querySelectorAll(block).forEach(item => item.classList.remove(className));
	item.classList.add(className);
}

export function checkRemoveClass(block: string, className: string) {
	document.querySelectorAll(block).forEach(item => item.classList.remove(className));
}

export function noMoney(block: string) {
	document.querySelectorAll(block).forEach(el => el.classList.add('_no-money'));
	setTimeout(() => {
		document.querySelectorAll(block).forEach(el => el.classList.remove('_no-money'));
	}, 1400);
}

export function getRandom(min: number, max: number) {
	return Math.floor(Math.random() * (max - min) + min);
}

export function addMoney(count: number, block: string, delay: number, delayOff: number, storrName: string = 'money') {
	const startMoneyStr = localStorage.getItem('money');

	if (startMoneyStr) {
		const startMoneyNumber = +startMoneyStr;
		const newMoneyNumber = Math.floor(startMoneyNumber + count);
		setTimeout(() => {
			localStorage.setItem('money', newMoneyNumber.toString());
			document.querySelectorAll(block).forEach(el => el.textContent = getDigFormat(newMoneyNumber));
			document.querySelectorAll(block).forEach(el => el.classList.add('_anim-add-money'));
		}, delay);
		setTimeout(() => {
			document.querySelectorAll(block).forEach(el => el.classList.remove('_anim-add-money'));
		}, delayOff);
	}

}

export function addResource(count: number, block: string, delay: number, delayOff: number, storrName: string = 'resource') {
	const startMoneyStr = localStorage.getItem('resource');

	if (startMoneyStr) {
		const startMoneyNumber = +startMoneyStr;
		const newMoneyNumber = Math.floor(startMoneyNumber + count);
		setTimeout(() => {
			localStorage.setItem('resource', newMoneyNumber.toString());
			document.querySelectorAll(block).forEach(el => el.textContent = getDigFormat(newMoneyNumber));
			document.querySelectorAll(block).forEach(el => el.classList.add('_anim-add-money'));
		}, delay);
		setTimeout(() => {
			document.querySelectorAll(block).forEach(el => el.classList.remove('_anim-add-money'));
		}, delayOff);
	}
}


export function translToPercent(all: number, current: number) {
	return (100 * current) / all;
}

export function shuffle(array: number[]) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

// ========== Работа с сохранением массива/объекта в памяти браузера
// Сохраняем изначальный массив
export function saveArrStorrage(arr: object, name: string) {
	localStorage.setItem(name, JSON.stringify(arr));
}

// Добавляем значение в созданный массив
export function addNumberStorrage(name: string, number: number) {
	let arr = getArrStorrage(name);

	if (arr) {
		arr.push(number);
		saveArrStorrage(arr, name);
	}
}

// Получаем массив из памяти
export function getArrStorrage(name: string, sort = false) {
	if (!name) return false;
	const arrJson = localStorage.getItem(name);
	if (arrJson) {
		let arr: number[] = JSON.parse(arrJson);

		if (sort) {
			let numbers = arr;
			numbers.sort(function (a, b) {
				return a - b;
			});
			return numbers;
		}
		return arr;
	}

}

// Замкнутая функция - возвращаем массив случайных чисел
// В аргументах - числа диапазон формирования от и до.
// В зависимости от того, сколько нужно случайных чисел - дописать условия if с нужной длиной массива

//new version - внутри функции задать какая длина массива должна быть, в аргументах задать диапазон цифр
// mn - число от, mx - число до, length - длина массива

export function getRandomNumArr(mn: number, mx: number, length: number): number[] {

	const arr: number[] = [];
	let count = 0;

	function back(): any {
		if (count === length) {
			return arr;
		}

		if (arr.length === 0) {
			const num1 = getRandom(mn, mx);
			arr.push(num1);
			count++;
		}

		if (arr.length === count) {
			const num = getRandom(mn, mx);
			if (arr.includes(num)) {
				return back();
			}
			arr.push(num);
			count++;
			return back();
		}
		return [];
	}

	return back();
}

// let randomArr = getRandomNumArr(1, 30, 10);
// console.log(randomArr);


interface CheckCollision {
	x: number,
	y: number,
	width: number,
	height: number
}

export function checkCollision(rect1: CheckCollision, rect2: CheckCollision) {
	return (
		rect1.x < rect2.x + rect2.width &&
		rect1.x + rect1.width > rect2.x &&
		rect1.y < rect2.y + rect2.height &&
		rect1.y + rect1.height > rect2.y
	)
}

// Проверка на коллизию определенной стороны. Первый аргумент - не движимый объект, столкновение со стороной которого мы проверяем.
export function checkObjectRightCollision(rect1: CheckCollision, rect2: CheckCollision) {
	if (rect1.x + rect1.width <= rect2.x + 5 && rect1.y - 5 <= rect2.y + rect2.height && rect1.y + rect1.height + 5 > rect2.y) {
		return (
			rect1.x + rect1.width > rect2.x
		)
	}
}

export function checkObjectLeftCollision(rect1: CheckCollision, rect2: CheckCollision) {
	if (rect1.x >= rect2.x + rect2.width - 5 && rect1.y - 5 <= rect2.y + rect2.height && rect1.y + rect1.height + 5 > rect2.y) {
		return (
			rect1.x < rect2.x + rect2.width
		)
	}
}

export function checkObjectTopCollision(rect1: CheckCollision, rect2: CheckCollision) {
	if (rect1.y + 5 >= rect2.y + rect2.height && rect1.x + rect1.width - 5 > rect2.x && rect1.x - 5 < rect2.x + rect2.width) {
		return (
			rect1.y < rect2.y + rect2.height
		)
	}
}

export function checkObjectDownCollision(rect1: CheckCollision, rect2: CheckCollision) {
	if (rect1.y + rect1.height + 2 >= rect2.y && rect1.x + rect1.width - 5 > rect2.x && rect1.x - 5 < rect2.x + rect2.width) {
		return (
			rect1.y + rect1.height > rect2.y
		)
	}
}