
import { getRandom, getDigFormat, addMoney, deleteMoney, getArrStorrage, saveArrStorrage, checkCollision } from './functions';
import { startData } from './startData';



export function initStartData() {

	if (!localStorage.getItem('money')) {
		localStorage.setItem('money', startData.bank.toString());
	}
	writeScore();

	// if (!localStorage.getItem('resource')) {
	// 	localStorage.setItem('resource', '0');
	// }
	// writeResource();


	if (!localStorage.getItem('current-bet')) {
		localStorage.setItem('current-bet', startData.countBet.toString());
	}
	writeBet();

	// if (!localStorage.getItem('level')) {
	// 	localStorage.setItem('level', '1');
	// }

	// if (!localStorage.getItem('opened-level')) {
	// 	localStorage.setItem('opened-level', '1');
	// }
	// openNewLevel();
}


function writeScore() {
	if (document.querySelectorAll('.score').length) {
		let money = getDigFormat(Number(localStorage.getItem('money')));
		document.querySelectorAll('.score').forEach(el => {
			el.textContent = money;
		})
	}
}

function writeResource() {
	if (document.querySelector('.resource')) {
		let money = getDigFormat(Number(localStorage.getItem('resource')));
		document.querySelectorAll('.resource').forEach(el => {
			el.textContent = money;
		})
	}
}

export function writeBet() {
	if (document.querySelector(startData.nameItemBet)) {
		document.querySelectorAll(startData.nameItemBet).forEach(el => {
			el.textContent = localStorage.getItem('current-bet');
		})
	}
}

export function openNewLevel() {
	const levelsBlocks = document.querySelectorAll('[data-level]');
	const openedLevels = Number(localStorage.getItem('opened-level'));
	if (levelsBlocks.length) {
		for (let i = 0; i < openedLevels; i++) {
			if (levelsBlocks[i].classList.contains('_disabled')) levelsBlocks[i].classList.remove('_disabled');
		}
	}
}


initStartData();


//========================================================================================================================================================
// Функция присвоения случайного класса анимациии money icon
const anim_items = document.querySelectorAll('.icon-game');

function getRandomAnimate() {
	let number = getRandom(0, 3);
	let arr = ['jump', 'scale', 'rotate'];
	let random_item = getRandom(0, anim_items.length);
	anim_items.forEach(el => {
		if (el.classList.contains('_anim-icon-jump')) {
			el.classList.remove('_anim-icon-jump');
		} else if (el.classList.contains('_anim-icon-scale')) {
			el.classList.remove('_anim-icon-scale');
		} else if (el.classList.contains('_anim-icon-rotate')) {
			el.classList.remove('_anim-icon-rotate');
		}
	})
	setTimeout(() => {
		anim_items[random_item].classList.add(`_anim-icon-${arr[number]}`);
	}, 100);
}

if (anim_items.length) {
	setInterval(() => {
		getRandomAnimate();
	}, 20000);
}

//========================================================================================================================================================
//========================================================================================================================================================
//game

interface IConfigCanvas {
	width: number,
	height: number,
	color_line: string,
	xOffset: number,
	yOffset: number
}

interface IConfigGame {
	state: number,
	height_field: number | boolean | undefined,

	current_win: number,

	current_coeff: number,
	airplane_coeff: number,
	start_coeff: number,
	coeff_up: number,

	speed_up: number,
	speed_right: number,

	rotate: number,

	timerId: NodeJS.Timeout | null,
	timerCoeff: NodeJS.Timeout | null,
	timerDraw: NodeJS.Timeout | null,
}

const canvas = document.querySelector('.ctx') as HTMLCanvasElement;
const currentCount = document.querySelector('.footer__current-count') as HTMLElement;
const fieldCoeff = document.querySelector('.field__coeff') as HTMLElement;
const player = document.querySelector('.field__airplane') as HTMLElement;
const blockCoins = document.querySelector('.block-bet__coins') as HTMLElement;
const fieldBody = document.querySelector('.field__body') as HTMLElement;
const buttonCash = document.querySelector('.footer__button-cash') as HTMLElement;

export const config_game: IConfigGame = {
	state: 1, // (1 - готов начать игру, 2 - летим, 3 - проиграли)
	height_field: document.querySelector('.game') ? fieldBody?.clientHeight : false,

	current_win: 0,

	current_coeff: 0,
	airplane_coeff: 1.5,
	start_coeff: 0,
	coeff_up: 0.005,

	speed_up: 0.2,
	speed_right: 0.4,

	rotate: 0,

	timerId: null,
	timerCoeff: null,
	timerDraw: null,
}

