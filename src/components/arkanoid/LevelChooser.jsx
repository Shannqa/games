import React from "react";

function LevelChooser({ setLevelSave, changeLevel, levelSave }) {
  function selectLevel(level) {
    // make sure it's a number not a string
    level = parseInt(level);
    setLevelSave(level);
    changeLevel(level);
  }
  return (
    <div>
      <form>
        <select
          name="level"
          value={levelSave}
          onChange={(e) => selectLevel(e.target.value)}
        >
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
