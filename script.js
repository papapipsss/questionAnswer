import data from './data.json' assert { type: 'json' };

const field = document.getElementById("mainField");
const questionAndAnswers = data.map(obj => obj)
const lengthOfTotalAvailableQuestions = data.length;


// var numQuestions = prompt("How many questions to answer? ")


class FlashCard {
    constructor(parent) {
        this.parent = parent;
        this.score = 0;
        this.itemCounter = Array(lengthOfTotalAvailableQuestions).fill("/");
        this.finishedQuestions = [];
        this.numQuestions = 5;
        this.selectedQuestions = Array.from({ length: this.numQuestions }, () => {
            while (true) {
                const index = Math.floor(Math.random() * lengthOfTotalAvailableQuestions);
                if (this.itemCounter[index] != 'X') {
                    this.itemCounter[index] = 'X';
                    return data[index];
                }
            }
        });

        this.question = document.createElement("h2");
        this.buttons = document.createElement("div");

        parent.appendChild(this.question);
        parent.appendChild(this.buttons);

        this.multipleChoice(this.selectedQuestions[0])
        // this.newFlashCard()
    }

    multipleChoice(question) {
        var index = Math.floor(Math.random() * 3);
        var i = 0;

        if (!this.finishedQuestions.includes(question)) {
            this.question.textContent = question.question; // Set this.question to the value in multipleChoice
            this.question.style.textAlign = "center";
        }

        var choices = [];
        while (i < 4) {
            let choice = data[Math.floor(Math.random() * lengthOfTotalAvailableQuestions)].answer;
            var temp;
            if (!choices.includes(choice)) {
                if (i == index) {
                    temp = this.createButton(question.answer, question.answer);
                    i++;
                } else {
                    temp = this.createButton(choice, question.answer);
                    i++;
                }
            }
            choices.push(choice);
            this.buttons.appendChild(temp);
        }
    }

    createButton(choice, answer) {
        let button = document.createElement("button");
        button.setAttribute("type", "button");
        button.style.margin = "15px";
        button.style.width = "500px";
        button.style.height = "50px";
        button.textContent = choice;
        button.onclick = () => {
            this.checkIfCorrect(choice, answer);
            button.disabled = true;
            this.newFlashCard(this.parent)
        };
        return button;
    }

    checkIfCorrect(choice, answer) {
        let tag = document.createElement("h2");
        if (choice === answer) {
            tag.textContent = "correct";
        } else {
            tag.textContent = "incorrect";
        }
        for (const button of this.buttons.getElementsByTagName('button')) {
            button.disabled = true;
        }
        this.buttons.appendChild(tag);
    }

    newFlashCard(){
        let reset = document.createElement("button");
        // reset.style.visibility = "hidden"
        reset.textContent = "New Game";
        reset.onclick = () => {
            this.parent.innerHTML = "";
            new FlashCard(this.parent);
        };
        this.parent.appendChild(reset);
    }
}

/*
var finishedQuestions = []
let itemCounter = Array(lengthOfTotalAvailableQuestions).fill("/")
var numQuestions = 5;
var selectedQuestions = Array.from({length : numQuestions}, () => {
    while(true){
        const index = Math.floor(Math.random()*lengthOfTotalAvailableQuestions);
        if(itemCounter[index] != 'X'){
            itemCounter[index] = 'X'
            return data[index];
        }
    }
})

function multipleChoice(question){
    var index = Math.floor(Math.random() * 3)
    var i = 0;

    if(!finishedQuestions.includes(question)){
        let tag = document.createElement("h2");
        tag.textContent = question.question;
        tag.style.textAlign = "center" 
        field.appendChild(tag);
    }

    var choices = []
    while(i < 4){
        let choice = data[Math.floor(Math.random()*lengthOfTotalAvailableQuestions)].answer
        var temp
        if(!choices.includes(choice)){
            if (i == index){
                temp = createButton(question.answer, question.answer)
                i++
            }
            else{
                temp = createButton(choice, question.answer)
                i++
            }
        }
        choices.push(choice)
        field.appendChild(temp)
    }
}

function createButton(choice, answer){
    let button = document.createElement("button")
    button.setAttribute("type", "button")
    button.style.margin = "15px"
    button.style.width = "500px"
    button.style.height = "50px"
    button.textContent = choice
    button.onclick = () => {checkIfCorrect(choice, answer)}
    return button
}

function checkIfCorrect(choice, answer){
    let tag = document.createElement("h2");
    if(choice === answer){
        tag.textContent = "correct";
    }
    else{
        tag.textContent = "incorrect";
    }
    field.appendChild(tag);
}
*/
new FlashCard(field);
// multipleChoice(selectedQuestions[0])