import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  FaTruckLoading, FaMapMarkerAlt, FaFlagCheckered, FaWeightHanging,
  FaRulerCombined, FaBox, FaTruck, FaCalendarAlt, FaBolt,
  FaShieldAlt, FaCalculator, FaRedo, FaShoppingCart,
  FaCheck, FaTimes, FaChartLine, FaSyncAlt,
  FaChevronDown, FaCheckCircle, FaExclamationTriangle, FaUsers,
  FaArrowUp, FaArrowDown
} from 'react-icons/fa';
import Navbar from './Navbar/Navbar';

// Tarjimalar obyekti
const translations = {
  uz: {
    // Asosiy sarlavhalar
    title: "Yuk Tashish Narxlari",
    subtitle: "Yukingiz narxini hisoblang, solishtiring va eng yaxshi taklifni toping",
    priceCalculator: "Narx Kalkulyatori",
    calculatorSubtitle: "Yukingiz parametrlarini kiriting va aniq narxni bilib oling",
    clear: "Tozalash",

    // Form maydonlari
    from: "Qayerdan",
    to: "Qayerga",
    weight: "Og'irlik (kg)",
    weightPlaceholder: "Masalan: 1000",
    volume: "Hajm (m³)",
    volumePlaceholder: "Masalan: 10",
    cargoType: "Yuk Turi",
    vehicleType: "Transport Turi",
    pickupDate: "Yuklash Sanasi",
    deliveryType: "Yetkazib berish turi",
    insurance: "Sug'urta",

    // Yuk turlari
    generalCargo: "Umumiy yuk",
    refrigeratedCargo: "Sovutilgan",
    dangerousCargo: "Xavfli yuk",
    fragileCargo: "Mozor yuk",
    liquidCargo: "Suyuq yuk",
    oversizedCargo: "Katta hajmdagi",

    // Transport turlari
    tent: "Tent",
    refrigerator: "Refrijerator",
    open: "Ochiq",
    closed: "Yopiq",
    tank: "Sisterna",
    platform: "Platforma",

    // Yetkazib berish turlari
    standard: "Standart (3-5 kun)",
    express: "Ekspress (1-2 kun)",
    sameDay: "Bir kunlik",

    // Sug'urta variantlari
    noInsurance: "Sug'urtasiz",
    basicInsurance: "Asosiy (1%)",
    fullInsurance: "To'liq (2%)",

    // Kalkulyator natijasi
    estimatedPrice: "Taxminiy Narx",
    allInclusive: "Barcha xizmatlar narxi bilan",
    totalPayment: "Jami to'lov",
    sum: "so'm",
    priceBreakdown: "Narx tarkibi",
    basePrice: "Asosiy narx",
    distance: "Masofa",
    cargoTypeAdd: "Yuk turi",
    deliveryAdd: "Yetkazish",
    insuranceAdd: "Sug'urta",

    // Hisoblash va buyurtma
    calculate: "Hisoblash",
    order: "Buyurtma",

    // Statistik kartalar
    totalOrders: "Jami Buyurtmalar",
    avgPrice: "O'rtacha Narx",
    activeDrivers: "Faol Haydovchilar",
    customers: "Mijozlar",

    // Xabarnomalar
    selectCities: "Iltimos, qayerdan va qayerga shaharlarni tanlang!",
    enterWeightVolume: "Iltimos, og'irlik va hajmni to'g'ri kiriting!",
    priceCalculated: "Narx muvaffaqiyatli hisoblandi!",
    calculatorCleared: "Kalkulyator tozalandi",
    orderFunctionActivated: "Buyurtma funksiyasi faollashtirilgan",
    planSelected: " tarif tanlandi",

    // Shahar tanlash
    selectCity: "Shahar tanlang",

    // Tariflar
    starter: "Boshlang'ich",
    professional: "Professional",
    business: "Biznes",
    recommended: "Tavsiya etiladi",
    select: "Tanlash"
  },
  ru: {
    // Asosiy sarlavhalar
    title: "Цены на Перевозку Грузов",
    subtitle: "Рассчитайте стоимость груза, сравните и найдите лучшее предложение",
    priceCalculator: "Калькулятор Цен",
    calculatorSubtitle: "Введите параметры груза и узнайте точную стоимость",
    clear: "Очистить",

    // Form maydonlari
    from: "Откуда",
    to: "Куда",
    weight: "Вес (кг)",
    weightPlaceholder: "Например: 1000",
    volume: "Объем (м³)",
    volumePlaceholder: "Например: 10",
    cargoType: "Тип Груза",
    vehicleType: "Тип Транспорта",
    pickupDate: "Дата Загрузки",
    deliveryType: "Тип Доставки",
    insurance: "Страховка",

    // Yuk turlari
    generalCargo: "Общий груз",
    refrigeratedCargo: "Охлажденный",
    dangerousCargo: "Опасный груз",
    fragileCargo: "Хрупкий груз",
    liquidCargo: "Жидкий груз",
    oversizedCargo: "Крупногабаритный",

    // Transport turlari
    tent: "Тент",
    refrigerator: "Рефрижератор",
    open: "Открытый",
    closed: "Закрытый",
    tank: "Цистерна",
    platform: "Платформа",

    // Yetkazib berish turlari
    standard: "Стандарт (3-5 дней)",
    express: "Экспресс (1-2 дня)",
    sameDay: "В тот же день",

    // Sug'urta variantlari
    noInsurance: "Без страховки",
    basicInsurance: "Основная (1%)",
    fullInsurance: "Полная (2%)",

    // Kalkulyator natijasi
    estimatedPrice: "Примерная Стоимость",
    allInclusive: "Стоимость всех услуг",
    totalPayment: "Итого к оплате",
    sum: "сум",
    priceBreakdown: "Состав стоимости",
    basePrice: "Базовая цена",
    distance: "Расстояние",
    cargoTypeAdd: "Тип груза",
    deliveryAdd: "Доставка",
    insuranceAdd: "Страховка",

    // Hisoblash va buyurtma
    calculate: "Рассчитать",
    order: "Заказать",

    // Statistik kartalar
    totalOrders: "Всего Заказов",
    avgPrice: "Средняя Цена",
    activeDrivers: "Активные Водители",
    customers: "Клиенты",

    // Xabarnomalar
    selectCities: "Пожалуйста, выберите города отправления и назначения!",
    enterWeightVolume: "Пожалуйста, правильно введите вес и объем!",
    priceCalculated: "Цена успешно рассчитана!",
    calculatorCleared: "Калькулятор очищен",
    orderFunctionActivated: "Функция заказа активирована",
    planSelected: " тариф выбран",

    // Shahar tanlash
    selectCity: "Выберите город",

    // Tariflar
    starter: "Начальный",
    professional: "Профессиональный",
    business: "Бизнес",
    recommended: "Рекомендуется",
    select: "Выбрать"
  },
  en: {
    // Asosiy sarlavhalar
    title: "Cargo Shipping Prices",
    subtitle: "Calculate your cargo price, compare and find the best offer",
    priceCalculator: "Price Calculator",
    calculatorSubtitle: "Enter your cargo parameters and get the exact price",
    clear: "Clear",

    // Form maydonlari
    from: "From",
    to: "To",
    weight: "Weight (kg)",
    weightPlaceholder: "Example: 1000",
    volume: "Volume (m³)",
    volumePlaceholder: "Example: 10",
    cargoType: "Cargo Type",
    vehicleType: "Vehicle Type",
    pickupDate: "Pickup Date",
    deliveryType: "Delivery Type",
    insurance: "Insurance",

    // Yuk turlari
    generalCargo: "General cargo",
    refrigeratedCargo: "Refrigerated",
    dangerousCargo: "Dangerous cargo",
    fragileCargo: "Fragile cargo",
    liquidCargo: "Liquid cargo",
    oversizedCargo: "Oversized",

    // Transport turlari
    tent: "Tent",
    refrigerator: "Refrigerator",
    open: "Open",
    closed: "Closed",
    tank: "Tank",
    platform: "Platform",

    // Yetkazib berish turlari
    standard: "Standard (3-5 days)",
    express: "Express (1-2 days)",
    sameDay: "Same day",

    // Sug'urta variantlari
    noInsurance: "No insurance",
    basicInsurance: "Basic (1%)",
    fullInsurance: "Full (2%)",

    // Kalkulyator natijasi
    estimatedPrice: "Estimated Price",
    allInclusive: "All services included",
    totalPayment: "Total Payment",
    sum: "UZS",
    priceBreakdown: "Price Breakdown",
    basePrice: "Base Price",
    distance: "Distance",
    cargoTypeAdd: "Cargo type",
    deliveryAdd: "Delivery",
    insuranceAdd: "Insurance",

    // Hisoblash va buyurtma
    calculate: "Calculate",
    order: "Order",

    // Statistik kartalar
    totalOrders: "Total Orders",
    avgPrice: "Average Price",
    activeDrivers: "Active Drivers",
    customers: "Customers",

    // Xabarnomalar
    selectCities: "Please select departure and destination cities!",
    enterWeightVolume: "Please enter correct weight and volume!",
    priceCalculated: "Price successfully calculated!",
    calculatorCleared: "Calculator cleared",
    orderFunctionActivated: "Order function activated",
    planSelected: " plan selected",

    // Shahar tanlash
    selectCity: "Select city",

    // Tariflar
    starter: "Starter",
    professional: "Professional",
    business: "Business",
    recommended: "Recommended",
    select: "Select"
  }
};

