; (function () {
  angular.module('dwarfMatch')
    .component('gameComponent', {
      controller: GameController,
      templateUrl: 'app/components/game/game.html'
    })

  function GameController($timeout, GameService) {
    var gc = this

    // This is a freebie we are using the GameService to help keep our controller clean. The GameServie will be in charge of creating and shuffling the deck.
    gc.deck = GameService.getDeck()
    
    // Create two card variables. These will be responsible
    // for keeping track of our selections as we click cards.
    gc.firstSelection = null
    gc.secondSelection = null

    // Next we need to initate a few more variables on gc for later use
    // Let's add variables for tracking the number of guesses (pairs flipped),
    // for the total number of correct guesses (pairs matched) and finally a
    // victory boolean to let our controller know if we've won. Refer to the index.html
    // for variable names
    gc.attempts = 0;
    gc.pairs = 0;
    gc.victory = false;

    // Next write a selectCard function on gc that accepts a card object on click and
    // let's make it set card.show to true (boolean). Give it a test!
    // After you complete this refer back to readme.md
    gc.selectCard = function (card) {
      if (card.show || gc.firstSelection !== null && gc.secondSelection !== null) {
        return
      }
      card.show = true
      if (gc.firstSelection == null) {
        gc.firstSelection = card
        return
      }
      else {
        gc.secondSelection = card
      }
      gc.isMatch(card)
    }


    // Write a local resetCards function that will empty our card variables
    // and increase the number of attempts

    gc.resetCards = function () {
      gc.firstSelection.show = false
      gc.secondSelection.show = false
      gc.firstSelection = null
      gc.secondSelection = null
    }

    // Next write a local isMatch function that accepts our two cards and if the card titles 
    // match, increases our totalMatches and returns true else returns false. After this refer 
    // back to readme.md

    gc.isMatch = function (card) {
      gc.attempts++
      if (gc.firstSelection.title == gc.secondSelection.title) {
        gc.pairs++
        gc.firstSelection = null
        gc.secondSelection = null
      } else {
        $timeout(function () {
          gc.resetCards()
        }, 2000)
      }
      gc.checkVictory()
    }
    // Finally, write a local checkVictory function that will set gc.victory = true if the totalMatches 
    // is half the length of the deck. Tip: the game deck array is available at gc.deck. When you're done
    // refer back to readme.md
    gc.checkVictory = function() {
      if (gc.pairs == gc.deck.length / 2) {
        gc.victory = true;
      }
    }
    // Bonus Challenge: Write a function on gc that can reset the game and add a button that calls it
    gc.reset = function(){
      debugger
      gc.deck = GameService.getDeck()
      gc.attempts = 0
      gc.pairs = 0      
    }
  }
} ())
