import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const AuthContext = createContext()
export default AuthContext


export function AuthProvider({ children }){
const [token, setToken] = useState(localStorage.getItem('token') || null)
const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
const navigate = useNavigate ? undefined : undefined


const login = ({ email, password }) => {
// Simulación: asigna rol según email
let role = 'paciente'
if(email.includes('medico')) role = 'medico'
if(email.includes('admin')) role = 'admin'


const fakeToken = 'FAKE-TOKEN-123456'
const userObj = { email, role, name: 'Usuario de prueba' }
localStorage.setItem('token', fakeToken)
localStorage.setItem('user', JSON.stringify(userObj))
setToken(fakeToken)
setUser(userObj)
return { token: fakeToken, user: userObj }
}


const logout = () => {
localStorage.removeItem('token')
localStorage.removeItem('user')
setToken(null)
setUser(null)
}


return (
<AuthContext.Provider value={{ token, user, login, logout }}>
{children}
</AuthContext.Provider>
)
}


export function useAuth(){
return useContext(AuthContext)
}