// Helper functions
const formatNumber = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

// Reusable Components
const IconButton = ({ icon: Icon, label, color = 'blue', onClick, ...props }) => (
  <button
    className={`flex-1 py-3 border border-gray-300 rounded-xl font-semibold text-sm hover:text-white hover:border-${color}-500 hover:bg-${color}-500 transition-all flex items-center justify-center gap-2`}
    onClick={onClick}
    {...props}
  >
    <Icon className="w-4 h-4" />{label}
  </button>
);

const StatCard = ({ title, value, trend, trendUp, icon: Icon, gradient, t }) => {
  const gradientClasses = {
    'blue': 'from-blue-600 to-purple-700',
    'cyan': 'from-cyan-400 to-cyan-500',
    'yellow': 'from-yellow-500 to-orange-400',
    'purple': 'from-purple-700 to-blue-600'
  };

  const bgColor = gradient.includes('blue') ? 'bg-blue-50 text-blue-600' :
    gradient.includes('cyan') ? 'bg-cyan-50 text-cyan-400' :
      gradient.includes('yellow') ? 'bg-yellow-50 text-yellow-500' : 'bg-purple-50 text-purple-700';

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:-translate-y-1 transition-transform relative overflow-hidden">
      <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${gradientClasses[gradient] || gradient}`} />
      <div className="flex items-center justify-between mb-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bgColor}`}>
          <Icon className="text-xl" />
        </div>
        <span className={`${trendUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'} text-sm font-semibold py-1 px-3 rounded-full flex items-center gap-1`}>
          {trendUp ? <FaArrowUp /> : <FaArrowDown />}{trend}
        </span>
      </div>
      <div className="text-4xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-500">{t[title]}</div>
    </div>
  );
};

