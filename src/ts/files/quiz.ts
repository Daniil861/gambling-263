import { addMoney, checkRemoveClass, checkRemoveAddClass } from './functions.js';

//========================================================================================================================================================
// quiz
const quizBody = document.querySelector('.quiz__body');
const gameItems = document.querySelector('.quiz__answers');
const headerQuestion = document.querySelector('.quiz__question') as HTMLElement;
const dataItems = document.querySelectorAll('[data-quiz-item]');
const quizPagination = document.querySelector('.quiz__pagination') as HTMLElement;

export const configQuiz = {
	dificulaty: 'ease', // ease or hard

	currentQuestion: 1,

	playerSelect: 1,

	upBankCount: 30,

	maxQuestions: 5,

	questions: {
		ease: {
			1: {
				text: 'Who is traditionally considered the best player in the history of football?',
				variants: ['Ronaldo', 'Messi', 'Ronaldinho', 'Pele'],
				answer: 4
			},
			2: {
				text: 'What is the name of the challenge hitting the crossbars?',
				variants: ['Crossbar', 'Scissors', 'Rainbow', 'Penalty'],
				answer: 1
			},
			3: {
				text: 'Who is the best player of 2018?',
				variants: ['Messi', 'Modric', 'Neymar', 'Iniesta'],
				answer: 2
			},
			4: {
				text: 'Which of the players has Spanish citizenship?',
				variants: ['Arshavin', 'Messi', 'Marcelo', 'Ronaldo'],
				answer: 3
			},
			5: {
				text: 'Which goal is considered cool?',
				variants: ['On top', 'At the bottom', 'The nine', 'In the top ten'],
				answer: 1
			},
		},
		hard: {
			1: {
				text: 'Which country has won the World Cup most often and how many times?',
				variants: ['Argentina', 'England', 'Uruguay', 'Brazil'],
				answer: 4
			},
			2: {
				text: 'In what year was the USSR national team formed?',
				variants: ['1920', '1928', '1930', '1923'],
				answer: 4
			},
			3: {
				text: 'In what year did the USSR national team win the World Cup?',
				variants: ['1964', '1958', '1986', '1960'],
				answer: 4
			},
			4: {
				text: 'Which Soviet goalkeeper is the owner of the Golden Ball?',
				variants: ['Eduard Streltsov', 'Valery Voronin', 'Igor Kolyvanov', 'Lev Yashin'],
				answer: 4
			},
			5: {
				text: 'In what year was the Russian Football Union formed?',
				variants: ['1990', '1992', '1994', '1987'],
				answer: 2
			},
		},
	}
}

function startGame(item: HTMLElement) {
	gameItems?.classList.add('_hold');

	setTimeout(() => {
		checkCollision(item);
	}, 1000);

	setTimeout(() => {
		checkContinueGame();
	}, 2000);
}


