import React from 'react'
import { Link } from 'react-router-dom'
import LandingPageFooter from '../components/LandingPageFooter'
import LandingPageNavbar from '../components/LandingPageNavbar'

function LandingPage() {
  return (
    <div className="landing-font">
      <LandingPageNavbar />
      <section className="landing-main-ctn">
        <div className="landing-main-title-ctn">
          <h1>Ready For The Challenge?</h1>
          <h2>Join challengers around the world for competitions that suit your needs!</h2>
        </div>
        <div>
          <img src="/images/tournament.png" alt="someAwesomeImageHere" />
        </div>
      </section>
      <section className="landing-section-one-ctn">
        <div>
          <h2>What Do You Like?</h2>
          <p>Push yourself to your limits in challenges that match your skillset, or try out something new. Our vast community hosts tournaments that cover all areas of expertise!</p>
          <Link to="/">Check out some tournaments</Link>
        </div>
        <div>
          <img src="/images/interests.png" alt="amazingImage"/>
        </div>
      </section>
      <section className="landing-section-two-ctn">
        <div>
          <h2>Interested In Hosting Your Own Tournaments?</h2>
          <p>Are you a business owner and would like to promote your product, or simply have a passion for competition?<br/>Become a paid member today for a small contribution fee and host your own challenges: Find worthy opponents or have fun watching challengers give their all. Your tournament, your rules!</p>
          <Link to="/">See pricing plans</Link>
        </div>
        <div>
          <img src="/images/host.png" alt="amazingImage"/>
        </div>
      </section>
      <section className="landing-section-three-ctn">
        <div>
          <h2>Tournaments Everywhere</h2>
          <p>Participate in tournaments close to you, at a place you are going to visit or virtually over the internet. It's a great way to make new connections, meet new people and have fun where ever you are and want to be!</p>
          <Link to="/">Find tournaments by location</Link>
        </div>
        <div>
          <img src="/images/map.png" alt="amazingImage"/>
        </div>
      </section>
      <section className="landing-section-four-ctn">
        <div>
          <h2>Join Our Community</h2>
          <p>We have a great community of amazing people with different skillsets. Get to know them, team up for challenges and expand your horizon with unique and new influences in our forums!</p>
          <Link to="/">Go to our forums</Link>
        </div>
        <div>
          <img src="/images/community.png" alt="amazingImage"/>
        </div>
      </section>
      <section className="landing-section-five-ctn">
        <div>
          <h2>Fall To Get Up Again</h2>
          <p>You can't always win the challenge, but we live by the saying: Everyone who plays is a winner! Participating in challenges and interacting with the community gives you prestige points that qualify you for the prices as the annual TournChamp!</p>
          <Link to="/">Learn More</Link>
        </div>
        <div>
          <img src="/images/recover.png" alt="amazingImage"/>
        </div>
      </section>
      <LandingPageFooter/>
    </div>
  )
}

export default LandingPage
