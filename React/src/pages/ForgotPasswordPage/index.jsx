import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { verifyEmailForPasswordReset } from "../../services/authService.js";
import { useNotification } from "../../context/NotificationContext.jsx";
import JuridiaLogo from '../../assets/juridia_logo_texto_branco.png';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const { showNotification } = useNotification();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await verifyEmailForPasswordReset(email);
            showNotification("E-mail verificado. Por favor, insira sua data de nascimento.", "success");
            navigate("/reset-password", { state: { email } });
        } catch (err) {
            showNotification(err.message, 'error');
        }
    };

    return (
        <div className="flex w-full min-h-screen font-sans">
            <div className="hidden lg:flex lg:w-[47%] bg-[#1F2A44] justify-center items-center">
                 <div className="max-w-[600px] px-8">
                    <img src={JuridiaLogo} alt="Logo JuridIA" />
                </div>
            </div>
            <form onSubmit={handleSubmit} className="w-full lg:w-[53%] bg-[#F4F7FB] flex flex-col justify-center items-center p-5 box-border gap-5">
                <div className="w-full max-w-[430px] text-left">
                    <h1 className="text-[#1F2A44] text-5xl font-bold font-montserrat mb-2.5">Recuperar Senha</h1>
                    <p className="text-[#A0A0A0] text-base font-light">Insira seu e-mail para continuar</p>
                </div>
                <div className="relative w-full max-w-[430px]">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 6L12 13L2 6" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu E-mail" className="w-full py-5 px-12 text-lg bg-[rgba(229,229,230,0.81)] border border-gray-300 rounded-md focus:outline-none focus:border-[#0DACAC]" required />
                </div>
                <button type="submit" className="w-full max-w-[430px] p-5 bg-[#0DACAC] text-white text-3xl font-medium rounded-2xl cursor-pointer hover:bg-[#089a9a] transition-colors">Verificar E-mail</button>
                 <div className="text-center text-base">
                    <Link to="/login" className="text-[#007B9E] no-underline">Voltar para o Login</Link>
                </div>
            </form>
        </div>
    );
};

export default ForgotPasswordPage;