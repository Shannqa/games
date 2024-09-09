wormhole - paddle may disappear

after loading the game, if the first move is paddle to the left, the ball goes right instead of left

- add

  - slow ball
  - quick ball

- sticky ball

* ball at the corner of paddle - when you move the paddle to the edge of canvas and then shoot, ball goes directly upwards and shakes and cant be moved the other way. or it can just disappear outside the canvas

level in the input field is not updating after lvl up

shoot the ball - change to release the ball maybe
canvas should be taller
maybe the center of the paddle shouldn't be 90 degree angle but a bit skewed

- change canvas background, should be a bit lighter

adjust ball / paddle speeds, how fast should the ball be able to go at an angle down in order to catch it by the paddle in time

wormhole error - its possible to move the paddle beyond the edge of canvas long after powerup ends

last level - after winning, the game tries to switch to next level:
10
bricks.js:75 Uncaught TypeError: Cannot read properties of undefined (reading 'forEach')
at countBricks (bricks.js:75:10)
at Game (Game.jsx:91:19)
modal on - can move

modal on next level - it resets the bricks when modal is shown
disable checking highscore when highscores are not fetched
modal is a state, it resets my bricks ffs. save bricks into state before the modal shows. if statebricks exists, show them, if not, show normal bricks
win next level has no access to setsavedbricks function