function checkCollision(item: HTMLElement) {
	if (configQuiz.dificulaty === 'ease') {
		if (configQuiz.currentQuestion === 1) {
			if (configQuiz.questions.ease[1].answer === configQuiz.playerSelect) {
				addMoney(configQuiz.upBankCount, '.score', 500, 1500);
				item.classList.remove('_active');
				item.classList.add('_win');
			} else {
				item.classList.remove('_active');
				item.classList.add('_lose');
			}
		} else if (configQuiz.currentQuestion === 2) {
			if (configQuiz.questions.ease[2].answer === configQuiz.playerSelect) {
				addMoney(configQuiz.upBankCount, '.score', 500, 1500);
				item.classList.remove('_active');
				item.classList.add('_win');
			} else {
				item.classList.remove('_active');
				item.classList.add('_lose');
			}
		} else if (configQuiz.currentQuestion === 3) {
			if (configQuiz.questions.ease[3].answer === configQuiz.playerSelect) {
				addMoney(configQuiz.upBankCount, '.score', 500, 1500);
				item.classList.remove('_active');
				item.classList.add('_win');
			} else {
				item.classList.remove('_active');
				item.classList.add('_lose');
			}
		} else if (configQuiz.currentQuestion === 4) {
			if (configQuiz.questions.ease[4].answer === configQuiz.playerSelect) {
				addMoney(configQuiz.upBankCount, '.score', 500, 1500);
				item.classList.remove('_active');
				item.classList.add('_win');
			} else {
				item.classList.remove('_active');
				item.classList.add('_lose');
			}
		} else if (configQuiz.currentQuestion === 5) {
			if (configQuiz.questions.ease[5].answer === configQuiz.playerSelect) {
				addMoney(configQuiz.upBankCount, '.score', 500, 1500);
				item.classList.remove('_active');
				item.classList.add('_win');
			} else {
				item.classList.remove('_active');
				item.classList.add('_lose');
			}
		}
	}
	else if (configQuiz.dificulaty === 'hard') {
		if (configQuiz.currentQuestion === 1) {
			if (configQuiz.questions.hard[1].answer === configQuiz.playerSelect) {
				addMoney(configQuiz.upBankCount, '.score', 500, 1500);
				item.classList.remove('_active');
				item.classList.add('_win');
			} else {
				item.classList.remove('_active');
				item.classList.add('_lose');
			}
		} else if (configQuiz.currentQuestion === 2) {
			if (configQuiz.questions.hard[2].answer === configQuiz.playerSelect) {
				addMoney(configQuiz.upBankCount, '.score', 500, 1500);
				item.classList.remove('_active');
				item.classList.add('_win');
			} else {
				item.classList.remove('_active');
				item.classList.add('_lose');
			}
		} else if (configQuiz.currentQuestion === 3) {
			if (configQuiz.questions.hard[3].answer === configQuiz.playerSelect) {
				addMoney(configQuiz.upBankCount, '.score', 500, 1500);
				item.classList.remove('_active');
				item.classList.add('_win');
			} else {
				item.classList.remove('_active');
				item.classList.add('_lose');
			}
		} else if (configQuiz.currentQuestion === 4) {
			if (configQuiz.questions.hard[4].answer === configQuiz.playerSelect) {
				addMoney(configQuiz.upBankCount, '.score', 500, 1500);
				item.classList.remove('_active');
				item.classList.add('_win');
			} else {
				item.classList.remove('_active');
				item.classList.add('_lose');
			}
		} else if (configQuiz.currentQuestion === 5) {
			if (configQuiz.questions.hard[5].answer === configQuiz.playerSelect) {
				addMoney(configQuiz.upBankCount, '.score', 500, 1500);
				item.classList.remove('_active');
				item.classList.add('_win');
			} else {
				item.classList.remove('_active');
				item.classList.add('_lose');
			}
		}
	}

}

function checkContinueGame() {
	if (configQuiz.currentQuestion < configQuiz.maxQuestions) { // Если все вопросы еще не закончились
		// Увеличиваем метку текущего вопроса
		configQuiz.currentQuestion++;

		// Скрываем вопрос и варианты ответов на 0,5 секунды для бесшовной записи следующего вопроса
		setTimeout(() => {
			goNextQuestion();
		}, 500);

		// Записываем следующий вопрос и варианты ответов, обновляем индикатор текущего вопроса
		setTimeout(() => {
			writeQuestion();
			writeCurrentBullet();
		}, 750);

	} else {
		resetGame();
		showSlotScreen();
	}

	setTimeout(() => {
		checkRemoveClass('[data-quiz-item]', '_active');
		checkRemoveClass('[data-quiz-item]', '_lose');
		checkRemoveClass('[data-quiz-item]', '_win');
	}, 750);


}

export function resetGame() {

	configQuiz.currentQuestion = 1;

	setTimeout(() => {
		writeQuestion();

		gameItems?.classList.remove('_hold');
		writeCurrentBullet();
	}, 1000);

}

function goNextQuestion() {
	quizBody?.classList.add('_hide');

	setTimeout(() => {
		quizBody?.classList.remove('_hide');
		gameItems?.classList.remove('_hold');
	}, 1000);
}

