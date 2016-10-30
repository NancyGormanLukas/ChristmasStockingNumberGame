$(document).ready(function() {

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

  var yourMatchingNumber = 0;

  //create a random number
  var randomNum = randomNumGen();

  var wins = 0;
  var losses = 0;
  var crystals;

  function randomNumCrystals() {
    // crystals obj
    return {
      'red' : {
        points: Math.floor(Math.random() * 11) + 1,
        imageUrl: "assets/img/red.png"
      },
      'blue' : {
        points: Math.floor(Math.random() * 11) + 1,
        imageUrl: "assets/img/blue.png"
      },
      'yellow' : {
        points: Math.floor(Math.random() * 11) + 1,
        imageUrl: "assets/img/yellow.png"
      },
      'green' : {
        points: Math.floor(Math.random() * 11) + 1,
        imageUrl: "assets/img/green.png"
      }
    };
  }

  function randomNumGen(){
    return Math.floor(Math.random() * 100) + 18;
  }

  function setGame() {
    yourMatchingNumber = 0;
    //create random crystal numbers
    crystals = randomNumCrystals();
    //create a random number and render it
    randomNum = randomNumGen();
    var randomNumDiv = $("<div id='random-number'>").text(randomNum);
    $("#random-area").html(randomNumDiv);
  }

  function updateDom(didUserWin){
    $('#winArea').empty();



    var wSpan = $('<span>').text(wins);
    var lSpan = $('<span>').text(losses);

    var pWins = $('<p>').text('Successes: ');
    var pLosses = $('<p>').text('Losses: ');

    pWins.append(wSpan);
    pLosses.append(lSpan);

    $('#winArea').append(pWins);
    $('#winArea').append(pLosses);
        if (didUserWin === true){
      $('#winArea').append($('<p>').text('Nicely done!'));
      setGame();
      renderMatchingNumber();
    }else if(didUserWin === false) {
      $('#winArea').append($('<p>').text('Better luck next time!'));
      setGame();
      renderMatchingNumber();
    }
  }

  function renderCrystals(){
    //render crystals
    for (var key in crystals) {
      var crystalDiv = $("<span class='crystals-button' data-name='" + key + "'>");
        var crystalImg = $("<img alt='image' class='crystal-img'>").attr("src", crystals[key].imageUrl);
        crystalDiv.append(crystalImg);
        $("#crystal-area").append(crystalDiv);
    }
  }




  function updateMatchingNumber(th){
    var self = th;

    if (self.attr('data-name') == 'red') {
      yourMatchingNumber = yourMatchingNumber + crystals[self.attr('data-name')].points;
    }else if (self.attr('data-name') == 'blue') {
      yourMatchingNumber = yourMatchingNumber + crystals[self.attr('data-name')].points;
    }else if (self.attr('data-name') == 'yellow') {
      yourMatchingNumber = yourMatchingNumber + crystals[self.attr('data-name')].points;
    }else{
      yourMatchingNumber = yourMatchingNumber + crystals[self.attr('data-name')].points;
    }
  }

  function renderMatchingNumber(){
    var scoreNumDiv = $("<div id='score-number'>").text(yourMatchingNumber);
    $("#score-area").html();
    $("#score-area").html(scoreNumDiv);
  }

  setGame();
  updateDom();
  renderCrystals();
  renderMatchingNumber();

  $('#myModal').modal({
    
  });

  //create on.click event for crystals
  $(".crystals-button").on("click", function(event) {
    updateMatchingNumber($(this));
    renderMatchingNumber();

    //check if won or lost
    if (yourMatchingNumber == randomNum) {
      wins++;
      setGame();
      updateDom(true);
    }else if (yourMatchingNumber > randomNum) {
      losses++;
      setGame();
      updateDom(false);
    }
  });

});