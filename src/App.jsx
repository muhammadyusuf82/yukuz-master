import { Routes, Route } from 'react-router-dom'
import Login from './User/pages/Login/Login'
import Home from './User/pages/Home/Home'
import Yuk from './Freight/User/Yuk'
import ProfileSetup from './User/pages/Login/ProfileSetup'
import FreightHome from './Freight/User/Home'
import Haydovchilar from './Freight/User/Haydovchilar'
import Yordam from './Freight/User/Yordam'
import Map from './Freight/User/Map'
import Narxlar from './Freight/User/Narxlar'
import Admin from './User/components/SuperUser/Admin'
import Messanger from './Freight/User/Messanger'
import Navbar from './Freight/User/Navbar/Navbar'
import Footer from './User/components/User/Footer/Footer'
import React, { useState } from 'react'

function App() {
  const [lang, setLang] = useState('uz');

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile-setup' element={<ProfileSetup />} />
        <Route path='/admin' element={<Admin />} />

        {/* Navbar bilan birga freight routes */}
        <Route
          path='/freight/*'
          element={
            <div className='bg-[#f8f9fe] min-h-screen flex flex-col'>
              <Navbar currentLang={lang} onLangChange={setLang} />
              <div className='flex-1'>
                <Routes>
                  <Route path='asosiy' element={<FreightHome />} />
                  <Route path='yuk' element={<Yuk currentLang={lang} />} />
                  <Route path='haydovchilar' element={<Haydovchilar currentLang={lang} />} />
                  <Route path='xarita' element={<Map currentLang={lang} />} />
                  <Route path='yordam' element={<Yordam currentLang={lang} />} />
                  <Route path='narxlar' element={<Narxlar currentLang={lang} />} />
                  <Route path='chat' element={<Messanger currentLang={lang} />} />
                </Routes>
              </div>
              <Footer currentLang={lang} />
            </div>
          }
        />
      </Routes>
    </>
  )
}

export default App
