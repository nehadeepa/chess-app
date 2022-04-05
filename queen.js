//declare the variables that will be used
let errorBox = document.querySelector('.error-messages'),
    successBox = document.querySelector('.success'),
    failureBox = document.querySelector('.failure'),
    clickCount = 0;

//create the chess board dynamically
const createBoardLayout = () => {

    let board = document.querySelector('.board-layout'),
        table = document.createElement('table');

    for (let i = 1; i < 9; i++) {

        let tr = document.createElement('tr');

        for (let j = 1; j < 9; j++) {

            let td = document.createElement('td');

            if (i % 2 === j % 2) {
                td.className = 'white square';
                
                td.id = `square${i}${j}`;
            } else {
                td.className = 'black square';
                td.id = `square${i}${j}`;
            }

            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

    board.appendChild(table);
};

//The two queens must be in a vertical position to each other for a succesful attack
const verticalAttack = (q1, q2) => {
    //returning the selected elements in the column
    let q1Column =  q1.slice(-1);
    let q2Column =  q2.slice(-1);
    return q1Column === q2Column;
};

//Both queens must be in a diagonal position to each other for a succesful attack
const diagonalAttack = (q1, q2) => {
    //returning the selected elements in the row and column
    let q1Row = q1.slice(0, 1),
        q1Column = q1.slice(-1);

    let q2Row = q2.slice(0, 1),
        q2Column = q2.slice(-1);

    return Math.abs(q1Row - q2Row) === Math.abs(q1Column - q2Column);
};

//The two queens must be in a horizontal position to each other for a succesful attack
const horizontalAttack = (q1, q2) => {
    let q1Row = q1.slice(0, 1);
    let q2Row = q2.slice(0, 1);
    return q1Row === q2Row;
};

const canAttack = () => {
    document.querySelector('.container').style.background = 'palegreen';

    successBox.style.display = 'flex';
    successBox.innerHTML = `<p>An attack is possible</p>`;
};

const cannotAttack = () => {
    document.querySelector('.container').style.background = 'salmon';

    failureBox.style.display = 'flex';
    failureBox.style.color = 'red';
    failureBox.innerHTML = `<p>An attack is not possible</p>`;
};

//checking for attacks and displaying the result
function checkAttack(firstQueen, secondQueen) {
    //enable the check button
    let checkButton = document.querySelector('#checkBtn');
    checkButton.removeAttribute('disabled');
    
    checkButton.addEventListener('click', (e => {
        
        e.preventDefault();
        errorBox.style.display = 'none';

        if ( !verticalAttack(firstQueen, secondQueen) && !horizontalAttack(firstQueen, secondQueen)
            && !diagonalAttack(firstQueen, secondQueen) ) {

            return cannotAttack();

        }

        return canAttack();

    }));

}

//listening for a click
document.addEventListener('click', (e => {

    e.preventDefault();

    let square = e.target.id, // the square that is clicked
        squareID = square.replace('square', ''); //strip the 'square' and leave the integer for math processing
    errorBox.textContent = '';
    ///condition to assign values to each queen
    if (square.includes('square')) {

        if (clickCount === 0) {

            firstQueen = squareID; //set queen 1 to the value of the first box clicked
            document.getElementById(square).style.background = 'yellow';

        } else if (clickCount === 1) {

            secondQueen = squareID;

            if (secondQueen === firstQueen) {

                errorBox.style.border = '2px solid red';
                errorBox.innerHTML = `<p>place the second queen on a different square</p>`;
                clickCount--;

            } else {
                errorBox.style.border = '2px solid black';
                document.getElementById(square).style.background = 'green';
            }


        } else if (clickCount > 1) {

            errorBox.style.border = '2px solid red';
            errorBox.textContent = 'you cannot have more than two queens';

        }

        clickCount++;

        if (firstQueen && secondQueen) {
            return checkAttack(firstQueen, secondQueen);
        }

    } else if (square.includes('resetBtn')) {
        clickCount = 0;
        document.querySelector('#checkBtn').setAttribute('disabled', 'true');
        window.location = window.location

    } else {

        if (!firstQueen || !secondQueen) {

            errorBox.style.border = '2px solid red';
            errorBox.innerHTML = `<p>please click inside <br> the chess board</p>`;
        }

    }


}), false);

const startApp = () => {
    createBoardLayout();
};


startApp();
