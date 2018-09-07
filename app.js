'use strict';

const quoteButton = document.body.querySelector('#get-quote');
const quoteButtonList = document.body.querySelector('#get-quote-list');
const quoteOutput = document.body.querySelector('#quote');
const quoteListInput = document.body.querySelector('#how-many-quotes');

/* Single quote*/
function* quoteGenerator() {
    while (true) {
        yield fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
            .then(res => res.json());
    }
}

const generator = quoteGenerator();

function updateQuote() {
    quoteButton.disabled = true;

    generator.next().value.then(function (data) {
        quoteOutput.innerHTML = `"${data[0]}"`;
        quoteButton.disabled = false;
    });
}

quoteButton.addEventListener("click", () => updateQuote());

updateQuote();


/* LIST */
function* quoteListGenerator() {
    while (true) {
        yield fetch('http://ron-swanson-quotes.herokuapp.com/v2/quotes/')
            .then(res => res.json());
    }
}

const generatorList = quoteListGenerator();

function updateQuoteList() {
    quoteOutput.innerHTML = "";
    let howManyQuotes = parseInt(quoteListInput.value, 10);
    let tempHowManyQuotes = howManyQuotes;

    if (tempHowManyQuotes == 0 || tempHowManyQuotes == null || isNaN(tempHowManyQuotes)) {
        howManyQuotes = 1;
    } else if (tempHowManyQuotes > 3) {
        howManyQuotes = 3;
    }

    quoteButtonList.disabled = true;

    for (let i = 0; i < howManyQuotes; i++) {
        generatorList.next().value.then(function (data) {
            let p = document.createElement("p");
            p.id = "quote-nr-" + i;

            p.innerHTML = `"${data[0]}"`;
            quoteOutput.appendChild(p);
        });
    }
    quoteButtonList.disabled = false;
}

quoteButtonList.addEventListener("click", () => updateQuoteList());

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}