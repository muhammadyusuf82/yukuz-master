import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  FaMapMarkerAlt, 
  FaFlagCheckered, 
  FaWeightHanging, 
  FaRulerCombined,
  FaClock,
  FaMoneyBillWave,
  FaTruck,
  FaBox,
  FaCalendarAlt,
  FaUser,
  FaPhone,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaArrowLeft,
  FaChevronRight,
  FaCheck,
  FaExclamation,
  FaTemperatureHigh,
  FaArrowUp,
  FaArrowDown,
  FaPlus,
  FaMinus,
  FaSyncAlt,
  FaRoute,
  FaGlobe,
  FaCompress,
  FaExpand,
  FaRoad,
  FaCar,
  FaRoute as FaRouteIcon,
  FaLocationArrow,
  FaTimes,
  FaDollarSign,
  FaPen,
  FaPaperPlane,
  FaStar,
  FaMapPin,
  FaUserCheck,
  FaComments,
  FaShieldAlt,
  FaHistory
} from "react-icons/fa";
import maplibregl from 'maplibre-gl';
import { FaMessage } from "react-icons/fa6";
import 'maplibre-gl/dist/maplibre-gl.css';

const BASE_HTTP_URL = 'http://127.0.0.1/:8000/api/'


// Freight Owner Card Component
const FreightOwnerCard = ({ ownerData, onChatClick, onOfferClick, showActions = true }) => {
  if (!ownerData) return null;

  const getInitials = () => {
    const firstName = ownerData.owner_first_name || '';
    const lastName = ownerData.owner_last_name || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const renderRatingStars = (rating = 4.8) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400 text-sm" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400 text-sm opacity-50" />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-300 text-sm" />);
      }
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
              <FaUser className="text-white text-lg sm:text-xl" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Yuk Egasi</h2>
              <p className="text-blue-100 text-xs sm:text-sm">Tasdiqlangan profil</p>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 sm:py-1.5">
            <span className="text-white text-xs sm:text-sm font-medium">ID: {ownerData.id || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6">
        {/* Owner Profile */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <span className="text-white text-xl sm:text-2xl font-bold">
                {getInitials()}
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-white">
              <FaCheckCircle className="text-white text-xs" />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
              {ownerData.owner_first_name} {ownerData.owner_last_name}
            </h3>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
              <div className="flex items-center bg-blue-50 text-blue-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                {renderRatingStars()}
                <span className="ml-1 sm:ml-2 font-semibold">4.8</span>
              </div>
              <span className="bg-green-50 text-green-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                ✅ 24+ ta yuk
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <FaPhone className="text-blue-500 mr-2 text-sm" />
                <span className="font-medium text-sm sm:text-base">{ownerData.owner_phone || ownerData.owner_username}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaUser className="text-purple-500 mr-2 text-sm" />
                <span className="font-medium text-sm sm:text-base">@{ownerData.owner_username}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-6">
          <div className="bg-blue-50 p-2 sm:p-3 rounded-xl text-center">
            <div className="text-blue-600 font-bold text-base sm:text-lg">98%</div>
            <div className="text-xs text-gray-600">Muvaffaqiyat</div>
          </div>
          <div className="bg-green-50 p-2 sm:p-3 rounded-xl text-center">
            <div className="text-green-600 font-bold text-base sm:text-lg">24+</div>
            <div className="text-xs text-gray-600">Yuklar</div>
          </div>
          <div className="bg-purple-50 p-2 sm:p-3 rounded-xl text-center">
            <div className="text-purple-600 font-bold text-base sm:text-lg">2.4</div>
            <div className="text-xs text-gray-600">Yillik tajriba</div>
          </div>
          <div className="bg-orange-50 p-2 sm:p-3 rounded-xl text-center">
            <div className="text-orange-600 font-bold text-base sm:text-lg">100%</div>
            <div className="text-xs text-gray-600">To'lov</div>
          </div>
        </div>

        {/* Verification Badges */}
        <div className="mb-6">
          <h4 className="text-xs sm:text-sm font-semibold text-gray-500 mb-2 sm:mb-3">Tasdiqlangan ma'lumotlar</h4>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center bg-green-50 text-green-700 px-2 sm:px-3 py-1 sm:py-2 rounded-lg">
              <FaShieldAlt className="mr-1 sm:mr-2 text-sm" />
              <span className="text-xs sm:text-sm">Telefon tasdiqlangan</span>
            </div>
            <div className="flex items-center bg-blue-50 text-blue-700 px-2 sm:px-3 py-1 sm:py-2 rounded-lg">
              <FaCheckCircle className="mr-1 sm:mr-2 text-sm" />
              <span className="text-xs sm:text-sm">Profil tasdiqlangan</span>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="bg-gray-50 rounded-xl p-3 sm:p-4 mb-6">
          <h4 className="font-semibold text-gray-700 mb-2 sm:mb-3 text-sm sm:text-base">Tezkor ma'lumot</h4>
          <div className="space-y-1 sm:space-y-2">
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-gray-600">To'lov vaqti:</span>
              <span className="font-semibold text-gray-800">{ownerData.payment_period === 0 ? 'Darhol' : `${ownerData.payment_period} kun`}</span>
            </div>
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-gray-600">To'lov usuli:</span>
              <span className="font-semibold text-gray-800">{ownerData.payment_method === 'cash' ? 'Naqd' : 'Bank'}</span>
            </div>
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-gray-600">Faol yuklar:</span>
              <span className="font-semibold text-gray-800">3 ta</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {showActions && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
            <button
              onClick={onChatClick}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 sm:py-3.5 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center text-sm sm:text-base"
            >
              <FaMessage className="mr-2" />
              Chat qilish
            </button>
            <button
              onClick={onOfferClick}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 sm:py-3.5 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center text-sm sm:text-base"
            >
              <FaCalendarAlt className="mr-2" />
              Taklif berish
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-4 sm:px-6 py-2 sm:py-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-1 sm:mr-2" />
            <span>Faol yukchi</span>
          </div>
          <div className="text-right">
            <span className="text-green-600 font-medium">Online</span>
            <span className="ml-1 sm:ml-2">• 5 daqiqa oldin</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mobile-optimized version
const FreightOwnerCardMobile = ({ ownerData, onChatClick, onOfferClick }) => {
  if (!ownerData) return null;

  const getInitials = () => {
    const firstName = ownerData.owner_first_name || '';
    const lastName = ownerData.owner_last_name || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
      {/* Compact Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-base">{getInitials()}</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-xs">
                {ownerData.owner_first_name} {ownerData.owner_last_name}
              </h3>
              <div className="flex items-center">
                <FaStar className="text-yellow-300 text-xs mr-1" />
                <span className="text-white/90 text-xs">4.8 • 24+ yuk</span>
              </div>
            </div>
          </div>
          <div className="bg-white/20 rounded-full px-1.5 py-0.5">
            <FaCheckCircle className="text-white text-xs" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Contact Info */}
        <div className="space-y-2 mb-3">
          <div className="flex items-center text-gray-700">
            <FaPhone className="text-blue-500 text-xs mr-1.5" />
            <span className="text-xs font-medium">{ownerData.owner_phone || ownerData.owner_username}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <FaUser className="text-purple-500 text-xs mr-1.5" />
            <span className="text-xs">@{ownerData.owner_username}</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          <div className="text-center p-1.5 bg-blue-50 rounded-lg">
            <div className="text-blue-600 font-bold text-sm">98%</div>
            <div className="text-xs text-gray-600">Muvaffaqiyat</div>
          </div>
          <div className="text-center p-1.5 bg-green-50 rounded-lg">
            <div className="text-green-600 font-bold text-sm">100%</div>
            <div className="text-xs text-gray-600">To'lov</div>
          </div>
          <div className="text-center p-1.5 bg-purple-50 rounded-lg">
            <div className="text-purple-600 font-bold text-sm">2.4</div>
            <div className="text-xs text-gray-600">Yil</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-1.5">
          <button
            onClick={onChatClick}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-2 rounded-xl flex items-center justify-center text-sm"
          >
            <FaMessage className="mr-1.5" />
            Chat
          </button>
          <button
            onClick={onOfferClick}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 rounded-xl flex items-center justify-center text-sm"
          >
            <FaCalendarAlt className="mr-1.5" />
            Taklif
          </button>
        </div>
      </div>
    </div>
  );
};

// Responsive wrapper
const ResponsiveFreightOwnerCard = ({ ownerData, onChatClick, onOfferClick, showActions = true }) => {
  return (
    <>
      {/* Desktop version */}
      <div className="hidden md:block">
        <FreightOwnerCard 
          ownerData={ownerData} 
          onChatClick={onChatClick} 
          onOfferClick={onOfferClick} 
          showActions={showActions}
        />
      </div>
      
      {/* Mobile version */}
      <div className="md:hidden">
        <FreightOwnerCardMobile 
          ownerData={ownerData} 
          onChatClick={onChatClick} 
          onOfferClick={onOfferClick}
        />
      </div>
    </>
  );
};

const FreightDetail = ({ freightId, freightData, onBack }) => {
  const [freight, setFreight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Map state
  const mapContainer = useRef(null);
  const map = useRef(null);
  const routeSourceRef = useRef(null);
  const [showSatellite, setShowSatellite] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(10);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [routeLoading, setRouteLoading] = useState(false);
  const [routeDistance, setRouteDistance] = useState(null);
  const [routeDuration, setRouteDuration] = useState(null);
  const [routeInstructions, setRouteInstructions] = useState([]);

  // Modal state
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [offerPrice, setOfferPrice] = useState('');
  const [agreeToGivenPrice, setAgreeToGivenPrice] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [comments, setComments] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [userMap, setUserMap] = useState(null);
  const userMapContainer = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalRouteLoading, setModalRouteLoading] = useState(false);
  const [modalRouteDistance, setModalRouteDistance] = useState(null);
  const [activeModalTab, setActiveModalTab] = useState('offer'); // 'offer', 'map', 'owner'
  const [modalMapInitialized, setModalMapInitialized] = useState(false);

  // Translation mappings
  const paymentConditionTranslations = {
    "copied_documents": "Nusxa hujjatlar",
    "original_document": "Asl hujjatlar",
    "on_delivery": "Yetkazib berishda"
  };

  const paymentMethodTranslations = {
    "cash": "Naqd pul",
    "bank_transfer": "Bank o'tkazmasi",
    "card": "Karta"
  };

  // Helper function to get location display from the correct field names
  const getLocationDisplay = (locationData) => {
    if (!locationData) return { viloyat: "Malumot yo'q", tuman: "Malumot yo'q", kocha: "Malumot yo'q" };
    
    if (typeof locationData === 'string') {
      try {
        locationData = JSON.parse(locationData);
      } catch (e) {
        return {
          viloyat: locationData || "Malumot yo'q",
          tuman: "Malumot yo'q",
          kocha: "Malumot yo'q"
        };
      }
    }
    
    return {
      viloyat: locationData?.region || locationData?.viloyat || locationData?.province || "Malumot yo'q",
      tuman: locationData?.city || locationData?.tuman || locationData?.district || locationData?.area || "Malumot yo'q",
      kocha: locationData?.street || locationData?.kocha || locationData?.address || locationData?.name || "Malumot yo'q"
    };
  };

  // Helper function to get location display string
  const getLocationString = (locationData) => {
    const { viloyat, tuman, kocha } = getLocationDisplay(locationData);
    return `${viloyat}, ${tuman}, ${kocha}`;
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOfferModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOfferModalOpen]);

  useEffect(() => {
    const fetchFreightDetail = async () => {
      try {
        setLoading(true);
        
        if (freightData) {
          setFreight(freightData);
          setLoading(false);
          return;
        }
        
        const token = localStorage.getItem('access_token') || localStorage.getItem('token');
        
        if (!token) {
          setError('Autentifikatsiya talab qilinadi');
          setLoading(false);
          return;
        }

        const response = await fetch(`https://tokennoty.pythonanywhere.com/api/freight/${freightId}/`, {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setFreight(data);
        } else {
          setError('Yuk ma\'lumotlarini yuklashda xatolik yuz berdi');
          
          const sampleFreight = {
            body_type: "closed",
            created_at: "2026-01-07T09:24:22.733402Z",
            danger: "1",
            description_ru: null,
            description_uz: "Bu test yukidir. Maxsus qadoqlangan don mahsulotlari. Yuk 10 tonnadan iborat bo'lib, maxsus yopiq kuzovli transport vositasida tashilishi kerak.",
            freight_rate_amount: "2000000.000000000",
            freight_rate_currency: "UZS",
            freight_type: "Don mahsulotlari",
            id: freightId,
            is_shipped: false,
            loading_method: "back",
            owner_first_name: "Behruzbek",
            owner_last_name: "Komiljonov",
            owner_username: "902221204",
            owner_phone: "+998902221204",
            payment_condition: "copied_documents",
            payment_method: "card",
            payment_period: 0,
            photo: null,
            public: true,
            route_end_time_from: "2026-01-08T09:24:21Z",
            route_end_time_to: "2026-01-08T09:24:21Z",
            route_ends_where_data: {
              city: "Namangan City",
              region: "Namangan Region",
              street: "Oxunboboyev ko'chasi"
            },
            route_ends_where_lat: "41.311081",
            route_ends_where_lon: "69.240537",
            route_starts_where_data: {
              city: "Toshkent",
              region: "Toshkent Region",
              street: "Amir Temur shoh ko'chasi, 23-uy"
            },
            route_starts_where_lat: "41.299500",
            route_starts_where_lon: "69.240100",
            shipping_mode: "FTL",
            status: "waiting for driver",
            unloading_method: "back",
            updated_at: "2026-01-07T09:24:22.733626Z",
            vehicle_category: "van",
            volume: "2000.00",
            weight: 10000,
            insurance_covered: true,
            temperature_controlled: false,
            special_requirements: "Yukni yomg'irdan himoya qilish kerak. Maxsus qadoqlash talab etiladi."
          };
          setFreight(sampleFreight);
        }
        
      } catch (err) {
        setError('Server bilan aloqa xatosi');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (freightId || freightData) {
      fetchFreightDetail();
    }
  }, [freightId, freightData]);

  // Initialize modal with current date
  useEffect(() => {
    if (isOfferModalOpen && freight) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      setStartDate(today.toISOString().split('T')[0]);
      setEndDate(tomorrow.toISOString().split('T')[0]);
      
      if (freight.freight_rate_amount) {
        setOfferPrice(freight.freight_rate_amount);
      }
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude
            });
          },
          (error) => {
            console.error("Error getting user location:", error);
            setUserLocation({
              lat: 41.2995,
              lon: 69.2401
            });
          }
        );
      } else {
        setUserLocation({
          lat: 41.2995,
          lon: 69.2401
        });
      }
    }
  }, [isOfferModalOpen, freight]);

  // Function to fetch real road route from OSRM API
  const fetchRealRoute = async (startLon, startLat, endLon, endLat) => {
    try {
      setModalRouteLoading(true);
      
      const url = `https://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${endLon},${endLat}?overview=full&geometries=geojson&steps=true`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const distance = (route.distance / 1000).toFixed(1);
        setModalRouteDistance(distance);
        
        return route.geometry;
      }
    } catch (error) {
      console.error('Error fetching real road route:', error);
      return {
        type: 'LineString',
        coordinates: [[startLon, startLat], [endLon, endLat]]
      };
    } finally {
      setModalRouteLoading(false);
    }
  };

  // Initialize modal map with real road route
  const initializeModalMap = useCallback(async () => {
    if (!userMapContainer.current || !freight || !userLocation) return;

    const startLat = parseFloat(freight.route_starts_where_lat) || 41.2995;
    const startLon = parseFloat(freight.route_starts_where_lon) || 69.2401;
    const userLat = userLocation.lat;
    const userLon = userLocation.lon;

    const mapInstance = new maplibregl.Map({
      container: userMapContainer.current,
      style: {
        version: 8,
        sources: {
          'osm': {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors',
            maxzoom: 19
          }
        },
        layers: [{
          id: 'osm-layer',
          type: 'raster',
          source: 'osm'
        }]
      },
      center: [(startLon + userLon) / 2, (startLat + userLat) / 2],
      zoom: 10,
      minZoom: 5,
      maxZoom: 18
    });

    mapInstance.addControl(new maplibregl.NavigationControl(), 'top-right');

    mapInstance.on('load', async () => {
      // Add freight location marker
      const freightMarkerEl = document.createElement('div');
      freightMarkerEl.className = 'freight-marker';
      freightMarkerEl.innerHTML = `
        <div style="
          width: 24px;
          height: 24px;
          background: #3B82F6;
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          animation: pulse-blue 2s infinite;
        ">
          <div style="
            width: 8px;
            height: 8px;
            background: white;
            border-radius: 50%;
          "></div>
        </div>
        <style>
          @keyframes pulse-blue {
            0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
            70% { box-shadow: 0 0 0 8px rgba(59, 130, 246, 0); }
            100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
          }
        </style>
      `;

      new maplibregl.Marker({
        element: freightMarkerEl
      })
        .setLngLat([startLon, startLat])
        .setPopup(
          new maplibregl.Popup({ offset: 25 })
            .setHTML(`
              <div style="padding: 8px; min-width: 160px;">
                <h3 style="margin: 0; color: #3B82F6; font-size: 12px; font-weight: bold;">🚚 Yuk joylashuvi</h3>
                <p style="margin: 3px 0 0 0; font-size: 11px; color: #555;">
                  Yuk yuklash manzili
                </p>
              </div>
            `)
        )
        .addTo(mapInstance);

      // Add user location marker
      const userMarkerEl = document.createElement('div');
      userMarkerEl.className = 'user-marker';
      userMarkerEl.innerHTML = `
        <div style="
          width: 24px;
          height: 24px;
          background: #10B981;
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          animation: pulse-green 2s infinite;
        ">
          <div style="
            width: 8px;
            height: 8px;
            background: white;
            border-radius: 50%;
          "></div>
        </div>
        <style>
          @keyframes pulse-green {
            0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
            70% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
            100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
          }
        </style>
      `;

      new maplibregl.Marker({
        element: userMarkerEl
      })
        .setLngLat([userLon, userLat])
        .setPopup(
          new maplibregl.Popup({ offset: 25 })
            .setHTML(`
              <div style="padding: 8px; min-width: 160px;">
                <h3 style="margin: 0; color: #10B981; font-size: 12px; font-weight: bold;">📍 Sizning joylashuvingiz</h3>
                <p style="margin: 3px 0 0 0; font-size: 11px; color: #555;">
                  Sizning joriy manzilingiz
                </p>
              </div>
            `)
        )
        .addTo(mapInstance);

      // Fetch and draw real road route
      try {
        const routeGeometry = await fetchRealRoute(userLon, userLat, startLon, startLat);
        
        // Add route source
        mapInstance.addSource('user-route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: routeGeometry
          }
        });

        // Add route outline
        mapInstance.addLayer({
          id: 'user-route-outline',
          type: 'line',
          source: 'user-route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#FFFFFF',
            'line-width': 4,
            'line-opacity': 0.5
          }
        });

        // Add main route line
        mapInstance.addLayer({
          id: 'user-route',
          type: 'line',
          source: 'user-route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#8B5CF6',
            'line-width': 3,
            'line-opacity': 0.9
          }
        });

        // Fit bounds to show entire route
        const coordinates = routeGeometry.coordinates || [[userLon, userLat], [startLon, startLat]];
        const bounds = new maplibregl.LngLatBounds();
        coordinates.forEach(coord => {
          bounds.extend(coord);
        });
        
        mapInstance.fitBounds(bounds, {
          padding: 50,
          duration: 1000
        });

      } catch (error) {
        console.error('Error drawing route in modal:', error);
      }
    });

    setUserMap(mapInstance);
    setModalMapInitialized(true);

    return () => {
      if (mapInstance) {
        mapInstance.remove();
        setUserMap(null);
      }
    };
  }, [freight, userLocation]);

  // Initialize modal map when map tab is active
  useEffect(() => {
    if (isOfferModalOpen && activeModalTab === 'map' && !modalMapInitialized && freight && userLocation) {
      initializeModalMap();
    }
  }, [isOfferModalOpen, activeModalTab, modalMapInitialized, freight, userLocation, initializeModalMap]);

  // Fetch route for main map
  const fetchRoute = useCallback(async (startLon, startLat, endLon, endLat) => {
    try {
      setRouteLoading(true);
      
      const url = `https://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${endLon},${endLat}?overview=full&geometries=geojson&steps=true`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const distance = (route.distance / 1000).toFixed(1);
        const duration = (route.duration / 3600).toFixed(1);
        
        setRouteDistance(distance);
        setRouteDuration(duration);
        
        if (route.legs && route.legs[0].steps) {
          const instructions = route.legs[0].steps
            .filter(step => step.maneuver.type !== 'depart' && step.maneuver.type !== 'arrive')
            .slice(0, 5)
            .map(step => ({
              instruction: step.maneuver.instruction,
              distance: (step.distance / 1000).toFixed(1),
              type: step.maneuver.type
            }));
          setRouteInstructions(instructions);
        }
        
        return route.geometry;
      }
    } catch (error) {
      console.error('Error fetching route:', error);
      return {
        type: 'LineString',
        coordinates: [[startLon, startLat], [endLon, endLat]]
      };
    } finally {
      setRouteLoading(false);
    }
  }, []);

  // Add route to main map
  const addRouteToMap = useCallback((geometry) => {
    if (!map.current || !geometry) return;

    if (map.current.getLayer('route')) {
      map.current.removeLayer('route');
    }
    if (map.current.getLayer('route-outline')) {
      map.current.removeLayer('route-outline');
    }
    if (map.current.getSource('route')) {
      map.current.removeSource('route');
    }

    map.current.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: geometry
      }
    });

    routeSourceRef.current = map.current.getSource('route');

    map.current.addLayer({
      id: 'route-outline',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#FFFFFF',
        'line-width': 6,
        'line-opacity': 0.4
      }
    });

    map.current.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#2200ff',
        'line-width': 4,
        'line-opacity': 0.9
      }
    }, 'route-outline');
  }, []);

  // Re-add route when map style changes
  const reAddRoute = useCallback(() => {
    if (routeSourceRef.current && routeSourceRef.current._data) {
      const geometry = routeSourceRef.current._data.geometry;
      if (geometry) {
        setTimeout(() => {
          addRouteToMap(geometry);
        }, 100);
      }
    }
  }, [addRouteToMap]);

  // Initialize main map
  useEffect(() => {
    if (!freight || !mapContainer.current) return;

    const startLat = parseFloat(freight.route_starts_where_lat) || 41.2995;
    const startLon = parseFloat(freight.route_starts_where_lon) || 69.2401;
    const endLat = parseFloat(freight.route_ends_where_lat) || 41.3110;
    const endLon = parseFloat(freight.route_ends_where_lon) || 69.2405;

    const centerLat = (startLat + endLat) / 2;
    const centerLon = (startLon + endLon) / 2;

    if (map.current) {
      map.current.remove();
      map.current = null;
    }

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          'osm': {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors',
            maxzoom: 19
        }
        },
        layers: [{
          id: 'osm-layer',
          type: 'raster',
          source: 'osm'
        }]
      },
      center: [centerLon, centerLat],
      zoom: zoomLevel,
      minZoom: 5,
      maxZoom: 18
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    map.current.addControl(new maplibregl.ScaleControl({
      maxWidth: 200,
      unit: 'metric'
    }), 'bottom-left');

    const startLocation = getLocationDisplay(freight.route_starts_where_data);
    const endLocation = getLocationDisplay(freight.route_ends_where_data);

    map.current.on('load', async () => {
      // Add start marker
      const startMarkerEl = document.createElement('div');
      startMarkerEl.className = 'start-marker';
      startMarkerEl.innerHTML = `
        <div style="
          width: 24px;
          height: 24px;
          background: #3B82F6;
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          animation: pulse-blue 2s infinite;
        ">
          <div style="
            width: 8px;
            height: 8px;
            background: white;
            border-radius: 50%;
          "></div>
        </div>
        <style>
          @keyframes pulse-blue {
            0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
            70% { box-shadow: 0 0 0 8px rgba(59, 130, 246, 0); }
            100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
          }
        </style>
      `;

      const startMarker = new maplibregl.Marker({
        element: startMarkerEl
      })
        .setLngLat([startLon, startLat])
        .setPopup(
          new maplibregl.Popup({ offset: 25 })
            .setHTML(`
              <div style="padding: 10px; min-width: 200px;">
                <h3 style="margin: 0; color: #3B82F6; font-weight: bold; font-size: 14px;">🚚 Yuklash joyi</h3>
                <p style="margin: 6px 0 0 0; font-size: 13px; line-height: 1.4;">
                  <strong style="font-size: 13px;">${startLocation.viloyat}</strong><br/>
                  <span style="color: #555;">${startLocation.tuman}</span><br/>
                  <span style="color: #666; font-size: 11px;">${startLocation.kocha}</span>
                </p>
              </div>
            `)
        )
        .addTo(map.current);

      // Add end marker
      const endMarkerEl = document.createElement('div');
      endMarkerEl.className = 'end-marker';
      endMarkerEl.innerHTML = `
        <div style="
          width: 24px;
          height: 24px;
          background: #10B981;
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          animation: pulse-green 2s infinite;
        ">
          <div style="
            width: 8px;
            height: 8px;
            background: white;
            border-radius: 50%;
          "></div>
        </div>
        <style>
          @keyframes pulse-green {
            0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
            70% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
            100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
          }
        </style>
      `;

      const endMarker = new maplibregl.Marker({
        element: endMarkerEl
      })
        .setLngLat([endLon, endLat])
        .setPopup(
          new maplibregl.Popup({ offset: 25 })
            .setHTML(`
              <div style="padding: 10px; min-width: 200px;">
                <h3 style="margin: 0; color: #10B981; font-weight: bold; font-size: 14px;">🏁 Tushirish joyi</h3>
                <p style="margin: 6px 0 0 0; font-size: 13px; line-height: 1.4;">
                  <strong style="font-size: 13px;">${endLocation.viloyat}</strong><br/>
                  <span style="color: #555;">${endLocation.tuman}</span><br/>
                  <span style="color: #666; font-size: 11px;">${endLocation.kocha}</span>
                </p>
              </div>
            `)
        )
        .addTo(map.current);

      try {
        const routeGeometry = await fetchRoute(startLon, startLat, endLon, endLat);
        addRouteToMap(routeGeometry);

        if (routeGeometry.coordinates && routeGeometry.coordinates.length > 1) {
          const midIndex = Math.floor(routeGeometry.coordinates.length / 2);
          const midPoint = routeGeometry.coordinates[midIndex];
          
          const vehicleMarkerEl = document.createElement('div');
          vehicleMarkerEl.innerHTML = `
            <div style="
              width: 28px;
              height: 28px;
              background: #8B5CF6;
              border: 2px solid white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 4px 12px rgba(0,0,0,0.5);
              animation: move-vehicle 2s infinite alternate;
            ">
              <div style="color: white; font-size: 12px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1-4-1-5 1-5 1"/>
                  <path d="M3 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C3.7 10.6 1 10 1 10v8c0 .6.4 1 1 1z"/>
                  <path d="M8 17h8"/>
                  <circle cx="6.5" cy="17.5" r="2.5"/>
                  <circle cx="17.5" cy="17.5" r="2.5"/>
                </svg>
              </div>
            </div>
            <style>
              @keyframes move-vehicle {
                0% { transform: translateY(0); }
                100% { transform: translateY(-4px); }
              }
            </style>
          `;

          new maplibregl.Marker({
            element: vehicleMarkerEl
          })
            .setLngLat([midPoint[0], midPoint[1]])
            .setPopup(
              new maplibregl.Popup({ offset: 20 })
                .setHTML(`
                  <div style="padding: 8px; min-width: 180px;">
                    <h4 style="margin: 0; color: #8B5CF6; font-weight: bold; font-size: 13px;">🚛 Avtomobil marshruti</h4>
                    <p style="margin: 4px 0 0 0; font-size: 12px; color: #666;">
                      Transport vositasining taxminiy yo'nalishi
                    </p>
                  </div>
                `)
            )
            .addTo(map.current);
        }

        const coordinates = routeGeometry.coordinates || [[startLon, startLat], [endLon, endLat]];
        const bounds = new maplibregl.LngLatBounds();
        coordinates.forEach(coord => {
          bounds.extend(coord);
        });
        
        map.current.fitBounds(bounds, {
          padding: {top: 80, bottom: 80, left: 80, right: 80},
          duration: 1500
        });

      } catch (error) {
        console.error('Error drawing route:', error);
        
        const geojson = {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [[startLon, startLat], [endLon, endLat]]
          }
        };

        addRouteToMap(geojson.geometry);

        const bounds = new maplibregl.LngLatBounds();
        bounds.extend([startLon, startLat]);
        bounds.extend([endLon, endLat]);
        map.current.fitBounds(bounds, {
          padding: 60,
          duration: 1000
        });
      }
    });

    map.current.on('zoom', () => {
      setZoomLevel(map.current.getZoom());
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [freight, fetchRoute, addRouteToMap]);

  const toggleMapStyle = () => {
    if (!map.current) return;
    
    const newShowSatellite = !showSatellite;
    setShowSatellite(newShowSatellite);
    
    const newStyle = newShowSatellite
      ? {
        version: 8,
        sources: {
          'satellite': {
            type: 'raster',
            tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
            tileSize: 256,
            attribution: '© Esri',
            maxzoom: 19
          }
        },
        layers: [{
          id: 'satellite-layer',
          type: 'raster',
          source: 'satellite'
        }]
      }
      : {
        version: 8,
        sources: {
          'osm': {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors',
            maxzoom: 19
          }
        },
        layers: [{
          id: 'osm-layer',
          type: 'raster',
          source: 'osm'
        }]
      };

    map.current.setStyle(newStyle);

    map.current.once('styledata', () => {
      map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
      map.current.addControl(new maplibregl.ScaleControl({
        maxWidth: 200,
        unit: 'metric'
      }), 'bottom-left');
      
      setTimeout(() => {
        reAddRoute();
      }, 300);
    });
  };

  const toggleMapFullscreen = () => {
    setIsMapFullscreen(!isMapFullscreen);
    
    if (!map.current) return;
    
    setTimeout(() => {
      map.current.resize();
    }, 100);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Noma\'lum';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  const formatCurrency = (amount, currency) => {
    const formatter = new Intl.NumberFormat('uz-UZ', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    return `${formatter.format(amount)} ${currency}`;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'waiting for driver':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'waiting for driver':
        return 'Haydovchi kutilmoqda';
      case 'in progress':
        return 'Jarayonda';
      case 'delivered':
        return 'Yetkazilgan';
      case 'cancelled':
        return 'Bekor qilingan';
      default:
        return status;
    }
  };

  const getPaymentConditionText = (value) => {
    return paymentConditionTranslations[value] || value;
  };

  const getPaymentMethodText = (value) => {
    return paymentMethodTranslations[value] || value;
  };

  // Function to send offer message via WebSocket
  const sendOfferMessage = async () => {
    const token = localStorage.getItem('token')
    const req = await fetch(BASE_HTTP_URL + 'users/', {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    const currentUser = await req.json();
    
    if (!currentUser || !token) {
      alert('Foydalanuvchi ma\'lumotlari topilmadi');
      return false;
    }

    const messageText = `Assalomu aleykum, sizning yukingiz bo'yicha ${currentUser.first_name} ${currentUser.last_name} quyidagi taklifni beradi:

taklif etilgan narx - ${agreeToGivenPrice ? freight.freight_rate_amount + ' ' + freight.freight_rate_currency : offerPrice + ' ' + freight.freight_rate_currency}
yetkazish muddati - ${startDate} dan ${endDate} gacha
qo'shimcha izoh - ${comments || "yo'q"}`;

    // Create WebSocket connection
    const ws = new WebSocket(`ws://127.0.0.1/:8000/ws/chat/${token}/`);
    
    ws.onopen = () => {
      const messageData = {
        'text': messageText,
        'username': freight.owner_username
      };
      ws.send(JSON.stringify(messageData));
      ws.close();
    };

    ws.onerror = (error) => {
      console.error('WebSocket xatosi:', error);
    };

    return true;
  };

  const handleSubmitOffer = async () => {
    if (!agreeToGivenPrice && (!offerPrice || isNaN(offerPrice) || parseFloat(offerPrice) <= 0)) {
      alert('Iltimos, narxni to\'g\'ri kiriting');
      return;
    }

    if (!startDate || !endDate) {
      alert('Iltimos, sanalarni to\'ldiring');
      return;
    }

    setIsSubmitting(true);

    try {
      // First send the message
      const messageSent = await sendOfferMessage();
      
      if (!messageSent) {
        throw new Error('Xabar yuborishda xatolik');
      }

      const offerData = {
        freight_id: freight.id,
        price: agreeToGivenPrice ? freight.freight_rate_amount : offerPrice,
        start_date: startDate,
        end_date: endDate,
        comments: comments,
        user_location: userLocation
      };

      console.log('Submitting offer:', offerData);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert('✅ Taklifingiz muvaffaqiyatli yuborildi! Yuk egasi siz bilan bog\'lanadi.');
      
      setOfferPrice('');
      setAgreeToGivenPrice(false);
      setStartDate('');
      setEndDate('');
      setComments('');
      setIsOfferModalOpen(false);
      
    } catch (error) {
      console.error('Error submitting offer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalTabChange = (tab) => {
    setActiveModalTab(tab);
    // Reset map initialization when switching to map tab
    if (tab === 'map') {
      setModalMapInitialized(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yuk ma'lumotlari yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md">
          <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Xatolik</h3>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={onBack}
            className="mt-6 w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all transform hover:-translate-y-0.5"
          >
            Orqaga qaytish
          </button>
        </div>
      </div>
    );
  }

  if (!freight) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <FaExclamationTriangle className="text-gray-400 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Yuk topilmadi</h3>
          <p className="text-gray-600">So'ralgan yuk ma'lumotlari mavjud emas.</p>
          <button
            onClick={onBack}
            className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Orqaga qaytish
          </button>
        </div>
      </div>
    );
  }

  const startLocation = getLocationDisplay(freight.route_starts_where_data);
  const endLocation = getLocationDisplay(freight.route_ends_where_data);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 ${isMapFullscreen ? 'overflow-hidden' : ''}`}>
      {/* Header - FIXED FOR MOBILE */}
      <div className="bg-white border-b mx-2 sm:mx-4 rounded-xl border-gray-200 shadow-sm px-3 sm:px-4 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
              <button
                onClick={onBack}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
              >
                <FaArrowLeft className="text-gray-600" />
              </button>
              <div className="flex-1 min-w-0">
                <h1 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 truncate">
                  Yuk #{freight.id} - Batafsil ma'lumot
                </h1>
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
                  <span className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium border ${getStatusColor(freight.status)}`}>
                    {getStatusText(freight.status)}
                  </span>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {formatDate(freight.created_at)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
              <button 
                onClick={() => window.location.href = `/messanger?chat=${freight.owner_username}`}
                className="px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all transform hover:-translate-y-0.5 shadow hover:shadow-xl flex items-center justify-center text-sm sm:text-base"
              >
                <FaMessage className="mr-1 sm:mr-2 text-sm" />
                <span className="truncate">Chat</span>
              </button>
              <button 
                onClick={() => setIsOfferModalOpen(true)}
                className="px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:-translate-y-0.5 shadow hover:shadow-xl flex items-center justify-center text-sm sm:text-base"
              >
                <span className="truncate">Taklif berish</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-4 sm:py-6 px-2 sm:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
          
          {/* LEFT COLUMN */}
          <div className="space-y-4 sm:space-y-6">
            {/* Route Summary Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                <FaRoute className="mr-2 sm:mr-3 text-blue-600" />
                Marshrut tafsilotlari
              </h2>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl border border-blue-100">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <FaArrowUp className="text-blue-600 text-sm sm:text-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">QAYERDAN</p>
                    <p className="text-base sm:text-lg font-bold text-gray-800 truncate">{startLocation.viloyat}</p>
                    <p className="text-gray-600 text-xs sm:text-sm truncate">{startLocation.tuman}</p>
                    <p className="text-gray-500 text-xs mt-1 truncate">{startLocation.kocha}</p>
                    <div className="mt-2 sm:mt-3 space-y-1 text-xs text-gray-500">
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-1 sm:mr-2 text-xs" />
                        {formatDate(freight.route_start_time_from)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-green-50 rounded-lg sm:rounded-xl border border-green-100">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                    <FaArrowDown className="text-green-600 text-sm sm:text-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1">QAYERGA</p>
                    <p className="text-base sm:text-lg font-bold text-gray-800 truncate">{endLocation.viloyat}</p>
                    <p className="text-gray-600 text-xs sm:text-sm truncate">{endLocation.tuman}</p>
                    <p className="text-gray-500 text-xs mt-1 truncate">{endLocation.kocha}</p>
                    <div className="mt-2 sm:mt-3 space-y-1 text-xs text-gray-500">
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-1 sm:mr-2 text-xs" />
                        {formatDate(freight.route_end_time_to)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4 rounded-lg sm:rounded-xl text-center border border-blue-200">
                    <p className="text-xs font-medium text-blue-600 mb-1">MASOFA</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-800">
                      {routeLoading ? '...' : routeDistance ? `${routeDistance} km` : '~480 km'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Yo'l uzunligi</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 sm:p-4 rounded-lg sm:rounded-xl text-center border border-green-200">
                    <p className="text-xs font-medium text-green-600 mb-1">VAQT</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-800">
                      {routeLoading ? '...' : routeDuration ? `${routeDuration} soat` : '6-8 soat'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Taxminiy</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4 rounded-lg sm:rounded-xl text-center border border-purple-200">
                    <p className="text-xs font-medium text-purple-600 mb-1">HOLAT</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-800">Faol</p>
                    <p className="text-xs text-gray-500 mt-1">Yuk holati</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cargo Details Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                <FaBox className="mr-2 sm:mr-3 text-blue-600" />
                Yuk ma'lumotlari
              </h2>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-500">YUK TURI</p>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <FaBox className="text-blue-600 text-sm" />
                    <p className="font-bold text-gray-800 text-sm sm:text-base truncate">{freight.freight_type}</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-500">OG'IRLIK</p>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <FaWeightHanging className="text-blue-600 text-sm" />
                    <p className="font-bold text-gray-800 text-sm sm:text-base">{freight.weight} kg</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-500">HAJM</p>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <FaRulerCombined className="text-blue-600 text-sm" />
                    <p className="font-bold text-gray-800 text-sm sm:text-base">{freight.volume} m³</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-500">KUZOV TURI</p>
                  <p className="font-bold text-gray-800 text-sm sm:text-base truncate">{freight.body_type}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-500">YUKLASH</p>
                  <p className="font-bold text-gray-800 text-sm sm:text-base">{freight.loading_method}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-500">TUSHIRISH</p>
                  <p className="font-bold text-gray-800 text-sm sm:text-base">{freight.unloading_method}</p>
                </div>
              </div>
              
              {freight.description_uz && (
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                  <p className="text-xs font-medium text-gray-500 mb-2">QO'SHIMCHA MA'LUMOT</p>
                  <p className="text-gray-700 bg-gray-50 p-2 sm:p-3 rounded-lg text-xs sm:text-sm">
                    {freight.description_uz}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* MIDDLE COLUMN */}
          <div className="space-y-4 sm:space-y-6">
            {/* Payment Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                <FaMoneyBillWave className="mr-2 sm:mr-3 text-green-600" />
                To'lov ma'lumotlari
              </h2>
              
              <div className="mb-4 sm:mb-6 p-3 sm:p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg sm:rounded-xl border border-green-200">
                <p className="text-xs sm:text-sm font-medium text-gray-500 mb-1 sm:mb-2">JAMI NARX</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                  {formatCurrency(freight.freight_rate_amount, freight.freight_rate_currency)}
                </p>
                <p className="text-xs text-gray-500 mt-1 sm:mt-2">Barcha soliqlar bilan</p>
              </div>
              
              <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <p className="text-xs font-medium text-gray-500 mb-1">TO'LOV USULI</p>
                  <p className="font-bold text-gray-800 text-sm sm:text-base">{getPaymentMethodText(freight.payment_method)}</p>
                </div>
                
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <p className="text-xs font-medium text-gray-500 mb-1">TO'LOV SHARTI</p>
                  <p className="font-bold text-gray-800 text-sm sm:text-base">{getPaymentConditionText(freight.payment_condition)}</p>
                </div>
                
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <p className="text-xs font-medium text-gray-500 mb-1">TO'LOV MUDDATI</p>
                  <p className="font-bold text-gray-800 text-sm sm:text-base">
                    {freight.payment_period === 0 ? 'Darhol' : `${freight.payment_period} kun`}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <p className="text-xs font-medium text-gray-500 mb-1">YETKAZISH REJIMI</p>
                  <p className="font-bold text-gray-800 text-sm sm:text-base">{freight.shipping_mode}</p>
                </div>
              </div>

              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                <p className="text-xs font-medium text-gray-500 mb-2">TO'LOV IZOHLARI</p>
                <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mr-1 sm:mr-2 mt-0.5 shrink-0 text-xs" />
                    <span>To'lov yuk yetkazilgandan so'ng amalga oshiriladi</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mr-1 sm:mr-2 mt-0.5 shrink-0 text-xs" />
                    <span>Barcha hujjatlar to'liq taqdim etilishi kerak</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Transport Requirements Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                <FaTruck className="mr-2 sm:mr-3 text-orange-600" />
                Transport talablari
              </h2>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between p-3 sm:p-4 bg-orange-50 rounded-lg sm:rounded-xl border border-orange-100">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <FaTruck className="text-orange-500 text-lg sm:text-xl" />
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-500">AVTOMOBIL</p>
                      <p className="font-bold text-gray-800 text-sm sm:text-base">{freight.vehicle_category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Yuklash/Tushirish</p>
                    <p className="font-bold text-gray-800 text-xs sm:text-sm">{freight.loading_method}/{freight.unloading_method}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl ${freight.insurance_covered ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <p className="text-xs sm:text-sm font-medium text-gray-500">SUG'URTA</p>
                      {freight.insurance_covered ? (
                        <FaCheckCircle className="text-green-500 text-sm" />
                      ) : (
                        <FaExclamation className="text-yellow-500 text-sm" />
                      )}
                    </div>
                    <p className={`font-bold text-sm sm:text-base ${freight.insurance_covered ? 'text-green-700' : 'text-gray-800'}`}>
                      {freight.insurance_covered ? 'Mavjud' : 'Yo\'q'}
                    </p>
                  </div>
                  
                  <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl ${freight.temperature_controlled ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <p className="text-xs sm:text-sm font-medium text-gray-500">TEMPERATURA</p>
                      {freight.temperature_controlled ? (
                        <FaTemperatureHigh className="text-blue-500 text-sm" />
                      ) : (
                        <FaExclamation className="text-gray-500 text-sm" />
                      )}
                    </div>
                    <p className={`font-bold text-sm sm:text-base ${freight.temperature_controlled ? 'text-blue-700' : 'text-gray-800'}`}>
                      {freight.temperature_controlled ? 'Kerakli' : 'Kerak emas'}
                    </p>
                  </div>
                </div>
                
                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <p className="text-xs sm:text-sm font-medium text-gray-500">XAVFLILIK DARAJASI</p>
                    <div className="flex items-center">
                      {[1, 2, 3, 4].map(level => (
                        <div
                          key={level}
                          className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full mx-0.5 ${level <= freight.danger ? 'bg-red-500' : 'bg-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-gray-800">Level {freight.danger}</p>
                  <p className="text-xs text-gray-500 mt-1">Xavfli moddalar qatnashadi</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4 sm:space-y-6">
            {/* Owner Card - Using the new component */}
            

            {/* Special Requirements Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                <FaInfoCircle className="mr-2 sm:mr-3 text-purple-600" />
                Maxsus talablar
              </h2>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg sm:rounded-xl border border-purple-100">
                  <div className="flex items-center mb-1 sm:mb-2">
                    <FaExclamationTriangle className="text-purple-600 mr-1 sm:mr-2 text-sm" />
                    <p className="text-xs sm:text-sm font-medium text-purple-700">MAXSUS TALABLAR</p>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base">
                    {freight.special_requirements || "Maxsus talablar mavjud emas"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-500 mb-1">STATUS</p>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-1 sm:mr-2 ${freight.public ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <p className="font-bold text-gray-800 text-sm sm:text-base">
                        {freight.public ? 'Ommaviy' : 'Shaxsiy'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-500 mb-1">YETKAZILGAN</p>
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-1 sm:mr-2 ${freight.is_shipped ? 'bg-green-500' : 'bg-yellow-500'}`} />
                      <p className="font-bold text-gray-800 text-sm sm:text-base">
                        {freight.is_shipped ? 'Ha' : 'Yo\'q'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="pt-3 sm:pt-4 border-t border-gray-100">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                    <FaHistory className="mr-1 sm:mr-2 text-blue-600" />
                    Holat vaqtlari
                  </h3>
                  
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between items-center p-2 sm:p-3 bg-blue-50 rounded-lg">
                      <span className="text-xs sm:text-sm text-gray-600">Yaratilgan:</span>
                      <span className="font-semibold text-gray-800 text-xs sm:text-sm">{formatDate(freight.created_at)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <span className="text-xs sm:text-sm text-gray-600">Yangilangan:</span>
                      <span className="font-semibold text-gray-800 text-xs sm:text-sm">{formatDate(freight.updated_at)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-2 sm:p-3 bg-green-50 rounded-lg">
                      <span className="text-xs sm:text-sm text-gray-600">Yuklash vaqti:</span>
                      <span className="font-semibold text-gray-800 text-xs sm:text-sm">{formatDate(freight.route_start_time_from)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-2 sm:p-3 bg-purple-50 rounded-lg">
                      <span className="text-xs sm:text-sm text-gray-600">Yetkazish vaqti:</span>
                      <span className="font-semibold text-gray-800 text-xs sm:text-sm">{formatDate(freight.route_end_time_to)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Large Map Container */}
        <div className={`bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 mb-6 sm:mb-8 overflow-hidden ${isMapFullscreen ? 'fixed inset-0 z-50 m-0 rounded-none' : ''}`}>
          <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-0">
              <FaGlobe className="text-lg sm:text-xl" />
              <div>
                <h2 className="text-base sm:text-lg md:text-xl font-bold">Marshrut xaritasi</h2>
                <p className="text-blue-200 text-xs sm:text-sm truncate">
                  Yukning haqiqiy yo'nalishi va transport marshruti
                  {freight && ` | ${startLocation.viloyat} → ${endLocation.viloyat}`}
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
              {routeLoading ? (
                <div className="flex items-center bg-blue-700 rounded-full px-2 py-1 sm:px-3 sm:py-2">
                  <FaSyncAlt className="animate-spin mr-1 sm:mr-2 text-xs" />
                  <span className="text-xs sm:text-sm">Marshrut olinmoqda...</span>
                </div>
              ) : (
                <>
                  <div className="flex items-center bg-blue-700 rounded-full px-2 py-1 sm:px-3 sm:py-2">
                    <FaRoad className="mr-1 sm:mr-2 text-xs" />
                    <span className="text-xs sm:text-sm">Masofa: </span>
                    <span className="font-bold ml-0.5 text-xs sm:text-sm">{routeDistance || '~480'} km</span>
                  </div>
                  
                  <div className="flex items-center bg-green-700 rounded-full px-2 py-1 sm:px-3 sm:py-2">
                    <FaClock className="mr-1 sm:mr-2 text-xs" />
                    <span className="text-xs sm:text-sm">Vaqt: </span>
                    <span className="font-bold ml-0.5 text-xs sm:text-sm">{routeDuration || '6-8'} soat</span>
                  </div>
                </>
              )}
              
              <button
                onClick={toggleMapStyle}
                className="px-2 py-1 sm:px-3 sm:py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center space-x-1 sm:space-x-2"
              >
                <FaSyncAlt className="text-xs" />
                <span>{showSatellite ? 'Koʻcha' : 'Sunʼiy'}</span>
              </button>
              
              <button
                onClick={toggleMapFullscreen}
                className="px-2 py-1 sm:px-3 sm:py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center space-x-1 sm:space-x-2"
              >
                {isMapFullscreen ? (
                  <>
                    <FaCompress className="text-xs sm:text-sm" />
                    <span className="hidden sm:inline">Kichraytirish</span>
                    <span className="sm:hidden">Kichik</span>
                  </>
                ) : (
                  <>
                    <FaExpand className="text-xs sm:text-sm" />
                    <span className="hidden sm:inline">Kattalashtirish</span>
                    <span className="sm:hidden">Katta</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="relative">
            <div
              ref={mapContainer}
              className={`w-full ${isMapFullscreen ? 'h-[calc(100vh-120px)]' : 'h-[300px] sm:h-[400px] md:h-[500px]'}`}
            />
            
            {routeLoading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-2xl flex flex-col items-center">
                  <FaSyncAlt className="animate-spin text-2xl sm:text-3xl text-blue-600 mb-2 sm:mb-3" />
                  <p className="text-gray-700 font-medium text-sm sm:text-base">Marshrut xaritasi olinmoqda...</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">Transport yo'nalishi aniqlanmoqda</p>
                </div>
              </div>
            )}
            
            <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex flex-col gap-1 sm:gap-2 z-20">
              <button 
                onClick={() => map.current?.zoomIn()}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100 transition-colors"
                title="Kattalashtirish"
              >
                <FaPlus className="text-gray-700 text-xs sm:text-sm" />
              </button>
              <button 
                onClick={() => map.current?.zoomOut()}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100 transition-colors"
                title="Kichiklashtirish"
              >
                <FaMinus className="text-gray-700 text-xs sm:text-sm" />
              </button>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">{zoomLevel.toFixed(1)}x</span>
              </div>
            </div>
          </div>

          <div className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-500 mr-1 sm:mr-2 animate-pulse"></div>
                Ko'k nuqta - yuklash joyi
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 mr-1 sm:mr-2 animate-pulse"></div>
                Yashil nuqta - tushirish joyi
              </div>
              <div className="flex items-center">
                <div className="w-6 h-1 sm:w-8 sm:h-2 bg-red-500 mr-1 sm:mr-2"></div>
                Qizil chiziq - transport yo'li
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-6 sm:mt-8">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
              <button 
                onClick={onBack}
                className="px-4 py-2.5 sm:px-5 sm:py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all flex-1 flex items-center justify-center text-sm sm:text-base"
              >
                <FaArrowLeft className="mr-1 sm:mr-2" />
                Orqaga qaytish
              </button>
              <button 
                onClick={() => window.location.href = `/messanger?chat=${freight.owner_username}`}
                className="px-4 py-2.5 sm:px-5 sm:py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all flex-1 flex items-center justify-center text-sm sm:text-base"
              >
                <FaComments className="mr-1 sm:mr-2" />
                Chat qilish
              </button>
              <button 
                onClick={() => setIsOfferModalOpen(true)}
                className="px-4 py-2.5 sm:px-5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex-1 flex items-center justify-center text-sm sm:text-base"
              >
                <FaCheck className="mr-1 sm:mr-2" />
                Taklif berish
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Offer Modal - FIXED */}
      {isOfferModalOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOfferModalOpen(false)}
          />
          
          <div className="absolute inset-2 sm:inset-4 md:inset-8 lg:inset-12 bg-white rounded-xl sm:rounded-2xl shadow-2xl animate-slideUp flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
                    <FaPaperPlane className="text-blue-600 text-base sm:text-lg" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">Taklif berish</h2>
                    <p className="text-xs sm:text-sm text-gray-500">Yuk #{freight?.id} uchun taklifingizni yuboring</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOfferModalOpen(false)}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaTimes className="text-gray-500 text-base sm:text-lg" />
                </button>
              </div>

              {/* Navigation Tabs - Mobile */}
              <div className="flex border-b border-gray-200 mt-3 sm:mt-4 md:hidden">
                <button
                  onClick={() => handleModalTabChange('offer')}
                  className={`flex-1 py-2 text-center font-medium text-xs sm:text-sm ${activeModalTab === 'offer' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                >
                  Taklif
                </button>
                <button
                  onClick={() => handleModalTabChange('map')}
                  className={`flex-1 py-2 text-center font-medium text-xs sm:text-sm ${activeModalTab === 'map' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                >
                  Xarita
                </button>
                <button
                  onClick={() => handleModalTabChange('owner')}
                  className={`flex-1 py-2 text-center font-medium text-xs sm:text-sm ${activeModalTab === 'owner' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                >
                  Egasi
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-hidden">
              <div className="hidden md:grid md:grid-cols-3 h-full divide-x divide-gray-200">
                {/* Desktop Layout - All 3 columns visible */}
                
                {/* Map Section */}
                <div className="p-3 sm:p-4 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
                      <FaMapPin className="mr-1 sm:mr-2 text-blue-600" />
                      Joylashuv xaritasi
                    </h3>
                    <span className="px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {modalRouteDistance ? `${modalRouteDistance} km` : 'Haqiqiy yo\'l'}
                    </span>
                  </div>
                  <div className="flex-1 rounded-lg sm:rounded-xl overflow-hidden border border-gray-200 relative min-h-[200px]">
                    <div 
                      ref={userMapContainer}
                      className="w-full h-full"
                    />
                    {modalRouteLoading && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center">
                          <FaSyncAlt className="animate-spin text-blue-600 text-xl sm:text-2xl mx-auto mb-1 sm:mb-2" />
                          <p className="text-gray-600 text-xs sm:text-sm">Haqiqiy yo'l olinmoqda...</p>
                        </div>
                      </div>
                    )}
                    {!userLocation && (
                      <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                        <div className="text-center">
                          <FaLocationArrow className="text-gray-400 text-xl sm:text-2xl mx-auto mb-1 sm:mb-2 animate-pulse" />
                          <p className="text-gray-500 text-xs sm:text-sm">Joylashuvingiz aniqlanmoqda...</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <div className="flex items-center">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-500 mr-1 sm:mr-2"></div>
                        <span className="text-gray-600">Yuk joylashuvi</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 mr-1 sm:mr-2"></div>
                        <span className="text-gray-600">Sizning joylashuvingiz</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <FaRoad className="mr-1 text-purple-600" />
                      {modalRouteDistance ? `Haqiqiy yo'l: ${modalRouteDistance} km` : "Haqiqiy ko'cha va yo'llar bo'yicha marshrut"}
                    </div>
                  </div>
                </div>

                {/* Offer Form Section */}
                <div className="p-3 sm:p-4 h-full overflow-y-auto">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                    <FaDollarSign className="mr-1 sm:mr-2 text-green-600" />
                    Taklif ma'lumotlari
                  </h3>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-green-100">
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-gray-500">TAKLIF ETILGAN NARX</p>
                          <p className="text-lg sm:text-xl font-bold text-gray-800">
                            {freight && formatCurrency(freight.freight_rate_amount, freight.freight_rate_currency)}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <FaStar className="text-yellow-500 text-base sm:text-lg" />
                        </div>
                      </div>
                      
                      <div className="flex items-center mb-2 sm:mb-3">
                        <input
                          type="checkbox"
                          id="agreePrice"
                          checked={agreeToGivenPrice}
                          onChange={(e) => setAgreeToGivenPrice(e.target.checked)}
                          className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <label htmlFor="agreePrice" className="ml-1.5 sm:ml-2 text-xs sm:text-sm text-gray-700">
                          Taklif etilgan narxni qabul qilaman
                        </label>
                      </div>
                      
                      {!agreeToGivenPrice && (
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                            O'z narxingizni kiriting
                          </label>
                          <div className="relative">
                            <FaDollarSign className="absolute left-2 sm:left-3 top-2.5 sm:top-3 text-gray-400 text-sm" />
                            <input
                              type="number"
                              value={offerPrice}
                              onChange={(e) => setOfferPrice(e.target.value)}
                              className="w-full pl-7 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                              placeholder="Narxni kiriting"
                              disabled={isSubmitting}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          <FaCalendarAlt className="inline mr-1 text-blue-500" />
                          Boshlanish sanasi
                        </label>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full px-2 sm:px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                          disabled={isSubmitting}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          <FaCalendarAlt className="inline mr-1 text-blue-500" />
                          Tugash sanasi
                        </label>
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="w-full px-2 sm:px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                          disabled={isSubmitting}
                          min={startDate || new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        <FaPen className="inline mr-1 text-purple-500" />
                        Izohlar (Nega men? yoki shartlar)
                      </label>
                      <textarea
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        rows="3"
                        className="w-full px-2 sm:px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none text-sm sm:text-base"
                        placeholder="Nega sizni tanlashingiz kerak? Qo'shimcha shartlaringiz bormi?"
                        disabled={isSubmitting}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Yuk egasi sizning izohlaringizni ko'radi
                      </p>
                    </div>

                    <button
                      onClick={handleSubmitOffer}
                      disabled={isSubmitting}
                      className={`w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-2.5 sm:py-3.5 rounded-lg transition-all transform hover:-translate-y-0.5 shadow hover:shadow-lg flex items-center justify-center text-sm sm:text-base ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-green-700 hover:to-emerald-700'}`}
                    >
                      {isSubmitting ? (
                        <>
                          <FaSyncAlt className="animate-spin mr-1 sm:mr-2" />
                          Yuborilmoqda...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="mr-1 sm:mr-2" />
                          Taklifni yuborish
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Owner Info Section */}
                <div className="p-3 sm:p-4 h-full overflow-y-auto">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                    <FaUserCheck className="mr-1 sm:mr-2 text-purple-600" />
                    Yuk egasi ma'lumotlari
                  </h3>
                  
                  {freight && (
                    <div className="space-y-3 sm:space-y-4">
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border border-blue-100 shadow-sm">
                        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 mb-3 sm:mb-4">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow">
                            <span className="text-white text-base sm:text-lg md:text-xl font-bold">
                              {freight.owner_first_name?.[0]}{freight.owner_last_name?.[0]}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-base sm:text-lg font-bold text-gray-800">
                              {freight.owner_first_name} {freight.owner_last_name}
                            </h4>
                            <div className="flex items-center space-x-1 sm:space-x-2 mt-0.5">
                              <FaStar className="text-yellow-500 text-xs sm:text-sm" />
                              <span className="text-xs sm:text-sm text-gray-600">4.8 reyting</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2 sm:space-y-3">
                          <div className="flex items-center p-2 sm:p-3 bg-white rounded-lg border border-gray-100">
                            <FaPhone className="text-blue-500 mr-2 sm:mr-3 text-sm" />
                            <div>
                              <p className="text-xs text-gray-500">Telefon raqami</p>
                              <p className="font-medium text-gray-800 text-sm sm:text-base">{freight.owner_phone || freight.owner_username}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center p-2 sm:p-3 bg-white rounded-lg border border-gray-100">
                            <FaUser className="text-purple-500 mr-2 sm:mr-3 text-sm" />
                            <div>
                              <p className="text-xs text-gray-500">Foydalanuvchi nomi</p>
                              <p className="font-medium text-gray-800 text-sm sm:text-base">@{freight.owner_username}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center p-2 sm:p-3 bg-white rounded-lg border border-gray-100">
                            <FaCheckCircle className="text-green-500 mr-2 sm:mr-3 text-sm" />
                            <div>
                              <p className="text-xs text-gray-500">Holati</p>
                              <span className="px-1.5 sm:px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                Tasdiqlangan foydalanuvchi
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl">
                        <h5 className="font-medium text-gray-700 mb-1.5 sm:mb-2 text-sm sm:text-base">Yuk haqida qo'shimcha:</h5>
                        <ul className="space-y-1.5 text-xs sm:text-sm text-gray-600">
                          <li className="flex items-start">
                            <FaCheckCircle className="text-green-500 mr-1.5 sm:mr-2 mt-0.5 shrink-0 text-xs" />
                            <span>To'lov kafolati: {freight.payment_period === 0 ? 'Darhol' : `${freight.payment_period} kun`}</span>
                          </li>
                          <li className="flex items-start">
                            <FaCheckCircle className="text-green-500 mr-1.5 sm:mr-2 mt-0.5 shrink-0 text-xs" />
                            <span>Yetkazish rejimi: {freight.shipping_mode}</span>
                          </li>
                          {freight.insurance_covered && (
                            <li className="flex items-start">
                              <FaCheckCircle className="text-green-500 mr-1.5 sm:mr-2 mt-0.5 shrink-0 text-xs" />
                              <span>Sug'urta mavjud</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Layout - Single column with tabs */}
              <div className="md:hidden h-full">
                {activeModalTab === 'offer' && (
                  <div className="p-3 sm:p-4 h-full overflow-y-auto">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                      <FaDollarSign className="mr-1 sm:mr-2 text-green-600" />
                      Taklif ma'lumotlari
                    </h3>
                    
                    <div className="space-y-3 sm:space-y-4">
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-green-100">
                        <div className="flex items-center justify-between mb-2 sm:mb-3">
                          <div>
                            <p className="text-xs sm:text-sm font-medium text-gray-500">TAKLIF ETILGAN NARX</p>
                            <p className="text-lg sm:text-xl font-bold text-gray-800">
                              {freight && formatCurrency(freight.freight_rate_amount, freight.freight_rate_currency)}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <FaStar className="text-yellow-500 text-base sm:text-lg" />
                          </div>
                        </div>
                        
                        <div className="flex items-center mb-2 sm:mb-3">
                          <input
                            type="checkbox"
                            id="agreePrice"
                            checked={agreeToGivenPrice}
                            onChange={(e) => setAgreeToGivenPrice(e.target.checked)}
                            className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                          />
                          <label htmlFor="agreePrice" className="ml-1.5 sm:ml-2 text-xs sm:text-sm text-gray-700">
                            Taklif etilgan narxni qabul qilaman
                          </label>
                        </div>
                        
                        {!agreeToGivenPrice && (
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                              O'z narxingizni kiriting
                            </label>
                            <div className="relative">
                              <FaDollarSign className="absolute left-2 sm:left-3 top-2.5 sm:top-3 text-gray-400 text-sm" />
                              <input
                                type="number"
                                value={offerPrice}
                                onChange={(e) => setOfferPrice(e.target.value)}
                                className="w-full pl-7 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                                placeholder="Narxni kiriting"
                                disabled={isSubmitting}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                            <FaCalendarAlt className="inline mr-1 text-blue-500" />
                            Boshlanish sanasi
                          </label>
                          <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full px-2 sm:px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                            disabled={isSubmitting}
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                            <FaCalendarAlt className="inline mr-1 text-blue-500" />
                            Tugash sanasi
                          </label>
                          <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full px-2 sm:px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                            disabled={isSubmitting}
                            min={startDate || new Date().toISOString().split('T')[0]}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          <FaPen className="inline mr-1 text-purple-500" />
                          Izohlar (Nega men? yoki shartlar)
                        </label>
                        <textarea
                          value={comments}
                          onChange={(e) => setComments(e.target.value)}
                          rows="3"
                          className="w-full px-2 sm:px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none text-sm sm:text-base"
                          placeholder="Nega sizni tanlashingiz kerak? Qo'shimcha shartlaringiz bormi?"
                          disabled={isSubmitting}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Yuk egasi sizning izohlaringizni ko'radi
                        </p>
                      </div>

                      <button
                        onClick={handleSubmitOffer}
                        disabled={isSubmitting}
                        className={`w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-2.5 sm:py-3.5 rounded-lg transition-all transform hover:-translate-y-0.5 shadow hover:shadow-lg flex items-center justify-center text-sm sm:text-base ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-green-700 hover:to-emerald-700'}`}
                      >
                        {isSubmitting ? (
                          <>
                            <FaSyncAlt className="animate-spin mr-1 sm:mr-2" />
                            Yuborilmoqda...
                          </>
                        ) : (
                          <>
                            <FaPaperPlane className="mr-1 sm:mr-2" />
                            Taklifni yuborish
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {activeModalTab === 'map' && (
                  <div className="p-3 sm:p-4 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
                        <FaMapPin className="mr-1 sm:mr-2 text-blue-600" />
                        Joylashuv xaritasi
                      </h3>
                      <span className="px-2 py-0.5 sm:py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        {modalRouteDistance ? `${modalRouteDistance} km` : 'Haqiqiy yo\'l'}
                      </span>
                    </div>
                    <div className="flex-1 rounded-lg sm:rounded-xl overflow-hidden border border-gray-200 relative min-h-[250px]">
                      <div 
                        ref={userMapContainer}
                        className="w-full h-full"
                      />
                      {modalRouteLoading && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                          <div className="text-center">
                            <FaSyncAlt className="animate-spin text-blue-600 text-xl sm:text-2xl mx-auto mb-1 sm:mb-2" />
                            <p className="text-gray-600 text-xs sm:text-sm">Haqiqiy yo'l olinmoqda...</p>
                          </div>
                        </div>
                      )}
                      {!userLocation && (
                        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                          <div className="text-center">
                            <FaLocationArrow className="text-gray-400 text-xl sm:text-2xl mx-auto mb-1 sm:mb-2 animate-pulse" />
                            <p className="text-gray-500 text-xs sm:text-sm">Joylashuvingiz aniqlanmoqda...</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-2">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <div className="flex items-center">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-500 mr-1 sm:mr-2"></div>
                          <span className="text-gray-600">Yuk joylashuvi</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 mr-1 sm:mr-2"></div>
                          <span className="text-gray-600">Sizning joylashuvingiz</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <FaRoad className="mr-1 text-purple-600" />
                        {modalRouteDistance ? `Haqiqiy yo'l: ${modalRouteDistance} km` : "Haqiqiy ko'cha va yo'llar bo'yicha marshrut"}
                      </div>
                    </div>
                  </div>
                )}

                {activeModalTab === 'owner' && (
                  <div className="p-3 sm:p-4 h-full overflow-y-auto">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                      <FaUserCheck className="mr-1 sm:mr-2 text-purple-600" />
                      Yuk egasi ma'lumotlari
                    </h3>
                    
                    {freight && (
                      <div className="space-y-3 sm:space-y-4">
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-blue-100 shadow-sm">
                          <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow">
                              <span className="text-white text-base sm:text-lg font-bold">
                                {freight.owner_first_name?.[0]}{freight.owner_last_name?.[0]}
                              </span>
                            </div>
                            <div>
                              <h4 className="text-base sm:text-lg font-bold text-gray-800">
                                {freight.owner_first_name} {freight.owner_last_name}
                              </h4>
                              <div className="flex items-center space-x-1 sm:space-x-2 mt-0.5">
                                <FaStar className="text-yellow-500 text-xs sm:text-sm" />
                                <span className="text-xs sm:text-sm text-gray-600">4.8 reyting</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2 sm:space-y-3">
                            <div className="flex items-center p-2 sm:p-3 bg-white rounded-lg border border-gray-100">
                              <FaPhone className="text-blue-500 mr-2 sm:mr-3 text-sm" />
                              <div>
                                <p className="text-xs text-gray-500">Telefon raqami</p>
                                <p className="font-medium text-gray-800 text-sm sm:text-base">{freight.owner_phone || freight.owner_username}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center p-2 sm:p-3 bg-white rounded-lg border border-gray-100">
                              <FaUser className="text-purple-500 mr-2 sm:mr-3 text-sm" />
                              <div>
                                <p className="text-xs text-gray-500">Foydalanuvchi nomi</p>
                                <p className="font-medium text-gray-800 text-sm sm:text-base">@{freight.owner_username}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center p-2 sm:p-3 bg-white rounded-lg border border-gray-100">
                              <FaCheckCircle className="text-green-500 mr-2 sm:mr-3 text-sm" />
                              <div>
                                <p className="text-xs text-gray-500">Holati</p>
                                <span className="px-1.5 sm:px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                  Tasdiqlangan foydalanuvchi
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                          <h5 className="font-medium text-gray-700 mb-1.5 sm:mb-2 text-sm sm:text-base">Yuk haqida qo'shimcha:</h5>
                          <ul className="space-y-1.5 text-xs sm:text-sm text-gray-600">
                            <li className="flex items-start">
                              <FaCheckCircle className="text-green-500 mr-1.5 sm:mr-2 mt-0.5 shrink-0 text-xs" />
                              <span>To'lov kafolati: {freight.payment_period === 0 ? 'Darhol' : `${freight.payment_period} kun`}</span>
                            </li>
                            <li className="flex items-start">
                              <FaCheckCircle className="text-green-500 mr-1.5 sm:mr-2 mt-0.5 shrink-0 text-xs" />
                              <span>Yetkazish rejimi: {freight.shipping_mode}</span>
                            </li>
                            {freight.insurance_covered && (
                              <li className="flex items-start">
                                <FaCheckCircle className="text-green-500 mr-1.5 sm:mr-2 mt-0.5 shrink-0 text-xs" />
                                <span>Sug'urta mavjud</span>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FreightDetail;