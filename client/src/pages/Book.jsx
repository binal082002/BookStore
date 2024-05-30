import { useState } from "react";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";


const Book = () => {

    const {books, isLoggedIn} = useAuth();
    const navigate = useNavigate();


    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    }

    const filteredBooks = searchQuery.trim() === "" ? books : books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
);

const buyBook = (id) => {
        if(!isLoggedIn){
            toast.error("Login first!!");
            return navigate("/login");
        }

        return navigate(`/order/${id}`);
    };

    return (
        <>
            <section className="section-services">
                <div className = "container">
                    {/* <h1 className = "main-heading">Books</h1> */}
                    <div className="search-panel">
                        {/* <p className="search-panel-text">Book title here</p> */}
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearch}
                            placeholder="Search books..."
                        />
                    </div>
                </div>

                <div className = "container grid grid-three-cols">
                    {
                        filteredBooks.map((curBook, index) => {
                        const {price, title, author, genre, cover_image_url} = curBook;

                        return (
                            <div className = "card" key = {index}>
                            <div className = "card-img">
                                <img 
                                    src = {cover_image_url}
                                    alt = "books info"
                                    width = "100"
                                />
                            </div>

                            <div className = "card-details">
                                {/* <div className = "grid grid-two-cols"> */}
                                    <h2>{title}</h2>
                                    <h3>Author : {author}</h3>
                                    <h3>Genre : {genre}</h3>

                                {/* </div> */}

                                <div className = "grid grid-two-cols">
                                        <p>{price}$</p>
                                        <button className = "btn" onClick={() => buyBook(curBook._id)}> Buy </button>                                

                                </div>
                            </div>
                        </div>
                        )

                        })
                    }

                </div>

            </section>
        </>
        )
}

export default Book;