const config_canvas: IConfigCanvas = {
	width: 0,
	height: 0,
	color_line: '0',
	xOffset: 50, // параметры, изменяя которые мы отодвигаем точку до которой рисуется канвас у самолета
	yOffset: 70
}
const playerConfig = {
	bottom: 0,
	left: 0,
	rotate: 0
}

if (document.querySelector('.game')) {
	setCanvas();
	drawAirplaneCoeff();
}

function getRandom_2(min: number, max: number) {
	return +(Math.random() * (max - min) + min).toFixed(2);
}

export function drawAirplaneCoeff() {
	const currentCoeff = document.querySelector('.footer__current-bet-coeff');
	if (currentCoeff)
		currentCoeff.textContent = config_game.airplane_coeff.toString();
}

// game logic
export function startGame() {
	compareSizesFieldCanvas();

	config_game.state = 2;
	generateCoeff();

	deleteMoney(Number(localStorage.getItem('current-bet')), '.score');

	document.querySelector('.footer__bet-box')?.classList.add('_hold');

	if (buttonCash?.classList.contains('_hold')) buttonCash?.classList.remove('_hold');

	generateStartSpeed();
	generateLineColor();
	// moovePlayer();
	// intervalCoeff();

	animateFly();
}

function generateCoeff() {
	let state = getRandom(1, 10);
	if (state > 0 && state <= 2) {
		config_game.current_coeff = getRandom_2(1.1, 2);
	} else if (state > 3 && state <= 7) {
		config_game.current_coeff = getRandom_2(2, 4);
	} else if (state > 7) {
		config_game.current_coeff = getRandom_2(4, 7);
	}
	config_game.current_coeff = 1;
}

// function generateStartSpeed() {
// 	config_game.speed_up =  getRandom_2(0.11, 0.25);
// 	config_game.speed_right = getRandom_2(0.4, 0.7);
// }
function generateStartSpeed() {
	config_game.speed_up = getRandom(5, 12) / 100;
	config_game.speed_right = getRandom(20, 35) / 100;
}


function generateLineColor() {
	config_canvas.color_line = `${getRandom(0, 255)},${getRandom(0, 255)},${getRandom(0, 255)}`;
}

// function moovePlayer() {
// 	let bottom = -6;
// 	let left = 0;
// 	let rotate = config_game.rotate;

// 	drawCanvas();

// 	config_game.timerId = setInterval(() => {

// 		if (left <= 15) {
// 			bottom += config_game.speed_up;
// 		} else if (left > 15 && left <= 30) {
// 			bottom += config_game.speed_up * 1.5;
// 		} else if (left > 30 && left <= 45) {
// 			bottom += config_game.speed_up * 2;
// 		} else if (left > 45) {
// 			bottom += config_game.speed_up * 4;
// 		}
// 		left += config_game.speed_right;

// 		if (rotate >= -35) {
// 			rotate -= 0.2;
// 		}

// 		if (!player) return;

// 		player.style.bottom = `${bottom}%`;
// 		player.style.left = `${left}%`;
// 		player.style.transform = `rotate(${rotate}deg)`;

// 		if (config_game.timerId && (left >= 70 || bottom >= 70)) {
// 			clearInterval(config_game.timerId);
// 			player.style.transition = `all 1s ease 0s`;
// 			player.style.transform = `rotate(0deg)`;
// 			document.querySelector('.field__body')?.classList.add('_fly');
// 		}
// 	}, 35);
// }

function moovePlayer() {
	drawCanvas();

	if (!fieldBody.classList.contains('_fly') && config_game.state === 2) {
		if (playerConfig.left <= 15) {
			playerConfig.bottom += config_game.speed_up;
		} else if (playerConfig.left > 15 && playerConfig.left <= 30) {
			playerConfig.bottom += config_game.speed_up * 1.5;
		} else if (playerConfig.left > 30 && playerConfig.left <= 45) {
			playerConfig.bottom += config_game.speed_up * 2;
		} else if (playerConfig.left > 45) {
			playerConfig.bottom += config_game.speed_up * 4;
		}
		playerConfig.left += config_game.speed_right;

		if (playerConfig.rotate >= -35) {
			playerConfig.rotate -= 0.02;
		}

		player.style.bottom = `${playerConfig.bottom}%`;
		player.style.left = `${playerConfig.left}%`;
		player.style.transform = `rotate(${playerConfig.rotate}deg)`;

		if (playerConfig.left >= 70 || playerConfig.bottom >= 70) {
			player.style.transition = `all 1s ease 0s`;
			player.style.transform = `rotate(0deg)`;
			fieldBody.classList.add('_fly');
		}
	}

}

