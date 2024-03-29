let myCoin = 100;
let myPoints = 0;
let oppCoin = 100;
let aboutOppCoin = 100;
let oppPoints = 0;
let answer;
let card = 0;
let cardsLeft = 5;
let myWin = 0;
let oppWin = 0;
let oppAgr = 1;
let oppBet;
let oppRandomPlus;
let oppRandomMinus;
let maxCardPoint = 10;  
let valuationPointsAI = 100 / (maxCardPoint * cardsLeft / 2) / 100; //Определение ценности одного очка в данный момент.
let adminPassword;
let adminPanel = false;

console.log(valuationPointsAI);

document.getElementById('cards-left').innerText = 'Осталось карточек: ' + cardsLeft;
document.getElementById('now-card-value').innerText = 'Новая карточка: ' + card;
document.getElementById('my-points').innerText = 'Мои очки: ' + myPoints;
document.getElementById('my-coin').innerText = 'Мои монетки: ' + myCoin;
document.getElementById('opp-points').innerText = 'Очки оппонента: ' + oppPoints;
//document.getElementById('about-opp-coin').innerText = 'Монетки оппонента(макс.): ' + aboutOppCoin;
document.getElementById('opp-coin').innerText = 'Монетки оппонента(Для теста): ' + oppCoin; //hidden="false"
document.getElementById('opp-coin').hidden = true;
document.getElementById('my-win').innerText = 'Мои победы: ' + myWin;
document.getElementById('opp-win').innerText = 'Победы оппонента: ' + oppWin;

function newGame () {               //Новая игра. Доступна если карточки закончились.

    if (cardsLeft > 0) {
        alert("Еще остались карточки, пожалуйста доиграйте");
        return;
    }
    myCoin = 100;
    myPoints = 0;
    oppCoin = 100;
    aboutOppCoin = 100;
    oppPoints = 0;
    cardsLeft = 5;
    

    document.getElementById('cards-left').innerText = 'Осталось карточек: ' + cardsLeft;
    document.getElementById('my-points').innerText = 'Мои очки: ' + myPoints;
    document.getElementById('my-coin').innerText = 'Мои монетки: ' + myCoin;
    document.getElementById('opp-points').innerText = 'Очки оппонента: ' + oppPoints;
    //document.getElementById('about-opp-coin').innerText = 'Монетки оппонента(макс.): ' + aboutOppCoin;
    document.getElementById('opp-coin').innerText = 'Монетки оппонента(Для теста): ' + oppCoin;

    card = getRandomCard(1, maxCardPoint);
    document.getElementById('now-card-value').innerText = 'Новая карточка: ' + card;
}

function getRandomCard(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

getRandomCard();

card = getRandomCard(1, maxCardPoint); 

document.getElementById('now-card-value').innerText = 'Новая карточка: ' + card;

function takeCard () {        //Получить карту. Заплатить за новую карточку если быть точнее. Основная функция.
          
    if (cardsLeft == 0 ) {
        alert('Пожалуйста нажмите "Начать заного"');
        return;
    }    

    answer = prompt('Выпала карточка на ' + card + ' очка(ов). Сколько вы за нее заплатите? Монет осталось: ' + myCoin + '.'); 

    if (answer > myCoin && adminPanel == false) {
        while (answer > myCoin) {
            alert('Нехватает монет!');
            answer = prompt('Выпала карточка на ' + card + ' очка(ов). Сколько вы за нее заплатите? Монет осталось: ' + myCoin + '.'); 

        }
    }

    console.log(answer);
    
    if (answer == null) {
        return;
    }
    
    function getRandomAggression(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }

    function getRandomPlus(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }

    function getRandomMinus(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }

    oppAgr = getRandomAggression(3, 6);
    oppAgr = oppAgr * 0.25;
    console.log("Агрессия: " + oppAgr);

    oppRandomPlus = getRandomPlus(1, 10);
    oppRandomMinus = getRandomMinus(1, 5);
    valuationPointsAI = 100 / (maxCardPoint * cardsLeft / 2) / 100;
    
    if (cardsLeft == 1) {
        oppBet = oppCoin;
    } else if (cardsLeft == 2 && oppPoints <= myPoints) {
        oppBet = Math.round(oppCoin * 0.7 * oppAgr + oppRandomPlus - oppRandomMinus);
    } else if (cardsLeft == 2 && oppPoints > myPoints && oppCoin > myPoints + card) {
        oppBet = Math.round(oppCoin * 0.2 * oppAgr + oppRandomPlus - oppRandomMinus);
    } else if (oppPoints == 0 && myPoints == 0) {
        //oppBet = Math.round(card / (maxCardPoint * cardsLeft / 2) * 100 * oppAgr + oppRandomPlus - oppRandomMinus);
        oppBet = Math.round(oppCoin * card * valuationPointsAI * oppAgr + oppRandomPlus - oppRandomMinus);
    }
    
    else {
        //oppBet = Math.round(card / (maxCardPoint * cardsLeft / 2) * 75 * oppAgr + oppRandomPlus - oppRandomMinus);
        oppBet = Math.round(oppCoin * card * valuationPointsAI * oppAgr + oppRandomPlus - oppRandomMinus);
    }  

    if (oppBet > oppCoin) {
        oppBet = oppCoin;
    }
    
    if (answer > oppBet) {
        myPoints += card;
        document.getElementById('my-points').innerText = 'Мои очки: ' + myPoints;
        myCoin -= answer;
        document.getElementById('my-coin').innerText = 'Мои монетки: ' + myCoin;
        alert("Поздравляю, карточка ваша!");
    } else if (answer == oppBet) {
        alert("Одинаковая ставка, карточка не досталась никому.");
    } else {
        oppPoints += card;
        oppCoin -= oppBet;
        document.getElementById('opp-coin').innerText = 'Монетки оппонента(Для теста): ' + oppCoin;
        document.getElementById('opp-points').innerText = 'Очки оппонента: ' + oppPoints;
        alert("К сожалению карточка досталась оппоненту!");
    }
   
    cardsLeft -= 1;
    document.getElementById('cards-left').innerText = 'Осталось карточек: ' + cardsLeft;

    if (cardsLeft == 0 && myPoints > oppPoints) {
        alert('You WIN!!!');
        myWin += 1;
        document.getElementById('my-win').innerText = 'Мои победы: ' + myWin;
    } else if (cardsLeft == 0 && myPoints < oppPoints) {
        alert('You LOSE!!!');
        oppWin += 1;
        document.getElementById('opp-win').innerText = 'Победы оппонента: ' + oppWin;
    } else if (cardsLeft == 0 && myPoints == oppPoints) {
        alert('Ничья...');
    }

    //document.getElementById('now-card-value').innerText = 'Текущая карточка была: ' + card;
    console.log("Ставка: " + oppBet);
    console.log("Ценность: " + valuationPointsAI);

    card = getRandomCard(1, maxCardPoint);
    if (cardsLeft > 0) {
        document.getElementById('now-card-value').innerText = 'Новая карточка: ' + card;
        } else {
        document.getElementById('now-card-value').innerText = 'Новая карточка: нет';  
        }

}

 function startAdminPanel() {
    if (adminPanel == false) {    
        adminPassword = prompt("Введите пароль");
        if (adminPassword == 22233) {
            document.getElementById('opp-coin').hidden = false;
            adminPanel = true;
        }
    } else {
        alert("Режим разработки отключен.");
        document.getElementById('opp-coin').hidden = true;
        adminPanel = false;
    }
 }




