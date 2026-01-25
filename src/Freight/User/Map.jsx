import React, { useState, useRef, useEffect, useCallback } from 'react'
import Navbar from './Navbar/Navbar'
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
// icons
import { FaSyncAlt, FaLayerGroup, FaBox, FaTruck, FaWarehouse, FaEye, FaFilter, FaSearch, FaShareAlt, FaCircle, FaUsers, FaRoad, FaClock, FaPlus, FaMinus, FaExclamationTriangle } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import Footer from './Footer/Footer';

// Translation object
const translations = {
  uz: {
    title: "Real-vaqt Xaritasi",
    subtitle: "Barcha yuklarni va haydovchilarni real vaqtda kuzating",
    settings: "Xarita Sozlamalari",
    reset: "Reset",
    layers: "Qatlamlar",
    cargo: "Yuklar",
    drivers: "Haydovchilar",
    warehouses: "Omborlar",
    view: "Ko'rinish",
    traffic: "Traffic",
    routes: "Marshrutlar",
    realtime: "Real-vaqt kuzatish",
    filters: "Filtrlar",
    all: "Barchasi",
    active: "Faol",
    pending: "Kutilmoqda",
    delivered: "Yetkazildi",
    location: "Joylashuv",
    gettingLocation: "Joylashuv olinmoqda...",
    showMyLocation: "Mening joylashuvimni ko'rsatish",
    update: "Yangilash",
    clear: "Tozalash",
    locationSuccess: "Joylashuv muvaffaqiyatli olingan! Xaritada qizil marker bilan ko'rsatilgan.",
    latitude: "Kenglik",
    longitude: "Uzunlik",
    searchCargo: "Yukni izlash",
    share: "Ulashish",
    realtimeStats: "Real-vaqt Statistikasi",
    live: "Jonli",
    activeCargos: "Faol yuklar",
    onlineDrivers: "Onlayn Haydovchilar",
    totalDistance: "Jami masofa",
    averageTime: "O'rtacha vaqt",
    cargoTracking: "Yuk kuzatish",
    streetView: "Street View",
    satelliteView: "Satellite View",
    detailedStreet: "Detailed Street Map",
    satellite: "Satellite View",
    locationHint: "Click location button to see your position on map",
    locationMarked: "Your location is marked with red marker",
    zoom: "Zoom",
    labels: "Labels",
    labelsOn: "ON",
    labelsOff: "OFF",
    coordinateLimit: "Coordinate limit",
    maxDigits: "Maximum 9 digits",
    valid: "9 or less: ✅",
    truncated: "More than 9: truncated",
    yourLocation: "Your current location",
    redMarker: "Red marker shows your current location",
    blueBorder: "Blue border shows Uzbekistan",
    coordinateWarning: "Coordinates truncated to 9 digits maximum",
    locationError: "Joylashuv ma'lumotlari olinmadi. Iltimos, brauzer sozlamalarini tekshiring.",
    locationDenied: "Joylashuv ruxsati rad etildi. Iltimos, brauzer sozlamalarida joylashuv xizmatlarini yoqing.",
    locationUnavailable: "Joylashuv ma'lumotlari mavjud emas. GPS/WiFi yoqilganligini tekshiring.",
    locationTimeout: "Joylashuv so'rovi vaqt tugadi. Iltimos, qayta urinib ko'ring.",
    unknownError: "Noma'lum xatolik yuz berdi."
  },
  ru: {
    title: "Карта в реальном времени",
    subtitle: "Отслеживайте все грузы и водителей в реальном времени",
    settings: "Настройки карты",
    reset: "Сброс",
    layers: "Слои",
    cargo: "Грузы",
    drivers: "Водители",
    warehouses: "Склады",
    view: "Вид",
    traffic: "Трафик",
    routes: "Маршруты",
    realtime: "Отслеживание в реальном времени",
    filters: "Фильтры",
    all: "Все",
    active: "Активные",
    pending: "Ожидающие",
    delivered: "Доставленные",
    location: "Местоположение",
    gettingLocation: "Получение местоположения...",
    showMyLocation: "Показать мое местоположение",
    update: "Обновить",
    clear: "Очистить",
    locationSuccess: "Местоположение успешно получено! Показано красным маркером на карте.",
    latitude: "Широта",
    longitude: "Долгота",
    searchCargo: "Найти груз",
    share: "Поделиться",
    realtimeStats: "Статистика в реальном времени",
    live: "Живой",
    activeCargos: "Активные грузы",
    onlineDrivers: "Онлайн водители",
    totalDistance: "Общее расстояние",
    averageTime: "Среднее время",
    cargoTracking: "Отслеживание груза",
    streetView: "Вид улиц",
    satelliteView: "Вид со спутника",
    detailedStreet: "Детальная карта улиц",
    satellite: "Вид со спутника",
    locationHint: "Нажмите кнопку местоположения, чтобы увидеть свою позицию на карте",
    locationMarked: "Ваше местоположение отмечено красным маркером",
    zoom: "Масштаб",
    labels: "Метки",
    labelsOn: "ВКЛ",
    labelsOff: "ВЫКЛ",
    coordinateLimit: "Лимит координат",
    maxDigits: "Максимум 9 цифр",
    valid: "9 или меньше: ✅",
    truncated: "Больше 9: обрезано",
    yourLocation: "Ваше текущее местоположение",
    redMarker: "Красный маркер показывает ваше текущее местоположение",
    blueBorder: "Синяя граница показывает Узбекистан",
    coordinateWarning: "Координаты обрезаны до максимум 9 цифр",
    locationError: "Не удалось получить данные о местоположении. Пожалуйста, проверьте настройки браузера.",
    locationDenied: "Разрешение на доступ к местоположению отклонено. Пожалуйста, включите службы определения местоположения в настройках браузера.",
    locationUnavailable: "Информация о местоположении недоступна. Проверьте, включен ли GPS/WiFi.",
    locationTimeout: "Запрос местоположения истек. Пожалуйста, попробуйте еще раз.",
    unknownError: "Произошла неизвестная ошибка."
  },
  en: {
    title: "Real-time Map",
    subtitle: "Track all cargo and drivers in real time",
    settings: "Map Settings",
    reset: "Reset",
    layers: "Layers",
    cargo: "Cargo",
    drivers: "Drivers",
    warehouses: "Warehouses",
    view: "View",
    traffic: "Traffic",
    routes: "Routes",
    realtime: "Real-time Tracking",
    filters: "Filters",
    all: "All",
    active: "Active",
    pending: "Pending",
    delivered: "Delivered",
    location: "Location",
    gettingLocation: "Getting location...",
    showMyLocation: "Show my location",
    update: "Update",
    clear: "Clear",
    locationSuccess: "Location successfully obtained! Shown with red marker on the map.",
    latitude: "Latitude",
    longitude: "Longitude",
    searchCargo: "Search cargo",
    share: "Share",
    realtimeStats: "Real-time Statistics",
    live: "Live",
    activeCargos: "Active cargo",
    onlineDrivers: "Online Drivers",
    totalDistance: "Total distance",
    averageTime: "Average time",
    cargoTracking: "Cargo Tracking",
    streetView: "Street View",
    satelliteView: "Satellite View",
    detailedStreet: "Detailed Street Map",
    satellite: "Satellite View",
    locationHint: "Click location button to see your position on map",
    locationMarked: "Your location is marked with red marker",
    zoom: "Zoom",
    labels: "Labels",
    labelsOn: "ON",
    labelsOff: "OFF",
    coordinateLimit: "Coordinate limit",
    maxDigits: "Maximum 9 digits",
    valid: "9 or less: ✅",
    truncated: "More than 9: truncated",
    yourLocation: "Your current location",
    redMarker: "Red marker shows your current location",
    blueBorder: "Blue border shows Uzbekistan",
    coordinateWarning: "Coordinates truncated to 9 digits maximum",
    locationError: "Unable to get location data. Please check your browser settings.",
    locationDenied: "Location permission denied. Please enable location services in your browser settings.",
    locationUnavailable: "Location information is unavailable. Check if GPS/WiFi is enabled.",
    locationTimeout: "Location request timed out. Please try again.",
    unknownError: "An unknown error occurred."
  }
};

