what is dark green powerup? doesnt do anything i think -- extra life, needs to be communicated
very dark blue, triple balls - 2 extra balls have same angle, when they touch the paddle there is a crash, paddle disappears, balls stop moving. ball1 moves with the paddle when it shouldnt?
2x smaller/ bigger, big/small ball paddle shouldnt work
wormhole - paddle may disappear and have weird shading

after loading the game, if the first move is paddle to the left, the ball goes right instead of left

- multi balls
  secon balls moves weirdly, jumps up and falls down in the middle of canvas - i think its tripple ball

- add

  - slow ball
  - quick ball

- sticky ball

* ball at the corner of paddle - when you move the paddle to the edge of canvas and then shoot, ball goes directly upwards and shakes and cant be moved the other way

- solid brick
  -- ball can become stuck inside a solid brick, or run around the edge

had two balls or maybe three active, lvl4 ended too early, while modal is visible a ball is inside bricks already. lvl5 finished to early too
hit 39 inlvl 39
stages.js:63 level win
Game.jsx:60 6

ball1 doesnt change back to ball0 after powerup runs out. problem - ball1 might need to become ball0 a long time after the powerup ends. need to check for it. maybe check again on dropping ball
when wormhole stops, suddenly ball[1] and ball[2] are logged with x and vx 0

1 155 3
Game.jsx:207 2 149 -3
balls.js:174 ball1 0.26639761292042297
balls.js:177 ball2 -0.26639761292042297
Game.jsx:202 1 155.26639761292043 0.26639761292042297
Game.jsx:207 2 148.73360238707957 -0.26639761292042297
