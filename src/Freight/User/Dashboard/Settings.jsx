import React, { useState, useEffect } from 'react';
import {
  FaUser, FaCamera, FaEdit, FaSave, FaTimes, FaTruck,
  FaUserTie, FaBuilding, FaMapMarkerAlt, FaIdCard, FaWeight,
  FaPhone, FaFacebook, FaWhatsapp, FaEnvelope, FaCar, FaSnowflake,
  FaTruckPickup, FaBox, FaCheckCircle, FaExclamationCircle
} from "react-icons/fa";
import { BsFillFuelPumpFill } from "react-icons/bs";

// Settings.jsx faylining boshida importlardan keyin quyidagicha qo'shing:
const translations = {
  uz: {
    // Transport turi tarjimalari
    tent: "Tent",
    refrigerator: "Refrijerator",
    platform: "Platforma",
    container: "Konteyner",
    cistern: "Sisterna",
    transportType: "Transport turi",

    // Shaxsiy ma'lumotlar
    personalInfo: "Shaxsiy ma'lumotlar",
    firstName: "Ism",
    firstNamePlaceholder: "Ismingiz",
    lastName: "Familiya",
    lastNamePlaceholder: "Familiyangiz",
    phone: "Telefon",
    phonePlaceholder: "+998 99 123 45 67",

    // Ijtimoiy tarmoqlar
    socialMedia: "Ijtimoiy tarmoqlar",
    facebookPlaceholder: "Facebook profil linki",
    whatsappPlaceholder: "WhatsApp raqami",

    // Sozlamalar
    settings: "Sozlamalar",
    saveAllChanges: "Barcha o'zgarishlarni saqlash",
    saving: "Saqlanmoqda...",

    // Manzil
    locationInfo: "Manzil ma'lumotlari",
    state: "Viloyat",
    selectState: "Viloyatni tanlang",
    district: "Tuman",
    selectDistrict: "Tuman tanlang",
    selectStateFirst: "Avval viloyatni tanlang",
    exactAddress: "Aniq manzil",
    addressPlaceholder: "Ko'cha, uy raqami",

    // Transport ma'lumotlari
    transportInfo: "Transport ma'lumotlari",
    driver: "Haydovchi",
    shipper: "Yuk Jo'natuvchi",
    driverLicense: "Haydovchilik guvohnomasi",
    driverLicensePlaceholder: "AA 1234567",
    capacity: "Yuk sig'imi (kg)",
    capacityPlaceholder: "5000",
    carNumber: "Mashina raqami",
    carNumberPlaceholder: "01 A 123 AA",

    // Yuk jo'natuvchi ma'lumotlari
    shipperInfo: "Yuk jo'natuvchi ma'lumotlari",
    companyName: "Kompaniya nomi",
    companyNamePlaceholder: "Kompaniya nomi",
    avgShipmentVolume: "O'rtacha yuk hajmi (kg)",
    avgShipmentVolumePlaceholder: "O'rtacha jo'natadigan yuk hajmi",
    additionalNotes: "Qo'shimcha izohlar",
    notesPlaceholder: "Yuk jo'natishga oid qo'shimcha ma'lumotlar...",

    // Hisob ma'lumotlari
    accountInfo: "Hisob ma'lumotlari",
    accountType: "Hisob turi",
    emailChangeNote: "Email o'zgartirish uchun admin bilan bog'laning",

    // Xabarlar
    authRequired: "Avtorizatsiya talab qilinadi",
    loadUserError: "Foydalanuvchi ma'lumotlarini yuklashda xatolik",
    serverError: "Serverga ulanishda xatolik",
    imageUploaded: "Rasm yuklandi. Saqlash tugmasini bosing.",
    updateSuccess: "Ma'lumot yangilandi!",
    updateError: "Yangilashda xatolik: ",
    saveError: "Saqlashda xatolik yuz berdi",
    saveAllSuccess: "Barcha ma'lumotlar muvaffaqiyatli saqlandi!",
    saveAllError: "Saqlashda xatolik: ",
    unknownError: "Noma'lum xato",
    select: "Tanlang"
  },
  ru: {
    // Transport turi tarjimalari
    tent: "Тент",
    refrigerator: "Рефрижератор",
    platform: "Платформа",
    container: "Контейнер",
    cistern: "Цистерна",
    transportType: "Тип транспорта",

    // Shaxsiy ma'lumotlar
    personalInfo: "Личная информация",
    firstName: "Имя",
    firstNamePlaceholder: "Ваше имя",
    lastName: "Фамилия",
    lastNamePlaceholder: "Ваша фамилия",
    phone: "Телефон",
    phonePlaceholder: "+998 99 123 45 67",

    // Ijtimoiy tarmoqlar
    socialMedia: "Социальные сети",
    facebookPlaceholder: "Ссылка на профиль Facebook",
    whatsappPlaceholder: "Номер WhatsApp",

    // Sozlamalar
    settings: "Настройки",
    saveAllChanges: "Сохранить все изменения",
    saving: "Сохранение...",

    // Manzil
    locationInfo: "Адресная информация",
    state: "Область",
    selectState: "Выберите область",
    district: "Район",
    selectDistrict: "Выберите район",
    selectStateFirst: "Сначала выберите область",
    exactAddress: "Точный адрес",
    addressPlaceholder: "Улица, номер дома",

    // Transport ma'lumotlari
    transportInfo: "Информация о транспорте",
    driver: "Водитель",
    shipper: "Отправитель груза",
    driverLicense: "Водительское удостоверение",
    driverLicensePlaceholder: "AA 1234567",
    capacity: "Грузоподъемность (кг)",
    capacityPlaceholder: "5000",
    carNumber: "Номер машины",
    carNumberPlaceholder: "01 A 123 AA",

    // Yuk jo'natuvchi ma'lumotlari
    shipperInfo: "Информация об отправителе",
    companyName: "Название компании",
    companyNamePlaceholder: "Название компании",
    avgShipmentVolume: "Средний объем груза (кг)",
    avgShipmentVolumePlaceholder: "Средний объем отправляемого груза",
    additionalNotes: "Дополнительные заметки",
    notesPlaceholder: "Дополнительная информация об отправке груза...",

    // Hisob ma'lumotlari
    accountInfo: "Информация об аккаунте",
    accountType: "Тип аккаунта",
    emailChangeNote: "Для изменения email свяжитесь с администратором",

    // Xabarlar
    authRequired: "Требуется авторизация",
    loadUserError: "Ошибка при загрузке данных пользователя",
    serverError: "Ошибка соединения с сервером",
    imageUploaded: "Изображение загружено. Нажмите кнопку сохранения.",
    updateSuccess: "Данные обновлены!",
    updateError: "Ошибка обновления: ",
    saveError: "Произошла ошибка сохранения",
    saveAllSuccess: "Все данные успешно сохранены!",
    saveAllError: "Ошибка сохранения: ",
    unknownError: "Неизвестная ошибка",
    select: "Выберите"
  },
  en: {
    // Transport turi tarjimalari
    tent: "Tent",
    refrigerator: "Refrigerator",
    platform: "Platform",
    container: "Container",
    cistern: "Cistern",
    transportType: "Transport Type",

    // Shaxsiy ma'lumotlar
    personalInfo: "Personal Information",
    firstName: "First Name",
    firstNamePlaceholder: "Your first name",
    lastName: "Last Name",
    lastNamePlaceholder: "Your last name",
    phone: "Phone",
    phonePlaceholder: "+998 99 123 45 67",

    // Ijtimoiy tarmoqlar
    socialMedia: "Social Media",
    facebookPlaceholder: "Facebook profile link",
    whatsappPlaceholder: "WhatsApp number",

    // Sozlamalar
    settings: "Settings",
    saveAllChanges: "Save All Changes",
    saving: "Saving...",

    // Manzil
    locationInfo: "Location Information",
    state: "State/Region",
    selectState: "Select state/region",
    district: "District",
    selectDistrict: "Select district",
    selectStateFirst: "Select state first",
    exactAddress: "Exact Address",
    addressPlaceholder: "Street, house number",

    // Transport ma'lumotlari
    transportInfo: "Transport Information",
    driver: "Driver",
    shipper: "Shipper",
    driverLicense: "Driver's License",
    driverLicensePlaceholder: "AA 1234567",
    capacity: "Capacity (kg)",
    capacityPlaceholder: "5000",
    carNumber: "Car Number",
    carNumberPlaceholder: "01 A 123 AA",

    // Yuk jo'natuvchi ma'lumotlari
    shipperInfo: "Shipper Information",
    companyName: "Company Name",
    companyNamePlaceholder: "Company name",
    avgShipmentVolume: "Average Shipment Volume (kg)",
    avgShipmentVolumePlaceholder: "Average volume of shipments",
    additionalNotes: "Additional Notes",
    notesPlaceholder: "Additional information about shipping...",

    // Hisob ma'lumotlari
    accountInfo: "Account Information",
    accountType: "Account Type",
    emailChangeNote: "Contact admin to change email",

    // Xabarlar
    authRequired: "Authorization required",
    loadUserError: "Error loading user data",
    serverError: "Server connection error",
    imageUploaded: "Image uploaded. Click save button.",
    updateSuccess: "Data updated!",
    updateError: "Update error: ",
    saveError: "Save error occurred",
    saveAllSuccess: "All data saved successfully!",
    saveAllError: "Save error: ",
    unknownError: "Unknown error",
    select: "Select"
  }
};

