let myCoin = 100;
let myPoints = 0;
let oppCoin = 100;
let aboutOppCoin = 100;
let oppPoints = 0;
let answer;
let card;
let cardsLeft = 5;
let myWin = 0;
let oppWin = 0;
let oppAgr = 1;
let oppBet;

document.getElementById('cards-left').innerText = 'Осталось карточек: ' + cardsLeft;
document.getElementById('now-card-value').innerText = 'Текущая карточка была: ' + card;
document.getElementById('my-points').innerText = 'Мои очки: ' + myPoints;
document.getElementById('my-coin').innerText = 'Мои монетки: ' + myCoin;
document.getElementById('opp-points').innerText = 'Очки оппонента: ' + oppPoints;
document.getElementById('about-opp-coin').innerText = 'Монетки оппонента(макс.): ' + aboutOppCoin;
document.getElementById('opp-coin').innerText = 'Монетки оппонента(Для теста): ' + oppCoin;
document.getElementById('my-win').innerText = 'Мои победы: ' + myWin;
document.getElementById('opp-win').innerText = 'Победы оппонента: ' + oppWin;

function newGame () {

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
    document.getElementById('about-opp-coin').innerText = 'Монетки оппонента(макс.): ' + aboutOppCoin;
    document.getElementById('opp-coin').innerText = 'Монетки оппонента(Для теста): ' + oppCoin;
}


function takeCard () {

    if (cardsLeft == 0 ) {
        alert('Пожалуйста нажмите "Начать заного"');
        return;
    }

    function getRandomCard(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
    }
    
    
    card = getRandomCard(1, 10); 
    answer = +prompt('Выпала карточка на ' + card + ' очка(ов). Сколько вы за нее заплатите?');

    function getRandomAggression(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }

    oppAgr = getRandomAggression(1, 5);

    
    if (cardsLeft == 1) {
        oppBet = oppCoin;
    } else if (cardsLeft == 2 && oppPoints < myPoints) {
        oppBet = Math.round(0.7 * oppCoin);
    }
    
    else {
        oppBet = 5;
    }  

    if (answer > oppBet) {
        myPoints += card;
        document.getElementById('my-points').innerText = 'Мои очки: ' + myPoints;
        myCoin -= answer;
        document.getElementById('my-coin').innerText = 'Мои монетки: ' + myCoin;
    } else if (answer == oppBet) {
        alert("Одинаковая ставка, карточка не досталась никому.");
    } else {
        oppPoints += card;
        oppCoin -= oppBet;
        document.getElementById('opp-coin').innerText = 'Монетки оппонента(Для теста): ' + oppCoin;
        document.getElementById('opp-points').innerText = 'Очки оппонента: ' + oppPoints;
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
    }

    document.getElementById('now-card-value').innerText = 'Текущая карточка была: ' + card;
    console.log(oppBet);

}

 



