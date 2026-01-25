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

// Tarjimalar obyekti
const translations = {
  uz: {
    // Sahifa sarlavhalari
    pageTitle: "Yuklar",
    pageDescription: "Barcha yuklaringizni boshqaring, kuzating va tahrirlang",

    // Tablar
    allCargo: "Barcha Yuklar",
    active: "Faol",
    pending: "Kutilmoqda",
    delivered: "Yetkazilgan",
    cancelled: "Bekor Qilingan",
    myCargo: "Mening Yuklarim",

    // Holatlar
    allStatuses: "Barcha holatlar",
    activeStatus: "Faol",
    pendingStatus: "Kutilmoqda",
    deliveredStatus: "Yetkazilgan",
    cancelledStatus: "Bekor qilingan",

    // Turlar
    allTypes: "Barcha turlar",
    generalCargo: "Umumiy yuk",
    refrigerated: "Sovutilgan",
    hazardous: "Xavfli yuk",
    bulk: "Mozor yuk",

    // Vaqtlar
    allTimes: "Barcha vaqtlar",
    today: "Bugun",
    lastWeek: "Oxirgi hafta",
    lastMonth: "Oxirgi oy",
    lastYear: "Oxirgi yil",

    // Statistikalar
    totalCargo: "Jami Yuklar",
    activeCargo: "Faol Yuklar",
    pendingCargo: "Kutilmoqda",
    deliveredCargo: "Yetkazilgan",

    // Qidiruv va filterlar
    searchPlaceholder: "Yuklarni qidirish...",
    statusLabel: "Holatlar",
    typeLabel: "Turlar",
    timeLabel: "Vaqtlar",
    newCargo: "+ Yangi yuk",

    // Natijalar
    foundResults: "Topilgan yuklar:",
    resultsSuffix: "ta",
    byWord: "so'zi bo'yicha",
    status: "Holat",
    type: "Tur",
    time: "Vaqt",

    // Modal
    newCargoTitle: "Yangi Yuk Qo'shish",
    cargoName: "Yuk nomi *",
    cargoNamePlaceholder: "Masalan: Meva",
    from: "Qayerdan *",
    to: "Qayerga *",
    weight: "Og'irlik (kg)",
    volume: "Hajm (m³)",
    price: "Narx (so'm)",
    additional: "Qo'shimcha",
    uploadImage: "Rasm yuklash",
    placeCargo: "Yukni Joylash",
    placing: "Joylanmoqda...",

    // Jadval
    cargoId: "Yuk ID",
    route: "MARSHRUT",
    statusCol: "HOLAT",
    timeCol: "VAQT",
    priceCol: "NARX",
    fromWhere: "Qayerdan",
    toWhere: "Qayerga",
    activeLabel: "FAOL",
    deliveredLabel: "YETKAZILDI",
    unknown: "Noma'lum",

    // Xabarlar
    loadingCargo: "Yuklar yuklanmoqda...",
    noCargoFound: "Hech qanday yuk topilmadi",
    changeFilters: "Filtrlarni o'zgartiring yoki yangi yuk qo'shing",

    // Grafiklar
    quantity: "Miqdor",
    income: "Daromad",

    // Xatoliklar
    authError: "Token olishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
    networkError: "Server bilan aloqa yo'q yoki internet past."
  },
  ru: {
    // Sahifa sarlavhalari
    pageTitle: "Грузы",
    pageDescription: "Управляйте, отслеживайте и редактируйте все ваши грузы",

    // Tablar
    allCargo: "Все Грузы",
    active: "Активные",
    pending: "Ожидающие",
    delivered: "Доставленные",
    cancelled: "Отмененные",
    myCargo: "Мои Грузы",

    // Holatlar
    allStatuses: "Все статусы",
    activeStatus: "Активные",
    pendingStatus: "Ожидающие",
    deliveredStatus: "Доставленные",
    cancelledStatus: "Отмененные",

    // Turlar
    allTypes: "Все типы",
    generalCargo: "Общий груз",
    refrigerated: "Охлажденный",
    hazardous: "Опасный груз",
    bulk: "Насыпной груз",

    // Vaqtlar
    allTimes: "Все время",
    today: "Сегодня",
    lastWeek: "Последняя неделя",
    lastMonth: "Последний месяц",
    lastYear: "Последний год",

    // Statistikalar
    totalCargo: "Всего Грузов",
    activeCargo: "Активные Грузы",
    pendingCargo: "Ожидающие",
    deliveredCargo: "Доставленные",

    // Qidiruv va filterlar
    searchPlaceholder: "Поиск грузов...",
    statusLabel: "Статусы",
    typeLabel: "Типы",
    timeLabel: "Время",
    newCargo: "+ Новый груз",

    // Natijalar
    foundResults: "Найдено грузов:",
    resultsSuffix: "шт",
    byWord: "по слову",
    status: "Статус",
    type: "Тип",
    time: "Время",

    // Modal
    newCargoTitle: "Добавить Новый Груз",
    cargoName: "Название груза *",
    cargoNamePlaceholder: "Например: Фрукты",
    from: "Откуда *",
    to: "Куда *",
    weight: "Вес (кг)",
    volume: "Объем (м³)",
    price: "Цена (сум)",
    additional: "Дополнительно",
    uploadImage: "Загрузить изображение",
    placeCargo: "Разместить Груз",
    placing: "Размещение...",

    // Jadval
    cargoId: "ID Груза",
    route: "МАРШРУТ",
    statusCol: "СТАТУС",
    timeCol: "ВРЕМЯ",
    priceCol: "ЦЕНА",
    fromWhere: "Откуда",
    toWhere: "Куда",
    activeLabel: "АКТИВЕН",
    deliveredLabel: "ДОСТАВЛЕН",
    unknown: "Неизвестно",

    // Xabarlar
    loadingCargo: "Грузы загружаются...",
    noCargoFound: "Грузы не найдены",
    changeFilters: "Измените фильтры или добавьте новый груз",

    // Grafiklar
    quantity: "Количество",
    income: "Доход",

    // Xatoliklar
    authError: "Ошибка получения токена. Пожалуйста, попробуйте снова.",
    networkError: "Нет связи с сервером или интернет слабый."
  },
  en: {
    // Sahifa sarlavhalari
    pageTitle: "Cargo",
    pageDescription: "Manage, track and edit all your cargo shipments",

    // Tablar
    allCargo: "All Cargo",
    active: "Active",
    pending: "Pending",
    delivered: "Delivered",
    cancelled: "Cancelled",
    myCargo: "My Cargo",

    // Holatlar
    allStatuses: "All Statuses",
    activeStatus: "Active",
    pendingStatus: "Pending",
    deliveredStatus: "Delivered",
    cancelledStatus: "Cancelled",

    // Turlar
    allTypes: "All Types",
    generalCargo: "General Cargo",
    refrigerated: "Refrigerated",
    hazardous: "Hazardous",
    bulk: "Bulk",

    // Vaqtlar
    allTimes: "All Times",
    today: "Today",
    lastWeek: "Last Week",
    lastMonth: "Last Month",
    lastYear: "Last Year",

    // Statistikalar
    totalCargo: "Total Cargo",
    activeCargo: "Active Cargo",
    pendingCargo: "Pending",
    deliveredCargo: "Delivered",

    // Qidiruv va filterlar
    searchPlaceholder: "Search cargo...",
    statusLabel: "Status",
    typeLabel: "Types",
    timeLabel: "Time",
    newCargo: "+ New Cargo",

    // Natijalar
    foundResults: "Found cargo:",
    resultsSuffix: "pcs",
    byWord: "by word",
    status: "Status",
    type: "Type",
    time: "Time",

    // Modal
    newCargoTitle: "Add New Cargo",
    cargoName: "Cargo Name *",
    cargoNamePlaceholder: "e.g.: Fruits",
    from: "From *",
    to: "To *",
    weight: "Weight (kg)",
    volume: "Volume (m³)",
    price: "Price (UZS)",
    additional: "Additional",
    uploadImage: "Upload Image",
    placeCargo: "Place Cargo",
    placing: "Placing...",

    // Jadval
    cargoId: "Cargo ID",
    route: "ROUTE",
    statusCol: "STATUS",
    timeCol: "TIME",
    priceCol: "PRICE",
    fromWhere: "From",
    toWhere: "To",
    activeLabel: "ACTIVE",
    deliveredLabel: "DELIVERED",
    unknown: "Unknown",

    // Xabarlar
    loadingCargo: "Loading cargo...",
    noCargoFound: "No cargo found",
    changeFilters: "Change filters or add new cargo",

    // Grafiklar
    quantity: "Quantity",
    income: "Income",

    // Xatoliklar
    authError: "Error getting token. Please try again.",
    networkError: "No connection to server or internet is slow."
  }
};

