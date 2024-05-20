import { createContext, useContext, useState, useEffect} from "react";
import { toast } from "react-toastify";

//1. context
export const AuthContext = createContext();

//2. Provider
export const AuthProvider = ({children}) => {

  const [token,setToken] = useState(localStorage.getItem("token"));
  const [user,setUser] = useState("");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [services, setServices] = useState([]);
  const authToken = `Bearer ${token}`

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);  
    return localStorage.setItem("token", serverToken);
  }

  let isLoggedIn = !!token; //if token is found value is true.
  console.log("islogged in : ", isLoggedIn);

  //Logout functionality
  const LogoutUser = () =>{
    setToken("");
    return localStorage.removeItem("token");
  };

  //JWT authorization - to get currently logged in userData
  
  const userAuthentication = async() => {
      try{
        setIsloading(true);
        setIsAdmin(false);
        const response = await fetch("https://bookstore-fd4d.onrender.com/api/auth/user", {
          method : "GET",
          headers : {
            Authorization : authToken,
          },
        });

        if(response.ok){
          const data = await response.json();
          console.log("Uer data : ", data.userData);
          setUser(data.userData);
          setIsloading(false);//once data is set into user state then set loading to false!
          
          if(data.userData.isAdmin) setIsAdmin(true);
          else setIsAdmin(false);
        }else {
          toast.error("Error fetching user data!");
          setIsloading(false);
        }

      }catch(err){
        console.error("Error fetching user data");
      }
  }

  //to fetch all books data from back-end
  const getAllBooks = async() => {
    try{
      const response = await fetch("https://bookstore-fd4d.onrender.com/api/store/book",{
        method : "GET"
      });

      if(response.ok){
        const res_data = await response.json();
        setBooks(res_data.message);
        // console.log("Books data : ", res_data.message);
      }


    }catch(err){
      console.log(`Books not fetched from back-end error : ${err}`);
    }
  }

  //to fetch services data from back-end
  const getServices = async() =>{
    try{

      const response = await fetch('https://bookstore-fd4d.onrender.com/api/data/service', {
        method : "GET"
      });

      if(response.ok){
        const res_data = await response.json();
        setServices(res_data.message);
        console.log("Services data : ", res_data.message);
      }

    }catch(err){
      console.log(`services not fetched from back-end error : ${err}`);
    }
  }
   
  useEffect(() => {
    getAllBooks();
    getServices();
    userAuthentication()
  }, []);

  return (
    <AuthContext.Provider value = {{isLoggedIn, isAdmin, storeTokenInLS, LogoutUser, books, user, services, authToken, isLoading}}>
      {children}
    </AuthContext.Provider>
  );
};

//3. Deivery
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);

  if(!authContextValue) {
    throw new Error("useAuth used outside of the Provier");
  }
  return authContextValue;
};