import { NavLink } from "react-router-dom";

const Error = () => {
    return (
        <>
            <section id = "error-page">
                <div className = "content">
                    <h2 className = "header">404</h2>
                    <h4> Page not found!!</h4>

                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam rerum quae libero aliquam, corporis atque.</p>

                    <div className = "btns">
                    <NavLink to = "/">Return Home</NavLink>
                    <NavLink to = "/contact">Report Problem</NavLink>
                    </div>   

                </div>
            </section>
        </>
    )
}

export default Error;