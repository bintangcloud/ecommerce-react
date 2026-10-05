import { Link } from "react-router-dom";

export default function BackButton({ to = "/", label = "Kembali" }) {
return (
    <Link 
    to={to} 
    className="inline-flex items-center gap-2 text-gray-500 hover:text-[#8B0000] font-semibold transition-colors mb-6"
    >
    <span>❮</span> {label}
    </Link>
);
}