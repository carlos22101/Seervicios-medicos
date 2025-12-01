import { useAuth } from './AuthContext'
import { Navigate } from 'react-router-dom'


export function RoleGuard({ children, allow = [] }){
const { user } = useAuth()
if(!user) return <Navigate to="/login" />
if(!allow.includes(user.role)) return <Navigate to="/login" />
return children
}