import Ana from "../Components/Ana";
import {useAuth} from "../store/auth"

const Home = () => {

    const {user} = useAuth();

    return (
        <>
            <main>
                <section className = "section-hero">
                    <div className = "container grid grid-two-cols">
                        <div className = "hero-content">
                            <p>Hello { user ? `${user.username}` : ""} </p>
                            <h1>Welcome to <br/> The Bookshelf!</h1>
                            <p>Discover your next favorite read with us. Dive into a world of imagination and exploration as you peruse our extensive collection of books spanning various genres, including fiction, non-fiction, mystery, romance, sci-fi, fantasy, and more. From beloved classics to contemporary masterpieces, we have something for every reader's taste.</p>
                            <div className = "btn btn-group">
                                {/* <a href = "/contact">
                                    <button className = "btn">Connect now</button>
                                </a> */}

                                <a href = "/book">
                                    <button className = "btn">Start Browsing</button>
                                </a>

                            </div>
                        </div>

                        <div className = "hero-image">
                            <img src = "/images/home.png"
                              alt = "coding together"
                              width = "400"
                              height = "500" />
                        </div>

                    </div>
                </section>
            </main>

           {/* 2nd section  */}
            <Ana />

            {/* 3rd section  */}
            <section className="section-hero">
            <div className="container grid grid-two-cols">
                {/* hero images  */}
                <div className="hero-image">
                <img
                    src="/images/design.png"
                    alt="coding together"
                    width="400"
                    height="500"
                />
                </div>

                <div className="hero-content">
                <p>Let us help you find your next adventure.</p>
                <h2>Start Your Reading Journey Today</h2>
                <p>
                    Ready to dive into a new world? 
                    Contact us today for personalized recommendations.we're here to assist you every step of the way.
                </p>
                <div className="btn btn-group">
                    <a href="/contact">
                    <button className="btn">connect</button>
                    </a>
                    <a href="/service">
                    <button className="btn secondary-btn">Services</button>
                    </a>
                </div>
                </div>
            </div>
            </section>
        </>
    )
}
export default Home;