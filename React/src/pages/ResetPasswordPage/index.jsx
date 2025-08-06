import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { verifyUserForPasswordReset, resetPassword } from "../../services/authService.js";
import { useNotification } from "../../context/NotificationContext.jsx";
import JuridiaLogo from '../../assets/juridia_logo_texto_branco.png';

const ResetPasswordPage = () => {
    const [step, setStep] = useState(1); // 1 for birthday, 2 for password
    const [birthday, setBirthday] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const { showNotification } = useNotification();

    useEffect(() => {
        if (!email) {
            showNotification("E-mail não fornecido. Por favor, comece novamente.", "error");
            navigate("/forgot-password");
        }
    }, [email, navigate, showNotification]);

    const handleBirthdayChange = (e) => {
        const { value } = e.target;
        const onlyNums = value.replace(/\D/g, '');
        let formattedDate = onlyNums;

        if (onlyNums.length > 4) {
            formattedDate = `${onlyNums.slice(0, 2)}/${onlyNums.slice(2, 4)}/${onlyNums.slice(4, 8)}`;
        } else if (onlyNums.length > 2) {
            formattedDate = `${onlyNums.slice(0, 2)}/${onlyNums.slice(2, 4)}`;
        }
        setBirthday(formattedDate);
    };

    const handleVerifyBirthday = async (e) => {
        e.preventDefault();

        const parts = birthday.split('/');
        if (parts.length !== 3 || parts[0].length !== 2 || parts[1].length !== 2 || parts[2].length !== 4) {
            showNotification("Formato de data inválido. Use DD/MM/AAAA.", 'error');
            return;
        }
        const birthdayForApi = `${parts[2]}-${parts[1]}-${parts[0]}`;

        try {
            await verifyUserForPasswordReset(email, birthdayForApi);
            showNotification("Data de nascimento verificada. Agora, crie uma nova senha.", "success");
            setStep(2);
        } catch (err) {
            showNotification(err.message, 'error');
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            showNotification("As senhas não coincidem!", "error");
            return;
        }
        if (password.length < 6) { // Example validation
            showNotification("A senha deve ter pelo menos 6 caracteres.", "error");
            return;
        }

        try {
            await resetPassword(email, password);
            showNotification("Senha redefinida com sucesso! Você já pode fazer o login.", "success");
            navigate("/login");
        } catch (err) {
            showNotification(err.message, "error");
        }
    };

    return (
        <div className="flex w-full min-h-screen font-sans">
             <div className="hidden lg:flex lg:w-[47%] bg-[#1F2A44] justify-center items-center">
                 <div className="max-w-[600px] px-8">
                    <img src={JuridiaLogo} alt="Logo JuridIA" />
                </div>
            </div>
            <div className="w-full lg:w-[53%] bg-[#F4F7FB] flex flex-col justify-center items-center p-5 box-border gap-5">
                {step === 1 && (
                    <form onSubmit={handleVerifyBirthday} className="w-full max-w-[430px] flex flex-col gap-5 items-center">
                        <div className="w-full text-left">
                            <h1 className="text-[#1F2A44] text-5xl font-bold font-montserrat mb-2.5">Verificar Identidade</h1>
                            <p className="text-[#A0A0A0] text-base font-light">Para sua segurança, por favor, insira sua data de nascimento.</p>
                        </div>
                        <div className="relative w-full">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="16" y1="2" x2="16" y2="6" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="8" y1="2" x2="8" y2="6" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="3" y1="10" x2="21" y2="10" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </div>
                            <input type="text" value={birthday} onChange={handleBirthdayChange} placeholder="Data de nascimento (DD/MM/AAAA)" maxLength="10" className="w-full py-5 px-12 text-lg bg-[rgba(229,229,230,0.81)] border border-gray-300 rounded-md focus:outline-none focus:border-[#0DACAC]" required />
                        </div>
                        <button type="submit" className="w-full p-5 bg-[#0DACAC] text-white text-3xl font-medium rounded-2xl cursor-pointer hover:bg-[#089a9a] transition-colors">Verificar</button>
                        <div className="text-center text-base">
                            <Link to="/login" className="text-[#007B9E] no-underline">Voltar para o Login</Link>
                        </div>
                    </form>
                )}
                {step === 2 && (
                    <form onSubmit={handleResetPassword} className="w-full max-w-[430px] flex flex-col gap-5 items-center">
                         <div className="w-full text-left">
                            <h1 className="text-[#1F2A44] text-5xl font-bold font-montserrat mb-2.5">Nova Senha</h1>
                            <p className="text-[#A0A0A0] text-base font-light">Crie uma nova senha para sua conta.</p>
                        </div>
                        <div className="relative w-full">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </div>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Nova senha" className="w-full py-5 px-12 text-lg bg-[rgba(229,229,230,0.81)] border border-gray-300 rounded-md focus:outline-none focus:border-[#0DACAC]" required />
                        </div>
                        <div className="relative w-full">
                           <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </div>
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirme a nova senha" className="w-full py-5 px-12 text-lg bg-[rgba(229,229,230,0.81)] border border-gray-300 rounded-md focus:outline-none focus:border-[#0DACAC]" required />
                        </div>
                        <button type="submit" className="w-full p-5 bg-[#0DACAC] text-white text-3xl font-medium rounded-2xl cursor-pointer hover:bg-[#089a9a] transition-colors">Redefinir Senha</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ResetPasswordPage;