export function writeQuestion() {
	if (configQuiz.dificulaty === 'ease') {
		if (configQuiz.currentQuestion === 1) {
			headerQuestion.textContent = configQuiz.questions.ease[1].text;
			dataItems.forEach((item, idx) => {
				const el = item.querySelector('span');
				if (el) el.textContent = configQuiz.questions.ease[1].variants[idx];
			})
		} else if (configQuiz.currentQuestion === 2) {
			headerQuestion.textContent = configQuiz.questions.ease[2].text;
			dataItems.forEach((item, idx) => {
				const el = item.querySelector('span');
				if (el) el.textContent = configQuiz.questions.ease[2].variants[idx];
			})
		} else if (configQuiz.currentQuestion === 3) {
			headerQuestion.textContent = configQuiz.questions.ease[3].text;
			dataItems.forEach((item, idx) => {
				const el = item.querySelector('span');
				if (el) el.textContent = configQuiz.questions.ease[3].variants[idx];
			})
		} else if (configQuiz.currentQuestion === 4) {
			headerQuestion.textContent = configQuiz.questions.ease[4].text;
			dataItems.forEach((item, idx) => {
				const el = item.querySelector('span');
				if (el) el.textContent = configQuiz.questions.ease[4].variants[idx];
			})
		} else if (configQuiz.currentQuestion === 5) {
			headerQuestion.textContent = configQuiz.questions.ease[5].text;
			dataItems.forEach((item, idx) => {
				const el = item.querySelector('span');
				if (el) el.textContent = configQuiz.questions.ease[5].variants[idx];
			})
		}
	}
	else if (configQuiz.dificulaty === 'hard') {
		if (configQuiz.currentQuestion === 1) {
			headerQuestion.textContent = configQuiz.questions.hard[1].text;
			dataItems.forEach((item, idx) => {
				const el = item.querySelector('span');
				if (el) el.textContent = configQuiz.questions.hard[1].variants[idx];
			})
		} else if (configQuiz.currentQuestion === 2) {
			headerQuestion.textContent = configQuiz.questions.hard[2].text;
			dataItems.forEach((item, idx) => {
				const el = item.querySelector('span');
				if (el) el.textContent = configQuiz.questions.hard[2].variants[idx];
			})
		} else if (configQuiz.currentQuestion === 3) {
			headerQuestion.textContent = configQuiz.questions.hard[3].text;
			dataItems.forEach((item, idx) => {
				const el = item.querySelector('span');
				if (el) el.textContent = configQuiz.questions.hard[3].variants[idx];
			})
		} else if (configQuiz.currentQuestion === 4) {
			headerQuestion.textContent = configQuiz.questions.hard[4].text;
			dataItems.forEach((item, idx) => {
				const el = item.querySelector('span');
				if (el) el.textContent = configQuiz.questions.hard[4].variants[idx];
			})
		} else if (configQuiz.currentQuestion === 5) {
			headerQuestion.textContent = configQuiz.questions.hard[5].text;
			dataItems.forEach((item, idx) => {
				const el = item.querySelector('span');
				if (el) el.textContent = configQuiz.questions.hard[5].variants[idx];
			})
		}
	}


}

function writeCurrentBullet() {
	quizPagination.textContent = `${configQuiz.currentQuestion}/5`;
}

function showSlotScreen() {
	document.querySelector('.wrapper')?.classList.remove('_quiz');
	document.querySelector('.wrapper')?.classList.add('_slot');
}


document.addEventListener('click', (e) => {

	const targetElement = e.target as HTMLElement;

	if (targetElement.closest('[data-quiz-item]') && !targetElement.closest('[data-quiz-item]')?.classList.contains('_active')) {
		const el = targetElement.closest('[data-quiz-item]') as HTMLElement;
		if (el) {
			checkRemoveAddClass('[data-quiz-item]', '_active', el);
			configQuiz.playerSelect = Number(el.getAttribute('data-quizItem'));
			setTimeout(() => {
				startGame(el);
			}, 150);
		}

	}

})