const SelectInput = ({ label, icon: Icon, name, value, options, onChange, t, children, ...props }) => (
  <div className="form-group">
    <label className="form-label font-medium text-gray-700 mb-2 flex items-center gap-2">
      <Icon className="text-blue-600" />{t[label]}
    </label>
    <select
      className="w-full p-3 border border-gray-300 rounded-xl text-sm bg-white text-gray-700 cursor-pointer appearance-none pr-10 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      style={{
        backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22%236c757d%22 viewBox=%220 0 16 16%22%3E%3Cpath d=%22M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z%22/%3E%3C/svg%3E")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 1rem center',
        backgroundSize: '16px'
      }}
      name={name}
      value={value}
      onChange={onChange}
      {...props}
    >
      {children || options}
    </select>
  </div>
);

const InputField = ({ label, icon: Icon, name, value, onChange, type = 'number', t, placeholder, ...props }) => (
  <div className="form-group">
    <label className="form-label font-medium text-gray-700 mb-2 flex items-center gap-2">
      <Icon className="text-blue-600" />{t[label]}
    </label>
    <input
      type={type}
      className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={t[placeholder]}
      {...props}
    />
  </div>
);

// Data objects
const priceData = {
  cities: [
    { id: 'tashkent', name: 'Toshkent', zone: 'central' },
    { id: 'samarkand', name: 'Samarqand', zone: 'central' },
    { id: 'bukhara', name: 'Buxoro', zone: 'western' },
    { id: 'andijan', name: 'Andijon', zone: 'eastern' },
    { id: 'fergana', name: "Farg'ona", zone: 'eastern' },
    { id: 'namangan', name: 'Namangan', zone: 'eastern' },
    { id: 'nukus', name: 'Nukus', zone: 'western' },
    { id: 'qarshi', name: 'Qarshi', zone: 'central' },
    { id: 'termiz', name: 'Termiz', zone: 'southern' },
    { id: 'navoiy', name: 'Navoiy', zone: 'central' }
  ],

  distances: {
    'tashkent-samarkand': 300, 'tashkent-bukhara': 550,
    'fergana-tashkent': 280, 'andijan-namangan': 120,
    'tashkent-nukus': 1200, 'samarkand-bukhara': 270,
    'bukhara-navoiy': 120, 'tashkent-termiz': 700,
    'fergana-andijan': 60, 'namangan-tashkent': 280
  },

  multipliers: {
    cargoType: { general: 1.0, refrigerated: 1.3, dangerous: 1.5, fragile: 1.2, liquid: 1.4, oversized: 1.6 },
    vehicleType: { tent: 1.0, refrigerator: 1.3, open: 0.9, closed: 1.0, tank: 1.4, flatbed: 1.2 },
    deliveryType: { standard: 1.0, express: 1.5, same_day: 2.0 },
    insurance: { no: 0, basic: 0.01, full: 0.02 }
  },

  baseRates: { perKm: 500, perKg: 10, perM3: 2000 }
};

