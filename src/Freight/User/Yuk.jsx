import React, { useEffect, useState, useRef } from 'react'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import { FaBox } from "react-icons/fa";
import { IoArrowUpOutline } from "react-icons/io5";
import { FaTruck } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaFlagCheckered } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { FaTimes } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

// Dropdown komponenti
const Dropdown = ({ label, options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center justify-between w-full border border-gray-300 px-4 py-3 rounded-xl shadow-xs hover:shadow-md transition-all duration-200 bg-white min-w-[180px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-700">{selected}</span>
        <FaCaretDown className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <div
              key={index}
              className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 ${
                selected === option ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              } ${index === 0 ? 'rounded-t-xl' : ''} ${index === options.length - 1 ? 'rounded-b-xl' : ''}`}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CargoModal = ({ isOpen, onClose, onRefresh }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const createFormData = (form) => {
    const formData = new FormData();
    formData.append('title', form.title.value);

    const description = `
      Qayerdan: ${form.from_loc.value}
      Qayerga: ${form.to_loc.value}
      Narx: ${form.price.value} so'm
      Og'irlik: ${form.weight.value} kg
      Hajm: ${form.volume.value} m3
      Qo'shimcha: ${form.content.value}
    `;
    
    formData.append('content', description);
    formData.append('route_starts_where_lat', 100)
    formData.append('route_starts_where_lon', 100)
    formData.append('freight_type', 'newfreight')

    if (form.image.files[0]) {
      formData.append('image', form.image.files[0]);
    }
    return formData;
  };

  const sendRequest = async (token, formData) => {
    return await fetch('https://tokennoty.pythonanywhere.com/api/freight/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: formData,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let token = localStorage.getItem('token');
    console.log('Mavjud token:', token ? token.substring(0, 20) + '...' : 'yo\'q');

    if (!token) {
      alert("Token topilmadi. Iltimos, qayta tizimga kiring.");
      setLoading(false);
      return;
    }

    console.log('Ishlatilayotgan token:', token.substring(0, 20) + '...');

    const form = e.target;
    const formData = createFormData(form);

    try {
      const response = await sendRequest(token, formData);

      if (response.ok) {
        alert("Yuk muvaffaqiyatli qo'shildi!");
        onRefresh();
        onClose();
        form.reset();
      } else {
        const errorText = await response.text();
        console.error("Server xatosi:", response.status, errorText);
        alert(`Xatolik: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.error("Tarmoq xatosi:", err);
      alert("Server bilan aloqa yo'q yoki internet past.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-slate-800">Yangi Yuk Qo'shish</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <FaTimes size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Yuk nomi *</label>
            <input name="title" required className="w-full border border-gray-200 rounded-xl p-3 outline-[#4361ee]" placeholder="Masalan: Meva" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-bold text-slate-700 mb-1">Qayerdan *</label><input name="from_loc" required className="w-full border border-gray-200 rounded-xl p-3 outline-[#4361ee]" /></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-1">Qayerga *</label><input name="to_loc" required className="w-full border border-gray-200 rounded-xl p-3 outline-[#4361ee]" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-bold text-slate-700 mb-1">Og'irlik (kg)</label><input name="weight" type="number" required className="w-full border border-gray-200 rounded-xl p-3 outline-[#4361ee]" /></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-1">Hajm (m³)</label><input name="volume" type="number" required className="w-full border border-gray-200 rounded-xl p-3 outline-[#4361ee]" /></div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Narx (so'm)</label>
            <input name="price" type="number" required className="w-full border border-gray-200 rounded-xl p-3 outline-[#4361ee]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Qo'shimcha</label>
            <textarea name="content" className="w-full border border-gray-200 rounded-xl p-3 outline-[#4361ee] h-20"></textarea>
          </div>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
            <input type="file" name="image" className="hidden" id="fileup" accept="image/*" />
            <label htmlFor="fileup" className="cursor-pointer flex flex-col items-center gap-2 text-gray-500 hover:text-blue-600">
              <FaCloudUploadAlt size={24} /> <span>Rasm yuklash</span>
            </label>
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 bg-[#4361ee] text-white rounded-xl font-bold hover:bg-blue-700 transition-all cursor-pointer">
            {loading ? 'Joylanmoqda...' : 'Yukni Joylash'}
          </button>
        </form>
      </div>
    </div>
  );
};

const Yuk = () => {
  const tabs = [
    "Barcha Yuklar",
    "Faol",
    "Kutilmoqda",
    "Yetkazilgan",
    "Bekor Qilingan",
    "Mening Yuklarim",
  ];
  
  const statusOptions = [
    "Barcha holatlar",
    "Faol",
    "Kutilmoqda",
    "Yetkazilgan",
    "Bekor qilingan"
  ];
  
  const typeOptions = [
    "Barcha turlar",
    "Umumiy yuk",
    "Sovutilgan",
    "Xavfli yuk",
    "Mozor yuk"
  ];
  
  const timeOptions = [
    "Barcha vaqtlar",
    "Bugun",
    "Oxirgi hafta",
    "Oxirgi oy",
    "Oxirgi yil"
  ];
  
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);
  const [selectedType, setSelectedType] = useState(typeOptions[0]);
  const [selectedTime, setSelectedTime] = useState(timeOptions[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFreightData, setFilteredFreightData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [freightData, setFreightData] = useState([]);
  const [stats, setStats] = useState({
    totalYuklar: 0,
    faolYuklar: 0,
    kutilmoqdaYuklar: 0,
    yetkazilganYuklar: 0
  });
  const [user, setUser] = useState(null); // Add user state

  // Chart data for visualization
  const [chartData, setChartData] = useState([
    { name: 'Dush', yuklar: 0, daromad: 0 },
    { name: 'Sesh', yuklar: 0, daromad: 0 },
    { name: 'Chor', yuklar: 0, daromad: 0 },
    { name: 'Pay', yuklar: 0, daromad: 0 },
    { name: 'Jum', yuklar: 0, daromad: 0 },
    { name: 'Shan', yuklar: 0, daromad: 0 },
    { name: 'Yak', yuklar: 0, daromad: 0 },
  ]);

  const COLORS = ['#4361ee', '#7209b7', '#f72585'];

  // Yuklarni API dan olish funksiyasi (Dashboard.jsx dagi kabi)
  const fetchFreights = async () => {
    setLoading(true);
    setError(null);

    let token = localStorage.getItem('token');

    if (!token) {
      setError("Token topilmadi. Iltimos, qayta tizimga kiring.");
      setLoading(false);
      return;
    }

    try {
      // First get user data
      const userResponse = await fetch('https://tokennoty.pythonanywhere.com/api/users/', {
        headers: { 'Authorization': `Token ${token}` }
      });
      
      let userData = null;
      if (userResponse.ok) {
        userData = await userResponse.json();
        console.log("API'dan kelgan foydalanuvchi ma'lumoti:", userData);

        // Agar ma'lumot massiv bo'lib kelsa, birinchisini olamiz
        if (Array.isArray(userData)) {
          setUser(userData[0]);
        } else {
          setUser(userData);
        }
      }

      // Then get freight data
      const response = await fetch('https://tokennoty.pythonanywhere.com/api/freight/', {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('API javobi statusi:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('API dan kelgan ma\'lumotlar:', data);
        
        // Filter by owner_username if user's username is 224443311
        let filteredData = data;
        if (userData && userData.username === "224443311") {
          filteredData = data.filter(item => item.owner_username === "224443311");
          console.log(`Filtered for user 224443311: ${filteredData.length} items found`);
        }
        
        const reversedData = filteredData.reverse(); // Dashboard dagi kabi teskari tartib
        setFreightData(reversedData);
        setFilteredFreightData(reversedData);
        calculateStats(reversedData);
        updateChartData(reversedData);
      } else if (response.status === 404) {
        console.log("API bo'sh yoki 404 xato");
        setFreightData([]);
        setFilteredFreightData([]);
      } else {
        const errorText = await response.text();
        console.error("API dan xato keldi:", response.status, errorText);
        setError(`Server xatosi: ${response.status}`);
      }
    } catch (err) {
      console.error("Internet yoki Server xatosi:", err);
      setError("Server bilan aloqa yo'q. Internetingizni tekshiring.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFreights();
  }, []);

  const calculateStats = (data) => {
    const total = data.length;
    
    // Dashboard.jsx dagi kabi holatni aniqlash
    const deliveredCount = data.filter(item =>
      item.is_shipped === true ||
      item.status === 'completed' ||
      item.status === 'delivered'
    ).length;

    const inProgressCount = data.filter(item =>
      item.is_shipped === false ||
      item.is_shipped == null ||
      item.status === 'active' ||
      item.status === 'pending' ||
      !item.status
    ).length;

    // 3 kundan ko'p vaqt o'tgan faol yuklar
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    
    const kutilmoqdaCount = data.filter(item => {
      if (item.is_shipped === true) return false;
      if (!item.created_at) return false;
      
      const createdDate = new Date(item.created_at);
      return createdDate < threeDaysAgo;
    }).length;

    const faolCount = inProgressCount - kutilmoqdaCount;

    setStats({
      totalYuklar: total,
      faolYuklar: faolCount,
      kutilmoqdaYuklar: kutilmoqdaCount,
      yetkazilganYuklar: deliveredCount
    });
  }

  const updateChartData = (data) => {
    // Haftalik yuklar va daromadni hisoblash
    const days = ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan'];
    
    // Har bir kun uchun random ma'lumotlar (real loyihada bu API dan keladi)
    const newChartData = days.map(day => ({
      name: day,
      yuklar: Math.floor(Math.random() * 30) + 5,
      daromad: Math.floor(Math.random() * 5000) + 1000
    }));
    
    setChartData(newChartData);
  }

  // Format date as DD.MM.YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "Noma'lum";
    
    try {
      const date = new Date(dateString);
      
      if (isNaN(date.getTime())) {
        const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
        if (match) {
          const [, year, month, day] = match;
          return `${day}.${month}.${year}`;
        }
        return "Noma'lum";
      }
      
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      
      return `${day}.${month}.${year}`;
    } catch (error) {
      console.error('Sana formatlashda xatolik:', error, dateString);
      return "Noma'lum";
    }
  }

  // Format time
  const formatTime = (dateString) => {
    if (!dateString) return "Noma'lum";
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Noma'lum";
      
      return date.toLocaleTimeString('uz-UZ', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return "Noma'lum";
    }
  }

  // Filtrlash funksiyasi
  const applyFilters = () => {
    let filtered = [...freightData];

    // Search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        (item.title && item.title.toLowerCase().includes(query)) ||
        (item.freight_type && item.freight_type.toLowerCase().includes(query)) ||
        (item.id && item.id.toString().includes(query)) ||
        (item.freight_rate_amount && item.freight_rate_amount.toString().includes(query))
      );
    }

    // Status filter
    if (selectedStatus !== "Barcha holatlar") {
      if (selectedStatus === "Faol") {
        filtered = filtered.filter(item => 
          item.is_shipped === false ||
          item.is_shipped == null ||
          item.status === 'active' ||
          !item.status
        );
      } else if (selectedStatus === "Yetkazilgan") {
        filtered = filtered.filter(item => 
          item.is_shipped === true ||
          item.status === 'completed' ||
          item.status === 'delivered'
        );
      } else if (selectedStatus === "Kutilmoqda") {
        filtered = filtered.filter(item => 
          item.status === 'pending' ||
          (item.is_shipped === false && item.created_at)
        );
      } else if (selectedStatus === "Bekor qilingan") {
        filtered = filtered.filter(item => item.status === 'cancelled');
      }
    }

    // Yuk turi filter
    if (selectedType !== "Barcha turlar") {
      if (selectedType === "Umumiy yuk") {
        filtered = filtered.filter(item => 
          !item.freight_type || 
          item.freight_type.toLowerCase().includes('general') ||
          item.freight_type.toLowerCase().includes('umumiy')
        );
      } else if (selectedType === "Sovutilgan") {
        filtered = filtered.filter(item => 
          item.freight_type && 
          item.freight_type.toLowerCase().includes('refrigerated') ||
          item.freight_type.toLowerCase().includes('sovutilgan')
        );
      } else if (selectedType === "Xavfli yuk") {
        filtered = filtered.filter(item => 
          item.freight_type && 
          item.freight_type.toLowerCase().includes('hazardous') ||
          item.freight_type.toLowerCase().includes('xavfli')
        );
      } else if (selectedType === "Mozor yuk") {
        filtered = filtered.filter(item => 
          item.freight_type && 
          item.freight_type.toLowerCase().includes('bulk') ||
          item.freight_type.toLowerCase().includes('mozor')
        );
      }
    }

    // Vaqt filter
    if (selectedTime !== "Barcha vaqtlar") {
      const now = new Date();
      filtered = filtered.filter(item => {
        if (!item.created_at) return false;
        const itemDate = new Date(item.created_at);
        
        switch(selectedTime) {
          case "Bugun":
            return itemDate.toDateString() === now.toDateString();
          case "Oxirgi hafta":
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return itemDate >= weekAgo;
          case "Oxirgi oy":
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            return itemDate >= monthAgo;
          case "Oxirgi yil":
            const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
            return itemDate >= yearAgo;
          default:
            return true;
        }
      });
    }

    // Tab filter
    if (activeTab !== "Barcha Yuklar") {
      if (activeTab === "Faol") {
        filtered = filtered.filter(item => 
          item.is_shipped === false ||
          item.is_shipped == null ||
          item.status === 'active' ||
          !item.status
        );
      } else if (activeTab === "Yetkazilgan") {
        filtered = filtered.filter(item => 
          item.is_shipped === true ||
          item.status === 'completed' ||
          item.status === 'delivered'
        );
      } else if (activeTab === "Kutilmoqda") {
        filtered = filtered.filter(item => 
          item.status === 'pending' ||
          (item.is_shipped === false && item.created_at)
        );
      } else if (activeTab === "Bekor Qilingan") {
        filtered = filtered.filter(item => item.status === 'cancelled');
      } else if (activeTab === "Mening Yuklarim") {
        // Hozircha barchasini ko'rsatamiz
        // Kelajakda faqat foydalanuvchi yuklarini filtrlash mumkin
        filtered = filtered;
      }
    }

    setFilteredFreightData(filtered);
    calculateStats(filtered);
  }

  // Filter o'zgarganida filtrni qo'llash
  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedStatus, selectedType, selectedTime, activeTab, freightData]);

  // Tab o'zgarganida statusni yangilash
  useEffect(() => {
    if (activeTab === "Faol") {
      setSelectedStatus("Faol");
    } else if (activeTab === "Yetkazilgan") {
      setSelectedStatus("Yetkazilgan");
    } else if (activeTab === "Kutilmoqda") {
      setSelectedStatus("Kutilmoqda");
    } else if (activeTab === "Bekor Qilingan") {
      setSelectedStatus("Bekor qilingan");
    } else {
      setSelectedStatus("Barcha holatlar");
    }
  }, [activeTab]);

  // Search input handler
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  }

  // Pie chart data
  const pieData = [
    { name: 'Faol', value: stats.faolYuklar },
    { name: 'Yetkazilgan', value: stats.yetkazilganYuklar },
    { name: 'Kutilmoqda', value: stats.kutilmoqdaYuklar },
  ];

  // Get location display text (Dashboard.jsx dagi kabi)
  const getLocationDisplay = (locationData) => {
    if (!locationData) return "Noma'lum";
    
    // Agar locationData object bo'lsa
    if (typeof locationData === 'object') {
      const street = locationData.street || locationData.address || "";
      const region = locationData.region || locationData.city || locationData.state || "";
      
      if (street && region) {
        return `${street}, ${region}`;
      } else if (street) {
        return street;
      } else if (region) {
        return region;
      }
    }
    
    // Agar string bo'lsa
    return locationData || "Noma'lum";
  }

  // Holat rangini olish
  const getStatusColor = (item) => {
    if (item.is_shipped === true || item.status === 'completed' || item.status === 'delivered') {
      return { text: 'YETKAZILDI', bg: 'bg-violet-300/30', textColor: 'text-violet-700' };
    } else if (item.status === 'pending' || item.is_shipped === false) {
      return { text: 'KUTILMOQDA', bg: 'bg-amber-300/30', textColor: 'text-amber-700' };
    } else {
      return { text: 'FAOL', bg: 'bg-blue-300/30', textColor: 'text-sky-500' };
    }
  };

  return (
    <div className='min-h-screen bg-zinc-100'>
      <Navbar />
      <div className='container m-auto fullhdfix fullhdfix2 fullhdfix3'>
        <h1 className='py-8 text-5xl font-semibold max-sm:mx-3'>Yuklar</h1>
        <p className='text-xl text-gray-600 pb-3 max-sm:mx-3'>Barcha yuklaringizni boshqaring, kuzating va tahrirlang</p>
        
        {/* Xatolik xabari */}
        {error && (
          <div className="mx-3 mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchFreights}
              className="mt-2 text-sm text-red-700 hover:text-red-900 font-medium"
            >
              Qayta urinish
            </button>
          </div>
        )}

        {/* Statistikalar */}
        <div className="grid lg:grid-cols-2 gap-x-5">
          <div className="chart">
            <div className="justify-evenly h-[95%] bg-white my-2 rounded-2xl overflow-hidden flex w-full items-center p-4">
              <div className="h-50 w-1/3">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie 
                      data={pieData} 
                      innerRadius={40} 
                      outerRadius={60} 
                      paddingAngle={5} 
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} ta`, 'Miqdor']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="h-50 w-1/2">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <Tooltip 
                      cursor={{ fill: '#f8fafc' }} 
                      contentStyle={{ borderRadius: '16px', border: 'none' }}
                      formatter={(value) => [`${value} so'm`, 'Daromad']}
                    />
                    <Bar dataKey="daromad" fill="#7209b7" radius={[10, 10, 0, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="cards max-sm:mx-3">
            <div className="flex max-sm:flex-col justify-center gap-4 py-3">
              <div className="rounded-xl relative p-2 bg-white duration-200 transition-all hover:-translate-y-2 hover:shadow-lg overflow-hidden shadow-sm sm:w-1/2">
                <div className='h-1 absolute left-0 top-0 w-full bg-linear-30 from-[#4361ee] to-[#7209b7]'></div>
                <div className="flex flex-col py-3 px-4 gap-3">
                  <div className="flex justify-between py-2">
                    <span className='p-3 bg-blue-400/50 rounded-xl text-blue-700'><FaBox className='inline text-xl' /></span>
                    <span className='text-center flex items-center px-2 text-blue-500 rounded-2xl bg-blue-300/50 text-sm'>
                      <IoArrowUpOutline className='inline' />{stats.totalYuklar > 0 ? Math.round((stats.totalYuklar / Math.max(stats.totalYuklar, 1)) * 100) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className='text-xl text-gray-700'>Jami Yuklar</p>
                    <p className='px-3 text-xl font-bold text-gray-900'>{stats.totalYuklar}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl relative p-2 bg-white duration-200 transition-all hover:-translate-y-2 hover:shadow-lg overflow-hidden shadow-sm sm:w-1/2">
                <div className='h-1 absolute left-0 top-0 w-full bg-sky-500'></div>
                <div className="flex flex-col py-3 px-4 gap-3">
                  <div className="flex justify-between py-2">
                    <span className='p-3 bg-sky-400/30 rounded-xl text-sky-500'><FaTruck className='inline text-xl' /></span>
                    <span className='text-center flex items-center px-2 text-blue-500 rounded-2xl bg-blue-300/50 text-sm'>
                      <IoArrowUpOutline className='inline' />{stats.faolYuklar > 0 ? Math.round((stats.faolYuklar / Math.max(stats.totalYuklar, 1)) * 100) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className='text-xl text-gray-700'>Faol Yuklar</p>
                    <p className='px-3 text-xl font-bold text-gray-900'>{stats.faolYuklar}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex max-sm:flex-col justify-center gap-4 py-3">
              <div className="rounded-xl relative p-2 bg-white duration-200 transition-all hover:-translate-y-2 hover:shadow-lg overflow-hidden shadow-sm sm:w-1/2">
                <div className='h-1 absolute left-0 top-0 w-full bg-amber-500'></div>
                <div className="flex flex-col py-3 px-4 gap-3">
                  <div className="flex justify-between py-2">
                    <span className='p-3 bg-amber-300/30 rounded-xl text-amber-500'><FaClock className='inline text-2xl' /></span>
                    <span className='text-center flex items-center px-2 text-red-500 rounded-2xl bg-red-600/20 text-sm'>
                      <FaArrowDown className='inline' /> {stats.kutilmoqdaYuklar > 0 ? Math.round((stats.kutilmoqdaYuklar / Math.max(stats.totalYuklar, 1)) * 100) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className='text-xl text-gray-700'>Kutilmoqda</p>
                    <p className='px-3 text-xl font-bold text-gray-900'>{stats.kutilmoqdaYuklar}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl relative p-2 bg-white duration-200 transition-all hover:-translate-y-2 hover:shadow-lg overflow-hidden shadow-sm sm:w-1/2">
                <div className='h-1 absolute left-0 top-0 w-full bg-linear-30 to-[#4361ee] from-[#7209b7]'></div>
                <div className="flex flex-col py-3 px-4 gap-3">
                  <div className="flex justify-between py-2">
                    <span className='p-3 bg-violet-400/50 rounded-xl text-violet-900'><IoIosCheckmarkCircle className='inline text-2xl' /></span>
                    <span className='text-center flex items-center px-2 text-blue-500 rounded-2xl bg-blue-300/50 text-sm'>
                      <IoArrowUpOutline className='inline' />{stats.yetkazilganYuklar > 0 ? Math.round((stats.yetkazilganYuklar / Math.max(stats.totalYuklar, 1)) * 100) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className='text-xl text-gray-700'>Yetkazilgan</p>
                    <p className='px-3 text-xl font-bold text-gray-900'>{stats.yetkazilganYuklar}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search va filterlar */}
        <div className="w-full flex flex-wrap justify-center items-center gap-x-5 gap-y-3 p-6 my-4 bg-white rounded-xl">
          <div className="relative flex-1">
            <input 
              type="text" 
              value={searchQuery}
              onChange={handleSearch}
              className='border duration-200 transition-all border-gray-400 outline-0 w-full py-2 px-10 rounded-xl shadow-md focus:border-blue-700 focus:shadow-blue-300/50' 
              placeholder="Yuklarni qidirish..." 
            />
            <IoIosSearch className='absolute top-3 text-xl left-3 text-gray-600' />
          </div>
          
          {/* Holatlar dropdown */}
          <Dropdown
            label="Holatlar"
            options={statusOptions}
            selected={selectedStatus}
            onSelect={setSelectedStatus}
          />
          
          {/* Turlar dropdown */}
          <Dropdown
            label="Turlar"
            options={typeOptions}
            selected={selectedType}
            onSelect={setSelectedType}
          />
          
          {/* Vaqtlar dropdown */}
          <Dropdown
            label="Vaqtlar"
            options={timeOptions}
            selected={selectedTime}
            onSelect={setSelectedTime}
          />
          
          <div>
            <button
              type='button'
              onClick={() => setIsModalOpen(true)}
              className='bg-blue-700 text-white px-4 py-3 rounded-lg hover:-translate-y-1 duration-200 transition-all hover:shadow-lg'
            >
              + Yangi yuk
            </button>
          </div>
        </div>

        {/* Natijalar soni */}


        {/* Tablar */}
        <div className="flex items-center flex-wrap gap-y-4 px-1 my-10">
          {tabs.map((tab) => (
            <p 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`transition-all duration-200 px-6 py-2 text-gray-700 cursor-pointer hover:text-blue-700 ${activeTab === tab ? "border-b-2 border-b-blue-700 text-blue-700 font-medium" : "border-b-2 border-b-gray-300"}`}
            >
              {tab}
            </p>
          ))}
        </div>

        {/* Yuklar jadvali */}
        <div className="rounded-2xl overflow-hidden my-10 shadow-lg">
          {loading ? (
            <div className="bg-white p-10 text-center rounded-2xl">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4361ee]"></div>
              <p className="text-xl text-gray-500 mt-4">Yuklar yuklanmoqda...</p>
            </div>
          ) : filteredFreightData.length === 0 ? (
            <div className="bg-white p-10 text-center rounded-2xl">
              <p className="text-xl text-gray-500">Hech qanday yuk topilmadi</p>
              <p className="text-gray-400 mt-2">Filtrlarni o'zgartiring yoki yangi yuk qo'shing</p>
            </div>
          ) : (
            <table className='w-full shadow-md border-collapse'>
              <thead>
                <tr className='bg-gray-50'>
                  <th className='border-b-gray-300 text-gray-800 border-b px-4 py-5 text-start'>Yuk ID</th>
                  <th className='border-b-gray-300 text-gray-800 border-b px-4 py-5 text-start'>MARSHRUT</th>
                  <th className='border-b-gray-300 text-gray-800 border-b px-4 py-5 text-start'>HOLAT</th>
                  <th className='border-b-gray-300 text-gray-800 border-b px-4 py-5 text-start'>VAQT</th>
                  <th className='border-b-gray-300 text-gray-800 border-b px-4 py-5 text-start'>NARX</th>
                </tr>
              </thead>
              <tbody className='bg-white'>
                {filteredFreightData.map((item, index) => {
                  const status = getStatusColor(item);
                  return (
                    <tr key={index} className='hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100'>
                      <td className='py-4 px-4'>
                        <p className='font-semibold'>YUK-{item.id || index + 1}</p>
                        <p className='text-sm text-gray-600'>{item.title || item.freight_type || "Yuk"}</p>
                      </td>
                      <td className='py-4 px-4'>
                        <div className='flex items-center gap-x-2 mb-2'>
                          <span className='px-2 bg-blue-500/20 rounded-full text-blue-700 pb-1'>
                            <FaLocationDot className='inline text-xs' />
                          </span>
                          <div>
                            <p className='font-semibold'>Qayerdan</p>
                            <p className='text-sm text-gray-600'>
                              {getLocationDisplay(item.route_starts_where_data) || 
                               item.route_starts_where_city || 
                               item.origin_address || 
                               item.from_city || 
                               "Noma'lum"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-x-2">
                          <span className='pb-1 px-2 text-violet-900 bg-violet-600/20 rounded-full'>
                            <FaFlagCheckered className='inline text-xs' />
                          </span>
                          <div>
                            <p className='font-semibold'>Qayerga</p>
                            <p className='text-sm text-gray-600'>
                              {getLocationDisplay(item.route_ends_where_data) || 
                               item.route_ends_where_city || 
                               item.destination_address || 
                               item.to_city || 
                               "Noma'lum"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className='py-4 px-4'>
                        <span className={`rounded-full flex max-w-24 items-center ${status.bg} ${status.textColor} px-3 py-1`}>
                          <GoDotFill className='inline mr-1' /> 
                          {status.text}
                        </span>
                      </td>
                      <td className='py-4 px-4'>
                        <p className='font-semibold'>{formatDate(item.created_at)}</p>
                        <p className='text-sm text-gray-600'>{formatTime(item.created_at)}</p>
                      </td>
                      <td className='py-4 px-4'>
                        <p className="font-semibold text-lg">
                          {item.freight_rate_amount || item.price || item.rate
                            ? parseInt(item.freight_rate_amount || item.price || item.rate).toLocaleString('uz-UZ')
                            : "0"} so'm
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <div className="py-10"></div>
      </div>
      <Footer />
      <CargoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRefresh={fetchFreights}
      />
    </div>
  )
}

export default Yuk