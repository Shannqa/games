import React, { useState } from 'react';

function StartButton({ onClick }) {
  
  return(
    <button className="default-btn" onClick={onClick}>Start Game</button>
    )
}

export default StartButton