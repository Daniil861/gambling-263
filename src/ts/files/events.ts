
import { addMoney, checkRemoveAddClass } from './functions';
import { config_game, startGame, stopAnimation, resetGame, autoMode } from './aviator';
import { startData } from './startData';

// Объявляем слушатель событий "клик"
document.addEventListener('click', (e) => {

	const wrapper = document.querySelector('.wrapper');

	const targetElement = e.target as HTMLElement;

	const money = Number(localStorage.getItem('money'));
	const bet = Number(localStorage.getItem('current-bet'));

	// privacy screen
	if (targetElement.closest('.preloader__button')) {
		location.href = 'main.html';
	}

	// main screen
	if (targetElement.closest('[data-button="privacy"]')) {
		location.href = 'index.html';
	}

	if (targetElement.closest('[data-button="game"]')) {
		wrapper?.classList.add('_game');
	}

	if (targetElement.closest('[data-button="game-home"]')) {
		wrapper?.setAttribute('class', 'wrapper');
	}

	if (targetElement.closest('.footer-aviator__button-box-auto')) {
		const button = targetElement.closest('.footer__button-box-auto [data-footer-button="auto"]');
		if (button) checkRemoveAddClass('.footer__button', '_active', button);

		document.querySelector('.footer-aviator__bet-box')?.classList.add('_hold');
		document.querySelector('.footer-aviator__button-box-auto')?.classList.add('_autobet');
		autoMode();
	}

	if (targetElement.closest('.footer-aviator__button-bet') && config_game.state === 1) {
		document.querySelector('.block-bet')?.classList.add('_hold');
		startGame();
	}

	if (targetElement.closest('.footer-aviator__button-cash') && config_game.state == 2) {
		stopAnimation();
		config_game.state = 3;
		document.querySelector('.footer-aviator__button-cash')?.classList.add('_hold');
		setTimeout(() => {
			addMoney(config_game.current_win, '.score', 500, 1500);
			resetGame();
		}, 2000);
	}

})
