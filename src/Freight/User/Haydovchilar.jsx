import React, { useEffect, useState, useRef, useCallback } from 'react';
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
  FaRulerVertical,
  FaCircle,
  FaLocationArrow,
  FaPlug,
  FaMapPin
} from 'react-icons/fa';

// Tarjimalar obyekti
const translations = {
  uz: {
    pageTitle: "Haydovchilar",
    pageDescription: "Barcha haydovchilarni boshqaring, kuzating va yuk biriktiring",
    totalDrivers: "Jami Haydovchilar",
    online: "Online",
    offline: "Offline",
    verified: "Tasdiqlangan",
    searchPlaceholder: "Haydovchi ismi, ID yoki telefon raqami bo'yicha qidirish...",
    status: "Holat",
    vehicle: "Transport",
    rating: "Reyting",
    addDriver: "Haydovchi qo'shish",
    allStatuses: "Barcha holatlar",
    onlineStatus: "Online",
    offlineStatus: "Offline",
    busyStatus: "Band",
    allVehicles: "Barcha transportlar",
    truck: "Yuk mashinasi",
    van: "Furgon",
    pickup: "Pikap",
    refrigerator: "Refrijerator",
    allRatings: "Barcha reytinglar",
    fiveStars: "5 ★",
    fourPlusStars: "4+ ★",
    threePlusStars: "3+ ★",
    twoPlusStars: "2+ ★",
    allDrivers: "Barcha haydovchilar",
    onlineDrivers: "Online",
    verifiedDrivers: "Tasdiqlangan",
    availableDrivers: "Bo'sh",
    topRated: "Top reyting",
    newlyAdded: "Yangi qo'shilgan",
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
    paginationInfo: "1-9 of 156 haydovchilar",
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
    dimensions: "O'lchamlari",
    length: "Uzunlik (m)",
    height: "Balandlik (m)",
    width: "Kenglik (m)",
    capacity: "Sig'imi",
    weight: "Og'irlik (kg)",
    weightRequired: "Og'irlik (kg) *",
    availableTonnage: "Mavjud tonnaj",
    availableVolume: "Mavjud hajm (m³)",
    pricing: "Narxlar",
    currency: "Valyuta",
    som: "So'm",
    pricePerKm: "Narx (1 km uchun)",
    photo: "Rasm",
    vehiclePhoto: "Transport rasmi",
    publicTransport: "Ommaviy transport",
    publicTransportDesc: "Bu transport barcha foydalanuvchilar uchun ko'rinadi",
    cancel: "Bekor qilish",
    save: "Saqlash",
    driverDetails: " ma'lumotlar",
    email: "Email",
    assignCargoTitle: " ga yuk biriktirish",
    selectCargo: "Yukni tanlang",
    selectCargoPlaceholder: "Yukni tanlang...",
    additionalInfo: "Qo'shimcha ma'lumot",
    additionalInfoPlaceholder: "Haydovchiga qo'shimcha ko'rsatmalar...",
    driverAdded: "Yangi haydovchi qo'shildi!",
    container: "Konteyner",
    platform: "Platforma",
    tanker: "Sisterna",
    unknown: "Noma'lum",
    liveTracking: "Jonli kuzatuv",
    trackingOffline: "Kuzatuv o'chiq",
    selectYourTransport: "Transportni tanlang",
    locationAccuracyWarning: "Joylashuv aniqligi 2km ichida bo'lishi kerak",
    noLocationAccess: "Joylashuvga ruxsat berilmagan",
    connectionError: "Ulanish xatosi",
    reconnect: "Qayta ulanish",
    updatingLocation: "Joylashuv yangilanmoqda...",
    locationUpdated: "Joylashuv yangilandi"
  },
  ru: {
    pageTitle: "Водители",
    pageDescription: "Управляйте, отслеживайте и назначайте грузы всем водителям",
    totalDrivers: "Всего водителей",
    online: "Онлайн",
    offline: "Офлайн",
    verified: "Подтверждено",
    searchPlaceholder: "Поиск по имени водителя, ID или номеру телефона...",
    status: "Статус",
    vehicle: "Транспорт",
    rating: "Рейтинг",
    addDriver: "Добавить водителя",
    allStatuses: "Все статусы",
    onlineStatus: "Онлайн",
    offlineStatus: "Офлайн",
    busyStatus: "Занят",
    allVehicles: "Все виды транспорта",
    truck: "Грузовик",
    van: "Фургон",
    pickup: "Пикап",
    refrigerator: "Рефрижератор",
    allRatings: "Все рейтинги",
    fiveStars: "5 ★",
    fourPlusStars: "4+ ★",
    threePlusStars: "3+ ★",
    twoPlusStars: "2+ ★",
    allDrivers: "Все водители",
    onlineDrivers: "Онлайн",
    verifiedDrivers: "Подтвержденные",
    availableDrivers: "Свободные",
    topRated: "Лучшие по рейтингу",
    newlyAdded: "Новые",
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
    paginationInfo: "1-9 из 156 водителей",
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
    dimensions: "Размеры",
    length: "Длина (м)",
    height: "Высота (м)",
    width: "Ширина (м)",
    capacity: "Вместимость",
    weight: "Вес (кг)",
    weightRequired: "Вес (кг) *",
    availableTonnage: "Доступный тоннаж",
    availableVolume: "Доступный объем (м³)",
    pricing: "Цены",
    currency: "Валюта",
    som: "Сум",
    pricePerKm: "Цена (за 1 км)",
    photo: "Фото",
    vehiclePhoto: "Фото транспорта",
    publicTransport: "Публичный транспорт",
    publicTransportDesc: "Этот транспорт виден всем пользователям",
    cancel: "Отмена",
    save: "Сохранить",
    driverDetails: " информация",
    email: "Email",
    assignCargoTitle: " назначить груз",
    selectCargo: "Выберите груз",
    selectCargoPlaceholder: "Выберите груз...",
    additionalInfo: "Дополнительная информация",
    additionalInfoPlaceholder: "Дополнительные инструкции для водителя...",
    driverAdded: "Новый водитель добавлен!",
    container: "Контейнер",
    platform: "Платформа",
    tanker: "Цистерна",
    unknown: "Неизвестно",
    liveTracking: "Живое отслеживание",
    trackingOffline: "Отслеживание отключено",
    selectYourTransport: "Выберите транспорт",
    locationAccuracyWarning: "Точность местоположения должна быть в пределах 2км",
    noLocationAccess: "Доступ к местоположению не разрешен",
    connectionError: "Ошибка подключения",
    reconnect: "Переподключиться",
    updatingLocation: "Обновление местоположения...",
    locationUpdated: "Местоположение обновлено"
  },
  en: {
    pageTitle: "Drivers",
    pageDescription: "Manage, track and assign cargo to all drivers",
    totalDrivers: "Total Drivers",
    online: "Online",
    offline: "Offline",
    verified: "Verified",
    searchPlaceholder: "Search by driver name, ID or phone number...",
    status: "Status",
    vehicle: "Vehicle",
    rating: "Rating",
    addDriver: "Add Driver",
    allStatuses: "All Statuses",
    onlineStatus: "Online",
    offlineStatus: "Offline",
    busyStatus: "Busy",
    allVehicles: "All Vehicles",
    truck: "Truck",
    van: "Van",
    pickup: "Pickup",
    refrigerator: "Refrigerator",
    allRatings: "All Ratings",
    fiveStars: "5 ★",
    fourPlusStars: "4+ ★",
    threePlusStars: "3+ ★",
    twoPlusStars: "2+ ★",
    allDrivers: "All Drivers",
    onlineDrivers: "Online",
    verifiedDrivers: "Verified",
    availableDrivers: "Available",
    topRated: "Top Rated",
    newlyAdded: "Newly Added",
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
    paginationInfo: "1-9 of 156 drivers",
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
    dimensions: "Dimensions",
    length: "Length (m)",
    height: "Height (m)",
    width: "Width (m)",
    capacity: "Capacity",
    weight: "Weight (kg)",
    weightRequired: "Weight (kg) *",
    availableTonnage: "Available Tonnage",
    availableVolume: "Available Volume (m³)",
    pricing: "Pricing",
    currency: "Currency",
    som: "UZS",
    pricePerKm: "Price (per 1 km)",
    photo: "Photo",
    vehiclePhoto: "Vehicle Photo",
    publicTransport: "Public Transport",
    publicTransportDesc: "This vehicle is visible to all users",
    cancel: "Cancel",
    save: "Save",
    driverDetails: " Information",
    email: "Email",
    assignCargoTitle: " Assign Cargo",
    selectCargo: "Select Cargo",
    selectCargoPlaceholder: "Select cargo...",
    additionalInfo: "Additional Information",
    additionalInfoPlaceholder: "Additional instructions for driver...",
    driverAdded: "New driver added!",
    container: "Container",
    platform: "Platform",
    tanker: "Tanker",
    unknown: "Unknown",
    liveTracking: "Live Tracking",
    trackingOffline: "Tracking Offline",
    selectYourTransport: "Select Your Transport",
    locationAccuracyWarning: "Location accuracy must be within 2km",
    noLocationAccess: "Location access not granted",
    connectionError: "Connection Error",
    reconnect: "Reconnect",
    updatingLocation: "Updating location...",
    locationUpdated: "Location updated"
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

// Stat Card Component
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

// Mini Map Component for Driver Card
function MiniMap({ lat, lon, driverId, driverName, isOnline }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  useEffect(() => {
    if (!mapContainer.current || !lat || !lon) return;

    if (!map.current) {
      // Initialize map
      map.current = new window.maplibregl.Map({
        container: mapContainer.current,
        style: 'https://demotiles.maplibre.org/style.json',
        center: [lon, lat],
        zoom: 12,
        interactive: false,
        attributionControl: false
      });

      map.current.on('load', () => {
        // Add marker
        marker.current = new window.maplibregl.Marker({
          color: isOnline ? '#10B981' : '#EF4444',
          element: createCustomMarker(isOnline)
        })
          .setLngLat([lon, lat])
          .addTo(map.current);
      });
    } else {
      // Update marker position
      if (marker.current) {
        marker.current.setLngLat([lon, lat]);
      }
      map.current.setCenter([lon, lat]);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [lat, lon, isOnline]);

  const createCustomMarker = (online) => {
    const el = document.createElement('div');
    el.className = 'custom-marker';
    el.innerHTML = `
      <div class="relative">
        <div class="w-6 h-6 ${online ? 'bg-green-500' : 'bg-red-500'} rounded-full border-2 border-white shadow-lg flex items-center justify-center">
          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
          </svg>
        </div>
        ${online ? '<div class="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>' : ''}
      </div>
    `;
    return el;
  };

  return (
    <div className="h-48 rounded-xl relative overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
        {driverName}
      </div>
    </div>
  );
}

// Driver Card Component with Real-time Location
function DriverCard({ driver, t, position, isOnline }) {
  const hasPosition = position && position[0] && position[1];
  
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
          <div className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-white ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
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
            {hasPosition ? t.realTimeLocation : t.location}
            {hasPosition && <FaLocationArrow className="text-green-500 w-3 h-3 animate-pulse" />}
          </div>
        </div>
      </div>

      {/* Driver Details */}
      <div className="p-4 border-b border-gray-100">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{t.phone}</div>
            <div className="font-semibold text-gray-900 font-mono">+998992221133</div>
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
            <div className={`font-semibold ${isOnline ? 'text-green-600' : 'text-gray-600'}`}>
              {isOnline ? t.onlineStatusCol : t.offlineStatus}
            </div>
          </div>
        </div>

        {/* Map */}
        {hasPosition ? (
          <MiniMap 
            lat={position[0]} 
            lon={position[1]} 
            driverId={driver.id}
            driverName={`${driver.owner_first_name || ''} ${driver.owner_last_name || ''}`}
            isOnline={isOnline}
          />
        ) : (
          <div className="h-48 bg-linear-to-br from-cyan-50 to-blue-100 rounded-xl mt-4 relative">
            <div className="absolute w-6 h-6 bg-gray-400 rounded-full border-4 border-white shadow-md" style={{ top: '40%', left: '30%' }}>
              <div className="absolute w-2 h-2 bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center text-gray-600">
              <div className="text-center">
                <FaMapMarkedAlt className="text-4xl mb-2 mx-auto" />
                <div>{isOnline ? t.realTimeLocation : t.offlineStatus}</div>
              </div>
            </div>
          </div>
        )}
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
  const [positions, setPositions] = useState({});
  const [onlineDrivers, setOnlineDrivers] = useState(new Set());
  const [userTransports, setUserTransports] = useState([]);
  const [selectedTransportId, setSelectedTransportId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [lastLocationUpdate, setLastLocationUpdate] = useState(null);
  const [locationError, setLocationError] = useState(null);
  
  // Refs for WebSocket and interval
  const wsRef = useRef(null);
  const locationIntervalRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  // Form states
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ownerFirstName, setOwnerFirstName] = useState('');
  const [ownerLastName, setOwnerLastName] = useState('');
  const [ownerUsername, setOwnerUsername] = useState('admin');
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

  // Get current user information
  const getCurrentUser = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return null;
      }

      const response = await fetch('https://tokennoty.pythonanywhere.com/api/users/', {
        headers: {
          'Authorization': `token ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setCurrentUser(userData);
        return userData;
      } else {
        console.error('Failed to fetch user:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
    return null;
  }, []);

  // Get user's transports
  const getUserTransports = useCallback(async (username) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token for transport fetch');
        return [];
      }

      const response = await fetch(`https://tokennoty.pythonanywhere.com/api/transport/?owner__username=${username}`, {
        headers: {
          'Authorization': `token ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserTransports(data);
        if (data.length > 0) {
          // Try to get selected transport from localStorage or use first one
          const savedTransportId = localStorage.getItem('selectedTransportId');
          if (savedTransportId && data.some(t => t.id === parseInt(savedTransportId))) {
            setSelectedTransportId(parseInt(savedTransportId));
          } else {
            setSelectedTransportId(data[0].id);
            localStorage.setItem('selectedTransportId', data[0].id);
          }
        }
        return data;
      }
    } catch (error) {
      console.error('Error fetching user transports:', error);
    }
    return [];
  }, []);

  // Get all transports data
  const getAllTransports = useCallback(async () => {
    try {
      const baseUrl = 'https://tokennoty.pythonanywhere.com/api/transport/';
      const res = await fetch(baseUrl);
      if (!res.ok) throw new Error('Failed to fetch transports');
      
      const transports = await res.json();
      const result = await Promise.all(
        transports.map(async (item) => {
          try {
            const starsRes = await fetch(`${baseUrl}${item.id}/stars/`);
            const stars = await starsRes.json();
            return { ...item, stars };
          } catch (error) {
            console.error(`Error fetching stars for transport ${item.id}:`, error);
            return { ...item, stars: [] };
          }
        })
      );
      setTransportData(result);
    } catch (error) {
      console.error('Error fetching transport data:', error);
    }
  }, []);

  // Initialize WebSocket connection
  const initWebSocket = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token || !selectedTransportId) {
      console.log('No token or transport selected');
      setConnectionStatus('disconnected');
      return;
    }

    // Clear existing reconnection timeout
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    // Close existing connection
    if (wsRef.current) {
      wsRef.current.close();
    }

    // Construct WebSocket URL
    const wsUrl = `wss://tokennoty.pythonanywhere.com/ws/geolocation/transport/${token}/?pk=${selectedTransportId}`;
    
    try {
      setConnectionStatus('connecting');
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        console.log('WebSocket connected');
        setConnectionStatus('connected');
        setLocationError(null);
        // Start sending location updates
        startLocationUpdates();
      };

      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'message') {
            // Update single transport position
            const { pk, pos } = data;
            setPositions(prev => ({
              ...prev,
              [pk]: pos
            }));
            // Mark as online
            setOnlineDrivers(prev => new Set([...prev, parseInt(pk)]));
            
            // If this is our own transport, update last location time
            if (parseInt(pk) === selectedTransportId) {
              setLastLocationUpdate(new Date());
            }
          } else if (typeof data === 'object') {
            // Initial positions of all transports
            const newPositions = {};
            const onlineIds = new Set();
            
            Object.entries(data).forEach(([pk, pos]) => {
              if (Array.isArray(pos) && pos.length === 2) {
                const pkNum = parseInt(pk);
                newPositions[pkNum] = pos;
                onlineIds.add(pkNum);
                
                // If this is our own transport, update last location time
                if (pkNum === selectedTransportId) {
                  setLastLocationUpdate(new Date());
                }
              }
            });
            
            setPositions(newPositions);
            setOnlineDrivers(onlineIds);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnectionStatus('error');
        setLocationError(t.connectionError);
      };

      wsRef.current.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason);
        setConnectionStatus('disconnected');
        // Clear all online status on disconnect
        setOnlineDrivers(new Set());
        
        // Try to reconnect after 5 seconds if not manually closed
        if (event.code !== 1000) { // 1000 is normal closure
          reconnectTimeoutRef.current = setTimeout(() => {
            if (selectedTransportId) {
              initWebSocket();
            }
          }, 5000);
        }
      };

    } catch (error) {
      console.error('Error creating WebSocket:', error);
      setConnectionStatus('error');
      setLocationError(t.connectionError);
    }
  }, [selectedTransportId, t]);

  // Start sending location updates
  const startLocationUpdates = () => {
    // Clear existing interval
    if (locationIntervalRef.current) {
      clearInterval(locationIntervalRef.current);
    }

    locationIntervalRef.current = setInterval(() => {
      if (!selectedTransportId || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        return;
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude, accuracy } = position.coords;
            
            // Check accuracy (must be within 2 kilometers = 2000 meters)
            if (accuracy <= 2000) {
              const posData = {
                pos: [latitude, longitude]
              };
              
              if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                wsRef.current.send(JSON.stringify(posData));
                setLastLocationUpdate(new Date());
                setLocationError(null);
              }
            } else {
              console.warn(`Location accuracy too low: ${accuracy}m`);
              setLocationError(`${t.locationAccuracyWarning} (${Math.round(accuracy)}m)`);
            }
          },
          (error) => {
            console.error('Error getting location:', error);
            setLocationError(t.noLocationAccess);
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 10000
          }
        );
      }
    }, 5000); // Update every 5 seconds
  };

  // Initialize everything
  useEffect(() => {
    const initialize = async () => {
      // Get all transport data
      await getAllTransports();

      // Get user and setup WebSocket
      const user = await getCurrentUser();
      if (user) {
        await getUserTransports(user.username);
      }
    };

    initialize();

    // Cleanup
    return () => {
      if (wsRef.current) {
        wsRef.current.close(1000, 'Component unmounting');
      }
      if (locationIntervalRef.current) {
        clearInterval(locationIntervalRef.current);
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [getCurrentUser, getUserTransports, getAllTransports]);

  // Reinitialize WebSocket when selectedTransportId changes
  useEffect(() => {
    if (selectedTransportId) {
      initWebSocket();
    }
  }, [selectedTransportId, initWebSocket]);

  // Transport selection handler
  const handleTransportSelect = (transportId) => {
    setSelectedTransportId(transportId);
    localStorage.setItem('selectedTransportId', transportId);
    // WebSocket will reconnect automatically due to useEffect
  };

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
      photo: photo,
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
      }
    } catch (err) {
      console.error("Tarmoq xatosi:", err);
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

  // Filter transports based on active tab
  const filteredTransports = React.useMemo(() => {
    let filtered = transportData;
    
    switch (activeTab) {
      case 'online':
        filtered = filtered.filter(driver => onlineDrivers.has(driver.id));
        break;
      case 'verified':
        filtered = filtered.filter(driver => driver.verified);
        break;
      case 'available':
        filtered = filtered.filter(driver => !onlineDrivers.has(driver.id));
        break;
      case 'top':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case 'new':
        filtered = [...filtered].sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        );
        break;
      default:
        break;
    }
    
    return filtered;
  }, [transportData, activeTab, onlineDrivers]);

  // Transport selection modal
  const TransportSelectionModal = () => {
    if (userTransports.length === 0 || selectedTransportId) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full">
          <h3 className="text-xl font-bold mb-4">{t.selectYourTransport}</h3>
          <p className="text-gray-600 mb-4">
            {t.selectYourTransport}:
          </p>
          <div className="space-y-2">
            {userTransports.map(transport => (
              <button
                key={transport.id}
                className="w-full p-3 border border-gray-300 rounded-xl hover:bg-blue-50 hover:border-blue-500 transition-all text-left"
                onClick={() => handleTransportSelect(transport.id)}
              >
                <div className="font-semibold">{transport.vehicle_category}</div>
                <div className="text-sm text-gray-500">ID: {transport.id}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Format time since last update
  const formatTimeSince = (date) => {
    if (!date) return 'Never';
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50/10 to-purple-50/10 font-sans text-gray-800">
      <TransportSelectionModal />
      
      {/* Connection Status Indicator */}
      <div className="fixed top-4 right-4 z-40 flex flex-col gap-2 items-end">
        <div className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${connectionStatus === 'connected' ? 'bg-green-100 text-green-800' : connectionStatus === 'connecting' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
          <div className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' : connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
          {connectionStatus === 'connected' ? t.liveTracking : connectionStatus === 'connecting' ? t.updatingLocation : t.trackingOffline}
          {connectionStatus === 'error' && (
            <button 
              onClick={() => initWebSocket()}
              className="text-xs underline ml-2"
            >
              {t.reconnect}
            </button>
          )}
        </div>
        
        {/* {selectedTransportId && (
          <div className="text-xs bg-white/90 backdrop-blur-sm px-2 py-1 rounded border border-gray-200 shadow-sm">
            <div className="text-gray-600">Tracking: <span className="font-semibold">Transport #{selectedTransportId}</span></div>
            {lastLocationUpdate && (
              <div className="text-gray-500">Last update: {formatTimeSince(lastLocationUpdate)}</div>
            )}
          </div>
        )} */}
      </div>

      <main className="py-12">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-3">{t.pageTitle}</h1>
                <p className="text-gray-600 text-lg">{t.pageDescription}</p>
              </div>
              {selectedTransportId && userTransports.length > 0 && (
                <div className="flex items-center gap-2">
                  <select
                    className="text-sm text-gray-500 border border-gray-300 rounded-lg px-3 py-1 bg-white"
                    value={selectedTransportId}
                    onChange={(e) => handleTransportSelect(parseInt(e.target.value))}
                  >
                    {userTransports.map(transport => (
                      <option key={transport.id} value={transport.id}>
                        Transport #{transport.id} ({transport.vehicle_category})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard title={t.totalDrivers} value={transportData.length} trend="15%" trendUp={true} icon={FaUsers} gradient="from-blue-600 to-purple-700" t={t} />
            <StatCard title={t.online} value={onlineDrivers.size} trend="8%" trendUp={true} icon={FaWifi} gradient="from-cyan-400 to-cyan-500" t={t} />
            <StatCard title={t.offline} value={transportData.length - onlineDrivers.size} trend="3%" trendUp={false} icon={FaUserSlash} gradient="from-yellow-500 to-orange-400" t={t} />
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
            <Tab id="online" label={t.onlineDrivers} badge={onlineDrivers.size} active={activeTab === 'online'} />
            <Tab id="verified" label={t.verifiedDrivers} active={activeTab === 'verified'} />
            <Tab id="available" label={t.availableDrivers} active={activeTab === 'available'} />
            <Tab id="top" label={t.topRated} active={activeTab === 'top'} />
            <Tab id="new" label={t.newlyAdded} active={activeTab === 'new'} />
          </div>

          {/* Drivers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {filteredTransports.map(driver => (
              <DriverCard 
                key={driver.id} 
                driver={driver} 
                t={t}
                position={positions[driver.id]}
                isOnline={onlineDrivers.has(driver.id)}
              />
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

      {/* Location Accuracy Warning */}
      {locationError && (
        <div className="fixed bottom-4 right-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
          <FaExclamationTriangle />
          {locationError}
        </div>
      )}
    </div>
  );
}

export default Haydovchilar;