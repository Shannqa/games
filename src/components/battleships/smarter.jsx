[5, 5]
eliminate [6, 5], [4, 5], [5, 6], [5, 4]

flat list of ships, all coords
at the same time, add to flat list of adjacent spots

when generating a new coord check flat list and adj list

after generating full coords check flat list and adjacent list

1. 
ship list = {}
flat array od coords = []
adjacent spots = []
2. get random coord
check flat list ? next : back to 2
check adjacent spots ? next : back to 2
3. get full coords
check flat list ? next : back to 2
check adjacent spots ? next : back to 2
maybe - if onr is adjacent then fine, if more then not good
4. add full coords to ship list
add full coords to flat arr
get adjacent spots for full coords
add adj spots to adj spots arr
5. return, generate new ship

start with the biggest ship