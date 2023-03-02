import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <div className="home-ctn landing-font">
        <h1>TournItUp - Tournaments</h1>
        <div className="home-top-ctn">
          <section>
            <h2>Your upcoming Tournaments</h2>
            <div>
              Content
              Content
            </div>
          </section>
          <section>
            <h2>Search for Tournaments</h2>
            <div>
              Content
              Content
            </div>
          </section>
          <section>
            <h2>Create a Tournament</h2>
            <div>
              <Link to="/tournament/create">Go to Tournament Creation</Link>
            </div>
          </section>
        </div>
        <div className="home-bottom-ctn">
          <section>
            <h3>Past Tournaments</h3>
            <div>
              Content
              Content
            </div>
          </section>
          <section>
            <h3>Tournaments that might interest you</h3>
            <div>
              Content
              Content
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Home