function drawItemToCoord(item: HTMLElement, bottom: number, left: number, rotate: number) {
	item.style.bottom = `${bottom}%`;
	item.style.left = `${left}%`;
	item.style.transform = `rotate(${rotate}deg)`;
}

function animateFly() {
	moovePlayer();
	drawItemToCoord(player, playerConfig.bottom, playerConfig.left, playerConfig.rotate);

	if (config_game.state === 2) encreaseCoeff();
	if (config_game.state > 1) requestAnimationFrame(animateFly);
}


function checkGameOver() {
	if (config_game.start_coeff >= config_game.current_coeff) {
		config_game.state = 3;
		stopAnimation();
		flyAirplaneWhenLoose();
		addLooseColorButtons();

		buttonCash?.classList.add('_hold');

		setTimeout(() => {
			resetGame();
		}, 2000);
	}
}


function addLooseColorButtons() {
	document.querySelector('.footer__body')?.classList.add('_loose');
}

function flyAirplaneWhenLoose() {
	playerConfig.left = 150;
	playerConfig.bottom = 110;
	drawItemToCoord(player, playerConfig.bottom, playerConfig.left, playerConfig.rotate);
	drawCanvas();
}

//========
//canvas
function setCanvas() {
	config_canvas.width = fieldBody.clientWidth;
	config_canvas.height = fieldBody.clientHeight;

	canvas.setAttribute('width', `${config_canvas.width}px`);
	canvas.setAttribute('height', `${config_canvas.height}px`);
}

function compareSizesFieldCanvas() {
	const blockHeight = fieldBody.clientHeight;

	if (blockHeight !== config_canvas.height) setCanvas();

}

function createLineCanvas(x: number, y: number, color: string, start_position: number, lineWidth: number, rx: number, ry: number) {
	let ctx = canvas.getContext('2d');

	if (!ctx) return;

	ctx.lineWidth = lineWidth;

	let gradient = ctx.createLinearGradient(0, config_canvas.height, x, y);

	gradient.addColorStop(0, `rgba(${color},0.1)`);
	gradient.addColorStop(1, `rgba(${color},1)`);
	ctx.strokeStyle = gradient;

	ctx.beginPath();
	ctx.moveTo(start_position, config_canvas.height);
	ctx.quadraticCurveTo(x - rx, y + ry, x, y);

	ctx.stroke();
}

function createShapeCanvas(xTop: number, yTop: number, color: string, rx: number, ry: number) {
	let ctx = canvas.getContext('2d');

	if (!ctx) return;

	const gradient = ctx.createLinearGradient(xTop, yTop, 0, config_canvas.height);

	gradient.addColorStop(0, `rgba(${color},0.6)`);
	gradient.addColorStop(1, `rgba(${color},0.1)`);

	ctx.fillStyle = gradient;


	ctx.beginPath();

	// устанавливаем первую точку фигуры
	ctx.moveTo(0, config_canvas.height);

	// вторая точка - кривая линия, повторяющая основную линию

	ctx.quadraticCurveTo(xTop - rx, yTop + ry, xTop, yTop);

	// третья точка - динамическая
	ctx.lineTo(xTop, config_canvas.height);

	ctx.closePath();

	ctx.fill();
}

function clearCanvas() {
	let ctx = canvas.getContext('2d');
	if (ctx) ctx.clearRect(0, 0, config_canvas.width, config_canvas.height);
}

// function drawCanvas() {
// 	let pin = document.querySelector('.field__pin') as HTMLElement;
// 	let ctx = canvas.getContext('2d');


// 	config_game.timerDraw = setInterval(() => {
// 		if (config_game.state === 3) {
// 			setTimeout(() => {
// 				if (config_game.timerDraw) clearInterval(config_game.timerDraw);
// 			}, 800);
// 		}
// 		let coord_x = pin.getBoundingClientRect().left - config_canvas.xOffset;
// 		let coord_y = pin.getBoundingClientRect().top - config_canvas.yOffset;

