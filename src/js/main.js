// var paywall = require("./lib/paywall");
// setTimeout(() => paywall(12345678), 5000);

require("component-responsive-frame/child");
const data = require("../../data/Google_Doc.sheet.json");


const quoteHolder = document.querySelector("#quoteHolder");
const selectedQuotes = document.querySelector("#selectedQuotes");
const width = document.querySelector('.interactive').offsetWidth;


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

          if ((startSel > start) && (startSel <= start + interval )) {
            var div = document.createElement("div");
            div.className =  "chosen " + cat;
            div.style.border = "5px solid " + colors[cat];
            var text = document.createTextNode( '“' + data.Quote + '”' );
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
      if (start != 0) {
        var seeLess = document.createElement("div");
        seeLess.className =  "seeLess";
        var seeLessText = document.createTextNode(`Previous ${interval} quotes`);
        seeLess.appendChild(seeLessText);
        selectedQuotes.appendChild(seeLess);
        seeLess.addEventListener('click', () => chosenQuotes(category, (start - interval) ));
      }
} //end function


//attach all the click events to search bar, category buttons and clear search button
var input = document.getElementById("myInput");
input.addEventListener("keyup", () => {
  document.querySelectorAll(".button").forEach(el => el.classList.remove('active'));
  myFunction(0);
});

document.querySelectorAll(".button").forEach(el => el.addEventListener('click', () => {
  input.value = '';
  document.querySelectorAll(".button").forEach(el => el.classList.remove('active'));
  chosenQuotes(el.dataset.cat, 0);
  el.classList.add('active');
}));


var deleteInput = document.querySelector(".fa-times-circle");
deleteInput.addEventListener("click", () => {
  document.querySelectorAll(".button").forEach(el => el.classList.remove('active'));
  input.value = '';
  curatedList(0);
});


var myFunction = function(start2) {
    var filter, txtValue;
    filter = " " + input.value.toUpperCase();
    boldWords = input.value;
    selectedQuotes.innerHTML = "";
    var startSel_2 = 0;

    data.forEach(function(data) {
        txtValue = data.Quote;
        if ( (txtValue.toUpperCase().indexOf(filter) > -1) ) {
            startSel_2 = startSel_2 + 1;

            if ((startSel_2 > start2) && (startSel_2 <= (start2 + interval) )) {
              var div2 = document.createElement("div");
              div2.className = "searchText";
              var text2 = document.createTextNode( '“' + data.Quote + '”' );
              div2.appendChild(text2);

              var myString = div2.innerHTML;
              myString = myString.replace(boldWords,`<b class="highlight">${boldWords}</b>`);
              div2.innerHTML = myString;


              selectedQuotes.appendChild(div2);

            } else if (startSel_2 === start2 + interval + 1) {
              var seeMore_2 = document.createElement("div");
              seeMore_2.className =  "seeMore";
              var seeMoreText_2 = document.createTextNode(`Read ${interval} more`);
              seeMore_2.appendChild(seeMoreText_2);
              selectedQuotes.appendChild(seeMore_2);
              seeMore_2.addEventListener('click', () => myFunction(start2 + interval) );
            } else {}
        } else {}
    });
    if (start2 != 0) {
      var seeLess2 = document.createElement("div");
      seeLess2.className =  "seeLess";
      var seeLessText2 = document.createTextNode(`Previous ${interval} quotes`);
      seeLess2.appendChild(seeLessText2);
      selectedQuotes.appendChild(seeLess2);
      seeLess2.addEventListener('click', () => myFunction(start2 - interval ));
    }
}



//display curated list of quotes as default view
var curatedList = function(start3) {
      selectedQuotes.innerHTML = "";
      console.log(start3);
      var startSel3 = 0;

      data.forEach(function(data) {
        var cat = data.Category;
        cat = cat.replace(/\s/g, '');

        if (data.Picked){
          startSel3 = startSel3 + 1;

            if ((startSel3 > start3) && (startSel3 <= start3 + interval )) {
              var div3 = document.createElement("div");
              div3.className =  "picked";
              div3.style.border = "5px solid " + colors[cat];
              var text3 = document.createTextNode( '“' + data.Quote + '”' );
              div3.appendChild(text3);
              selectedQuotes.appendChild(div3);

            } else if (startSel3 === start3 + (interval + 1) ) {
              var seeMore3 = document.createElement("div");
              seeMore3.className =  "seeMore";
              var seeMoreText3 = document.createTextNode(`Read ${interval} more`);
              seeMore3.appendChild(seeMoreText3);
              selectedQuotes.appendChild(seeMore3);
              seeMore3.addEventListener('click', () => curatedList(start3 + interval));
            } else {}
        } else {}
      }); //end data for each

      if (start3 != 0) {
        var seeLess3 = document.createElement("div");
        seeLess3.className =  "seeLess";
        var seeLessText3 = document.createTextNode(`Previous ${interval} quotes`);
        seeLess3.appendChild(seeLessText3);
        selectedQuotes.appendChild(seeLess3);
        seeLess3.addEventListener('click', () => curatedList(start3 - interval));
      }
} //end function



// kick off default display
curatedList(0);
