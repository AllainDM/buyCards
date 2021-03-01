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

document.getElementById('cards-left').innerText = 'Осталось карточек: ' + cardsLeft;
document.getElementById('my-points').innerText = 'Мои очки: ' + myPoints;
document.getElementById('my-coin').innerText = 'Мои монетки: ' + myCoin;
document.getElementById('opp-points').innerText = 'Очки оппонента: ' + oppPoints;
document.getElementById('about-opp-coin').innerText = 'Монетки оппонента(макс.): ' + aboutOppCoin;
document.getElementById('my-win').innerText = 'Мои победы: ' + myWin;
document.getElementById('opp-win').innerText = 'Победы оппонента: ' + oppWin;

function newGame () {
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
    cardsLeft -= 1;
    document.getElementById('cards-left').innerText = 'Осталось карточек: ' + cardsLeft;
    card = getRandomCard(1,10); 
    answer = +prompt('Выпала карточка на ' + card + ' очка(ов). Сколько вы за нее заплатите?');
    if (answer > 5) {
        myPoints += card;
        document.getElementById('my-points').innerText = 'Мои очки: ' + myPoints;
        myCoin -= answer;
        document.getElementById('my-coin').innerText = 'Мои монетки: ' + myCoin;
    } else {
        oppPoints += card;
        document.getElementById('opp-points').innerText = 'Очки оппонента: ' + oppPoints;
    }
    console.log(card);
    console.log('Мои очки ' + myPoints);
    console.log('Очки оппонента ' + oppPoints);

    if (cardsLeft == 0 && myPoints > oppPoints) {
        alert('You WIN!!!');
        myWin += 1;
        document.getElementById('my-win').innerText = 'Мои победы: ' + myWin;
    } else if (cardsLeft == 0 && myPoints < oppPoints) {
        alert('You LOSE!!!');
        oppWin += 1;
        document.getElementById('opp-win').innerText = 'Победы оппонента: ' + oppWin;
    }

}

 



