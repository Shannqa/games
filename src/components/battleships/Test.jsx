import {useState} from "react";

function Test() {
  const [newState, setNewState] = useState([[1, 2], [3, 4], [5, 6], [7, 8]]); 
  const [bobik, setBobik] = useState([]); 

  function fun() {
    let queue = [...newState];
    console.log(queue);
  queue = queue.filter((item, index) => index !== 1);
    console.log(queue);
    // console.log(newq);
    setNewState([...queue])

    // setAttackHits(attackHits.concat([coords]));
  }

  function funk() {
    let bib = [[5, 6]];
    setNewState(newState.concat(bib));
  }
  function check() {
    console.log(newState)
  }
  return(<div>
    <button onClick={fun}>click</button>
    <button onClick={funk}>click1</button>
    <button onClick={check}>check</button>
    </div>)

}

export default Test