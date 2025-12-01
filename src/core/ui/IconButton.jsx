export default function IconButton({ onClick, children }){
return (
<button onClick={onClick} className="p-2 rounded hover:bg-gray-100">{children}</button>
)
}