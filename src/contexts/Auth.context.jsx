import  React ,{useEffect , useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const AuthContext= React.createContext()

function AuthContextWrapper(props) {
const [isAuthenticated , setIsAuthenticated] = useState(false)
const [isLoading , setIsLoading] = useState(true)
const [user , setUser] = useState({})
const navigate = useNavigate();

const loginUser = async (email, password) => {
    try {
      const user = await axios.post('http://localhost:5005/auth/login', {
        email: email ,
        password: password,
      })
      const token = await user.data.token 
      storeToken(token)
      authenticateUser();
      navigate("/home");
    } catch (error) {
      console.log(error);
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
            const userDetails = await response.data
            console.log ("HALLO: ", userDetails)
            setIsAuthenticated(true)
            setIsLoading(false)
            setUser(userDetails)
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
    <AuthContext.Provider  value = {{isAuthenticated , isLoading , user , storeToken , authenticateUser, loginUser, logoutUser}}>
    {props.children}
    </AuthContext.Provider>
)}

export { AuthContextWrapper , AuthContext}