// Transport type options with icons (komponent ichida keyin aniqlanadi)
const transportOptions = (t) => [
  { type: t.tent, icon: <FaTruck className="text-blue-600" /> },
  { type: t.refrigerator, icon: <FaSnowflake className="text-blue-600" /> },
  { type: t.platform, icon: <FaTruckPickup className="text-blue-600" /> },
  { type: t.container, icon: <FaBox className="text-blue-600" /> },
  { type: t.cistern, icon: <BsFillFuelPumpFill className="text-blue-600" /> },
];

// Regions data (same as in ProfileSetup) - tarjima qilinmagan
const regions = {
  "Andijon viloyati": ["Andijon tumani", "Asaka tumani", "Baliqchi tumani", "Boʻz tumani", "Buloqboshi tumani", "Izboskan tumani", "Jalaquduq tumani", "Xoʻjaobod tumani", "Qoʻrgʻontepa tumani", "Marhamat tumani", "Paxtaobod tumani", "Ulugʻnor tumani", "Shahrixon tumani", "Oltinkoʻl tumani"],
  "Buxoro viloyati": ["Olot tumani", "Buxoro tumani", "Vobkent tumani", "Gʻijduvon tumani", "Jondor tumani", "Kogon tumani", "Qorakoʻl tumani", "Qorovulbozor tumani", "Peshku tumani", "Romitan tumani", "Shofirkon tumani"],
  "Jizzax viloyati": ["Arnasoy tumani", "Baxmal tumani", "Gʻallaorol tumani", "Doʻstlik tumani", "Zomin tumani", "Zarbdor tumani", "Zafarobod tumani", "Mirzachoʻl tumani", "Paxtakor tumani", "Forish tumani", "Sharof Rashidov tumani", "Yangiobod tumani"],
  "Qashqadaryo viloyati": ["Gʻuzor tumani", "Dehqonobod tumani", "Qamashi tumani", "Qarshi tumani", "Koson tumani", "Kasbi tumani", "Kitob tumani", "Mirishkor tumani", "Muborak tumani", "Nishon tumani", "Chiroqchi tumani", "Shahrisabz tumani", "Yakkabogʻ tumani"],
  "Navoiy viloyati": ["Konimex tumani", "Karmana tumani", "Qiziltepa tumani", "Navbahor tumani", "Nurota tumani", "Tomdi tumani", "Uchquduq tumani", "Xatirchi tumani"],
  "Namangan viloyati": ["Kosonsoy tumani", "Mingbuloq tumani", "Namangan tumani", "Norin tumani", "Pop tumani", "Toʻraqoʻrgʻon tumani", "Uychi tumani", "Uchqoʻrgʻon tumani", "Chortoq tumani", "Chust tumani", "Yangiqoʻrgʻon tumani"],
  "Samarqand viloyati": ["Oqdaryo tumani", "Bulungʻur tumani", "Jomboy tumani", "Ishtixon tumani", "Kattaqoʻrgʻon tumani", "Qoʻshrabot tumani", "Narpay tumani", "Nurobod tumani", "Payariq tumani", "Pastdargʻom tumani", "Paxtachi tumani", "Samarqand tumani", "Toyloq tumani", "Urgut tumani"],
  "Surxondaryo viloyati": ["Oltinsoy tumani", "Angor tumani", "Boysun tumani", "Bandixon tumani", "Denov tumani", "Jarqoʻrgʻon tumani", "Qiziriq tumani", "Qumqoʻrgʻon tumani", "Muzrabot tumani", "Sariosiyo tumani", "Termiz tumani", "Uzun tumani", "Sherobod tumani", "Shoʻrchi tumani"],
  "Sirdaryo viloyati": ["Oqoltin tumani", "Boyovut tumani", "Guliston tumani", "Mirzaobod tumani", "Xovos tumani", "Sardoba tumani", "Sayxunobod tumani", "Sirdaryo tumani"],
  "Toshkent viloyati": ["Oqqoʻrgʻon tumani", "Ohangaron tumani", "Bekobod tumani", "Boʻstonliq tumani", "Boʻka tumani", "Zangiota tumani", "Qibray tumani", "Quyi Chirchiq tumani", "Parkent tumani", "Piskent tumani", "Toshkent tumani", "Oʻrta Chirchiq tumani", "Chinoz tumani", "Yuqori Chirchiq tumani", "Yangiyoʻl tumani"],
  "Fargʻona viloyati": ["Oltiariq tumani", "Bagʻdod tumani", "Beshariq tumani", "Buvayda tumani", "Dangʻara tumani", "Quva tumani", "Qoʻshtepa tumani", "Rishton tumani", "Soʻx tumani", "Toshloq tumani", "Uchkoʻprik tumani", "Fargʻona tumani", "Furqat tumani", "Yozyovon tumani"],
  "Xorazm viloyati": ["Bogʻot tumani", "Gurlan tumani", "Xonqa tumani", "Hazorasp tumani", "Xiva tumani", "Qoʻshkoʻpir tumani", "Urganch tumani", "Shovot tumani", "Yangiariq tumani", "Yangibozor tumani"],
  "Qoraqalpogʻiston Respublikasi": ["Amudaryo tumani", "Beruniy tumani", "Qoraoʻzak tumani", "Kegeyli tumani", "Qoʻngʻirot tumani", "Qanlikoʻl tumani", "Moʻynoq tumani", "Nukus tumani", "Taxiatosh tumani", "Taxtakoʻpir tumani", "Toʻrtkoʻl tumani", "Xoʻjayli tumani", "Chimboy tumani", "Shumanay tumani", "Ellikqalʼa tumani"],
  "Toshkent shahri": ["Olmazor tumani", "Bektemir tumani", "Mirobod tumani", "Mirzo Ulugʻbek tumani", "Sergeli tumani", "Uchtepa tumani", "Yashnobod tumani", "Chilonzor tumani", "Shayxontohur tumani", "Yunusobod tumani", "Yakkasaroy tumani"]
};

