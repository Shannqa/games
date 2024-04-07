> add event listeners to enemy squares
> placement: there's a bug when you try and drop a ship in between other squares, maybe try implementing try catch or something similar
> problem: both grids' squares have the same ids. hitting enemy board shows on own board

> problem: both AI and player are attacking the same AI board because this is the same => done but make sure everything was changed to link to new object boards
> check if game won after every turn

- when game won show the winner and start over
- think how to use the player class
- make AI smarter
  - placing ships
  - attacking
- mobile ui
- transitions
- timeout on players attacking
- attack animation
  > change the way placement board is created, use board method instead of copying the code
- change win condition from depending on ship lengths to actual ship objects being destroyed
- game over / restart ui
- bug: had a case where AI didn't place all ships
- enemy board and own board labels went missing
