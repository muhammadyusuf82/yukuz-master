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

// ... (keep your translations object exactly as it was)

// Dropdown komponenti (keep as is)

const CargoModal = ({ isOpen, onClose, onRefresh, t }) => {
  // ... (keep the modal code as is)
};

// Helper function to get auth token (add this if missing)
const getAuthToken = async () => {
  try {
    const response = await fetch('https://tokennoty.pythonanywhere.com/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'your_username', // Replace with actual username
        password: 'your_password'  // Replace with actual password
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      localStorage.setItem('token', token);
      return token;
    }
    return null;
  } catch (error) {
    console.error('Token olishda xatolik:', error);
    return null;
  }
};

const Yuk = ({ currentLang = 'uz', onLangChange }) => {
  const t = translations[currentLang];

  // Tab keys (use keys instead of translated text for state)
  const tabKeys = ['allCargo', 'active', 'pending', 'delivered', 'cancelled', 'myCargo'];
  const statusKeys = ['allStatuses', 'activeStatus', 'pendingStatus', 'deliveredStatus', 'cancelledStatus'];
  const typeKeys = ['allTypes', 'generalCargo', 'refrigerated', 'hazardous', 'bulk'];
  const timeKeys = ['allTimes', 'today', 'lastWeek', 'lastMonth', 'lastYear'];

  // Get translated options
  const tabs = tabKeys.map(key => t[key]);
  const statusOptions = statusKeys.map(key => t[key]);
  const typeOptions = typeKeys.map(key => t[key]);
  const timeOptions = timeKeys.map(key => t[key]);

  // Store keys instead of translated text in state
  const [activeTabKey, setActiveTabKey] = useState(tabKeys[0]);
  const [selectedStatusKey, setSelectedStatusKey] = useState(statusKeys[0]);
  const [selectedTypeKey, setSelectedTypeKey] = useState(typeKeys[0]);
  const [selectedTimeKey, setSelectedTimeKey] = useState(timeKeys[0]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFreightData, setFilteredFreightData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [freightData, setFreightData] = useState([]);
  const [stats, setStats] = useState({
    totalYuklar: 0,
    faolYuklar: 0,
    kutilmoqdaYuklar: 0,
    yetkazilganYuklar: 0
  });

  // Chart data
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

  // Function to fetch user data and get role
  const fetchUserData = async (token) => {
    try {
      const userResponse = await fetch('https://tokennoty.pythonanywhere.com/api/users/', {
        headers: { 'Authorization': `Token ${token}` }
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        if (Array.isArray(userData) && userData.length > 0) {
          const currentUser = userData[0];
          return currentUser.role || null;
        } else if (userData.role) {
          return userData.role;
        }
      }
      return null;
    } catch (error) {
      console.error('Foydalanuvchi ma\'lumotlarini olishda xatolik:', error);
      return null;
    }
  };

  // Component mount bo'lganda token olish va user ma'lumotlarini olish
  useEffect(() => {
    const initializeTokenAndUser = async () => {
      const existingToken = localStorage.getItem('token');
      if (!existingToken) {
        await getAuthToken();
      }
      loadData();
    };
    initializeTokenAndUser();
  }, []);

  // Reset filter states when language changes
  useEffect(() => {
    // Reset states to their default keys
    setActiveTabKey(tabKeys[0]);
    setSelectedStatusKey(statusKeys[0]);
    setSelectedTypeKey(typeKeys[0]);
    setSelectedTimeKey(timeKeys[0]);
  }, [currentLang]);

  const loadData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      if (!token) {
        console.log('Token yo\'q, yangi token olinmoqda...');
        await getAuthToken();
        return;
      }

      // First, fetch user data to get role
      const role = await fetchUserData(token);
      setUserRole(role);

      // Build the API URL with filter if user is broker
      let url_freight = 'https://tokennoty.pythonanywhere.com/api/freight/';
      if (role === 'broker') {
        url_freight += '?owner__role=broker';
      }

      // Yuklarni olish
      const res = await fetch(url_freight, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        if (res.status === 401) {
          console.log('401 xatosi, yangi token olinmoqda...');
          localStorage.removeItem('access_token');
          const newToken = await getAuthToken();
          if (newToken) {
            const newRole = await fetchUserData(newToken);
            setUserRole(newRole);
            
            let retryUrl = 'https://tokennoty.pythonanywhere.com/api/freight/';
            if (newRole === 'broker') {
              retryUrl += '?owner__role=broker';
            }
            
            const retryRes = await fetch(retryUrl, {
              headers: {
                'Authorization': `Token ${newToken}`,
                'Content-Type': 'application/json'
              }
            });
            if (retryRes.ok) {
              const freight = await retryRes.json();
              processFreightData(freight);
            }
          }
        } else {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
      } else {
        const freight = await res.json();
        processFreightData(freight);
      }
    } catch (error) {
      console.error('Yuklarni yuklashda xatolik:', error);
      // Demo data
      const demoData = [
        {
          id: 1,
          title: "Meva yuki",
          freight_type: t.generalCargo,
          is_shipped: false,
          created_at: "2026-01-17T10:30:00Z",
          freight_rate_amount: "500000",
          freight_rate_currency: "UZS",
          route_starts_where_data: {
            street: "Toshkent sh., Yunusobod t.",
            region: "Toshkent viloyati"
          },
          route_ends_where_data: {
            street: "Samarqand sh., Registon t.",
            region: "Samarqand viloyati"
          }
        },
        // ... rest of demo data
      ];

      setFreightData(demoData);
      setFilteredFreightData(demoData);
      calculateStats(demoData);
      updateChartData(demoData);
    } finally {
      setLoading(false);
    }
  };

  // ... (keep the rest of your helper functions: processFreightData, calculateStats, updateChartData, formatDate, formatTime)

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

    // Get current translated values
    const currentSelectedStatus = t[selectedStatusKey];
    const currentSelectedType = t[selectedTypeKey];
    const currentSelectedTime = t[selectedTimeKey];
    const currentActiveTab = t[activeTabKey];

    // Status filter
    if (currentSelectedStatus !== t.allStatuses) {
      if (currentSelectedStatus === t.activeStatus) {
        filtered = filtered.filter(item => !item.is_shipped);
      } else if (currentSelectedStatus === t.deliveredStatus) {
        filtered = filtered.filter(item => item.is_shipped);
      } else if (currentSelectedStatus === t.pendingStatus) {
        // 3 kundan ko'p vaqt o'tgan faol yuklar
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

        filtered = filtered.filter(item => {
          if (item.is_shipped) return false;
          if (!item.created_at) return false;

          const createdDate = new Date(item.created_at);
          return createdDate < threeDaysAgo;
        });
      } else if (currentSelectedStatus === t.cancelledStatus) {
        filtered = filtered.filter(item => item.freight_type === "cancelled" || item.status === "cancelled");
      }
    }

    // Yuk turi filter
    if (currentSelectedType !== t.allTypes) {
      if (currentSelectedType === t.generalCargo) {
        filtered = filtered.filter(item =>
          !item.freight_type ||
          !item.freight_type.toLowerCase().includes("special") &&
          !item.freight_type.toLowerCase().includes("refrigerated") &&
          !item.freight_type.toLowerCase().includes("hazardous") &&
          !item.freight_type.toLowerCase().includes("bulk")
        );
      } else if (currentSelectedType === t.refrigerated) {
        filtered = filtered.filter(item =>
          item.freight_type &&
          item.freight_type.toLowerCase().includes("refrigerated")
        );
      } else if (currentSelectedType === t.hazardous) {
        filtered = filtered.filter(item =>
          item.freight_type &&
          item.freight_type.toLowerCase().includes("hazardous")
        );
      } else if (currentSelectedType === t.bulk) {
        filtered = filtered.filter(item =>
          item.freight_type &&
          item.freight_type.toLowerCase().includes("bulk")
        );
      }
    }

    // Vaqt filter
    if (currentSelectedTime !== t.allTimes) {
      const now = new Date();
      filtered = filtered.filter(item => {
        if (!item.created_at) return false;
        const itemDate = new Date(item.created_at);

        switch (currentSelectedTime) {
          case t.today:
            return itemDate.toDateString() === now.toDateString();
          case t.lastWeek:
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return itemDate >= weekAgo;
          case t.lastMonth:
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            return itemDate >= monthAgo;
          case t.lastYear:
            const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
            return itemDate >= yearAgo;
          default:
            return true;
        }
      });
    }

    // Tab filter
    if (currentActiveTab !== t.allCargo) {
      if (currentActiveTab === t.active) {
        filtered = filtered.filter(item => !item.is_shipped);
      } else if (currentActiveTab === t.delivered) {
        filtered = filtered.filter(item => item.is_shipped);
      } else if (currentActiveTab === t.pending) {
        // 3 kundan ko'p vaqt o'tgan faol yuklar
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

        filtered = filtered.filter(item => {
          if (item.is_shipped) return false;
          if (!item.created_at) return false;

          const createdDate = new Date(item.created_at);
          return createdDate < threeDaysAgo;
        });
      } else if (currentActiveTab === t.cancelled) {
        filtered = filtered.filter(item => item.freight_type === "cancelled" || item.status === "cancelled");
      } else if (currentActiveTab === t.myCargo) {
        // Hozircha barchasini ko'rsatamiz
        filtered = filtered;
      }
    }

    setFilteredFreightData(filtered);
    calculateStats(filtered);
  };

  // Filter o'zgarganida filtrni qo'llash
  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedStatusKey, selectedTypeKey, selectedTimeKey, activeTabKey, freightData, currentLang]);

  // Tab o'zgarganida statusni yangilash
  useEffect(() => {
    if (activeTabKey === 'active') {
      setSelectedStatusKey('activeStatus');
    } else if (activeTabKey === 'delivered') {
      setSelectedStatusKey('deliveredStatus');
    } else if (activeTabKey === 'pending') {
      setSelectedStatusKey('pendingStatus');
    } else if (activeTabKey === 'cancelled') {
      setSelectedStatusKey('cancelledStatus');
    } else {
      setSelectedStatusKey('allStatuses');
    }
  }, [activeTabKey]);

  // Search input handler
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Pie chart data
  const pieData = [
    { name: t.active, value: stats.faolYuklar },
    { name: t.delivered, value: stats.yetkazilganYuklar },
    { name: t.pending, value: stats.kutilmoqdaYuklar },
  ];

  // Get location display text
  const getLocationDisplay = (locationData) => {
    if (!locationData) return t.unknown;

    const street = locationData.street || locationData.address || locationData.name || "";
    const region = locationData.region || locationData.city || locationData.state || "";

    if (street && region) {
      return `${street}, ${region}`;
    } else if (street) {
      return street;
    } else if (region) {
      return region;
    }

    return t.unknown;
  };

  return (
    <div className='min-h-screen bg-zinc-100'>
      <Navbar currentLang={currentLang} onLangChange={onLangChange} />
      <div className='container m-auto fullhdfix fullhdfix2 fullhdfix3'>
        <h1 className='py-8 text-5xl font-semibold max-sm:mx-3'>{t.pageTitle}</h1>
        <p className='text-xl text-gray-600 pb-3 max-sm:mx-3'>{t.pageDescription}</p>

        {/* Statistikalar */}
        <div className="grid lg:grid-cols-2 gap-x-5">
          {/* ... (keep your statistics section as is) */}
        </div>

        {/* Search va filterlar */}
        <div className="w-full flex flex-wrap justify-center items-center gap-x-5 gap-y-3 p-6 my-4 bg-white rounded-xl">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              className='border duration-200 transition-all border-gray-400 outline-0 w-full py-2 px-10 rounded-xl shadow-md focus:border-blue-700 focus:shadow-blue-300/50'
              placeholder={t.searchPlaceholder}
            />
            <IoIosSearch className='absolute top-3 text-xl left-3 text-gray-600' />
          </div>

          {/* Holatlar dropdown */}
          <Dropdown
            label={t.statusLabel}
            options={statusOptions}
            selected={t[selectedStatusKey]}
            onSelect={(selectedText) => {
              const selectedKey = statusKeys.find(key => t[key] === selectedText);
              if (selectedKey) setSelectedStatusKey(selectedKey);
            }}
          />

          {/* Turlar dropdown */}
          <Dropdown
            label={t.typeLabel}
            options={typeOptions}
            selected={t[selectedTypeKey]}
            onSelect={(selectedText) => {
              const selectedKey = typeKeys.find(key => t[key] === selectedText);
              if (selectedKey) setSelectedTypeKey(selectedKey);
            }}
          />

          {/* Vaqtlar dropdown */}
          <Dropdown
            label={t.timeLabel}
            options={timeOptions}
            selected={t[selectedTimeKey]}
            onSelect={(selectedText) => {
              const selectedKey = timeKeys.find(key => t[key] === selectedText);
              if (selectedKey) setSelectedTimeKey(selectedKey);
            }}
          />

          <div>
            <button
              type='button'
              onClick={() => setIsModalOpen(true)}
              className='bg-blue-700 text-white px-4 py-3 rounded-lg hover:-translate-y-1 duration-200 transition-all hover:shadow-lg'
            >
              {t.newCargo}
            </button>
          </div>
        </div>

        {/* Natijalar soni */}
        <div className="px-6 py-3 bg-white rounded-xl my-4">
          <p className="text-gray-600">
            {t.foundResults} <span className="font-bold text-blue-700">{filteredFreightData.length} {t.resultsSuffix}</span>
            {searchQuery && ` ("${searchQuery}" ${t.byWord})`}
            {selectedStatusKey !== 'allStatuses' && `, ${t.status}: ${t[selectedStatusKey]}`}
            {selectedTypeKey !== 'allTypes' && `, ${t.type}: ${t[selectedTypeKey]}`}
            {selectedTimeKey !== 'allTimes' && `, ${t.time}: ${t[selectedTimeKey]}`}
          </p>
        </div>

        {/* Tablar */}
        <div className="flex items-center flex-wrap gap-y-4 px-1 my-10">
          {tabKeys.map((tabKey) => (
            <p
              key={tabKey}
              onClick={() => setActiveTabKey(tabKey)}
              className={`transition-all duration-200 px-6 py-2 text-gray-700 cursor-pointer hover:text-blue-700 ${activeTabKey === tabKey ? "border-b-2 border-b-blue-700 text-blue-700 font-medium" : "border-b-2 border-b-gray-300"}`}
            >
              {t[tabKey]}
            </p>
          ))}
        </div>

        {/* Yuklar jadvali */}
        <div className="rounded-2xl overflow-hidden my-10 shadow-lg">
          {loading ? (
            <div className="bg-white p-10 text-center rounded-2xl">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4361ee]"></div>
              <p className="text-xl text-gray-500 mt-4">{t.loadingCargo}</p>
            </div>
          ) : filteredFreightData.length === 0 ? (
            <div className="bg-white p-10 text-center rounded-2xl">
              <p className="text-xl text-gray-500">{t.noCargoFound}</p>
              <p className="text-gray-400 mt-2">{t.changeFilters}</p>
            </div>
          ) : (
            <table className='w-full shadow-md border-collapse'>
              <thead>
                <tr className='bg-gray-50'>
                  <th className='border-b-gray-300 text-gray-800 border-b px-4 py-5 text-start'>{t.cargoId}</th>
                  <th className='border-b-gray-300 text-gray-800 border-b px-4 py-5 text-start'>{t.route}</th>
                  <th className='border-b-gray-300 text-gray-800 border-b px-4 py-5 text-start'>{t.statusCol}</th>
                  <th className='border-b-gray-300 text-gray-800 border-b px-4 py-5 text-start'>{t.timeCol}</th>
                  <th className='border-b-gray-300 text-gray-800 border-b px-4 py-5 text-start'>{t.priceCol}</th>
                </tr>
              </thead>
              <tbody className='bg-white'>
                {filteredFreightData.map((item, index) => (
                  <tr key={index} className='hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100'>
                    <td className='py-4 px-4'>
                      <p className='font-semibold'>YUK-{item.id}</p>
                      <p className='text-sm text-gray-600'>{item.title || item.freight_type || "Yuk"}</p>
                    </td>
                    <td className='py-4 px-4'>
                      <div className='flex items-center gap-x-2 mb-2'>
                        <span className='px-2 bg-blue-500/20 rounded-full text-blue-700 pb-1'>
                          <FaLocationDot className='inline text-xs' />
                        </span>
                        <div>
                          <p className='font-semibold'>{t.fromWhere}</p>
                          <p className='text-sm text-gray-600'>
                            {getLocationDisplay(item.route_starts_where_data)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <span className='pb-1 px-2 text-violet-900 bg-violet-600/20 rounded-full'>
                          <FaFlagCheckered className='inline text-xs' />
                        </span>
                        <div>
                          <p className='font-semibold'>{t.toWhere}</p>
                          <p className='text-sm text-gray-600'>
                            {getLocationDisplay(item.route_ends_where_data)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className='py-4 px-4'>
                      <span className={`rounded-full flex max-w-24 items-center ${item.is_shipped ? 'text-violet-700 bg-violet-300/30' : 'text-sky-500 bg-blue-300/30'} px-3 py-1`}>
                        <GoDotFill className='inline mr-1' />
                        {item.is_shipped ? t.deliveredLabel : t.activeLabel}
                      </span>
                    </td>
                    <td className='py-4 px-4'>
                      <p className='font-semibold'>{formatDate(item.created_at)}</p>
                      <p className='text-sm text-gray-600'>{formatTime(item.created_at)}</p>
                    </td>
                    <td className='py-4 px-4'>
                      <p className="font-semibold text-lg">
                        {item.freight_rate_amount ?
                          parseInt(item.freight_rate_amount).toLocaleString('uz-UZ') :
                          "0"} {item.freight_rate_currency || "UZS"}
                      </p>
                    </td>
                  </tr>
                ))}
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
        onRefresh={loadData}
        t={t}
      />
    </div>
  )
}

export default Yuk;