import  React ,{useEffect , useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const AuthContext= React.createContext()

function AuthContextWrapper(props) {
const [isAuthenticated, setIsAuthenticated] = useState(false)
const [isLoading, setIsLoading] = useState(true)
const [user, setUser] = useState(null)
const [errorMessage, setErrorMessage] = useState("");
const navigate = useNavigate();

const loginUser = async (email, password, {justSignedUp}) => {
    try {
      const token = await axios.post('http://localhost:5005/auth/login', {
        email: email ,
        password: password,
      })
      const receivedToken = await token.data.token 
      storeToken(receivedToken)
      authenticateUser();
      console.log("TOKEN: ", token)
      console.log(justSignedUp);
      if (!justSignedUp) {
        console.log("Navigating to HOME")
        navigate("/home");
      } else if (justSignedUp) {
        console.log("Navigating to POST SIGNUP")
        navigate("/post-signup")
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message)
    }
}

const storeToken = (token) => {
    localStorage.setItem ("token", token)
}

const authenticateUser = async () => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
        try {
            const response = await axios.get('http://localhost:5005/auth/verify', {
                headers : {
                    Authorization : `Bearer ${storedToken}`
                }
            })
            const userData = await response.data
            setIsAuthenticated(true)
            setIsLoading(false)
            console.log("INTEREST: ", userData)
            setUser({username: userData.username, email: userData.email, status: userData.status, tournaments: userData.tournaments, interest: userData.interest})
        } catch(err) {
            console.log(err)
            setIsAuthenticated(false)
            setIsLoading(false)
            setUser(null)
        }
    } else {
        setIsAuthenticated(false)
        setIsLoading(false)
        setUser(null) 
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
    <AuthContext.Provider  value={{isAuthenticated , isLoading , user , storeToken , authenticateUser, loginUser, logoutUser, errorMessage}}>
    {props.children}
    </AuthContext.Provider>
)}

export { AuthContextWrapper , AuthContext}