// Notification Component
const Notification = ({ type, message, onClose, t }) => {
  const bgColor = type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700';

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 border-l-4 ${bgColor} p-4 rounded-lg shadow-lg max-w-sm`}>
      <div className="flex items-center">
        {type === 'success' ? (
          <FaCheckCircle className="text-green-500 mr-3" />
        ) : (
          <FaExclamationCircle className="text-red-500 mr-3" />
        )}
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button onClick={onClose} className="ml-4 text-gray-500 hover:text-gray-700">
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

// Custom Dropdown Component
const CustomDropdown = ({ options, value, onChange, placeholder = "Tanlang", label, t }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-1">
      {label && <label className="text-xs font-bold text-slate-500 ml-1">{label}</label>}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-3 bg-slate-50 rounded-xl border border-gray-300 flex justify-between items-center hover:border-blue-500 transition-colors"
        >
          <span className={value ? "text-gray-900" : "text-gray-500"}>
            {value || placeholder}
          </span>
          <span className="text-gray-400">▼</span>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-y-auto">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`p-3 cursor-pointer hover:bg-blue-50 transition-colors ${value === option ? "bg-blue-100 text-blue-700" : "text-gray-900"
                  }`}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Editable Field Component - FIXED VERSION
const EditableField = ({
  label,
  value,
  field,
  editingField,
  tempValue,
  onTempChange,
  onStartEdit,
  onSave,
  onCancel,
  type = "text",
  placeholder = "",
  icon: Icon = null,
  textarea = false,
  t
}) => {
  const handleChange = (e) => {
    onTempChange(field, e.target.value);
  };

  return (
    <div className="space-y-1">
      <label className="text-xs font-bold text-slate-500 ml-1 flex items-center gap-1">
        {Icon && <Icon className="text-slate-400 text-sm" />}
        {label}
      </label>

      {editingField === field ? (
        <div className="flex gap-2">
          {textarea ? (
            <textarea
              value={tempValue || ''}
              onChange={handleChange}
              className="w-full p-3 bg-slate-50 rounded-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-h-20 resize-y"
              placeholder={placeholder}
              autoFocus
            />
          ) : (
            <input
              type={type}
              value={tempValue || ''}
              onChange={handleChange}
              className="w-full p-3 bg-slate-50 rounded-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder={placeholder}
              autoFocus
            />
          )}
          <div className="flex gap-1">
            <button
              onClick={() => onSave(field)}
              className="p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
            >
              <FaSave className="text-sm" />
            </button>
            <button
              onClick={onCancel}
              className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
            >
              <FaTimes className="text-sm" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl group hover:bg-slate-100 transition-colors">
          <span className="text-sm truncate">
            {value || <span className="text-slate-400 italic">{placeholder}</span>}
          </span>
          <button
            onClick={() => onStartEdit(field, value)}
            className="p-2 text-slate-400 hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100"
          >
            <FaEdit className="text-sm" />
          </button>
        </div>
      )}
    </div>
  );
};

// Transport Type Selector
const TransportTypeSelector = ({ value, onChange, t }) => {
  const options = transportOptions(t);

  const handleSelect = (type) => {
    onChange(type);
  };

  return (
    <div className="space-y-1">
      <label className="text-xs font-bold text-slate-500 ml-1">{t.transportType}</label>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {options.map((item) => (
          <button
            key={item.type}
            type="button"
            onClick={() => handleSelect(item.type)}
            className={`flex flex-col items-center justify-center p-3 border-2 rounded-xl transition-all cursor-pointer ${value === item.type
              ? 'border-blue-700 bg-blue-700/10 shadow-md'
              : 'border-gray-300 hover:border-blue-500 hover:shadow-sm'
              }`}
          >
            <div className="text-xl mb-1">{item.icon}</div>
            <span className="text-xs text-center">{item.type}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Info Card Component
const InfoCard = ({ title, icon: Icon, children, color = "blue" }) => {
  const colors = {
    blue: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200",
    purple: "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200",
    green: "bg-gradient-to-br from-green-50 to-green-100 border-green-200",
    amber: "bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200",
    indigo: "bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200"
  };

  return (
    <div className={`${colors[color]} rounded-2xl p-5 border shadow-sm`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color === 'blue' ? 'bg-blue-100' :
          color === 'purple' ? 'bg-purple-100' :
            color === 'green' ? 'bg-green-100' :
              color === 'amber' ? 'bg-amber-100' : 'bg-indigo-100'
          }`}>
          <Icon className={`text-lg ${color === 'blue' ? 'text-blue-600' :
            color === 'purple' ? 'text-purple-600' :
              color === 'green' ? 'text-green-600' :
                color === 'amber' ? 'text-amber-600' : 'text-indigo-600'
            }`} />
        </div>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

