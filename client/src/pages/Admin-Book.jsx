import { useState } from "react";
import {useAuth} from "../store/auth";
import { toast } from "react-toastify";

const Book = () => {

    const {authToken} = useAuth();

    const defaultBookForm = {
        book_id : "",
        title : "",
        author : "",
        isbn : "",
        genre : "",
        publication_year : "",
        cover_image_url : "",
        price : "",
        stock : "",
    };

    const [book , setBook] = useState(defaultBookForm);

    const handleInput = (e) =>{
        const name = e.target.name;
        const value = e.target.value;

        setBook({
            ...book,
            [name] : value,
        });
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        try{
            const response = await fetch('https://ecommbookstoreapp.netlify.app/api/admin/add/book', {
                method : "POST",
                headers : { 
                    "Content-Type" : "application/json",
                    Authorization : authToken,
                },
                body : JSON.stringify(book),
            })

            if(response.ok){
                setBook(defaultBookForm);
                toast.success("Book saved successfully!!");
            }

        }catch(err){
            toast.error("Book not added!");
        }
    }

    return (
        <>
             <section>
                <main>
                    <div className = "section-contact">
                        <div className = "container grid grid-two-cols">
            

                            <div className="section-form">
                                <h1 className="main-heading">Add New Book</h1>
                                <br/>

                                <form onSubmit = {handleSubmit}>

                                    <div>
                                        <label htmlFor="book_id">Book Id</label>
                                        <input 
                                            type="text" 
                                            name="book_id"
                                            placeholder="" 
                                            id="book_id"
                                            required
                                            autoComplete="off"
                                            value = {book.book_id}
                                            onChange = {handleInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="title">Title</label>
                                        <input 
                                            type="text" 
                                            name="title"
                                            placeholder="" 
                                            id="title"
                                            required
                                            autoComplete="off"
                                            value = {book.title}
                                            onChange = {handleInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="author"> Author</label>
                                        <input 
                                            type="text" 
                                            name="author"
                                            placeholder="" 
                                            id="author"
                                            required
                                            autoComplete="off"
                                            value = {book.author}
                                            onChange = {handleInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="isbn">ISBN</label>
                                        <input 
                                            type="text" 
                                            name="isbn"
                                            placeholder="" 
                                            id="isbn"
                                            required
                                            autoComplete="off"
                                            value = {book.isbn}
                                            onChange = {handleInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="genre">Genre</label>
                                        <input 
                                            type="text" 
                                            name="genre"
                                            placeholder="" 
                                            id="genre"
                                            required
                                            autoComplete="off"
                                            value = {book.genre}
                                            onChange = {handleInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="publication_year">Publication Year</label>
                                        <input 
                                            type="text" 
                                            name="publication_year"
                                            placeholder="" 
                                            id="publication_year"
                                            required
                                            autoComplete="off"
                                            value = {book.publication_year}
                                            onChange = {handleInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="cover_image_url">Cover Image</label>
                                        <input 
                                            type="url" 
                                            name="cover_image_url"
                                            placeholder="" 
                                            id="cover_image_url"
                                            required
                                            autoComplete="off"
                                            value = {book.cover_image_url}
                                            onChange = {handleInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="price">Price</label>
                                        <input 
                                            type="number" 
                                            name="price"
                                            placeholder="" 
                                            id="price"
                                            required
                                            autoComplete="off"
                                            value = {book.price}
                                            onChange = {handleInput}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="stock">Stock</label>
                                        <input 
                                            type="number" 
                                            name="stock"
                                            placeholder="" 
                                            id="stock"
                                            required
                                            autoComplete="off"
                                            value = {book.stock}
                                            onChange = {handleInput}
                                        />
                                    </div>

                                    <br />
                                    
                                    <button> Submit </button>


                                </form>
                            </div>

                        </div>
                    </div>
                </main>


            </section>

        </>
    )
}

export default Book;