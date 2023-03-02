import  React ,{useEffect , useState} from 'react'
import axios from 'axios'

const AuthContext= React.createContext()
function AuthContextWrapper (props) {
const [isAuthenticated , setIsAuthenticated ] = useState (false)
const [isLoading , setIsLoading ] = useState (true)
const [user , setUser ] = useState ({})
const storeToken = (token ) => {
    localStorage.setItem ("token" , token)
}
const authenticateUser = async () => {
    const storageToken = localStorage.getItem('token')
    if (storageToken) {
        try{
            const response = await axios.get('http://localhost:5005/auth/verify')
            const userDetails = response.data
            console.log ("HALLO: ", userDetails)
        } catch(err) {
            console.log(err)
        }
    }
}
    useEffect (()=> {
 authenticateUser() 

} , [])
 return( 

<AuthContext.Provider  value = {{isAuthenticated , isLoading , user , storeToken , authenticateUser}}>

{props.children}

</AuthContext.Provider>
    )
}
export { AuthContextWrapper , AuthContext}