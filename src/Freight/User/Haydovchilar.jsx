import React, { useEffect, useState } from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import {
  FaTruckLoading,
  FaUsers,
  FaWifi,
  FaUserSlash,
  FaCheckCircle,
  FaArrowUp,
  FaArrowDown,
  FaSearch,
  FaPlus,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaMapMarkerAlt,
  FaPhone,
  FaComment,
  FaTimes,
  FaCheck,
  FaExclamationTriangle,
  FaChevronLeft,
  FaChevronRight,
  FaMapMarkedAlt,
  FaUser,
  FaWeight,
  FaRulerCombined,
  FaDollarSign,
  FaCube,
  FaTruck,
  FaBoxOpen,
  FaGlobe,
  FaRulerHorizontal,
  FaRulerVertical
} from 'react-icons/fa';

// Tarjimalar obyekti
const translations = {
  uz: {
    // Sahifa sarlavhalari
    pageTitle: "Haydovchilar",
    pageDescription: "Barcha haydovchilarni boshqaring, kuzating va yuk biriktiring",

    // Statistik kartochkalar
    totalDrivers: "Jami Haydovchilar",
    online: "Online",
    offline: "Offline",
    verified: "Tasdiqlangan",

    // Qidiruv va filterlar
    searchPlaceholder: "Haydovchi ismi, ID yoki telefon raqami bo'yicha qidirish...",
    status: "Holat",
    vehicle: "Transport",
    rating: "Reyting",
    addDriver: "Haydovchi qo'shish",

    // Holatlar
    allStatuses: "Barcha holatlar",
    onlineStatus: "Online",
    offlineStatus: "Offline",
    busyStatus: "Band",

    // Transport turlari
    allVehicles: "Barcha transportlar",
    truck: "Yuk mashinasi",
    van: "Furgon",
    pickup: "Pikap",
    refrigerator: "Refrijerator",

    // Reytinglar
    allRatings: "Barcha reytinglar",
    fiveStars: "5 ★",
    fourPlusStars: "4+ ★",
    threePlusStars: "3+ ★",
    twoPlusStars: "2+ ★",

    // Tablar
    allDrivers: "Barcha haydovchilar",
    onlineDrivers: "Online",
    verifiedDrivers: "Tasdiqlangan",
    availableDrivers: "Bo'sh",
    topRated: "Top reyting",
    newlyAdded: "Yangi qo'shilgan",

    // Haydovchi kartasi
    featured: "Featured",
    verifiedBadge: "Tasdiqlangan",
    id: "id",
    location: "location",
    phone: "Telefon",
    vehicleType: "Transport",
    registered: "Ro'yxatdan o'tgan",
    statusCol: "Holat",
    onlineStatusCol: "Online",
    realTimeLocation: "Real vaqtda joylashuv",
    completed: "Yakunlangan",
    active: "Faol",
    revenue: "Daromad",
    call: "Qo'ng'iroq",
    message: "Xabar",
    assignCargo: "Yuk",

    // Pagination
    paginationInfo: "1-9 of 156 haydovchilar",

    // Modal - Yangi haydovchi qo'shish
    addDriverTitle: "Yangi haydovchi qo'shish",
    driverInfo: "Haydovchi ma'lumotlari",
    username: "Username",
    usernameRequired: "Username *",
    password: "Parol",
    passwordRequired: "Parol *",
    firstName: "Ism",
    firstNameRequired: "Ism *",
    lastName: "Familiya",
    lastNameRequired: "Familiya *",
    vehicleInfo: "Transport ma'lumotlari",
    vehicleTypeLabel: "Transport turi",
    select: "Tanlang",
    bodyType: "Kuzov turi",
    closedBody: "Yopiq",
    openBody: "Ochiq",
    loadingMethod: "Yuklash usuli",
    topLoading: "Yuqoridan",
    backLoading: "Orqadan",

    // O'lchamlar
    dimensions: "O'lchamlari",
    length: "Uzunlik (m)",
    height: "Balandlik (m)",
    width: "Kenglik (m)",

    // Sig'im
    capacity: "Sig'imi",
    weight: "Og'irlik (kg)",
    weightRequired: "Og'irlik (kg) *",
    availableTonnage: "Mavjud tonnaj",
    availableVolume: "Mavjud hajm (m³)",

    // Narxlar
    pricing: "Narxlar",
    currency: "Valyuta",
    som: "So'm",
    pricePerKm: "Narx (1 km uchun)",

    // Rasm
    photo: "Rasm",
    vehiclePhoto: "Transport rasmi",

    // Maxfiylik sozlamasi
    publicTransport: "Ommaviy transport",
    publicTransportDesc: "Bu transport barcha foydalanuvchilar uchun ko'rinadi",

    // Amallar
    cancel: "Bekor qilish",
    save: "Saqlash",

    // Haydovchi ma'lumotlari modal
    driverDetails: " ma'lumotlar",
    email: "Email",

    // Yuk biriktirish modal
    assignCargoTitle: " ga yuk biriktirish",
    selectCargo: "Yukni tanlang",
    selectCargoPlaceholder: "Yukni tanlang...",
    additionalInfo: "Qo'shimcha ma'lumot",
    additionalInfoPlaceholder: "Haydovchiga qo'shimcha ko'rsatmalar...",

    // Xabarnoma
    driverAdded: "Yangi haydovchi qo'shildi!",

    // Transport kategoriyalari
    container: "Konteyner",
    platform: "Platforma",
    tanker: "Sisterna",

    // Xatoliklar
    unknown: "Noma'lum"
  },
  ru: {
    // Sahifa sarlavhalari
    pageTitle: "Водители",
    pageDescription: "Управляйте, отслеживайте и назначайте грузы всем водителям",

    // Statistik kartochkalar
    totalDrivers: "Всего водителей",
    online: "Онлайн",
    offline: "Офлайн",
    verified: "Подтверждено",

    // Qidiruv va filterlar
    searchPlaceholder: "Поиск по имени водителя, ID или номеру телефона...",
    status: "Статус",
    vehicle: "Транспорт",
    rating: "Рейтинг",
    addDriver: "Добавить водителя",

    // Holatlar
    allStatuses: "Все статусы",
    onlineStatus: "Онлайн",
    offlineStatus: "Офлайн",
    busyStatus: "Занят",

    // Transport turlari
    allVehicles: "Все виды транспорта",
    truck: "Грузовик",
    van: "Фургон",
    pickup: "Пикап",
    refrigerator: "Рефрижератор",

    // Reytinglar
    allRatings: "Все рейтинги",
    fiveStars: "5 ★",
    fourPlusStars: "4+ ★",
    threePlusStars: "3+ ★",
    twoPlusStars: "2+ ★",

    // Tablar
    allDrivers: "Все водители",
    onlineDrivers: "Онлайн",
    verifiedDrivers: "Подтвержденные",
    availableDrivers: "Свободные",
    topRated: "Лучшие по рейтингу",
    newlyAdded: "Новые",

    // Haydovchi kartasi
    featured: "Рекомендуемый",
    verifiedBadge: "Подтверждено",
    id: "ид",
    location: "локация",
    phone: "Телефон",
    vehicleType: "Транспорт",
    registered: "Зарегистрирован",
    statusCol: "Статус",
    onlineStatusCol: "Онлайн",
    realTimeLocation: "Местоположение в реальном времени",
    completed: "Завершено",
    active: "Активно",
    revenue: "Доход",
    call: "Позвонить",
    message: "Сообщение",
    assignCargo: "Груз",

    // Pagination
    paginationInfo: "1-9 из 156 водителей",

    // Modal - Yangi haydovchi qo'shish
    addDriverTitle: "Добавить нового водителя",
    driverInfo: "Информация о водителе",
    username: "Имя пользователя",
    usernameRequired: "Имя пользователя *",
    password: "Пароль",
    passwordRequired: "Пароль *",
    firstName: "Имя",
    firstNameRequired: "Имя *",
    lastName: "Фамилия",
    lastNameRequired: "Фамилия *",
    vehicleInfo: "Информация о транспорте",
    vehicleTypeLabel: "Тип транспорта",
    select: "Выберите",
    bodyType: "Тип кузова",
    closedBody: "Закрытый",
    openBody: "Открытый",
    loadingMethod: "Способ загрузки",
    topLoading: "Сверху",
    backLoading: "Сзади",

    // O'lchamlar
    dimensions: "Размеры",
    length: "Длина (м)",
    height: "Высота (м)",
    width: "Ширина (м)",

    // Sig'im
    capacity: "Вместимость",
    weight: "Вес (кг)",
    weightRequired: "Вес (кг) *",
    availableTonnage: "Доступный тоннаж",
    availableVolume: "Доступный объем (м³)",

    // Narxlar
    pricing: "Цены",
    currency: "Валюта",
    som: "Сум",
    pricePerKm: "Цена (за 1 км)",

    // Rasm
    photo: "Фото",
    vehiclePhoto: "Фото транспорта",

    // Maxfiylik sozlamasi
    publicTransport: "Публичный транспорт",
    publicTransportDesc: "Этот транспорт виден всем пользователям",

    // Amallar
    cancel: "Отмена",
    save: "Сохранить",

    // Haydovchi ma'lumotlari modal
    driverDetails: " информация",
    email: "Email",

    // Yuk biriktirish modal
    assignCargoTitle: " назначить груз",
    selectCargo: "Выберите груз",
    selectCargoPlaceholder: "Выберите груз...",
    additionalInfo: "Дополнительная информация",
    additionalInfoPlaceholder: "Дополнительные инструкции для водителя...",

    // Xabarnoma
    driverAdded: "Новый водитель добавлен!",

    // Transport kategoriyalari
    container: "Контейнер",
    platform: "Платформа",
    tanker: "Цистерна",

    // Xatoliklar
    unknown: "Неизвестно"
  },
  en: {
    // Sahifa sarlavhalari
    pageTitle: "Drivers",
    pageDescription: "Manage, track and assign cargo to all drivers",

    // Statistik kartochkalar
    totalDrivers: "Total Drivers",
    online: "Online",
    offline: "Offline",
    verified: "Verified",

    // Qidiruv va filterlar
    searchPlaceholder: "Search by driver name, ID or phone number...",
    status: "Status",
    vehicle: "Vehicle",
    rating: "Rating",
    addDriver: "Add Driver",

    // Holatlar
    allStatuses: "All Statuses",
    onlineStatus: "Online",
    offlineStatus: "Offline",
    busyStatus: "Busy",

    // Transport turlari
    allVehicles: "All Vehicles",
    truck: "Truck",
    van: "Van",
    pickup: "Pickup",
    refrigerator: "Refrigerator",

    // Reytinglar
    allRatings: "All Ratings",
    fiveStars: "5 ★",
    fourPlusStars: "4+ ★",
    threePlusStars: "3+ ★",
    twoPlusStars: "2+ ★",

    // Tablar
    allDrivers: "All Drivers",
    onlineDrivers: "Online",
    verifiedDrivers: "Verified",
    availableDrivers: "Available",
    topRated: "Top Rated",
    newlyAdded: "Newly Added",

    // Haydovchi kartasi
    featured: "Featured",
    verifiedBadge: "Verified",
    id: "id",
    location: "location",
    phone: "Phone",
    vehicleType: "Vehicle",
    registered: "Registered",
    statusCol: "Status",
    onlineStatusCol: "Online",
    realTimeLocation: "Real-time location",
    completed: "Completed",
    active: "Active",
    revenue: "Revenue",
    call: "Call",
    message: "Message",
    assignCargo: "Cargo",

    // Pagination
    paginationInfo: "1-9 of 156 drivers",

    // Modal - Yangi haydovchi qo'shish
    addDriverTitle: "Add New Driver",
    driverInfo: "Driver Information",
    username: "Username",
    usernameRequired: "Username *",
    password: "Password",
    passwordRequired: "Password *",
    firstName: "First Name",
    firstNameRequired: "First Name *",
    lastName: "Last Name",
    lastNameRequired: "Last Name *",
    vehicleInfo: "Vehicle Information",
    vehicleTypeLabel: "Vehicle Type",
    select: "Select",
    bodyType: "Body Type",
    closedBody: "Closed",
    openBody: "Open",
    loadingMethod: "Loading Method",
    topLoading: "Top",
    backLoading: "Back",

    // O'lchamlar
    dimensions: "Dimensions",
    length: "Length (m)",
    height: "Height (m)",
    width: "Width (m)",

    // Sig'im
    capacity: "Capacity",
    weight: "Weight (kg)",
    weightRequired: "Weight (kg) *",
    availableTonnage: "Available Tonnage",
    availableVolume: "Available Volume (m³)",

    // Narxlar
    pricing: "Pricing",
    currency: "Currency",
    som: "UZS",
    pricePerKm: "Price (per 1 km)",

    // Rasm
    photo: "Photo",
    vehiclePhoto: "Vehicle Photo",

    // Maxfiylik sozlamasi
    publicTransport: "Public Transport",
    publicTransportDesc: "This vehicle is visible to all users",

    // Amallar
    cancel: "Cancel",
    save: "Save",

    // Haydovchi ma'lumotlari modal
    driverDetails: " Information",
    email: "Email",

    // Yuk biriktirish modal
    assignCargoTitle: " Assign Cargo",
    selectCargo: "Select Cargo",
    selectCargoPlaceholder: "Select cargo...",
    additionalInfo: "Additional Information",
    additionalInfoPlaceholder: "Additional instructions for driver...",

    // Xabarnoma
    driverAdded: "New driver added!",

    // Transport kategoriyalari
    container: "Container",
    platform: "Platform",
    tanker: "Tanker",

    // Xatoliklar
    unknown: "Unknown"
  }
};

