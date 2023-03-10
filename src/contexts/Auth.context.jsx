import  React ,{useEffect , useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const AuthContext= React.createContext()

function AuthContextWrapper(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const loginUser = async (email, password, {justSignedUp}) => {
    try {
      const token = await axios.post(`${import.meta.env.VITE_BASE_URL_API}/auth/login`, {
        email: email ,
        password: password,
      })
      const receivedToken = await token.data.token;
      storeToken(receivedToken);
      authenticateUser();
      if (!justSignedUp) {
        navigate("/home");
      } else if (justSignedUp) {
        navigate("/post-signup");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message)
    }
  }

  const storeToken = (token) => {
    localStorage.setItem ("token", token);
  }

  const renewToken = async () => {
    try {
      const token = await axios.post(`${import.meta.env.VITE_BASE_URL_API}/auth/update-token`, {
        email: user.email
      })
      const newToken = token.data.token;
      removeToken();
      storeToken(newToken);
      authenticateUser();
    } catch (error) {
      console.log(error);
    }
  }

  const authenticateUser = async () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL_API}/auth/verify`, {
          headers : {
            Authorization : `Bearer ${storedToken}`
          }
        })
        const userData = await response.data;
        setIsAuthenticated(true);
        setIsLoading(false);
        setUser({
          username: userData.username, 
          email: userData.email, 
          status: userData.status, 
          tournaments: userData.tournaments, 
          interest: userData.interest,
          slogan: userData.slogan,
          profileImage: userData.profileImage,
          profileBackgroundImage: userData.profileBackgroundImage,
          profileBackgroundColor: userData.profileBackgroundColor,
          profileTextColor: userData.profileTextColor,
          commentCount: userData.commentCount,
          messages: userData.messages,
          friendsList: userData.friendsList
        });
      } catch(err) {
        console.log(err);
        setIsAuthenticated(false);
        setIsLoading(false);
        setUser(null);
      }
    } else {
      setIsAuthenticated(false);
      setIsLoading(false);
      setUser(null);
    }
  }

  const removeToken = () => {
    localStorage.removeItem("token");
  }

  const logoutUser = () => {
    removeToken();
    authenticateUser();
    navigate("/");
  }

  useEffect(()=> {
    authenticateUser() 
  }, [])

  return( 
    <AuthContext.Provider  value={{isAuthenticated , isLoading , renewToken, user, storeToken , authenticateUser, loginUser, logoutUser, errorMessage, setErrorMessage}}>
    {props.children}
    </AuthContext.Provider>
)}

export { AuthContextWrapper , AuthContext}