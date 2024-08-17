import React from "react";

function LevelChooser({ setLevelSave, changeLevel, LEVEL }) {
  function selectLevel(level) {
    setLevelSave(level);
    changeLevel(level);
    // console.log(LEVEL);
  }
  return (
    <div>
      <form>
        <select name="level" onChange={(e) => selectLevel(e.target.value)}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
        </select>
      </form>
    </div>
  );
}

export default LevelChooser;
