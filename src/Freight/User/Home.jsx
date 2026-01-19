import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from './Sidebar'
import Navbar from './Navbar/Navbar'
import Footer from '../../User/components/User/Footer/Footer'

import Dashboard from './Dashboard/Dashboard'
import AddCargo from './Dashboard/AddCargo'
import MyCargos from './Dashboard/MyCargos'
import Drivers from './Dashboard/Drivers'
import Payments from './Dashboard/Payments'
import Statistics from './Dashboard/Statistics'
import Settings from './Dashboard/Settings'
import Help from './Dashboard/Help'
import FreightDetail from './Dashboard/FreightDetail'

const Home = () => {
  // 1-MUAMMO YECHIMI: Avtomatik 'Home' kaliti bilan boshlanadi
  const [activePage, setActivePage] = useState('Home');
  const [selectedFreightId, setSelectedFreightId] = useState(null);
  const [selectedFreightData, setSelectedFreightData] = useState(null);
  const [lang, setLang] = useState('uz');
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuthorization = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthorized(false);
        setIsLoading(false);
        window.location.href = '/login';
        return;
      }

      try {
        const response = await fetch('https://tokennoty.pythonanywhere.com/api/users/', {
          headers: { 'Authorization': `Token ${token}` }
        });
        if (response.ok) setIsAuthorized(true);
        else {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthorization();
  }, []);

  const handlePageChange = (pageKey) => {
    setActivePage(pageKey);
    setSelectedFreightId(null);
    setSelectedFreightData(null);
  };

  const handleFreightDetail = (page, id, data) => {
    setSelectedFreightId(id);
    setSelectedFreightData(data);
    setActivePage(page);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#4361ee] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // 2-MUAMMO YECHIMI: Keylar orqali switch qilinadi
  const renderPage = () => {
    switch (activePage) {
      case 'Home':
        return <Dashboard currentLang={lang} onFreightDetail={handleFreightDetail} />;
      case 'AddCargo':
        return <AddCargo currentLang={lang} />;
      case 'MyCargos':
        return <MyCargos currentLang={lang} onFreightDetail={handleFreightDetail} />;
      case 'Drivers':
        return <Drivers currentLang={lang} />;
      case 'Payments':
        return <Payments currentLang={lang} />;
      case 'Statistics':
        return <Statistics currentLang={lang} />;
      case 'Settings':
        return <Settings currentLang={lang} />;
      case 'Help':
        return <Help currentLang={lang} />;
      case 'Batafsil':
        return <FreightDetail currentLang={lang} freightId={selectedFreightId} initialData={selectedFreightData} onBack={() => setActivePage('Home')} />;
      default:
        return <Dashboard currentLang={lang} onFreightDetail={handleFreightDetail} />;
    }
  };

  return (
    <div className='bg-[#f8f9fe] min-h-screen'>
      <Navbar currentLang={lang} onLangChange={setLang} />
      <div className="mx-auto px-3 sm:px-6 py-4 lg:py-10 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-72 shrink-0">
          <Sidebar onPageChange={handlePageChange} activePage={activePage} currentLang={lang} />
        </div>

        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <Footer currentLang={lang} />
    </div>
  )
}

export default Home