function Map({ currentLang }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [showSatellite, setShowSatellite] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(5);
  const [lng, setLng] = useState(0.0);
  const [lat, setLat] = useState(0.0);
  const [language, setLanguage] = useState('uz'); // Default language

  // Get translation function
  const t = translations[currentLang || 'uz']

  // State for user's current position
  const [userPosition, setUserPosition] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [coordinateWarning, setCoordinateWarning] = useState('');

  // Helper function to format coordinates to max 9 digits (same as working example)
  const formatCoordinate = (coord) => {
    if (!coord && coord !== 0) return '';

    const str = coord.toString();
    const trimmed = str.trim();

    if (trimmed.length <= 9) {
      return trimmed;
    }

    if (trimmed.includes('.')) {
      const [integerPart, decimalPart] = trimmed.split('.');
      const integerLength = integerPart.length;
      const availableDecimalDigits = 9 - integerLength - 1;

      if (availableDecimalDigits > 0) {
        return `${integerPart}.${decimalPart.substring(0, availableDecimalDigits)}`;
      } else {
        return integerPart;
      }
    }

    return trimmed.substring(0, 9);
  };

  // Function to get user location (improved from working example)
  const getUserLocation = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error(t.locationError));
        return;
      }

      setLocationLoading(true);
      setLocationError(null);
      setCoordinateWarning('');

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          console.log('Location received:', {
            latitude,
            longitude,
            accuracy: `${accuracy} meters`,
            source: 'GPS/WiFi/Cell'
          });

          const location = {
            lat: formatCoordinate(latitude),
            lon: formatCoordinate(longitude)
          };

          // Save to localStorage
          localStorage.setItem('userLocation', JSON.stringify(location));

          // Set the position with parsed float values for the marker
          const parsedPosition = [parseFloat(location.lon), parseFloat(location.lat)];
          setUserPosition(parsedPosition);
          setLocationLoading(false);

          // Check if coordinates were truncated
          const originalLngStr = longitude.toString();
          const originalLatStr = latitude.toString();

          if (originalLngStr.length > 9 || originalLatStr.length > 9) {
            setCoordinateWarning(t.coordinateWarning);
          }

          // Update map center
          if (map.current) {
            map.current.flyTo({
              center: parsedPosition,
              zoom: 14,
              duration: 2000
            });
          }

          // Update marker
          updateMarker(parseFloat(location.lon), parseFloat(location.lat));

          resolve(location);
        },
        (error) => {
          let errorMessage = t.locationError;
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = t.locationDenied;
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = t.locationUnavailable;
              break;
            case error.TIMEOUT:
              errorMessage = t.locationTimeout;
              break;
            default:
              errorMessage = t.unknownError;
          }
          console.error('Geolocation error:', error);
          setLocationError(errorMessage);
          setLocationLoading(false);
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true, // Changed to true for better accuracy
          timeout: 15000,
          maximumAge: 0 // Don't use cached position
        }
      );
    });
  }, [t]);

  // Update marker position (from working example)
  const updateMarker = useCallback((lng, lat) => {
    if (!map.current) return;

    // Format coordinates
    const formattedLng = formatCoordinate(lng);
    const formattedLat = formatCoordinate(lat);

    // Check if coordinates were truncated
    const originalLngStr = lng.toString();
    const originalLatStr = lat.toString();

    if (originalLngStr.length > 9 || originalLatStr.length > 9) {
      setCoordinateWarning(t.coordinateWarning);
    }

    // Remove existing marker
    if (marker.current) {
      marker.current.remove();
      marker.current = null;
    }

    // Parse formatted coordinates
    const markerLng = parseFloat(formattedLng);
    const markerLat = parseFloat(formattedLat);

    // Create custom marker element
    const el = document.createElement('div');
    el.className = 'user-location-marker';
    el.style.width = '24px';
    el.style.height = '24px';
    el.style.background = '#FF0000';
    el.style.borderRadius = '50%';
    el.style.border = '3px solid #FFFFFF';
    el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.5)';
    el.style.cursor = 'pointer';
    el.style.zIndex = '1000';

    // Create and add marker to map
    marker.current = new maplibregl.Marker({
      element: el,
      anchor: 'center'
    })
      .setLngLat([markerLng, markerLat])
      .addTo(map.current);

    // Add popup to marker
    const popup = new maplibregl.Popup({
      offset: 25,
      closeButton: false,
      closeOnClick: false
    }).setHTML(`
      <div style="padding: 8px;">
        <h3 style="margin: 0; font-weight: bold; font-size: 14px; color: #FF0000;">📍 ${t.yourLocation}</h3>
        <p style="margin: 4px 0 0 0; font-size: 12px; color: #666;">
          ${t.latitude}: ${formattedLat}<br/>
          ${t.longitude}: ${formattedLng}
        </p>
      </div>
    `);

    marker.current.setPopup(popup);

    // Show popup on hover
    el.addEventListener('mouseenter', () => {
      marker.current.togglePopup();
    });

    el.addEventListener('mouseleave', () => {
      marker.current.togglePopup();
    });

    // Update state with formatted coordinates
    setUserPosition([markerLng, markerLat]);
  }, [t]);

  // Function to center on user's location
  const centerOnUserLocation = async () => {
    try {
      if (userPosition && map.current) {
        map.current.flyTo({
          center: userPosition,
          zoom: 14,
          duration: 2000
        });
      } else {
        // Get location if not already available
        const location = await getUserLocation();
        if (map.current) {
          map.current.flyTo({
            center: [parseFloat(location.lon), parseFloat(location.lat)],
            zoom: 14,
            duration: 2000
          });
        }
      }
    } catch (error) {
      console.error('Error centering on user location:', error);
      alert(locationError || t.locationError);
    }
  };

  // Manual function to trigger location update
  const updateLocationManually = async () => {
    try {
      const location = await getUserLocation();
      if (map.current) {
        map.current.flyTo({
          center: [parseFloat(location.lon), parseFloat(location.lat)],
          zoom: 14,
          duration: 2000
        });
      }
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  const resetView = () => {
    setSelectedRegion(null);
    if (map.current) {
      map.current.flyTo({
        center: [64.4556, 41.0000],
        zoom: 5,
        duration: 1500
      });
    }
  };

  const zoomToTashkent = () => {
    if (map.current) {
      map.current.flyTo({
        center: [69.2401, 41.2995],
        zoom: 13,
        duration: 2000
      });
    }
  };

  // Uzbekistan border GeoJSON
  const uzbekistanBorderGeoJSON = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [56.0, 41.3], [57.0, 41.5], [58.0, 42.4], [59.0, 42.8],
        [60.0, 42.9], [61.0, 43.0], [62.0, 43.1], [63.0, 43.3],
        [64.0, 43.5], [65.0, 43.6], [66.0, 43.8], [67.0, 43.9],
        [68.0, 44.0], [69.0, 44.0], [70.0, 44.1], [71.0, 44.7],
        [71.5, 45.1], [71.8, 45.4], [72.0, 45.6], [73.0, 45.3],
        [73.3, 44.8], [73.5, 44.0], [73.6, 43.0], [73.6, 42.0],
        [73.6, 41.0], [73.6, 40.8], [73.2, 40.4], [72.5, 40.2],
        [71.8, 40.0], [71.0, 39.8], [70.5, 39.6], [70.0, 39.5],
        [69.5, 39.6], [69.0, 39.8], [68.5, 40.0], [68.0, 40.1],
        [67.5, 40.0], [67.0, 39.8], [66.5, 39.5], [66.0, 39.2],
        [65.5, 39.0], [65.0, 38.8], [64.5, 38.6], [64.0, 38.4],
        [63.5, 38.2], [63.0, 38.0], [62.5, 37.8], [62.0, 37.6],
        [61.5, 37.4], [61.0, 37.2], [60.5, 37.1], [60.0, 37.0],
        [59.5, 37.1], [59.0, 37.3], [58.5, 37.6], [58.0, 38.0],
        [57.5, 38.3], [57.0, 38.5], [56.5, 38.8], [56.2, 39.2],
        [56.0, 39.8], [56.0, 40.5], [56.0, 41.3]
      ]]
    },
    properties: {
      name: 'Uzbekistan',
      description: 'Accurate border of Uzbekistan'
    }
  };

  const addBorderLayers = useCallback(() => {
    if (!map.current) return;

    if (map.current.getSource('uzbekistan-border')) {
      map.current.removeLayer('uzbekistan-fill');
      map.current.removeLayer('uzbekistan-border-line');
      map.current.removeSource('uzbekistan-border');
    }

    map.current.addSource('uzbekistan-border', {
      type: 'geojson',
      data: uzbekistanBorderGeoJSON
    });

    map.current.addLayer({
      id: 'uzbekistan-fill',
      type: 'fill',
      source: 'uzbekistan-border',
      paint: {
        'fill-color': 'rgba(66, 153, 225, 0.1)',
        'fill-opacity': 0.2,
        'fill-outline-color': '#4299E1'
      }
    });

    map.current.addLayer({
      id: 'uzbekistan-border-line',
      type: 'line',
      source: 'uzbekistan-border',
      paint: {
        'line-color': '#4299E1',
        'line-width': 2,
        'line-opacity': 0.8
      }
    });
  }, []);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    console.log('Initializing map...');

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
      center: [lng, lat],
      zoom: zoomLevel,
      minZoom: 4,
      maxZoom: 19,
      pitch: 0,
      bearing: 0,
      interactive: true,
    });

    // Track zoom level
    map.current.on('zoom', () => {
      const currentZoom = map.current.getZoom();
      setZoomLevel(currentZoom);
    });

    // Track map center
    map.current.on('move', () => {
      const center = map.current.getCenter();
      setLng(center.lng);
      setLat(center.lat);
    });

    // Add navigation controls
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    // Add scale control
    map.current.addControl(new maplibregl.ScaleControl({
      maxWidth: 200,
      unit: 'metric'
    }), 'bottom-left');

    // When map loads
    map.current.on('load', () => {
      console.log('Map loaded');
      setMapLoaded(true);

      // Add Uzbekistan border
      addBorderLayers();

      // Load user location from localStorage
      const savedLocation = localStorage.getItem('userLocation');
      if (savedLocation) {
        try {
          const location = JSON.parse(savedLocation);
          if (location.lat && location.lon) {
            const parsedPosition = [parseFloat(location.lon), parseFloat(location.lat)];
            setUserPosition(parsedPosition);
            updateMarker(parsedPosition[0], parsedPosition[1]);
          }
        } catch (error) {
          console.error('Error parsing saved location:', error);
        }
      }
    });

    // Add click event to place marker
    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      updateMarker(lng, lat);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
        setMapLoaded(false);
      }
    };
  }, []); // Removed zoomLevel from dependencies

  // Toggle satellite view
  const toggleMapStyle = () => {
    const newShowSatellite = !showSatellite;
    setShowSatellite(newShowSatellite);

    if (map.current) {
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
        addBorderLayers();

        if (marker.current && userPosition) {
          updateMarker(userPosition[0], userPosition[1]);
        }
      });
    }
  };

  // Function to clear the selected location
  const handleClearLocation = () => {
    if (marker.current) {
      marker.current.remove();
      marker.current = null;
    }

    setUserPosition(null);
    setCoordinateWarning('');
    localStorage.removeItem('userLocation');
  };

  const layers = [
    { id: 1, icon: FaBox, title: t.cargo, num: 12, bg: "bg-blue-500" },
    { id: 2, icon: FaTruck, title: t.drivers, num: 24, bg: "bg-blue-500" },
    { id: 3, icon: FaWarehouse, title: t.warehouses, num: 8, bg: "bg-[#e9ecef]" },
  ]

  const settings = [
    { id: 1, title: t.traffic, active: false },
    { id: 2, title: t.routes, active: true },
    { id: 3, title: t.realtime, active: true }
  ];

  const toggleSwitch = (id) => {
    setSettings(prevSettings =>
      prevSettings.map(item =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  };

  const filters = [
    { id: 1, title: t.all, active: true },
    { id: 2, title: t.active, active: false },
    { id: 3, title: t.pending, active: false },
    { id: 4, title: t.delivered, active: false },
  ]

  const statistics = [
    { id: 1, icon: FaTruck, num: 15, title: t.activeCargos },
    { id: 2, icon: FaUsers, num: 24, title: t.onlineDrivers },
    { id: 3, icon: FaRoad, num: "1,248 km", title: t.totalDistance },
    { id: 4, icon: FaClock, num: "4.2 soat", title: t.averageTime },
  ]

  // Add language switcher to Navbar
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    // You could save language preference to localStorage
    localStorage.setItem('preferredLanguage', lang);
  };

  // Load saved language preference on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  return (<>
    <div className='bg-[#f8f8fd] py-3 sm:py-6 md:py-9 lg:py-12 px-2 sm:px-4 md:px-6 xl:px-8'>
      <h1 className='text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-semibold text-center md:text-start'>{t.title}</h1>
      <p className='text-sm sm:text-base md:text-lg lg:text-xl text-[#495057] text-center md:text-start mt-4'>{t.subtitle}</p>

      <div className="flex gap-3 sm:gap-5 md:gap-7 lg:gap-9 flex-col md:flex-row py-5 sm:py-7 md:py-9">
        <div className="w-full md:w-1/3 lg:w-2/6 flex gap-3 sm:gap-5 lg:gap-7 flex-col">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8">
            <div className="flex items-center justify-between">
              <h3 className='text-sm sm:text-base md:text-lg lg:text-xl font-bold'>{t.settings}</h3>
              <button
                onClick={resetView}
                className='border border-blue-500 rounded-lg flex gap-2.5 items-center text-xs md:text-sm text-blue-500 font-medium hover:bg-blue-500 hover:text-white py-1.5 px-4 duration-300 cursor-pointer'
              >
                <FaSyncAlt />
                {t.reset}
              </button>
            </div>

            <div className="mt-3 md:mt-5">
              <p className='flex gap-2.5 items-center text-xs sm:text-sm md:text-base font-medium'>
                <FaLayerGroup className='text-blue-500' />
                {t.layers}
              </p>

              <ul className='list-none flex gap-1 flex-wrap py-3'>
                {layers.map(item => {
                  return (
                    <li key={item.id} className={`flex gap-1 items-center py-1 px-3 ${item.bg} ${item.bg === "bg-blue-500" ? "text-white" : "text-black"} rounded-full hover:bg-blue-500 hover:text-white duration-300 cursor-pointer`}>
                      <item.icon />
                      <span className='text-sm'>{item.title}</span>
                      <p className={`${item.num < 10 ? "px-3" : "px-2"} text-sm bg-white rounded-full text-blue-500`}>{item.num}</p>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="mt-1 md:mt-2.5">
              <p className='flex gap-2.5 items-center text-xs sm:text-sm md:text-base font-medium mb-1'>
                <FaEye className='text-blue-500' />
                {t.view}
              </p>

              <div>
                {settings.map(item => {
                  return (
                    <div key={item.id} className="flex items-center justify-between mb-4">
                      <p className='text-xs sm:text-sm md:text-base'>{item.title}</p>
                      <div
                        className={`w-12 p-1 rounded-full flex transition-all duration-300 cursor-pointer ${!item.active ? "justify-start bg-[#ced4da]" : "justify-end bg-blue-500"
                          }`}
                        onClick={() => toggleSwitch(item.id)}
                      >
                        <div className="w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300"></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="mt-2 md:mt-6">
              <p className='flex gap-2.5 items-center text-xs sm:text-sm md:text-base font-medium mb-1'>
                <FaFilter className='text-blue-500' />
                {t.filters}
              </p>

              <ul className='list-none flex gap-2 flex-wrap'>
                {filters.map(item => {
                  return (
                    <li key={item.id} className={`py-1 px-3 ${item.active === true ? "bg-blue-500 text-white" : "bg-[#e9ecef]"} rounded-full hover:bg-blue-500 hover:text-white duration-300 cursor-pointer`}>{item.title}</li>
                  )
                })}
              </ul>
            </div>

            {/* Location Controls - Improved from working example */}
            <div className="mt-6 border-t pt-4">
              <p className='flex gap-2.5 items-center text-xs sm:text-sm md:text-base font-medium mb-3'>
                <FaLocationCrosshairs className='text-blue-500' />
                {t.location}
              </p>

              {coordinateWarning && (
                <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs text-yellow-600 flex items-center gap-1">
                    <FaExclamationTriangle /> {coordinateWarning}
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <button
                  onClick={centerOnUserLocation}
                  disabled={locationLoading}
                  className='w-full flex gap-2 items-center justify-center bg-blue-500 border border-blue-500 text-sm text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 duration-300 cursor-pointer'
                >
                  {locationLoading ? (
                    <>
                      <FaSyncAlt className="animate-spin" />
                      {t.gettingLocation}
                    </>
                  ) : (
                    <>
                      <FaLocationCrosshairs />
                      {t.showMyLocation}
                    </>
                  )}
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={updateLocationManually}
                    className='w-full flex gap-2 items-center justify-center bg-white border border-blue-500 text-sm text-blue-500 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 duration-300 cursor-pointer'
                  >
                    <FaSyncAlt />
                    {t.update}
                  </button>

                  <button
                    onClick={handleClearLocation}
                    className='w-full flex gap-2 items-center justify-center bg-red-100 border border-red-200 text-sm text-red-600 font-medium py-2 px-4 rounded-lg hover:bg-red-200 duration-300 cursor-pointer'
                  >
                    <FaSyncAlt />
                    {t.clear}
                  </button>
                </div>

                {locationError && (
                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-xs text-red-600">{locationError}</p>
                  </div>
                )}

                {userPosition && !locationError && (
                  <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-xs text-green-600">
                      {t.locationSuccess}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {t.latitude}: {userPosition[1]?.toFixed(6)}<br />
                      {t.longitude}: {userPosition[0]?.toFixed(6)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-6">
              <button className='w-3/5 flex gap-2 items-center bg-blue-500 border border-blue-500 text-sm text-white font-medium py-1.5 px-4 rounded-full transform hover:-translate-y-1 hover:shadow-lg duration-300 cursor-pointer'>
                <FaSearch />
                {t.searchCargo}
              </button>
              <button className='w-3/5 flex gap-2 items-center bg-white border border-blue-500 text-sm text-blue-500 font-medium py-1.5 px-4 rounded-full hover:bg-blue-500 hover:text-white duration-300 cursor-pointer'>
                <FaShareAlt />
                {t.share}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8">
            <div className="flex items-center justify-between">
              <h3 className='text-sm sm:text-base md:text-lg lg:text-xl font-bold'>{t.realtimeStats}</h3>

              <p className='flex gap-1 items-center text-xs sm:text-sm text-[#4cc9f0]'>
                <FaCircle className='text-[10px]' />
                {t.live}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-9 py-5">
              {statistics.map(item => {
                return (
                  <div key={item.id} className="">
                    <div className="flex gap-2 items-center text-blue-500">
                      <item.icon className='text-lg md:text-xl' />
                      <h2 className='text-lg sm:text-xl md:text-2xl font-bold leading-6'>{item.num}</h2>
                    </div>
                    <span className='text-xs md:text-sm text-[#6c757d] uppercase'>{item.title}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8">
            <div className="flex items-center justify-between mb-10">
              <h3 className='text-sm sm:text-base md:text-lg lg:text-xl font-bold'>{t.cargoTracking}</h3>
              <button className='border border-blue-500 rounded-lg flex gap-2.5 items-center text-xs md:text-sm text-blue-500 font-medium hover:bg-blue-500 hover:text-white py-1.5 px-4 duration-300 cursor-pointer'>
                <FaSyncAlt />
                {t.update}
              </button>
            </div>
          </div>
        </div>

        <div className="relative w-full md:w-4/5 lg:w-3/4 bg-[#f8f8fd] h-1/2 rounded-2xl shadow-2xl p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8">
          <div className="lg:w-full">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="px-6 py-4 bg-linear-to-r from-blue-800 to-blue-900 text-white">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <h2 className="text-xl font-bold">
                      {showSatellite ? t.satelliteView : t.detailedStreet}
                    </h2>
                    <p className="text-blue-200 text-sm mt-1">
                      {userPosition ? t.locationMarked : t.locationHint}
                      {locationLoading && ' (' + t.gettingLocation + ')'}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0 flex items-center space-x-2">
                    <button
                      onClick={toggleMapStyle}
                      className="px-3 py-1 bg-white text-blue-500 rounded-full text-sm font-medium hover:bg-blue-50"
                    >
                      {showSatellite ? t.streetView : t.satelliteView}
                    </button>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${zoomLevel >= 12 ? 'bg-green-500' : 'bg-gray-600'}`}>
                      {t.labels}: {zoomLevel >= 12 ? t.labelsOn : t.labelsOff}
                    </div>
                    <div className="px-3 py-1 bg-blue-500 rounded-full text-sm font-medium">
                      {t.zoom}: {zoomLevel.toFixed(1)}x
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div
                  ref={mapContainer}
                  className="w-full h-150"
                />

                {/* Map Controls */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <button
                    onClick={() => map.current?.zoomIn()}
                    className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100"
                    title="Zoom in"
                  >
                    <FaPlus />
                  </button>
                  <button
                    onClick={() => map.current?.zoomOut()}
                    className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100"
                    title="Zoom out"
                  >
                    <FaMinus />
                  </button>
                  <button
                    onClick={centerOnUserLocation}
                    disabled={locationLoading}
                    className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                    title="Center on my location"
                  >
                    {locationLoading ? (
                      <FaSyncAlt className="animate-spin text-sm" />
                    ) : (
                      <FaLocationCrosshairs className="text-blue-500" />
                    )}
                  </button>
                </div>

                {/* Coordinate Limit Notice */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
                  <p className="text-xs font-medium text-slate-700 mb-1">{t.coordinateLimit}:</p>
                  <p className="text-xs text-slate-600">{t.maxDigits}</p>
                  <div className="mt-2 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>{t.valid}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      <span>{t.truncated}</span>
                    </div>
                  </div>
                </div>

                {/* Location Status */}
                {userPosition && (
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-blue-700">{t.yourLocation}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {t.latitude}: {userPosition[1]?.toFixed(6)}<br />
                      {t.longitude}: {userPosition[0]?.toFixed(6)}
                    </p>
                    <div className="mt-1 text-xs">
                      <span className={`px-2 py-0.5 rounded ${userPosition[1]?.toString().length <= 9 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {userPosition[1]?.toString().length}/9
                      </span>
                      <span className={`px-2 py-0.5 rounded ml-1 ${userPosition[0]?.toString().length <= 9 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {userPosition[0]?.toString().length}/9
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                    {t.redMarker}
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-blue-500 mr-2"></div>
                    {t.blueBorder}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default Map
