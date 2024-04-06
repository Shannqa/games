function Ship({ size }) {
  let ship = [];

  for (let i = 0; i < size; i++) {
    ship.push(<div className="cell" key={size + i} id={i} data-cell={i + 1} data-size={size}></div>);
  }
  return(
    <div className="ship-to-place">
      {ship}
    </div>
  )
}

export default Ship