const Settings = ({ currentLang = 'uz' }) => {
  const t = translations[currentLang];

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    state: '',
    district: '',
    role: '',
    companyName: '',
    driverLicense: '',
    transportType: '',
    transportCapacity: '',
    phone: '+998 99 396 73 36',
    facebook: '',
    whatsapp: '',
    photo: null,
    carNumber: '',
    averageShipmentVolume: '',
    notes: ''
  });

  const [editingField, setEditingField] = useState(null);
  const [tempValues, setTempValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [notification, setNotification] = useState({ type: '', message: '' });
  const [user, setUser] = useState(null);

  // Fetch user data from API using GET
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          setNotification({ type: 'error', message: t.authRequired });
          return;
        }

        const response = await fetch('https://tokennoty.pythonanywhere.com/api/users/', {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);

          // Parse address
          let state = '';
          let district = '';
          let address = '';

          if (data.address) {
            const addressParts = data.address.split(', ');
            if (addressParts.length >= 2) {
              state = addressParts[0];
              district = addressParts[1];
              address = addressParts.slice(2).join(', ');
            } else {
              state = data.address;
            }
          }

          setUserData({
            firstName: data.first_name || '',
            lastName: data.last_name || '',
            email: data.email || '',
            address: address || '',
            state: state || '',
            district: district || '',
            role: data.role || localStorage.getItem('job') || '',
            companyName: data.company_name || '',
            driverLicense: data.driver_license || '',
            transportType: data.transport_type || '',
            transportCapacity: data.transport_capacity || '',
            phone: data.phone || '+998 99 396 73 36',
            facebook: data.facebook || '',
            whatsapp: data.whatsapp || '',
            photo: data.photo || null,
            carNumber: data.car_number || '',
            averageShipmentVolume: data.average_shipment_volume || '',
            notes: data.notes || ''
          });
        } else {
          setNotification({ type: 'error', message: t.loadUserError });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setNotification({ type: 'error', message: t.serverError });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [t]);

  // Update districts when state changes
  useEffect(() => {
    if (userData.state && regions[userData.state]) {
      setDistricts(regions[userData.state]);
    } else {
      setDistricts([]);
    }
  }, [userData.state]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setUserData(prev => ({ ...prev, photo: imageUrl }));
      setImageFile(file);
      setNotification({ type: 'success', message: t.imageUploaded });
    }
  };

  const startEditing = (field, value) => {
    setEditingField(field);
    setTempValues(prev => ({ ...prev, [field]: value || '' }));
  };

  const handleTempChange = (field, value) => {
    setTempValues(prev => ({ ...prev, [field]: value }));
  };

  const cancelEdit = () => {
    setEditingField(null);
    setTempValues({});
  };

  const saveField = async (field) => {
    try {
      setIsSaving(true);
      const token = localStorage.getItem('token');

      const valueToSave = tempValues[field] || '';

      const patchData = {};
      const fieldMapping = {
        'firstName': 'first_name',
        'lastName': 'last_name',
        'companyName': 'company_name',
        'driverLicense': 'driver_license',
        'transportType': 'transport_type',
        'transportCapacity': 'transport_capacity',
        'phone': 'phone',
        'facebook': 'facebook',
        'whatsapp': 'whatsapp',
        'carNumber': 'car_number',
        'averageShipmentVolume': 'average_shipment_volume',
        'notes': 'notes'
      };

      const apiField = fieldMapping[field] || field;

      if (field === 'state' || field === 'district' || field === 'address') {
        const newState = field === 'state' ? valueToSave : userData.state;
        const newDistrict = field === 'district' ? valueToSave : userData.district;
        const newAddress = field === 'address' ? valueToSave : userData.address;
        patchData['address'] = `${newState}${newDistrict ? `, ${newDistrict}` : ''}${newAddress ? `, ${newAddress}` : ''}`;

        const updatedData = { ...userData };
        if (field === 'state') updatedData.state = valueToSave;
        if (field === 'district') updatedData.district = valueToSave;
        if (field === 'address') updatedData.address = valueToSave;

        patchData['role'] = updatedData.role;

        const response = await fetch('https://tokennoty.pythonanywhere.com/api/users/', {
          method: 'PATCH',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(patchData)
        });

        if (response.ok) {
          setUserData(updatedData);
          setEditingField(null);
          setTempValues({});
          setNotification({ type: 'success', message: t.updateSuccess });

          localStorage.setItem('profileData', JSON.stringify(updatedData));
        } else {
          const errorData = await response.json();
          setNotification({
            type: 'error',
            message: t.updateError + (errorData.message || errorData.detail || t.unknownError)
          });
        }
      } else {
        patchData[apiField] = valueToSave;
        patchData['role'] = userData.role;

        const response = await fetch('https://tokennoty.pythonanywhere.com/api/users/', {
          method: 'PATCH',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(patchData)
        });

        if (response.ok) {
          setUserData(prev => ({ ...prev, [field]: valueToSave }));
          setEditingField(null);
          setTempValues({});
          setNotification({ type: 'success', message: t.updateSuccess });

          localStorage.setItem('profileData', JSON.stringify({ ...userData, [field]: valueToSave }));
        } else {
          const errorData = await response.json();
          setNotification({
            type: 'error',
            message: t.updateError + (errorData.message || errorData.detail || t.unknownError)
          });
        }
      }
    } catch (error) {
      console.error('Save error:', error);
      setNotification({ type: 'error', message: t.saveError });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAll = async () => {
    try {
      setIsSaving(true);
      const token = localStorage.getItem('token');

      const formData = new FormData();

      formData.append('first_name', userData.firstName);
      formData.append('last_name', userData.lastName);
      formData.append('address', `${userData.state}${userData.district ? `, ${userData.district}` : ''}${userData.address ? `, ${userData.address}` : ''}`);
      formData.append('role', userData.role);

      if (userData.companyName) formData.append('company_name', userData.companyName);
      if (userData.driverLicense) formData.append('driver_license', userData.driverLicense);
      if (userData.transportType) formData.append('transport_type', userData.transportType);
      if (userData.transportCapacity) formData.append('transport_capacity', userData.transportCapacity);
      if (userData.phone) formData.append('phone', userData.phone);
      if (userData.facebook) formData.append('facebook', userData.facebook);
      if (userData.whatsapp) formData.append('whatsapp', userData.whatsapp);
      if (userData.carNumber) formData.append('car_number', userData.carNumber);
      if (userData.averageShipmentVolume) formData.append('average_shipment_volume', userData.averageShipmentVolume);
      if (userData.notes) formData.append('notes', userData.notes);

      if (imageFile) {
        formData.append('photo', imageFile);
      }

      const response = await fetch('https://tokennoty.pythonanywhere.com/api/users/', {
        method: 'PATCH',
        headers: {
          'Authorization': `Token ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        setNotification({ type: 'success', message: t.saveAllSuccess });

        localStorage.setItem('profileData', JSON.stringify(userData));

        if (result.photo) {
          setUserData(prev => ({ ...prev, photo: result.photo }));
        }
      } else {
        const errorData = await response.json();
        setNotification({
          type: 'error',
          message: t.saveAllError + (errorData.message || errorData.detail || t.unknownError)
        });
      }
    } catch (error) {
      console.error('Save all error:', error);
      setNotification({ type: 'error', message: t.saveAllError });
    } finally {
      setIsSaving(false);
    }
  };

  const handleStateChange = (state) => {
    setUserData(prev => ({ ...prev, state, district: '' }));
  };

  const handleTransportTypeChange = (type) => {
    setUserData(prev => ({ ...prev, transportType: type }));
  };

  const handleDistrictChange = (district) => {
    setUserData(prev => ({ ...prev, district }));
  };

  if (loading) {
    return (
      <div className="bg-white rounded-4xl p-8 border border-slate-100">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-4xl p-6 md:p-8 border border-slate-100 shadow-sm">
      <Notification
        type={notification.type}
        message={notification.message}
        onClose={() => setNotification({ type: '', message: '' })}
        t={t}
      />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Profile Picture & Basic Info */}
        <div className="lg:w-1/3 space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-40 h-40 bg-linear-to-br from-blue-50 to-indigo-100 rounded-full border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                {userData.photo ? (
                  <img
                    src={userData.photo}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUser className="text-slate-400 text-5xl" />
                )}
              </div>
              <label className="absolute bottom-2 right-2 bg-blue-600 text-white p-3 rounded-full cursor-pointer hover:bg-blue-700 transition-colors shadow-lg">
                <FaCamera />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </label>
            </div>
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-800">{userData.firstName} {userData.lastName}</h1>
              <p className="text-sm text-gray-600 mt-1">{userData.email}</p>
              <div className="mt-2">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${userData.role === 'driver'
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'bg-purple-100 text-purple-800 border border-purple-200'
                  }`}>
                  {userData.role === 'driver' ? t.driver : t.shipper}
                </span>
              </div>
            </div>
          </div>

          {/* Personal Info Card */}
          <InfoCard title={t.personalInfo} icon={FaUser} color="blue">
            <EditableField
              label={t.firstName}
              value={userData.firstName}
              field="firstName"
              editingField={editingField}
              tempValue={tempValues.firstName}
              onTempChange={handleTempChange}
              onStartEdit={startEditing}
              onSave={saveField}
              onCancel={cancelEdit}
              placeholder={t.firstNamePlaceholder}
              t={t}
            />

            <EditableField
              label={t.lastName}
              value={userData.lastName}
              field="lastName"
              editingField={editingField}
              tempValue={tempValues.lastName}
              onTempChange={handleTempChange}
              onStartEdit={startEditing}
              onSave={saveField}
              onCancel={cancelEdit}
              placeholder={t.lastNamePlaceholder}
              t={t}
            />

            <EditableField
              label={t.phone}
              value={userData.phone}
              field="phone"
              editingField={editingField}
              tempValue={tempValues.phone}
              onTempChange={handleTempChange}
              onStartEdit={startEditing}
              onSave={saveField}
              onCancel={cancelEdit}
              type="tel"
              placeholder={t.phonePlaceholder}
              icon={FaPhone}
              t={t}
            />
          </InfoCard>

          {/* Social Media Card */}
          <InfoCard title={t.socialMedia} icon={FaFacebook} color="green">
            <EditableField
              label="Facebook"
              value={userData.facebook}
              field="facebook"
              editingField={editingField}
              tempValue={tempValues.facebook}
              onTempChange={handleTempChange}
              onStartEdit={startEditing}
              onSave={saveField}
              onCancel={cancelEdit}
              placeholder={t.facebookPlaceholder}
              icon={FaFacebook}
              t={t}
            />

            <EditableField
              label="WhatsApp"
              value={userData.whatsapp}
              field="whatsapp"
              editingField={editingField}
              tempValue={tempValues.whatsapp}
              onTempChange={handleTempChange}
              onStartEdit={startEditing}
              onSave={saveField}
              onCancel={cancelEdit}
              type="tel"
              placeholder={t.whatsappPlaceholder}
              icon={FaWhatsapp}
              t={t}
            />
          </InfoCard>
        </div>

        {/* Right Column - Detailed Info */}
        <div className="lg:w-2/3 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">{t.settings}</h2>
            <button
              onClick={handleSaveAll}
              disabled={isSaving}
              className="bg-[#4361ee] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#3a56d4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shadow-md"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {t.saving}
                </>
              ) : (
                t.saveAllChanges
              )}
            </button>
          </div>

          {/* Location Info Card */}
          <InfoCard title={t.locationInfo} icon={FaMapMarkerAlt} color="purple">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 ml-1">{t.state}</label>
                <CustomDropdown
                  options={Object.keys(regions)}
                  value={userData.state}
                  onChange={handleStateChange}
                  placeholder={t.selectState}
                  t={t}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 ml-1">{t.district}</label>
                <CustomDropdown
                  options={districts}
                  value={userData.district}
                  onChange={handleDistrictChange}
                  placeholder={userData.state ? t.selectDistrict : t.selectStateFirst}
                  t={t}
                />
              </div>

              <div className="md:col-span-2">
                <EditableField
                  label={t.exactAddress}
                  value={userData.address}
                  field="address"
                  editingField={editingField}
                  tempValue={tempValues.address}
                  onTempChange={handleTempChange}
                  onStartEdit={startEditing}
                  onSave={saveField}
                  onCancel={cancelEdit}
                  placeholder={t.addressPlaceholder}
                  textarea={true}
                  t={t}
                />
              </div>
            </div>
          </InfoCard>

          {/* Role-specific Info */}
          {userData.role === 'driver' ? (
            <InfoCard title={t.transportInfo} icon={FaTruck} color="indigo">
              <div className="space-y-4">
                <EditableField
                  label={t.riverLicense}
                  value={userData.driverLicense}
                  field="driverLicense"
                  editingField={editingField}
                  tempValue={tempValues.driverLicense}
                  onTempChange={handleTempChange}
                  onStartEdit={startEditing}
                  onSave={saveField}
                  onCancel={cancelEdit}
                  placeholder={t.driverLicensePlaceholder}
                  icon={FaIdCard}
                  t={t}
                />

                <TransportTypeSelector
                  value={userData.transportType}
                  onChange={handleTransportTypeChange}
                  t={t}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <EditableField
                    label={t.capacity}
                    value={userData.transportCapacity}
                    field="transportCapacity"
                    editingField={editingField}
                    tempValue={tempValues.transportCapacity}
                    onTempChange={handleTempChange}
                    onStartEdit={startEditing}
                    onSave={saveField}
                    onCancel={cancelEdit}
                    type="number"
                    placeholder={t.capacityPlaceholder}
                    icon={FaWeight}
                    t={t}
                  />

                  <EditableField
                    label={t.carNumber}
                    value={userData.carNumber}
                    field="carNumber"
                    editingField={editingField}
                    tempValue={tempValues.carNumber}
                    onTempChange={handleTempChange}
                    onStartEdit={startEditing}
                    onSave={saveField}
                    onCancel={cancelEdit}
                    placeholder={t.carNumberPlaceholder}
                    icon={FaCar}
                    t={t}
                  />
                </div>
              </div>
            </InfoCard>
          ) : (
            <InfoCard title={t.shipperInfo} icon={FaBuilding} color="amber">
              <div className="space-y-4">
                <EditableField
                  label={t.companyName}
                  value={userData.companyName}
                  field="companyName"
                  editingField={editingField}
                  tempValue={tempValues.companyName}
                  onTempChange={handleTempChange}
                  onStartEdit={startEditing}
                  onSave={saveField}
                  onCancel={cancelEdit}
                  placeholder={t.companyNamePlaceholder}
                  t={t}
                />

                <EditableField
                  label={t.avgShipmentVolume}
                  value={userData.averageShipmentVolume}
                  field="averageShipmentVolume"
                  editingField={editingField}
                  tempValue={tempValues.averageShipmentVolume}
                  onTempChange={handleTempChange}
                  onStartEdit={startEditing}
                  onSave={saveField}
                  onCancel={cancelEdit}
                  type="number"
                  placeholder={t.avgShipmentVolumePlaceholder}
                  icon={FaWeight}
                  t={t}
                />

                <EditableField
                  label={t.additionalNotes}
                  value={userData.notes}
                  field="notes"
                  editingField={editingField}
                  tempValue={tempValues.notes}
                  onTempChange={handleTempChange}
                  onStartEdit={startEditing}
                  onSave={saveField}
                  onCancel={cancelEdit}
                  placeholder={t.notesPlaceholder}
                  textarea={true}
                  t={t}
                />
              </div>
            </InfoCard>
          )}

          {/* Account Info Card */}
          <InfoCard title={t.accountInfo} icon={FaUserTie} color="green">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 ml-1 flex items-center gap-1">
                  <FaEnvelope className="text-slate-400 text-sm" />
                  Email
                </label>
                <div className="p-3 bg-slate-50 rounded-xl border border-gray-200">
                  <span className="text-sm">{userData.email}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{t.emailChangeNote}</p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 ml-1">{t.accountType}</label>
                <div className="p-3 bg-slate-50 rounded-xl border border-gray-200 flex items-center justify-between">
                  <span className="text-sm">
                    {userData.role === 'driver' ? t.driver : t.shipper}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${userData.role === 'driver'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-purple-100 text-purple-800'
                    }`}>
                    {userData.role === 'driver' ? '🚚' : '📦'}
                  </span>
                </div>
              </div>
            </div>
          </InfoCard>
        </div>
      </div>
    </div>
  );
};

export default Settings;