// Simple Star Rating Component
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      <FaStar className="text-yellow-400 w-3 h-3" />
      <FaStar className="text-yellow-400 w-3 h-3" />
      <FaStar className="text-yellow-400 w-3 h-3" />
      <FaStar className="text-yellow-400 w-3 h-3" />
      <FaStarHalfAlt className="text-yellow-400 w-3 h-3" />
      <span className="font-semibold text-gray-900 ml-1">{rating}</span>
      <span className="text-xs text-gray-500">(124)</span>
    </div>
  );
}

// Stat Card Component - Now extracted
function StatCard({ title, value, trend, trendUp, icon: Icon, gradient, t }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 relative overflow-hidden transition-all hover:-translate-y-2 duration-300 hover:shadow-xl">
      <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${gradient}`} />
      <div className="flex items-center justify-between mb-3">
        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <Icon className="text-xl" />
        </div>
        <span className="bg-green-50 text-green-600 text-sm font-semibold py-1 px-3 rounded-full flex items-center gap-1">
          <FaArrowUp />{trend}
        </span>
      </div>
      <div className="text-4xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-500">{title}</div>
    </div>
  );
}

// Select Dropdown Component
function Select({ options, label, value, onChange }) {
  return (
    <div className="relative">
      <select
        className="py-3 px-4 border border-gray-300 rounded-xl text-sm bg-white text-gray-700 cursor-pointer appearance-none pr-10 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 w-full"
        value={value}
        onChange={onChange}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 16 16">
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>
      </div>
    </div>
  );
}

// Modal Component
function Modal({ isOpen, title, children, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
          <button className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-100" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// Driver Card Component
function DriverCard({ driver, t }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      {/* Featured Badge */}
      <div className="absolute top-4 right-4 bg-linear-to-r from-blue-600 to-purple-700 text-white text-xs font-semibold py-1 px-3 rounded-xl z-10">{t.featured}</div>

      {/* Driver Info */}
      <div className="p-6 border-b border-gray-100 flex items-start gap-4">
        <div className="relative">
          <div className="w-20 h-20 bg-linear-to-br from-blue-600 to-purple-700 rounded-full flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-sm">
            {driver.owner_first_name?.charAt(0) || 'D'}{driver.owner_last_name?.charAt(0) || 'D'}
          </div>
          <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-white bg-green-500"></div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-gray-900">{driver.owner_first_name || t.unknown} {driver.owner_last_name || t.unknown}</h3>
            <FaCheckCircle className="text-green-500 w-4 h-4" title={t.verifiedBadge} />
          </div>
          <StarRating rating={driver.rating} />
          <div className="font-mono text-sm text-gray-500 mb-2">{t.id}</div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaMapMarkerAlt className="text-blue-600 w-3 h-3" />
            {t.location}
          </div>
        </div>
      </div>

      {/* Driver Details */}
      <div className="p-4 border-b border-gray-100">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t.phone}</div>
            <div className="font-semibold text-gray-900 font-mono">+998992221133</div>
            {/* {console.log(driver)} */}
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t.vehicleType}</div>
            <div className="font-semibold text-gray-900">{driver.vehicle_category || t.unknown}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t.registered}</div>
            <div className="font-semibold text-gray-900">{driver.created_at?.split('T')[0] || t.unknown}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t.statusCol}</div>
            <div className="font-semibold text-gray-900">{t.onlineStatusCol}</div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="h-48 bg-linear-to-br from-cyan-50 to-blue-100 rounded-xl mt-4 relative">
          <div className="absolute w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-md" style={{ top: '40%', left: '30%' }}>
            <div className="absolute w-2 h-2 bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-gray-600">
            <div className="text-center">
              <FaMapMarkedAlt className="text-4xl mb-2 mx-auto" />
              <div>{t.realTimeLocation}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-4 grid grid-cols-3 gap-4 text-center bg-gray-50">
        <div>
          <div className="text-xl font-bold text-blue-600">89</div>
          <div className="text-xs text-gray-500 uppercase tracking-wider">{t.completed}</div>
        </div>
        <div>
          <div className="text-xl font-bold text-blue-600">1</div>
          <div className="text-xs text-gray-500 uppercase tracking-wider">{t.active}</div>
        </div>
        <div>
          <div className="text-xl font-bold text-blue-600">12.5M</div>
          <div className="text-xs text-gray-500 uppercase tracking-wider">{t.revenue}</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 flex gap-3">
        <button className="flex-1 py-3 border border-gray-300 rounded-xl font-semibold text-sm hover:text-white hover:border-green-500 hover:bg-green-500 transition-all flex items-center justify-center gap-2">
          <FaPhone className="w-4 h-4" />{t.call}
        </button>
        <button className="flex-1 py-3 border border-gray-300 rounded-xl font-semibold text-sm hover:text-white hover:border-blue-500 hover:bg-blue-500 transition-all flex items-center justify-center gap-2">
          <FaComment className="w-4 h-4" />{t.message}
        </button>
        <button className="flex-1 py-3 border border-gray-300 rounded-xl font-semibold text-sm hover:text-white hover:border-purple-500 hover:bg-purple-500 transition-all flex items-center justify-center gap-2">
          <FaTruckLoading className="w-4 h-4" />{t.assignCargo}
        </button>
      </div>
    </div>
  );
}

// Main Component
function Haydovchilar({ currentLang }) {
  const t = translations[currentLang || 'uz'];
  const [activeTab, setActiveTab] = useState('all');
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showAddDriverModal, setShowAddDriverModal] = useState(false);
  const [transportData, setTransportData] = useState([]);

  // Form states for adding new transport/driver according to API structure
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ownerFirstName, setOwnerFirstName] = useState('');
  const [ownerLastName, setOwnerLastName] = useState('');
  const [ownerUsername, setOwnerUsername] = useState('admin'); // Default as per API
  const [availableTonnage, setAvailableTonnage] = useState('');
  const [availableVolume, setAvailableVolume] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [height, setHeight] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [weight, setWeight] = useState('');
  const [vehicleCategory, setVehicleCategory] = useState('');
  const [loadingMethod, setLoadingMethod] = useState('');
  const [transportationRateCurrency, setTransportationRateCurrency] = useState('UZS');
  const [transportationRatePerKm, setTransportationRatePerKm] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const baseUrl = 'https://tokennoty.pythonanywhere.com/api/transport/'
      const res = await fetch(baseUrl)
      const transports = await res.json()
      const result = await Promise.all(
        transports.map(async (item) => {
          const starsRes = await fetch(`${baseUrl}${item.id}/stars/`)
          const stars = await starsRes.json()
          return { ...item, stars }
        }))
      setTransportData(result)
    })()
  }, []);
  // console.log(transportData);

  // Tab Component
  function Tab({ id, label, badge, active }) {
    return (
      <button className={`relative py-4 px-6 font-medium whitespace-nowrap border-b-2 transition-colors ${active ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-transparent hover:text-blue-600'}`} onClick={() => setActiveTab(id)}>
        {label}
        {badge && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {badge}
          </span>
        )}
      </button>
    );
  }

  // Status options
  const statusOptions = [
    { value: 'all', label: t.allStatuses },
    { value: 'online', label: t.onlineStatus },
    { value: 'offline', label: t.offlineStatus },
    { value: 'busy', label: t.busyStatus }
  ];

  // Vehicle options
  const vehicleOptions = [
    { value: 'all', label: t.allVehicles },
    { value: 'truck', label: t.truck },
    { value: 'van', label: t.van },
    { value: 'pickup', label: t.pickup },
    { value: 'refrigerator', label: t.refrigerator }
  ];

  // Vehicle category options for form
  const vehicleCategoryOptions = [
    { value: '', label: t.select },
    { value: 'truck', label: t.truck },
    { value: 'van', label: t.van },
    { value: 'refrigerator', label: t.refrigerator },
    { value: 'container', label: t.container },
    { value: 'platform', label: t.platform },
    { value: 'tanker', label: t.tanker }
  ];

  // Body type options
  const bodyTypeOptions = [
    { value: '', label: t.select },
    { value: 'closed', label: t.closedBody },
    { value: 'open', label: t.openBody },
  ];

  // Loading method options
  const loadingMethodOptions = [
    { value: '', label: t.select },
    { value: 'top', label: t.topLoading },
    { value: 'back', label: t.backLoading },
  ];

  // Currency options
  const currencyOptions = [
    { value: 'UZS', label: t.som },
  ];

  // Rating options
  const ratingOptions = [
    { value: 'all', label: t.allRatings },
    { value: '5', label: t.fiveStars },
    { value: '4', label: t.fourPlusStars },
    { value: '3', label: t.threePlusStars },
    { value: '2', label: t.twoPlusStars }
  ];

  const handleAddDriver = async () => {
    // Prepare the data according to API structure
    const formData = {
      username: ownerFirstName,
      password: password,
      owner_first_name: ownerFirstName,
      owner_last_name: ownerLastName,
      owner_username: ownerUsername,
      available_tonnage: availableTonnage ? parseFloat(availableTonnage) : null,
      available_volume: availableVolume ? parseFloat(availableVolume) : null,
      body_type: bodyType || null,
      height: height || null,
      length: length || null,
      width: width || null,
      weight: weight ? parseFloat(weight) : null,
      vehicle_category: vehicleCategory || null,
      loading_method: loadingMethod || null,
      transportation_rate_currency: transportationRateCurrency || null,
      transportation_rate_per_km: transportationRatePerKm ? parseFloat(transportationRatePerKm) : null,
      public: isPublic,
      phone_number: '1234',
      photo: photo, // This should be handled as a file upload
    };

    console.log('Form data to be posted:', formData);

    const token = localStorage.getItem('token');
    try {
      const datab = JSON.stringify(formData)
      const response = await fetch('https://tokennoty.pythonanywhere.com/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${token}`
        },
        body: datab,
      });

      if (response.ok) {
        alert("Yuk muvaffaqiyatli qo'shildi!");
        // Ro'yxatni yangilash
        // Modalni yopish
      }
    } catch (err) {
      console.error("Tarmoq xatosi:", err);
      // alert("Server bilan aloqa yo'q yoki internet past.");
    }

    // Close modal and show notification
    setShowAddDriverModal(false);
    setShowNotification(true);
    // Reset form
    setOwnerFirstName('');
    setOwnerLastName('');
    setOwnerUsername('admin');
    setAvailableTonnage('');
    setAvailableVolume('');
    setBodyType('');
    setHeight('');
    setLength('');
    setWidth('');
    setWeight('');
    setVehicleCategory('');
    setLoadingMethod('');
    setTransportationRateCurrency('UZS');
    setTransportationRatePerKm('');
    setIsPublic(false);
    setPhoto(null);

    // Hide notification after 3 seconds
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50/10 to-purple-50/10 font-sans text-gray-800">
      <main className="py-12">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">{t.pageTitle}</h1>
            <p className="text-gray-600 text-lg">{t.pageDescription}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard title={t.totalDrivers} value={transportData.length} trend="15%" trendUp={true} icon={FaUsers} gradient="from-blue-600 to-purple-700" t={t} />
            <StatCard title={t.online} value="0" trend="8%" trendUp={true} icon={FaWifi} gradient="from-cyan-400 to-cyan-500" t={t} />
            <StatCard title={t.offline} value="0" trend="3%" trendUp={false} icon={FaUserSlash} gradient="from-yellow-500 to-orange-400" t={t} />
            <StatCard title={t.verified} value={transportData.length} trend="24%" trendUp={true} icon={FaCheckCircle} gradient="from-purple-700 to-blue-600" t={t} />
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl p-6 shadow-md mb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1 max-lg:min-w-2/3">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="text" className="min-w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl text-sm transition-all focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-100" placeholder={t.searchPlaceholder} />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="min-w-50"><Select options={statusOptions} label={t.status} /></div>
              <div className="min-w-50"><Select options={vehicleOptions} label={t.vehicle} /></div>
              <div className="min-w-50"><Select options={ratingOptions} label={t.rating} /></div>
              <button
                className="bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center gap-2 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                onClick={() => setShowAddDriverModal(true)}
              >
                <FaPlus />{t.addDriver}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
            <Tab id="all" label={t.allDrivers} active={activeTab === 'all'} />
            <Tab id="online" label={t.onlineDrivers} active={activeTab === 'online'} />
            <Tab id="verified" label={t.verifiedDrivers} active={activeTab === 'verified'} />
            <Tab id="available" label={t.availableDrivers} active={activeTab === 'available'} />
            <Tab id="top" label={t.topRated} active={activeTab === 'top'} />
            <Tab id="new" label={t.newlyAdded} active={activeTab === 'new'} />
          </div>

          {/* Drivers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {transportData.map(driver => (
              <DriverCard key={driver.id} driver={driver} t={t} />
            ))}
          </div>

          {/* Pagination */}
          <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-sm text-gray-600">{t.paginationInfo}</div>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 border border-gray-300 rounded-xl bg-white text-gray-600 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"><FaChevronLeft /></button>
              <button className="w-9 h-9 border rounded-xl flex items-center justify-center bg-blue-600 text-white border-blue-600 transition-all">1</button>
              <button className="w-9 h-9 border border-gray-300 rounded-xl flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">2</button>
              <button className="w-9 h-9 border border-gray-300 rounded-xl flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">3</button>
              <button className="w-9 h-9 border border-gray-300 rounded-xl flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">4</button>
              <button className="w-9 h-9 border border-gray-300 rounded-xl flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">5</button>
              <button className="w-9 h-9 border border-gray-300 rounded-xl bg-white text-gray-600 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"><FaChevronRight /></button>
            </div>
          </div>
        </div>
      </main>

      {/* Add Driver Modal */}
      <Modal isOpen={showAddDriverModal} title={t.addDriverTitle} onClose={() => setShowAddDriverModal(false)}>
        <div className="space-y-4">
          {/* Owner Information */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <FaUser className="w-4 h-4" />
              {t.driverInfo}
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className='my-2'>
                <label className="block text-xs text-gray-500 mb-1">{t.usernameRequired}</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  placeholder={t.username}
                  value={ownerUsername}
                  onChange={(e) => setOwnerUsername(e.target.value)}
                  required
                />
              </div>
              <div className='my-2'>
                <label className="block text-xs text-gray-500 mb-1">{t.passwordRequired}</label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  placeholder={t.password}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">{t.firstNameRequired}</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  placeholder={t.firstName}
                  value={ownerFirstName}
                  onChange={(e) => setOwnerFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">{t.lastNameRequired}</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  placeholder={t.lastName}
                  value={ownerLastName}
                  onChange={(e) => setOwnerLastName(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <FaTruck className="w-4 h-4" />
              {t.vehicleInfo}
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">{t.vehicleTypeLabel}</label>
                <Select
                  options={vehicleCategoryOptions}
                  value={vehicleCategory}
                  onChange={(e) => setVehicleCategory(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">{t.bodyType}</label>
                <Select
                  options={bodyTypeOptions}
                  value={bodyType}
                  onChange={(e) => setBodyType(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">{t.loadingMethod}</label>
                <Select
                  options={loadingMethodOptions}
                  value={loadingMethod}
                  onChange={(e) => setLoadingMethod(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Dimensions */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <FaRulerCombined className="w-4 h-4" />
              {t.dimensions}
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                  <FaRulerHorizontal className="w-3 h-3" /> {t.length}
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  placeholder="15.00"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                  <FaRulerVertical className="w-3 h-3" /> {t.height}
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  placeholder="12.00"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">{t.width}</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  placeholder="50.00"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Capacity */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <FaWeight className="w-4 h-4" />
              {t.capacity}
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">{t.weightRequired}</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  placeholder="100"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">{t.availableTonnage}</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  placeholder={t.availableTonnage}
                  value={availableTonnage}
                  onChange={(e) => setAvailableTonnage(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">{t.availableVolume}</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  placeholder={t.availableVolume}
                  value={availableVolume}
                  onChange={(e) => setAvailableVolume(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <FaDollarSign className="w-4 h-4" />
              {t.pricing}
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">{t.currency}</label>
                <Select
                  options={currencyOptions}
                  value={transportationRateCurrency}
                  onChange={(e) => setTransportationRateCurrency(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">{t.pricePerKm}</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  placeholder="0.00"
                  value={transportationRatePerKm}
                  onChange={(e) => setTransportationRatePerKm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <FaCube className="w-4 h-4" />
              {t.photo}
            </h4>
            <div>
              <label className="block text-xs text-gray-500 mb-1">{t.vehiclePhoto}</label>
              <input
                type="file"
                className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
          </div>

          {/* Privacy Setting */}
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-xl">
            <div>
              <div className="font-medium text-sm text-gray-700">{t.publicTransport}</div>
              <div className="text-xs text-gray-500">{t.publicTransportDesc}</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left:0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              className="flex-1 py-3 border border-gray-300 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-all"
              onClick={() => setShowAddDriverModal(false)}
            >
              {t.cancel}
            </button>
            <button
              className="flex-1 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all"
              onClick={handleAddDriver}
            >
              {t.save}
            </button>
          </div>
        </div>
      </Modal>

      {/* Driver Details Modal */}
      <Modal isOpen={showDriverModal} title={`John Doe ${t.driverDetails}`} onClose={() => setShowDriverModal(false)} >
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 bg-linear-to-br from-blue-600 to-purple-700 rounded-full flex items-center justify-center text-white text-xl font-bold">J</div>
              <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white bg-green-500"></div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">John Doe</h3>
              <div className="text-sm text-gray-500">DRV-001</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">{t.phone}</div>
              <div className="font-semibold">+99890 123 45 67</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">{t.email}</div>
              <div className="font-semibold">john.doe@example.com</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">{t.location}</div>
              <div className="font-semibold">Toshkent, Yunusobod</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">{t.statusCol}</div>
              <div className="font-semibold">{t.onlineStatusCol}</div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Assign Load Modal */}
      <Modal isOpen={showAssignModal} title={`John Doe${t.assignCargoTitle}`} onClose={() => setShowAssignModal(false)}>
        <div className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700 mb-2">{t.selectCargo}</label>
            <Select
              options={[
                { value: '', label: t.selectCargoPlaceholder },
                { value: 'load1', label: 'YUK-2024-001 - Toshkent → Samarqand' },
                { value: 'load2', label: 'YUK-2024-004 - Buxoro → Navoiy' },
                { value: 'load3', label: 'YUK-2024-008 - Toshkent → Nukus' }
              ]}
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 mb-2">{t.additionalInfo}</label>
            <textarea className="w-full p-3 border border-gray-300 rounded-xl font-sans resize-none focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" rows="3" placeholder={t.additionalInfoPlaceholder} />
          </div>
        </div>
      </Modal>

      {/* Notification */}
      {showNotification && (
        <div className="fixed top-6 right-6 p-4 rounded-xl shadow-lg z-50 flex items-center gap-3 bg-green-500 text-white animate-slide-in">
          <FaCheckCircle />
          <span>{t.driverAdded}</span>
        </div>
      )}
    </div>
  );
}

export default Haydovchilar;
