import { Link } from "react-router-dom"

function Home() {
  
  return(
    <div className="home">
      <p>Games are fun! What better way to study and practice web development than to try and recreate some not-too-complicated games we've all grown up playing.</p>
      <p>Here you'll find some games I've made with React. The scource code is available on Github, each game inside a separate folder in components.</p>
      <p>Have fun!</p>
    
      <p>Play a game:</p>
      <div className="home-links">
        <Link className="menu-link" to="/battleships">Battleships</Link>
        <Link className="menu-link" to="/snake">Snake</Link>
      </div>

    </div>
  )
}

export default Home