const vehicleTypes = [
  { type: 'Tent', pricePerKm: 500, deliveryTime: '2-3 kun', capacity: '20 tonna / 82 m³' },
  { type: 'Refrijerator', pricePerKm: 650, deliveryTime: '1-2 kun', capacity: '8 tonna / 35 m³' },
  { type: 'Ochiq Platforma', pricePerKm: 450, deliveryTime: '2-4 kun', capacity: '25 tonna / 60 m³' },
  { type: 'Sisterna', pricePerKm: 800, deliveryTime: '2-3 kun', capacity: '15 tonna / 30 m³' },
  { type: 'Furgon', pricePerKm: 350, deliveryTime: '1-2 kun', capacity: '3 tonna / 15 m³' }
];

const plans = [
  { id: 'starter', title: 'starter', price: '500,000', featured: false },
  { id: 'professional', title: 'professional', price: '1,200,000', featured: true },
  { id: 'business', title: 'business', price: '3,500,000', featured: false }
];

const stats = [
  { title: 'totalOrders', value: '1,254', trend: '15%', trendUp: true, icon: FaTruckLoading, gradient: 'blue' },
  { title: 'avgPrice', value: '850K', trend: '8%', trendUp: true, icon: FaChartLine, gradient: 'cyan' },
  { title: 'activeDrivers', value: '89', trend: '3%', trendUp: false, icon: FaUsers, gradient: 'yellow' },
  { title: 'customers', value: '456', trend: '24%', trendUp: true, icon: FaCheckCircle, gradient: 'purple' }
];

const initialFormData = {
  fromCity: '', toCity: '', weight: '1000', volume: '10',
  cargoType: 'general', vehicleType: 'tent', pickupDate: '',
  deliveryType: 'standard', insurance: 'no'
};

