import { useState } from 'react'


export default function LoginForm({ onSubmit }){
const [form, setForm] = useState({ email: '', password: '' })
return (
<form onSubmit={(e) => { e.preventDefault(); onSubmit(form) }} className="space-y-3">
<input type="email" required placeholder="Correo electrónico" className="w-full border p-2 rounded" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
<input type="password" required placeholder="Número de Expediente" className="w-full border p-2 rounded" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} />
<button className="w-full bg-blue-600 text-white py-2 rounded">Iniciar sesión</button>
</form>
)
}