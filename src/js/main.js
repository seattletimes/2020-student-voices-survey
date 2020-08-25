// var paywall = require("./lib/paywall");
// setTimeout(() => paywall(12345678), 5000);

require("component-responsive-frame/child");
const data = require("../../data/Google_Doc.sheet.json");


// console.log(data);

const quoteHolder = document.querySelector("#quoteHolder");
const selectedQuotes = document.querySelector("#selectedQuotes");


const colors = {
  OnlineLearning: "#D8894E",
  Socializing: "#D15959",
  MentalHealth: "#FFE9CF",
  College: '#ffd9d7'
}

data.forEach(function(data) {
  var div = document.createElement("div");
  var cat = data.Category;
  cat = cat.replace(/\s/g, '');
  div.className =  "quote " + cat;



  div.style.backgroundColor = colors[cat];


  var text = document.createTextNode( data.Quote );
  div.appendChild(text);

  quoteHolder.appendChild(div);
  // console.log(data.Grade);
});


var chosenQuotes = function(category, start) {
      document.querySelectorAll('.quote').forEach(el => el.classList.add('fade'));
      selectedQuotes.innerHTML = "";
      console.log(start);
      var startSel = 0;

      data.forEach(function(data) {
        var cat = data.Category;
        cat = cat.replace(/\s/g, '');

        if (cat === category){
          console.log(data.Quote);
          startSel = startSel + 1;

          if ((startSel > start) && (startSel < start + 16)) {
            var div = document.createElement("div");
            div.className =  "chosen " + cat;

            div.style.backgroundColor = colors[cat];

            var text = document.createTextNode( data.Quote );
            div.appendChild(text);

            selectedQuotes.appendChild(div);
          } else {}

        } else {}

      });
}

document.querySelectorAll(".button").forEach(el => el.addEventListener('click', () => chosenQuotes(el.dataset.cat, 0)) );

chosenQuotes('MentalHealth', 0);
