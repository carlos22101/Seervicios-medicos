import LoginForm from '../components/LoginForm'
import { useAuth } from '../../../core/auth/AuthContext'
import { useNavigate } from 'react-router-dom'


export default function LoginPage(){
const { login } = useAuth()
const navigate = useNavigate()


const handleSubmit = async (form) => {
const { user } = login(form)
// redirige según rol
if(user.role === 'medico') navigate('/medico')
else if(user.role === 'admin') navigate('/admin')
else navigate('/paciente')
}


return (
<div className="w-full h-screen flex items-center justify-center bg-[url('/src/assets/fondo-medico.png')] bg-cover">
<div className="bg-white p-8 rounded-xl shadow-xl w-[420px]">
<img src="/src/assets/logo.png" alt="logo" className="w-28 mx-auto mb-4" />
<h2 className="text-center text-2xl font-semibold mb-4">¡Bienvenido a UP-Ayotik!</h2>
<LoginForm onSubmit={handleSubmit} />
</div>
</div>
)
}