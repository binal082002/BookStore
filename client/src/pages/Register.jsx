import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: ""
    });

    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://bookstore-fd4d.onrender.com/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });

            const res_data = await response.json();

            if (response.ok) {
                storeTokenInLS(res_data.token);
                toast.success("Registration Successful!");
                setUser({ username: "", email: "", phone: "", password: "" });
                navigate("/login");
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className="loginsignup">
                <div className="container grid grid-two-cols">
                    <div className="registration-image">
                        <img src="/images/register.png" alt="Trying to regiser!" width="500" height="500" />
                    </div>

                    <div className="loginsignup-container">
                        <h1>Registration Form</h1>

                        <form onSubmit={handleSubmit}>
                            <div className="loginsignup-fields">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="username"
                                    id="username"
                                    required
                                    autoComplete="off"
                                    value={user.username}
                                    onChange={handleInput}
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    id="email"
                                    required
                                    autoComplete="off"
                                    value={user.email}
                                    onChange={handleInput}
                                />

                                <input
                                    type="number"
                                    name="phone"
                                    placeholder="phone"
                                    id="phone"
                                    required
                                    autoComplete="off"
                                    value={user.phone}
                                    onChange={handleInput}
                                />

                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    id="password"
                                    required
                                    autoComplete="off"
                                    value={user.password}
                                    onChange={handleInput}
                                />
                            </div>

                            <button type="submit">Register Now</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
