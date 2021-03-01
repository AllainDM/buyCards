let myCoin = 100;
let oppCoin = 100;
let myPoints = 0;
let oppPoints = 0;
let answer;
let card;
let cardsLeft = 5;

document.getElementById('my-points').innerText = 'Мои очки: ' + myPoints;
document.getElementById('my-coin').innerText = 'Мои бабосики: ' + myCoin;
document.getElementById('opp-points').innerText = 'Очки оппонента: ' + oppPoints;
document.getElementById('cards-left').innerText = 'Осталось карточек: ' + cardsLeft;

function takeCard () {

    function getRandomCard(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
    }
    cardsLeft -= 1;
    document.getElementById('cards-left').innerText = 'Осталось карточек: ' + cardsLeft;
    card = getRandomCard(1,20); 
    answer = +prompt('Выпала карточка на ' + card + ' очка(ов). Сколько вы за нее заплатите?');
    if (answer > 5) {
        myPoints += card;
        document.getElementById('my-points').innerText = 'Мои очки: ' + myPoints;
        myCoin -= answer;
        document.getElementById('my-coin').innerText = 'Мои бабосики: ' + myCoin;
    } else {
        oppPoints += card;
        document.getElementById('opp-points').innerText = 'Очки оппонента: ' + oppPoints;
    }
    console.log(card);
    console.log('Мои очки ' + myPoints);
    console.log('Очки оппонента ' + oppPoints);

    if (cardsLeft == 0 && myPoints > oppPoints) {
        alert('You WIN!!!');
    } else if (cardsLeft == 0 && myPoints < oppPoints) {
        alert('You LOSE!!!');
    }

}

 



