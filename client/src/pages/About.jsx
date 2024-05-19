import { NavLink } from "react-router-dom";
import Ana from "../Components/Ana";
const About = () => {
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              {/* <p>We care to cure your Health</p> */}

              <h1>Why Choose Us? </h1>
              <p>
                <strong>Wide Selection:</strong> Explore our vast collection
                  of books covering various genres, from classics to the latest
                  releases.
              </p>

              <p>
                <strong>Expert Recommendations:</strong> Our team of book
                  enthusiasts is here to offer personalized recommendations
                  based on your interests and preferences.
              </p>

              <p>
                <strong>Convenience:</strong> Shop anytime, anywhere with our
                  user-friendly app. Discover new reads and manage your
                  purchases with ease.
              </p>
              <p>
                <strong>Community:</strong> Join our thriving reading
                  community. Engage in discussions, participate in book clubs,
                  and connect with fellow book lovers.
              </p>

              <div className="btn btn-group">
                <NavLink to="/contact">
                  <button className="btn"> Connect Now</button>
                </NavLink>
                <NavLink to="/service">
                    <button className="btn secondary-btn">learn more</button>
                </NavLink>
              </div>
            </div>
            <div className="hero-image">
              <img
                src="/images/about.png"
                alt="coding buddies "
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>

      <Ana/>
    </>
  );
};

export default About;