// Token olish funksiyasi
const getAuthToken = async () => {
  const token = localStorage.getItem('token');
  if (!token) { navigate('/login'); return; }
  try {
    const response = await fetch('https://tokennoty.pythonanywhere.com/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify({
        username: "admin",
        password: "123",
        phone_number: "+998993967336"
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Token API javobi:', data);
      const token = data.token || data.access_token || data.access || data.accessToken || data.access_token || (data.data && data.data.token) || (data.data && data.data.access_token);
      if (token) {
        localStorage.setItem('access_token', token);
        console.log('Token saqlandi:', token.substring(0, 20) + '...');
        return token;
      } else {
        console.error('Token topilmadi. API javobi:', data);
      }
    } else {
      const errorText = await response.text();
      console.error('Token olishda xatolik:', response.status, response.statusText, errorText);
    }
  } catch (error) {
    console.error('Token olishda tarmoq xatosi:', error);
  }
  return null;
};

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
        className="flex items-center justify-between w-full border border-gray-300 px-4 py-3 rounded-xl shadow-xs hover:shadow-md transition-all duration-200 bg-white min-w-45"
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
              className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-150 ${selected === option ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
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

const CargoModal = ({ isOpen, onClose, onRefresh, t }) => {
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
        'Authorization': `Token ${token}`
      },
      body: formData,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let token = localStorage.getItem('access_token');
    console.log('Mavjud token:', token ? token.substring(0, 20) + '...' : 'yo\'q');

    if (!token) {
      console.log('Token yo\'q, yangi token olinmoqda...');
      token = await getAuthToken();
    }

    if (!token) {
      alert(t.authError);
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
      } else if (response.status === 401) {
        console.log('401 xatosi, yangi token olinmoqda...');
        localStorage.removeItem('access_token');
        const newToken = await getAuthToken();
        if (newToken) {
          const retryFormData = createFormData(form);
          const retryResponse = await sendRequest(newToken, retryFormData);

          if (retryResponse.ok) {
            alert("Yuk muvaffaqiyatli qo'shildi!");
            onRefresh();
            onClose();
            form.reset();
          } else {
            const errData = await retryResponse.json().catch(() => ({}));
            alert("Xatolik: " + (errData.detail || errData.message || `${retryResponse.status} ${retryResponse.statusText}`));
          }
        } else {
          alert(t.authError);
        }
      } else {
        let errorMessage = `Xatolik: ${response.status} ${response.statusText}`;
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errData = await response.json();
            errorMessage = "Xatolik: " + (errData.detail || errData.message || `${response.status} ${response.statusText}`);
          } else {
            const text = await response.text();
            console.error("Server javobi (JSON emas):", text);
          }
        } catch (parseErr) {
          console.error("Xatolikni parse qilishda muammo:", parseErr);
        }
        console.error("Server xatosi:", errorMessage);
        alert(errorMessage);
      }
    } catch (err) {
      console.error("Tarmoq xatosi:", err);
      alert(t.networkError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-slate-800">{t.newCargoTitle}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <FaTimes size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">{t.cargoName}</label>
            <input name="title" required className="w-full border border-gray-200 rounded-xl p-3 outline-[#4361ee]" placeholder={t.cargoNamePlaceholder} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-bold text-slate-700 mb-1">{t.from}</label><input name="from_loc" required className="w-full border border-gray-200 rounded-xl p-3 outline-[#4361ee]" /></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-1">{t.to}</label><input name="to_loc" required className="w-full border border-gray-200 rounded-xl p-3 outline-[#4361ee]" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-bold text-slate-700 mb-1">{t.weight}</label><input name="weight" type="number" required className="w-full border border-gray-200 rounded-xl p-3 outline-[#4361ee]" /></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-1">{t.volume}</label><input name="volume" type="number" required className="w-full border border-gray-200 rounded-xl p-3 outline-[#4361ee]" /></div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">{t.price}</label>
            <input name="price" type="number" required className="w-full border border-gray-200 rounded-xl p-3 outline-[#4361ee]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">{t.additional}</label>
            <textarea name="content" className="w-full border border-gray-200 rounded-xl p-3 outline-[#4361ee] h-20"></textarea>
          </div>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
            <input type="file" name="image" className="hidden" id="fileup" accept="image/*" />
            <label htmlFor="fileup" className="cursor-pointer flex flex-col items-center gap-2 text-gray-500 hover:text-blue-600">
              <FaCloudUploadAlt size={24} /> <span>{t.uploadImage}</span>
            </label>
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 bg-[#4361ee] text-white rounded-xl font-bold hover:bg-blue-700 transition-all cursor-pointer">
            {loading ? t.placing : t.placeCargo}
          </button>
        </form>
      </div>
    </div>
  );
};

const Yuk = ({ currentLang }) => {
  const t = translations[currentLang || 'uz'];

  // Tablar va filtrlarni tarjimadan olish
  const tabs = [
    t.allCargo,
    t.active,
    t.pending,
    t.delivered,
    t.cancelled,
    t.myCargo,
  ];

  const statusOptions = [
    t.allStatuses,
    t.activeStatus,
    t.pendingStatus,
    t.deliveredStatus,
    t.cancelledStatus
  ];

  const typeOptions = [
    t.allTypes,
    t.generalCargo,
    t.refrigerated,
    t.hazardous,
    t.bulk
  ];

  const timeOptions = [
    t.allTimes,
    t.today,
    t.lastWeek,
    t.lastMonth,
    t.lastYear
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);
  const [selectedType, setSelectedType] = useState(typeOptions[0]);
  const [selectedTime, setSelectedTime] = useState(timeOptions[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFreightData, setFilteredFreightData] = useState([]);
  const [loading, setLoading] = useState(true);
  const url_freight = 'https://tokennoty.pythonanywhere.com/api/freight/'
  const [freightData, setFreightData] = useState([]);
  const [stats, setStats] = useState({
    totalYuklar: 0,
    faolYuklar: 0,
    kutilmoqdaYuklar: 0,
    yetkazilganYuklar: 0
  });

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

  // Component mount bo'lganda token olish
  useEffect(() => {
    const initializeToken = async () => {
      const existingToken = localStorage.getItem('access_token');
      if (!existingToken) {
        await getAuthToken();
      }
    };
    initializeToken();
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');

      if (!token) {
        console.log('Token yo\'q, yangi token olinmoqda...');
        await getAuthToken();
        return;
      }

      console.log('Tokenni ishlatmoqda:', token.substring(0, 20) + '...');

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
            // Qayta urinish
            const retryRes = await fetch(url_freight, {
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
      // Agar API ishlamasa, demo data ko'rsatish
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
        {
          id: 2,
          title: "Qurilish materiallari",
          freight_type: t.bulk,
          is_shipped: true,
          created_at: "2026-01-16T14:20:00Z",
          freight_rate_amount: "1200000",
          freight_rate_currency: "UZS",
          route_starts_where_data: {
            street: "Buxoro sh., Eski shahar t.",
            region: "Buxoro viloyati"
          },
          route_ends_where_data: {
            street: "Farg'ona sh., Markaziy t.",
            region: "Farg'ona viloyati"
          }
        },
        {
          id: 3,
          title: "Sovutilgan mahsulotlar",
          freight_type: t.refrigerated,
          is_shipped: false,
          created_at: "2026-01-15T09:15:00Z",
          freight_rate_amount: "750000",
          freight_rate_currency: "UZS",
          route_starts_where_data: {
            street: "Andijon sh., Bobur t.",
            region: "Andijon viloyati"
          },
          route_ends_where_data: {
            street: "Namangan sh., Chorsu t.",
            region: "Namangan viloyati"
          }
        }
      ];

      setFreightData(demoData);
      setFilteredFreightData(demoData);
      calculateStats(demoData);
      updateChartData(demoData);
    } finally {
      setLoading(false);
    }
  }

  const processFreightData = (freight) => {
    // Agar ma'lumot massiv bo'lsa
    const freightArray = Array.isArray(freight) ? freight : [freight];

    // Ma'lumotlarni tahlil qilish
    const processedData = freightArray.map(item => {
      // Agar route_starts_where_data string bo'lsa, parse qilishga urinamiz
      let startData = item.route_starts_where_data;
      let endData = item.route_ends_where_data;

      if (typeof startData === 'string') {
        try {
          startData = JSON.parse(startData);
        } catch (e) {
          console.warn('route_starts_where_data JSON parse qilishda xatolik:', e);
          startData = { street: startData || t.unknown, region: t.unknown };
        }
      }

      if (typeof endData === 'string') {
        try {
          endData = JSON.parse(endData);
        } catch (e) {
          console.warn('route_ends_where_data JSON parse qilishda xatolik:', e);
          endData = { street: endData || t.unknown, region: t.unknown };
        }
      }

      // Agar data object bo'lmasa, default qilamiz
      if (!startData || typeof startData !== 'object') {
        startData = { street: t.unknown, region: t.unknown };
      }

      if (!endData || typeof endData !== 'object') {
        endData = { street: t.unknown, region: t.unknown };
      }

      return {
        ...item,
        route_starts_where_data: startData,
        route_ends_where_data: endData
      };
    });

    setFreightData(processedData);
    setFilteredFreightData(processedData);

    // Statistikani hisoblash
    calculateStats(processedData);

    // Chart ma'lumotlarini yangilash
    updateChartData(processedData);
  }

  const calculateStats = (data) => {
    const total = data.length;
    const faol = data.filter(item => !item.is_shipped).length;
    const yetkazilgan = data.filter(item => item.is_shipped).length;

    // 3 kundan ko'p vaqt o'tgan faol yuklar
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const kutilmoqda = data.filter(item => {
      if (item.is_shipped) return false;
      if (!item.created_at) return false;

      const createdDate = new Date(item.created_at);
      return createdDate < threeDaysAgo;
    }).length;

    setStats({
      totalYuklar: total,
      faolYuklar: faol,
      kutilmoqdaYuklar: kutilmoqda,
      yetkazilganYuklar: yetkazilgan
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
    if (!dateString) return t.unknown;

    try {
      const date = new Date(dateString);

      // Agar date invalid bo'lsa
      if (isNaN(date.getTime())) {
        // Formatni tekshirish: YYYY-MM-DD formatida bo'lsa
        const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
        if (match) {
          const [, year, month, day] = match;
          return `${day}.${month}.${year}`;
        }
        return t.unknown;
      }

      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();

      return `${day}.${month}.${year}`;
    } catch (error) {
      console.error('Sana formatlashda xatolik:', error, dateString);
      return t.unknown;
    }
  }

  // Format time
  const formatTime = (dateString) => {
    if (!dateString) return t.unknown;

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return t.unknown;

      return date.toLocaleTimeString('uz-UZ', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return t.unknown;
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

    // Status filter (tarjima matnlari bilan solishtirish)
    if (selectedStatus !== t.allStatuses) {
      if (selectedStatus === t.activeStatus) {
        filtered = filtered.filter(item => !item.is_shipped);
      } else if (selectedStatus === t.deliveredStatus) {
        filtered = filtered.filter(item => item.is_shipped);
      } else if (selectedStatus === t.pendingStatus) {
        // 3 kundan ko'p vaqt o'tgan faol yuklar
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

        filtered = filtered.filter(item => {
          if (item.is_shipped) return false;
          if (!item.created_at) return false;

          const createdDate = new Date(item.created_at);
          return createdDate < threeDaysAgo;
        });
      } else if (selectedStatus === t.cancelledStatus) {
        filtered = filtered.filter(item => item.freight_type === "cancelled" || item.status === "cancelled");
      }
    }

    // Yuk turi filter
    if (selectedType !== t.allTypes) {
      if (selectedType === t.generalCargo) {
        filtered = filtered.filter(item =>
          !item.freight_type ||
          !item.freight_type.toLowerCase().includes("special") &&
          !item.freight_type.toLowerCase().includes("refrigerated") &&
          !item.freight_type.toLowerCase().includes("hazardous") &&
          !item.freight_type.toLowerCase().includes("bulk")
        );
      } else if (selectedType === t.refrigerated) {
        filtered = filtered.filter(item =>
          item.freight_type &&
          item.freight_type.toLowerCase().includes("refrigerated")
        );
      } else if (selectedType === t.hazardous) {
        filtered = filtered.filter(item =>
          item.freight_type &&
          item.freight_type.toLowerCase().includes("hazardous")
        );
      } else if (selectedType === t.bulk) {
        filtered = filtered.filter(item =>
          item.freight_type &&
          item.freight_type.toLowerCase().includes("bulk")
        );
      }
    }

    // Vaqt filter
    if (selectedTime !== t.allTimes) {
      const now = new Date();
      filtered = filtered.filter(item => {
        if (!item.created_at) return false;
        const itemDate = new Date(item.created_at);

        switch (selectedTime) {
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
    if (activeTab !== t.allCargo) {
      if (activeTab === t.active) {
        filtered = filtered.filter(item => !item.is_shipped);
      } else if (activeTab === t.delivered) {
        filtered = filtered.filter(item => item.is_shipped);
      } else if (activeTab === t.pending) {
        // 3 kundan ko'p vaqt o'tgan faol yuklar
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

        filtered = filtered.filter(item => {
          if (item.is_shipped) return false;
          if (!item.created_at) return false;

          const createdDate = new Date(item.created_at);
          return createdDate < threeDaysAgo;
        });
      } else if (activeTab === t.cancelled) {
        filtered = filtered.filter(item => item.freight_type === "cancelled" || item.status === "cancelled");
      } else if (activeTab === t.myCargo) {
        // Hozircha barchasini ko'rsatamiz
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
    if (activeTab === t.active) {
      setSelectedStatus(t.activeStatus);
    } else if (activeTab === t.delivered) {
      setSelectedStatus(t.deliveredStatus);
    } else if (activeTab === t.pending) {
      setSelectedStatus(t.pendingStatus);
    } else if (activeTab === t.cancelled) {
      setSelectedStatus(t.cancelledStatus);
    } else {
      setSelectedStatus(t.allStatuses);
    }
  }, [activeTab, t]);

  // Search input handler
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  }

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
  }

  return (
    <div className='min-h-screen bg-zinc-100'>
      <div className='container m-auto fullhdfix fullhdfix2 fullhdfix3'>
        <h1 className='py-8 text-5xl font-semibold max-sm:mx-3'>{t.pageTitle}</h1>
        <p className='text-xl text-gray-600 pb-3 max-sm:mx-3'>{t.pageDescription}</p>

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
                    <Tooltip formatter={(value) => [`${value} ${t.resultsSuffix}`, t.quantity]} />
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
                      formatter={(value) => [`${value} ${t.resultsSuffix}`, t.income]}
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
                    <p className='text-xl text-gray-700'>{t.totalCargo}</p>
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
                    <p className='text-xl text-gray-700'>{t.activeCargo}</p>
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
                    <p className='text-xl text-gray-700'>{t.pendingCargo}</p>
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
                    <p className='text-xl text-gray-700'>{t.deliveredCargo}</p>
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
              placeholder={t.searchPlaceholder}
            />
            <IoIosSearch className='absolute top-3 text-xl left-3 text-gray-600' />
          </div>

          {/* Holatlar dropdown */}
          <Dropdown
            label={t.statusLabel}
            options={statusOptions}
            selected={selectedStatus}
            onSelect={setSelectedStatus}
          />

          {/* Turlar dropdown */}
          <Dropdown
            label={t.typeLabel}
            options={typeOptions}
            selected={selectedType}
            onSelect={setSelectedType}
          />

          {/* Vaqtlar dropdown */}
          <Dropdown
            label={t.timeLabel}
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
              {t.newCargo}
            </button>
          </div>
        </div>

        {/* Natijalar soni */}
        <div className="px-6 py-3 bg-white rounded-xl my-4">
          <p className="text-gray-600">
            {t.foundResults} <span className="font-bold text-blue-700">{filteredFreightData.length} {t.resultsSuffix}</span>
            {searchQuery && ` ("${searchQuery}" ${t.byWord})`}
            {selectedStatus !== t.allStatuses && `, ${t.status}: ${selectedStatus}`}
            {selectedType !== t.allTypes && `, ${t.type}: ${selectedType}`}
            {selectedTime !== t.allTimes && `, ${t.time}: ${selectedTime}`}
          </p>
        </div>

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
      <CargoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRefresh={loadData}
        t={t}
      />
    </div>
  )
}

export default Yuk
