function main() {
  "use strict";
  var circleTurn = true,
      o = 'circle',
      x = 'cross',
      id = 0,
      score = [0,0],
      circleMoves = [],
      crossMoves = [],
      nm1 = '',
      nm2 = '';
  
  $('input').on('focus blur', function() {
    if ( this.value === 'Player1' || this.value === 'Player2' ) {
      this.value = '';
    } else if ( this.value === '' && this.name === 'name1' ) {
      this.value = 'Player1';
    } else if ( this.value === '' && this.name === 'name2' ) {
      this.value = 'Player2';
    }
  });


  $('.players div').on('click', function() {
    $(this).toggleClass('figure-selected');
    $(this).siblings().removeClass('figure-selected');
    if ( this.id === 'circle' ) {
      circleTurn = true;
    } else {
      circleTurn = false;
    }
  });

  $('#lets-play').click(function() {
    nm1 = $('input[name=name1]').val();
    nm2 = $('input[name=name2]').val();
    $('#get-players').hide(300);
    $('#player1 h2').html(nm1);
    $('#player2 h2').html(nm2);
    if ( $('.players div').hasClass('figure-selected') ) {
      if( circleTurn ) {
        displayPlayer( o, x, 1, 2 );
      } else {
        displayPlayer( x, o, 2, 1 );
      }
    } else {
      displayPlayer( o, x, 1, 2 );
    }
  });


  $('.cat').click(function() {
    id = Number( $(this).attr('id') );
    if ( circleTurn ) {
      if( verify() ) {
        circleMoves.push(id);
        letsPlay();
        return;
      }
    } else {
      if( verify() ){
        crossMoves.push(id);
        letsPlay();
        return;
      } 
    }
  });

  function verify() {

    if ( $.inArray( id, circleMoves ) !== -1 || $.inArray( id, crossMoves ) !== -1 ) {
      console.log('Occupied, lol')
      $('#'+id).effect('shake', {times: 2, distance: 5}, 100);
      return false;
    } else {
      return true;
    }

  }

  function letsPlay() {

    if ( circleTurn ) {
      if( whoWins( circleMoves ) ){
        showWinner( nm1, nm2, o, x, 1, 2 );
        sumScore(0);
        return;
      } else {
        circleTurn = !circleTurn;
        if ( circleMoves.length === 5 ) {
          ticTacToe( o, x, 1, 2 );
          circleTurn = !circleTurn;
          return;
        }
        displayPlayer( x, o, 2, 1 );
        return;
      }
    } else {
      if( whoWins( crossMoves ) ) {
        showWinner( nm2, nm1, x, o, 2, 1 );
        sumScore(1);
        return;
      } else {
        circleTurn = !circleTurn;
        if ( crossMoves.length === 5 ) {
          ticTacToe( x, o, 2, 1 );
          circleTurn = !circleTurn;
          return;
        }
        displayPlayer( o, x, 1, 2 );
        return;
      }
    }

  }

  function displayPlayer( onTurn, onHold, i, j ) {

    $('#' + id).removeClass(onHold + '-pre cat').addClass(onHold + '-turn');

    $('.cat').removeClass(onHold + '-pre').addClass(onTurn + '-pre');

    $('#player' + i).addClass('turn');
    $('#player' + i + ' div').addClass(onTurn + '-turn').removeClass(onTurn + '-wait');
    $('#player' + i + ' > .onTurn').html('Your turn');

    $('#player' + j).removeClass('turn');
    $('#player' + j + ' div').removeClass(onHold + '-turn').addClass(onHold + '-wait');
    $('#player' + j + ' > .onTurn').html('Wait');
  }
  
  function whoWins(toCheck) {
    var i = 0,
        j = 1,
        k = 4,
        m = 1,
        win = 0;

    while ( m < 5 ) {
      for ( i = j; i < k; i = i + m ) {
        if ( $.inArray( i, toCheck ) !== -1 ) {
          win++;
          if ( win === 3 ) {
            return true;
          }
        }
      }
      if ( k === 4 || k === 7 ) {
        j = k;
        k = k + 3;
      } else if ( k === 10 && m === 1 ) {
        j = 1;
        k = 8;
        m = 3;
      } else if ( k === 9 || k === 8 && m === 3 ) {
        j++;
        k++;
      } else if ( k === 10 && m === 3 ) {
        j = 3;
        k = 8;
        m = 2;
      } else if ( k === 8 && m === 2 ) {
        j = 1;
        k = 10;
        m = 4;
      } else {
        m++;
      }
      win = 0;
    }
    return false;

  }
  
  function ticTacToe( win, loose, ply1, ply2 ) {
    $('#no-one-wins').show(200);
    $('#play-again').click(function() {
      id = 0;
      circleMoves = [];
      crossMoves = [];
      $('#no-one-wins').hide(300);
      cleanTicTacToe();
      displayPlayer( win, loose, ply1, ply2 );
    });

  }
  
  function showWinner( winner, looser, win, loose, ply1, ply2 ) {
    $('#player-wins').show(200);
    $("#winner h1").html('You are victorius ' + winner + '!');
    $('#play-revenge p').html(looser + ' claims for Revenge');
    $('#winner section div').addClass(win + '-turn').removeClass(loose + '-turn');
    $('.players div').off('click');
    $('.players div').hover(function() {
      $(this).css('box-shadow', 'none');
    })
    /* Let's reset everything */
    $('#play-revenge').click(function() {
      id = 0;
      circleMoves = [];
      crossMoves = [];
      $('#player-wins').hide(300);
      cleanTicTacToe();
      displayPlayer( win, loose, ply1, ply2 );
      return;
    });

  }

  function sumScore(i) {
    var n = i + 1;
    score[i]++;
    $('#score' + n).html('Score: ' + score[i]);
  }

  function cleanTicTacToe() {
    $('.row div').addClass('cat')
    $('.cat').removeClass('circle-pre circle-turn cross-pre cross-turn');
    return;
  }


}
$(document).ready(main);
