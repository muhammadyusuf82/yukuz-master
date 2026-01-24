import React, { useState, useEffect, useRef } from 'react';
import { FaTruckLoading, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { NavLink, Link } from 'react-router-dom';

// Bayroqlar rasmlari (Yo'llarni o'zingni loyihangga qarab to'g'irlab ol)
import uz from '../../../images/uz.png'
import ru from '../../../images/ru.png'
import en from '../../../images/en.png'

const translations = {
  uz: {
    nav: {
      home: 'Asosiy',
      freight: 'Yuklar',
      drivers: 'Haydovchilar',
      map: 'Xarita',
      prices: 'Narxlar',
      help: 'Yordam'
    },
    register: "Ro'yxatdan o'tish"
  },
  ru: {
    nav: {
      home: 'Главная',
      freight: 'Грузы',
      drivers: 'Водители',
      map: 'Карта',
      prices: 'Цены',
      help: 'Помощь'
    },
    register: "Регистрация"
  },
  en: {
    nav: {
      home: 'Home',
      freight: 'Freight',
      drivers: 'Drivers',
      map: 'Map',
      prices: 'Prices',
      help: 'Help'
    },
    register: "Register"
  }
};

const Navbar = ({ currentLang, onLangChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');
  const [user, setUser] = useState(null);
  const langRef = useRef(null);
  const token = localStorage.getItem('token');

  const t = translations[currentLang || 'uz']; // Tilni tanlash

  // API orqali user ma'lumotlarini olish (Sening birinchi kodingdan)
  useEffect(() => {
    const loadData = async () => {
      if (!token) return;
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
      } catch (error) {
        console.log("Navbar user error:", error);
      }
    }
    loadData();
  }, [token]);

  // Dropdownni tashqariga bosganda yopish
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languages = [
    { code: 'uz', label: 'UZ', flag: uz },
    { code: 'ru', label: 'RU', flag: ru },
    { code: 'en', label: 'EN', flag: en }
  ];

  const activeLinkClass = ({ isActive }) =>
    `${isActive ? 'text-white bg-[#4361ee]' : 'text-gray-600 hover:text-white hover:bg-[#4361ee]'} font-semibold cursor-pointer duration-300 rounded-xl px-4 py-2 transition-all`;

  return (
    <nav className='h-20 flex items-center bg-white shadow-md sticky top-0 z-50'>
      <div className="container mx-auto px-4 sm:px-5 flex items-center justify-between">

        {/* Logo */}
        <div className="flex gap-3 items-center cursor-pointer duration-300 transform hover:scale-105">
          <div className="w-10 h-10 rounded-lg flex items-center bg-linear-to-br from-[#4361ee] to-[#7209b7]">
            <FaTruckLoading className='text-xl text-white m-auto' />
          </div>
          <Link to={'/'}>
            <h2 className='text-2xl text-[#4361ee] font-bold'>Yuk.uz</h2>
          </Link>
        </div>

        {/* Desktop Menyu */}
        <ul className='hidden lg:flex list-none gap-4 items-center'>
          <NavLink to='/freight/asosiy' className={activeLinkClass}>{t.nav.home}</NavLink>
          <NavLink to='/freight/yuk' className={activeLinkClass}>{t.nav.freight}</NavLink>
          <NavLink to='/freight/haydovchilar' className={activeLinkClass}>{t.nav.drivers}</NavLink>
          <NavLink to='/freight/xarita' className={activeLinkClass}>{t.nav.map}</NavLink>
          <NavLink to='/freight/narxlar' className={activeLinkClass}>{t.nav.prices}</NavLink>
          <NavLink to='/freight/yordam' className={activeLinkClass}>{t.nav.help}</NavLink>
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          {/* Til tanlash Dropdown (Custom) */}
          <div className="relative" ref={langRef}>
            <div
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 px-3 py-2 border-2 border-gray-100 rounded-lg cursor-pointer hover:border-[#4361ee] duration-300 bg-gray-50"
            >
              <span className="font-bold text-gray-700">{currentLang?.toUpperCase()}</span>
              <FaChevronDown className={`text-xs transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </div>

            {langOpen && (
              <div className="absolute top-full mt-2 right-0 w-28 bg-white shadow-xl rounded-lg border border-gray-100 overflow-hidden z-50">
                {languages.map((l) => (
                  <div
                    key={l.code}
                    onClick={() => { onLangChange(l.code); setLangOpen(false); }}
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold flex items-center gap-2 ${currentLang === l.code ? 'text-[#4361ee] bg-blue-50' : 'text-gray-600'}`}
                  >
                    <img src={l.flag} alt={l.label} className='w-5 h-4 object-cover rounded-sm' /> {l.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profil yoki Login */}
          {token ? (
            <NavLink to='/freight/chat' className="w-12 h-12 rounded-full border-2 border-[#4361ee] shadow-md overflow-hidden hover:scale-105 duration-300">
              {photoUrl ? (
                <img src={photoUrl} alt="User" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-[#4361ee] to-[#7209b7] flex items-center justify-center text-white text-xl font-bold">
                  {user?.first_name ? user.first_name[0] : 'U'}
                </div>
              )}
            </NavLink>
          ) : (
            <Link to={'/login'}>
              <button className='bg-[#4361ee] text-white text-sm font-semibold border-2 border-[#4361ee] rounded-lg py-2 px-5 hover:bg-white hover:text-[#4361ee] duration-300'>
                {t.register}
              </button>
            </Link>
          )}
        </div>

        {/* Mobile menu icon */}
        <div className="lg:hidden text-2xl text-[#4361ee] cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menyu */}
      <div className={`fixed top-20 left-0 w-full bg-white shadow-xl transition-all duration-300 lg:hidden overflow-hidden ${isOpen ? 'max-h-125 border-b' : 'max-h-0'}`}>
        <ul className='flex flex-col p-5 gap-4'>
          <NavLink to='/freight/asosiy' onClick={() => setIsOpen(false)} className="text-gray-600 font-semibold py-2 border-b border-gray-50">{t.nav.home}</NavLink>
          <NavLink to='/freight/yuk' onClick={() => setIsOpen(false)} className="text-gray-600 font-semibold py-2 border-b border-gray-50">{t.nav.freight}</NavLink>
          <NavLink to='/freight/haydovchilar' onClick={() => setIsOpen(false)} className="text-gray-600 font-semibold py-2 border-b border-gray-50">{t.nav.drivers}</NavLink>

          <div className="flex gap-4 py-4 justify-center">
            {languages.map(l => (
              <div
                key={l.code}
                onClick={() => { onLangChange(l.code); setIsOpen(false); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold ${currentLang === l.code ? 'bg-[#4361ee] text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                <img src={l.flag} className="w-5" alt="" /> {l.label}
              </div>
            ))}
          </div>

          {!token && (
            <Link to={'/login'} onClick={() => setIsOpen(false)} className='w-full bg-[#4361ee] text-white text-center rounded-xl py-3 font-semibold shadow-lg'>
              {t.register}
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
