// var paywall = require("./lib/paywall");
// setTimeout(() => paywall(12345678), 5000);

require("component-responsive-frame/child");
const data = require("../../data/Google_Doc.sheet.json");


// console.log(data);

const quoteHolder = document.querySelector("#quoteHolder");
const selectedQuotes = document.querySelector("#selectedQuotes");
const width = document.querySelector('.interactive').offsetWidth;

console.log(width);

const interval = width > 500 ? 10 : 5;


const colors = {
  OnlineLearning: "#D8894E",
  Socializing: "#D15959",
  MentalHealth: "#FFE9CF",
  College: '#ffd9d7'
}

let totals = {
  OnlineLearning: 0,
  Socializing: 0,
  MentalHealth: 0,
  College: 0
}

// background quotes
data.forEach(function(data) {
  var div = document.createElement("div");
  var cat = data.Category;
  cat = cat.replace(/\s/g, '');
  div.className =  "quote " + cat;
  div.style.backgroundColor = colors[cat];
  var text = document.createTextNode( data.Quote );
  div.appendChild(text);
  quoteHolder.appendChild(div);

  totals[cat] = totals[cat] + 1;
});

console.log(totals);
document.querySelectorAll(".button").forEach( el => el.querySelector('span').innerHTML = "(" + totals[el.dataset.cat] + ")" );

//display picked quotes above background
var chosenQuotes = function(category, start) {
      selectedQuotes.innerHTML = "";
      console.log(start);
      var startSel = 0;

      data.forEach(function(data) {
        var cat = data.Category;
        cat = cat.replace(/\s/g, '');

        if (cat === category){
          startSel = startSel + 1;

          if ((startSel > start) && (startSel < start + (interval + 1) )) {
            var div = document.createElement("div");
            div.className =  "chosen " + cat;
            div.style.border = "3px solid " + colors[cat];
            var text = document.createTextNode( data.Quote );
            div.appendChild(text);
            selectedQuotes.appendChild(div);

          } else if (startSel === start + (interval + 1) ) {
            var seeMore = document.createElement("div");
            seeMore.className =  "seeMore";
            var seeMoreText = document.createTextNode(`Read ${interval} more`);
            seeMore.appendChild(seeMoreText);
            selectedQuotes.appendChild(seeMore);
            seeMore.addEventListener('click', () => chosenQuotes(category, (start+ interval) ) );
          } else {}
        } else {}
      }); //end data for each
} //end function


document.querySelectorAll(".button").forEach(el => el.addEventListener('click', () => {
  // document.querySelectorAll('.quote').forEach(el => el.classList.add('fade'));
  document.querySelectorAll(".button").forEach(el => el.classList.remove('active'));
  chosenQuotes(el.dataset.cat, 0);
  el.classList.add('active');
}));

chosenQuotes('MentalHealth', 0);




var input = document.getElementById("myInput");
input.addEventListener("keyup", () => myFunction(0) );


var myFunction = function(start2) {
    var filter, txtValue;
    filter = " " + input.value.toUpperCase();
    boldWords = " " + input.value;
    selectedQuotes.innerHTML = "";
    var startSel_2 = 0;

    data.forEach(function(data) {
        txtValue = data.Quote;
        if ( (txtValue.toUpperCase().indexOf(filter) > -1) ) {
            startSel_2 = startSel_2 + 1;

            if ((startSel_2 > start2) && (startSel_2 < start2 + 16)) {
              var div = document.createElement("div");
              div.className = "searchText";
              var text = document.createTextNode( data.Quote );
              div.appendChild(text);

              var myString = div.innerHTML;
              myString = myString.replace(boldWords,`<b>${boldWords}</b>`);
              div.innerHTML = myString;


              selectedQuotes.appendChild(div);

            } else if (startSel_2 === start2 + 16) {
              var seeMore_2 = document.createElement("div");
              seeMore_2.className =  "seeMore";
              var seeMoreText_2 = document.createTextNode('See more');
              seeMore_2.appendChild(seeMoreText_2);
              selectedQuotes.appendChild(seeMore_2);
              seeMore_2.addEventListener('click', () => myFunction(start2+15) );
            } else {}


        } else {}
    });
}
