import React, { useEffect, useState } from 'react';
import { FaStar, FaTachometerAlt, FaBox, FaTruck, FaWallet, FaChartLine, FaCog, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { FaStarHalfStroke, FaCirclePlus, FaCircleQuestion } from "react-icons/fa6";

const translations = {
    uz: {
        roles: { driver: 'Haydovchi', shipper: "Yuk Jo'natuvchi", user: 'Foydalanuvchi' },
        rating: 'Reyting',
        pages: ["Asosiy", "Yuk qo'shish", "Mening yuklarim", "Haydovchilar", "To'lovlar", "Statistika", "Sozlamalar", "Yordam", "Chiqish"],
        premium: "Premium a'zolik",
        daysLeft: "Sizda {days} kun qoldi",
        logoutConfirm: "Rostdan ham tizimdan chiqmoqchimisiz?"
    },
    ru: {
        roles: { driver: 'Водитель', shipper: 'Отправитель', user: 'Пользователь' },
        rating: 'Рейтинг',
        pages: ["Главная", "Добавить груз", "Мои грузы", "Водители", "Платежи", "Статистика", "Настройки", "Помощь", "Выйти"],
        premium: "Премиум подписка",
        daysLeft: "У вас осталось {days} дней",
        logoutConfirm: "Вы действительно хотите выйти из системы?"
    },
    en: {
        roles: { driver: 'Driver', shipper: 'Shipper', user: 'User' },
        rating: 'Rating',
        pages: ["Home", "Add Freight", "My Freights", "Drivers", "Payments", "Statistics", "Settings", "Help", "Logout"],
        premium: "Premium membership",
        daysLeft: "You have {days} days left",
        logoutConfirm: "Are you sure you want to log out?"
    }
};

const Sidebar = ({ onPageChange, activePage, currentLang = 'uz' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({});
    const [photoUrl, setPhotoUrl] = useState('');
    const t = translations[currentLang];

    const token = localStorage.getItem('token');

    useEffect(() => {
        const loadData = async () => {
            try {
                const promise = await fetch('https://tokennoty.pythonanywhere.com/api/users/', {
                    method: 'GET',
                    headers: { 'Authorization': `Token ${token}` }
                })
                const res = await promise.json();
                const currentUser = Array.isArray(res) ? res[0] : res;
                setUser(currentUser);

                if (currentUser?.photo) {
                    let photoPath = currentUser.photo;
                    if (photoPath.startsWith('/')) {
                        photoPath = `https://tokennoty.pythonanywhere.com${photoPath}`;
                    }
                    setPhotoUrl(photoPath);
                }
            } catch (error) { console.log(error); }
        }
        loadData();
    }, [token]);

    const handleLogout = () => {
        if (window.confirm(t.logoutConfirm)) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
    };

    const pages = [
        { id: 1, title: t.pages[0], key: 'Home', icon: FaTachometerAlt },
        { id: 2, title: t.pages[1], key: 'AddCargo', icon: FaCirclePlus },
        { id: 3, title: t.pages[2], key: 'MyCargos', icon: FaBox },
        { id: 4, title: t.pages[3], key: 'Drivers', icon: FaTruck },
        { id: 5, title: t.pages[4], key: 'Payments', icon: FaWallet },
        { id: 6, title: t.pages[5], key: 'Statistics', icon: FaChartLine },
        { id: 7, title: t.pages[6], key: 'Settings', icon: FaCog },
        { id: 8, title: t.pages[7], key: 'Help', icon: FaCircleQuestion },
        { id: 9, title: t.pages[8], key: 'Logout', icon: FaSignOutAlt },
    ];;

    return (
        <>
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden fixed bottom-6 right-6 z-50 bg-[#4361ee] text-white p-4 rounded-full shadow-2xl">
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            <div className={`fixed top-20 lg:sticky lg:top-25 inset-y-0 left-0 z-40 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:shadow-lg lg:rounded-3xl ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex flex-col h-full py-8 px-5 overflow-y-auto">
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden">
                            {photoUrl ? (
                                <img src={photoUrl} alt="User" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-linear-to-br from-[#4361ee] to-[#7209b7] flex items-center justify-center text-white text-3xl font-bold">
                                    {user.first_name ? user.first_name[0] : 'U'}
                                </div>
                            )}
                        </div>
                        <h3 className="text-xl font-bold mt-3 text-slate-800 text-center">
                            {user.first_name || 'Foydalanuvchi'} {user.last_name || ''}
                        </h3>
                        <span className="text-xs font-bold text-[#4361ee] bg-blue-50 px-3 py-1 rounded-full uppercase mt-2">
                            {user.role === 'driver' ? t.roles.driver : user.role === 'shipper' ? t.roles.shipper : t.roles.user}
                        </span>

                        <div className="mt-4 flex flex-col items-center border-b border-gray-100 w-full pb-6">
                            <span className="text-gray-400 text-sm">{t.rating}</span>
                            <div className="flex items-center gap-1 mt-1 text-[#ffcc02]">
                                <span className="text-xl font-bold text-[#4361ee] mr-2">4.3</span>
                                <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfStroke />
                            </div>
                        </div>
                    </div>

                    <nav className="flex-1">
                        <ul className="space-y-2">
                            {pages
                                .filter(item => !(user?.role === 'driver' && item.title === t.pages[1]))
                                .map((item) => (
                                    <li key={item.id} onClick={() => item.id === 9 ? handleLogout() : onPageChange(item.key)}
                                        className={`flex items-center gap-4 p-3 px-5 rounded-xl cursor-pointer transition-all ${activePage === item.key ? "bg-linear-to-r from-[#4361ee] to-[#7209b7] text-white shadow-lg" : "text-slate-600 hover:bg-slate-50"}`}>
                                        <item.icon size={20} />
                                        <span className="text-lg">{item.title}</span>
                                    </li>
                                ))}
                        </ul>
                    </nav>

                    <div className="mt-8 p-4 bg-slate-50 rounded-2xl">
                        <h4 className="text-sm font-bold text-slate-800">{t.premium}</h4>
                        <p className="text-xs text-slate-500 mt-1">{t.daysLeft.replace('{days}', '15')}</p>
                        <div className="w-full h-2 bg-gray-200 rounded-full mt-3 overflow-hidden">
                            <div className="w-3/5 h-full bg-[#4361ee]" />
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden" />}
        </>
    );
};

export default Sidebar;