// 		if (ctx) {
// 			ctx.clearRect(0, 0, config_canvas.width, config_canvas.height);
// 			createShapeCanvas(coord_x, coord_y, config_canvas.color_line, 10, 15);
// 			createLineCanvas(coord_x, coord_y, config_canvas.color_line, 0, 4, 10, 15);
// 		}
// 	}, 50);
// }

function drawCanvas() {
	let pin = document.querySelector('.field__pin') as HTMLElement;
	let ctx = canvas.getContext('2d');


	// config_game.timerDraw = setInterval(() => {
	if (config_game.state === 3) {
		// setTimeout(() => {
		// if (config_game.timerDraw) clearInterval(config_game.timerDraw);
		// }, 800);
	}
	let coord_x = pin.getBoundingClientRect().left - config_canvas.xOffset;
	let coord_y = pin.getBoundingClientRect().top - config_canvas.yOffset;

	if (ctx) {
		ctx.clearRect(0, 0, config_canvas.width, config_canvas.height);
		createShapeCanvas(coord_x, coord_y, config_canvas.color_line, 10, 15);
		createLineCanvas(coord_x, coord_y, config_canvas.color_line, 0, 4, 10, 15);
	}
	// }, 50);
}

window.addEventListener('resize', () => {
	if (fieldBody) setCanvas();
})
//======
// function intervalCoeff() {
// 	config_game.timerCoeff = setInterval(() => {
// 		config_game.start_coeff += config_game.coeff_up;
// 		drawCurrentCoeff();
// 		drawCurrentCount();
// 		checkGameOver();
// 	}, 20);
// }

function encreaseCoeff() {
	config_game.start_coeff += config_game.coeff_up;
	drawCurrentCoeff();
	drawCurrentCount();
	checkGameOver();
}

function drawCurrentCount() {
	const bet = Number(localStorage.getItem('current-bet'));

	config_game.current_win = Math.floor(bet * config_game.start_coeff * config_game.airplane_coeff);

	currentCount.textContent = config_game.current_win.toString();
}

function drawCurrentCoeff() {
	fieldCoeff.textContent = `${(config_game.start_coeff * 10).toFixed(1)}m`;
}

export function stopAnimation() {
	// if (config_game.timerId) clearInterval(config_game.timerId);
	// if (config_game.timerCoeff) clearInterval(config_game.timerCoeff);
	if (fieldBody.classList.contains('_fly')) fieldBody.classList.remove('_fly');


}

function removeGameColorButtons() {
	if (document.querySelector('.footer__body')?.classList.contains('_loose'))
		document.querySelector('.footer__body')?.classList.remove('_loose');
}

export function resetGame() {
	config_game.current_win = 0;
	config_game.start_coeff = 0;
	config_game.state = 1;

	playerConfig.bottom = -6;
	playerConfig.left = 0;
	playerConfig.rotate = 0;

	player.style.transition = `none`;
	player.style.left = `${playerConfig.left}%`;
	player.style.bottom = `${playerConfig.bottom}%`;
	player.style.transform = `rotate(${playerConfig.rotate}deg)`;

	currentCount.textContent = '0';
	fieldCoeff.textContent = '0m';

	// сбрасываем ставку
	localStorage.setItem('current-bet', '5');
	blockCoins.textContent = localStorage.getItem('current-bet');

	removeGameColorButtons();
	clearCanvas();

	fieldBody.classList.add('_loader');

	if (fieldBody.classList.contains('_fly')) fieldBody.classList.remove('_fly');
	// if (fieldBody.classList.contains('_lose')) fieldBody.classList.remove('_lose');

	setTimeout(() => {
		fieldBody?.classList.remove('_loader');

		if (document.querySelector('.footer__bet-box')?.classList.contains('_hold'))
			document.querySelector('.footer__bet-box')?.classList.remove('_hold');

		if (document.querySelector('.footer__button-box-auto')?.classList.contains('_autobet'))
			document.querySelector('.footer__button-box-auto')?.classList.remove('_autobet');

	}, 5000);
}

export function autoMode() {
	let bet = getRandomBet();
	setTimeout(() => {
		localStorage.setItem('current-bet', bet.toString());
		blockCoins.textContent = localStorage.getItem('current-bet');
	}, 500);
	setTimeout(() => {
		startGame();
	}, 1500);
}

function getRandomBet() {
	let money = Number(localStorage.getItem('money'));
	let random_bet = getRandom(5, money);
	if (random_bet % 5 != 0) {
		random_bet = random_bet - random_bet % 5;
	}
	return random_bet;
}

