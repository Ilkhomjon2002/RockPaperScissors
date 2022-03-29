//-------------Modals
const startingModal = document.querySelector(".start-js");
const afterPickingModal = document.querySelector(".picked-js");
const winLoseModal = document.querySelector(".modal-win-lose");

const handIcons = document.querySelectorAll(".icon-js");

let pickedByUserContainer = document.querySelector(".picked--you-js");
let pickedByHouseContainer = document.querySelector(".picked--house-js");

let wl_pickedByUserContainer = document.querySelector(".wl-picked--you-js");
let wl_pickedByHouseContainer = document.querySelector(".wl-picked--house-js");

const scoreContainer = document.querySelector(".container-score--js");

const count = document.getElementById("counter");

const playAgainBtn = document.querySelector(".play-js");
const playAgainTitle = document.querySelector(".play-again--title");

const rulesBtn = document.querySelector(".rules-btn-js");
const closeRulesBtn = document.querySelector(".close-rules-js");
const rulesWindow = document.querySelector(".rules-alert-window");

let arrayOfIcons = [...handIcons];
let score = +scoreContainer.textContent;
let pickedByUser;
let pickedByHouse;

/*Events*/
/*------Adding event to rules button*/
rulesBtn.addEventListener("click", toggleRulesWindow);

/*------Adding event for closing rules window*/
closeRulesBtn.addEventListener("click", toggleRulesWindow);

playAgainBtn.addEventListener("click", playAgain);

handIcons.forEach((icon) => {
	icon.addEventListener("click", () => {
		let randomIconIndex = randomNum(0, 2);
		let timer = 4;

		pickedByUser = icon.outerHTML;
		pickedByHouse = arrayOfIcons[randomIconIndex].outerHTML;

		pickingByUser();
		let tick = () => {
			timer--;
			count.textContent = timer;
			if (timer === 0) {
				timer = 3;
				count.textContent = 3;
			}
		};
		tick();

		let counter = setInterval(tick, 1000);

		setTimeout(() => {
			pickingByHouse();
			clearInterval(counter);
		}, 3000);

		setTimeout(() => {
			winOrLose();
		}, 4000);
	});
});

/*Functions*/
/*--------Open or Close Rules window */
function toggleRulesWindow() {
	rulesWindow.classList.toggle("d-block");
}
/*--------Makes random number for choosing house  */
function randomNum(min, max) {
	return Math.floor(Math.random() * (max + 1 - min) + min);
}
/*--------Implementing user`s choice */
function pickingByUser() {
	startingModal.style.display = "none";
	afterPickingModal.style.display = "block";
	pickedByUserContainer.innerHTML = "";
	pickedByHouseContainer.innerHTML = "";
	pickedByUserContainer.insertAdjacentHTML("afterbegin", pickedByUser);
}
/*--------Implementing house`s choice */
function pickingByHouse() {
	pickedByHouseContainer.insertAdjacentHTML("afterbegin", pickedByHouse);
}

/* ----------Implementing Restart */
function playAgain() {
	winLoseModal.style.display = "none";
	startingModal.style.display = "block";
	pickedByUser = pickedByHouse = "";
}
//lose function changes play again title
function lose() {
	playAgainTitle.textContent = "You lose";
}

//this function works when user wins and icreases score, changes text of play again title
function win() {
	score++;
	scoreContainer.textContent = score;
	playAgainTitle.textContent = "You Win";
}

/*Checking both sides  */
function checkingIncludes(user, house) {
	return pickedByUser.includes(user) && pickedByHouse.includes(house);
}
/*Opening win or lose modal*/
function winOrLose() {
	//closing 2nd modal and opening win or lose modal
	afterPickingModal.style.display = "none";
	winLoseModal.style.display = "block";

	//clearing default icons and implementing picked ones
	wl_pickedByUserContainer.innerHTML = "";
	wl_pickedByHouseContainer.innerHTML = "";
	wl_pickedByUserContainer.insertAdjacentHTML("afterbegin", pickedByUser);
	wl_pickedByHouseContainer.insertAdjacentHTML("afterbegin", pickedByHouse);

	//logic for checking winner
	if (pickedByHouse === pickedByUser) playAgainTitle.textContent = "Draw";
	//checkingIncludes need 2 arguments (user,house)
	else if (checkingIncludes("rock-js", "paper-js")) lose();
	else if (checkingIncludes("paper-js", "rock-js")) win();
	else if (checkingIncludes("rock-js", "scissors-js")) win();
	else if (checkingIncludes("scissors-js", "rock-js")) lose();
	else if (checkingIncludes("scissors-js", "paper-js")) win();
	else if (checkingIncludes("paper-js", "scissors-js")) lose();
}
