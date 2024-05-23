import Ana from "../Components/Ana";
import {useAuth} from "../store/auth"

const Home = () => {

    const {user} = useAuth();

    return (
        <>
            <main>
                <section className = "hero">
                        <div className = "hero-left">
                            <h2>Hello { user ? `${user.username}` : ""} </h2>
                            <p className="welcome-text">Welcome to <br/>The Bookshelf!</p>
                            <h2> Dive into a world of imagination and exploration as you peruse our extensive collection of books spanning various genres, including fiction, non-fiction, mystery, romance, sci-fi, fantasy, and more.</h2>
                    
                            <div className="hero-latest-btn">
                                <div>
                                    <div>
                                        <a href = "/book">
                                            <button className = "btn">Start Browsing</button>
                                        </a>
                                    </div>
                                    
                                </div>
                            </div>

                        </div>

                        <div className = "hero-right">
                            <img src = "/images/home.jpg"
                              alt = "coding together"
                              width = "500"
                             />
                        </div>

                </section>
            </main>

           {/* 2nd section  */}
                <Ana />

            {/* 3rd section  */}
            <section className="hero">
                {/* hero images  */}
                <div className="hero-right">
                <img
                    src="/images/home_1.jpg"
                    alt="coding together"
                    width="600"
                    height="500"
                />
                </div>

                <div className="hero-left">
                    <h2 className="h2-last">Let us help you find your next adventure.</h2>
                    <p className="p-last"> Start Your Reading Journey Today!</p>
                        <h2 className="h2-last">
                            Ready to dive into a new world? 
                            Contact us today for personalized recommendations.we're here to assist you every step of the way.
                        </h2>

                    <div  className="btn btn-group">
                        <a href="/contact">
                            <button className="btn">connect</button>
                        </a>
                        <a href="/service">
                            <button className="btn secondary-btn">Services</button>
                        </a>
                    </div>

                    {/* <div className="hero-latest-btn">
                        <a href="/contact">
                            <button className="btn">connect</button>
                        </a>
                        <a href="/service">
                            <button className="btn">Services</button>
                        </a>
                    </div> */}
                </div>
            </section>
        </>
    )
}
export default Home;



// import React from 'react'
// import './Offers.css'
// import exclusive_image from '../Assets/exclusive_image.png'

// const Offers = () => {
//   return (
//     <div className='offers'>
//         <div className="offers-left">
//             <h1>EXCLUSIVE</h1>
//             <h1>OFFERS FOR YOU</h1>
//             <p>ONLY ON BEST SELLER PRODUCTS</p>
//             <button>Check Now</button>
//         </div>
//         <div className="offers-right">
//             <img src={exclusive_image} alt="" />
//         </div>
//     </div>
//   )
// }

// export default Offers