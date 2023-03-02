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
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
        try{
            const response = await axios.get('http://localhost:5005/auth/verify' , {
                headers : {
                    Authorization : `Bearer ${storedToken}`
                }
            })
            const userDetails = response.data
            console.log ("HALLO: ", userDetails)
          setIsAuthenticated(true)
          setIsLoading(false)
          setUser(userDetails)
        } catch(err) {
            setIsAuthenticated(false)
          setIsLoading(true)
          setUser(null)
            console.log(err)
        }
    }
    else {setIsAuthenticated(false)
        setIsLoading(true)
        setUser(null) }
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