const initialPriceBreakdown = {
  basePrice: 0, distance: 0, typePrice: 0,
  deliveryPrice: 0, insurancePrice: 0, totalPrice: 0
};

// Main Pricing Component
const PricingPage = ({ currentLang }) => {
  // Tarjima funksiyasi
  const t = translations[currentLang || 'uz']

  const [formData, setFormData] = useState(initialFormData);
  const [priceBreakdown, setPriceBreakdown] = useState(initialPriceBreakdown);
  const [notification, setNotification] = useState(null);
  const [activeFAQ, setActiveFAQ] = useState(null);

  // Set default date on mount
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setFormData(prev => ({ ...prev, pickupDate: tomorrow.toISOString().split('T')[0] }));
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculatePrice = () => {
    const { fromCity, toCity, weight, volume, cargoType, vehicleType, deliveryType, insurance } = formData;

    if (!fromCity || !toCity) {
      showNotification(t.selectCities, 'warning');
      return;
    }

    const weightNum = parseFloat(weight) || 0;
    const volumeNum = parseFloat(volume) || 0;

    if (weightNum <= 0 || volumeNum <= 0) {
      showNotification(t.enterWeightVolume, 'warning');
      return;
    }

    // Calculate distance
    const routeKey = `${fromCity}-${toCity}`;
    const distance = priceData.distances[routeKey] || (fromCity === toCity ? 50 : 300);

    // Calculate base price
    const basePrice = (distance * priceData.baseRates.perKm) +
      (weightNum * priceData.baseRates.perKg) +
      (volumeNum * priceData.baseRates.perM3);

    // Apply multipliers
    const cargoMultiplier = priceData.multipliers.cargoType[cargoType] || 1;
    const vehicleMultiplier = priceData.multipliers.vehicleType[vehicleType] || 1;
    const deliveryMultiplier = priceData.multipliers.deliveryType[deliveryType] || 1;

    let totalPrice = basePrice * cargoMultiplier * vehicleMultiplier * deliveryMultiplier;

    // Apply insurance
    const insuranceRate = priceData.multipliers.insurance[insurance] || 0;
    const insuranceAmount = totalPrice * insuranceRate;

    // Final price with commission
    totalPrice = Math.round(totalPrice + insuranceAmount + (totalPrice * 0.05));

    setPriceBreakdown({
      basePrice: Math.round(basePrice),
      distance: distance,
      typePrice: Math.round(basePrice * (cargoMultiplier - 1)),
      deliveryPrice: Math.round(totalPrice * (deliveryMultiplier - 1)),
      insurancePrice: Math.round(insuranceAmount),
      totalPrice: totalPrice
    });

    showNotification(t.priceCalculated, 'success');
  };

  const resetCalculator = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setFormData({ ...initialFormData, pickupDate: tomorrow.toISOString().split('T')[0] });
    setPriceBreakdown(initialPriceBreakdown);
    showNotification(t.calculatorCleared, 'success');
  };

  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const renderCityOptions = () => (
    <>
      <option value="">{t.selectCity}</option>
      {priceData.cities.map(city => (
        <option key={city.id} value={city.id}>{city.name}</option>
      ))}
    </>
  );

  const renderCargoTypeOptions = () => {
    const cargoTypeLabels = {
      general: t.generalCargo,
      refrigerated: t.refrigeratedCargo,
      dangerous: t.dangerousCargo,
      fragile: t.fragileCargo,
      liquid: t.liquidCargo,
      oversized: t.oversizedCargo
    };

    return Object.entries(priceData.multipliers.cargoType).map(([key]) => (
      <option key={key} value={key}>
        {cargoTypeLabels[key]}
      </option>
    ));
  };

  const renderVehicleTypeOptions = () => {
    const vehicleTypeLabels = {
      tent: t.tent,
      refrigerator: t.refrigerator,
      open: t.open,
      closed: t.closed,
      tank: t.tank,
      flatbed: t.platform
    };

    return Object.entries(priceData.multipliers.vehicleType).map(([key]) => (
      <option key={key} value={key}>
        {vehicleTypeLabels[key]}
      </option>
    ));
  };

  const renderDeliveryTypeOptions = () => {
    const deliveryTypeLabels = {
      standard: t.standard,
      express: t.express,
      same_day: t.sameDay
    };

    return Object.entries(priceData.multipliers.deliveryType).map(([key]) => (
      <option key={key} value={key}>
        {deliveryTypeLabels[key]}
      </option>
    ));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50/10 to-purple-50/10 font-sans text-gray-800">
      <main className="main-content py-12">
        <div className="container mx-auto px-6">
          {/* Page Header */}
          <div className="page-header mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">{t.title}</h1>
            <p className="text-gray-600 text-lg">{t.subtitle}</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map(stat => (
              <StatCard
                key={stat.title}
                {...stat}
                t={t}
              />
            ))}
          </div>

          {/* Price Calculator */}
          <section className="price-calculator bg-white rounded-2xl p-6 shadow-md border border-gray-100 mb-12">
            <div className="calculator-header flex items-center justify-between mb-6">
              <div>
                <h2 className="calculator-title text-2xl font-bold text-gray-900">{t.priceCalculator}</h2>
                <p className="calculator-subtitle text-gray-600 text-sm">{t.calculatorSubtitle}</p>
              </div>
              <button className="btn-outline py-3 px-6 border border-gray-300 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-all flex items-center gap-2" onClick={resetCalculator}>
                <FaRedo /> {t.clear}
              </button>
            </div>

            <div className="calculator-grid grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="calculator-form lg:col-span-2 space-y-6">
                <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SelectInput
                    label="from"
                    icon={FaMapMarkerAlt}
                    name="fromCity"
                    value={formData.fromCity}
                    onChange={handleInputChange}
                    options={renderCityOptions()}
                    t={t}
                  />
                  <SelectInput
                    label="to"
                    icon={FaFlagCheckered}
                    name="toCity"
                    value={formData.toCity}
                    onChange={handleInputChange}
                    options={renderCityOptions()}
                    t={t}
                  />
                </div>

                <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="weight"
                    icon={FaWeightHanging}
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="weightPlaceholder"
                    min="1"
                    max="50000"
                    t={t}
                  />
                  <InputField
                    label="volume"
                    icon={FaRulerCombined}
                    name="volume"
                    value={formData.volume}
                    onChange={handleInputChange}
                    placeholder="volumePlaceholder"
                    min="0.1"
                    max="100"
                    step="0.1"
                    t={t}
                  />
                </div>

                <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SelectInput
                    label="cargoType"
                    icon={FaBox}
                    name="cargoType"
                    value={formData.cargoType}
                    onChange={handleInputChange}
                    t={t}
                  >
                    {renderCargoTypeOptions()}
                  </SelectInput>

                  <SelectInput
                    label="vehicleType"
                    icon={FaTruck}
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleInputChange}
                    t={t}
                  >
                    {renderVehicleTypeOptions()}
                  </SelectInput>
                </div>

                <div className="form-row grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="pickupDate"
                    icon={FaCalendarAlt}
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleInputChange}
                    type="date"
                    t={t}
                  />

                  <SelectInput
                    label="deliveryType"
                    icon={FaBolt}
                    name="deliveryType"
                    value={formData.deliveryType}
                    onChange={handleInputChange}
                    t={t}
                  >
                    {renderDeliveryTypeOptions()}
                  </SelectInput>
                </div>

                <div className="form-group">
                  <label className="form-label font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FaShieldAlt className="text-blue-600" />
                    {t.insurance}
                  </label>
                  <div className="insurance-options flex gap-6 items-center">
                    {['no', 'basic', 'full'].map((value) => (
                      <label key={value} className="insurance-option flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="insurance"
                          value={value}
                          checked={formData.insurance === value}
                          onChange={handleInputChange}
                          className="text-blue-600"
                        />
                        <span className="text-sm">
                          {value === 'no' ? t.noInsurance :
                            value === 'basic' ? t.basicInsurance : t.fullInsurance}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Calculator Result */}
              <div className="calculator-result bg-linear-to-br from-blue-600 to-purple-700 rounded-2xl p-6 text-white flex flex-col justify-between">
                <div>
                  <div className="result-header text-center mb-6">
                    <div className="result-title text-xl font-semibold">{t.estimatedPrice}</div>
                    <div className="result-subtitle text-sm opacity-90">{t.allInclusive}</div>
                  </div>

                  <div className="result-price text-center mb-6">
                    <div className="price-label text-sm opacity-90 mb-2">{t.totalPayment}</div>
                    <div className="price-value text-4xl font-bold">{formatNumber(priceBreakdown.totalPrice)}</div>
                    <div className="price-unit text-sm opacity-90">{t.sum}</div>
                  </div>

                  <div className="price-breakdown bg-white/10 rounded-xl p-4 mb-6">
                    {Object.entries(priceBreakdown).map(([key, value]) => key !== 'totalPrice' && (
                      <div key={key} className="breakdown-item flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                        <span className="breakdown-label text-sm opacity-90 capitalize">
                          {key === 'basePrice' ? t.basePrice :
                            key === 'distance' ? t.distance :
                              key === 'typePrice' ? t.cargoTypeAdd :
                                key === 'deliveryPrice' ? t.deliveryAdd : t.insuranceAdd}
                        </span>
                        <span className="breakdown-value font-semibold">
                          {key === 'distance' ? `${value} km` : `${formatNumber(value)} ${t.sum}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="calculator-actions flex gap-3">
                  <button className="btn-primary flex-1 bg-white text-blue-600 font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-1 transition-all" onClick={calculatePrice}>
                    <FaCalculator /> {t.calculate}
                  </button>
                  <button className="btn-outline flex-1 bg-transparent border border-white/30 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all" onClick={() => showNotification(t.orderFunctionActivated, 'success')}>
                    <FaShoppingCart /> {t.order}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Price Cards */}
          <section className="price-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {plans.map((plan) => (
              <div key={plan.id} className={`price-card bg-white rounded-2xl shadow-md border border-gray-100 hover:-translate-y-1 transition-all overflow-hidden relative ${plan.featured ? 'border-2 border-blue-600' : ''}`}>
                {plan.featured && (
                  <div className="featured-badge absolute top-4 right-4 bg-linear-to-r from-blue-600 to-purple-700 text-white text-xs font-semibold py-1 px-3 rounded-xl z-10">
                    {t.recommended}
                  </div>
                )}

                <div className="card-header p-6 border-b border-gray-100 text-center">
                  <h3 className="card-title text-2xl font-bold text-gray-900 mb-2">{t[plan.title]}</h3>
                </div>

                <div className="card-price p-6 bg-gray-50 text-center">
                  <div className="card-amount text-3xl font-bold text-blue-600 mb-1">{plan.price}</div>
                </div>

                <div className="card-actions p-6 border-t border-gray-100 text-center">
                  <button
                    className={`btn ${plan.featured ? 'bg-linear-to-r from-blue-600 to-blue-700 text-white' : 'border border-blue-600 text-blue-600'} font-semibold py-3 px-6 rounded-xl w-full hover:shadow-lg hover:-translate-y-0.5 transition-all`}
                    onClick={() => showNotification(t[plan.title] + t.planSelected, 'success')}
                  >
                    {t.select}
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-6 right-6 p-4 rounded-xl shadow-lg z-50 flex items-center gap-3 animate-slide-in ${notification.type === 'success' ? 'bg-green-500' : notification.type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'} text-white`}>
          {notification.type === 'success' ? <FaCheckCircle /> : notification.type === 'warning' ? <FaExclamationTriangle /> : <FaTimes />}
          <span>{notification.message}</span>
        </div>
      )}
    </div>
  );
};

export default PricingPage;
