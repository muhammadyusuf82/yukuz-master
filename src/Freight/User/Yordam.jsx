import React, { useState, useRef, useEffect } from 'react';
import {
  FaTruckLoading, FaBolt, FaHome, FaQuestionCircle, FaPlayCircle,
  FaHeadset, FaComments, FaBook, FaExclamationTriangle, FaStar,
  FaPhone, FaEnvelope, FaClock, FaWhatsapp, FaSearch, FaBox,
  FaTruck, FaMoneyBillWave, FaMapMarkedAlt, FaUserShield, FaCog,
  FaArrowRight, FaChevronDown, FaThumbsUp, FaThumbsDown, FaEye,
  FaCalendar, FaUser, FaTag, FaComment, FaPaperclip,
  FaCloudUploadAlt, FaPaperPlane, FaCheckCircle, FaExclamationCircle,
  FaTimesCircle, FaPlay
} from 'react-icons/fa';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

// Tarjimalar obyekti
const translations = {
  uz: {
    // Page header
    heroTitle: "Yordam Markazi",
    heroSubtitle: "Har qanday savolingizga javob toping yoki biz bilan bog'laning",

    // Quick links
    quickLinks: "Tezkor O'tish",
    helpCenter: "Yordam markazi",
    search: "Qidiruv",
    categories: "Kategoriyalar",
    faq: "Savol-javoblar",
    tutorials: "Video qo'llanmalar",
    contact: "Aloqa markazi",
    chat: "Onlayn chat",

    // Contact card
    support247: "24/7 Qo'llab-quvvatlash",
    supportDescription: "Har qanday vaqtda yordam oling",
    callNow: "Qo'ng'iroq qilish",
    whatsapp: "WhatsApp orqali",
    workingHours: "Dushanba-Juma: 09:00-18:00",

    // Search section
    whatHelpNeeded: "Nima yordam kerak?",
    searchPlaceholder: "Masalan: 'Yuk qanday qo'shaman?', 'Narxni qanday hisoblayman?', 'Yukni kuzatish'...",

    // Search tips
    addCargo: "Yuk qo'shish",
    paymentMethods: "To'lov usullari",
    chooseDriver: "Haydovchi tanlash",
    trackCargo: "Yukni kuzatish",
    contract: "Shartnoma",
    cancel: "Bekor qilish",

    // Categories
    helpCategories: "Yordam Kategoriyalari",
    viewAll: "Barchasini ko'rish",

    // Category titles
    addCargoCat: "Yuk Qo'shish",
    drivers: "Haydovchilar",
    paymentPrices: "To'lov va Narxlar",
    trackingMap: "Kuzatish va Xarita",
    securityPrivacy: "Xavfsizlik va Maxfiylik",
    settingsAccount: "Sozlamalar va Hisob",

    // Category counts
    articlesCount: "ta maqola",

    // FAQ
    faqTitle: "Tez-tez So'raladigan Savollar",
    viewAllQuestions: "Barcha savollarni ko'rish",
    helpful: "Foydali",
    notHelpful: "Foydali emas",

    // FAQ questions
    faq1: "Yukni qanday qo'shaman va narxini qanday hisoblayman?",
    faq2: "Yukni qanday kuzataman va holatini qanday bilib olaman?",
    faq3: "To'lovni qanday amalga oshiraman va qaysi usullar mavjud?",
    faq4: "Yukni bekor qilish mumkinmi va pul qaytariladimi?",
    faq5: "Haydovchini qanday tanlayman va reytingi qanday?",

    // FAQ answers
    faqAnswer1: `Yuk qo'shish uchun quyidagi qadamlarni bajaring:\n\n1. "Yuk qo'shish" tugmasini bosing\n2. Yuk ma'lumotlarini kiriting (qayerdan, qayerga, og'irlik, hajm)\n3. Yuk turi va transport turini tanlang\n4. Narx kalkulyatori avtomatik hisoblab beradi\n5. Taklifni tasdiqlang va haydovchi kuting\n\nNarx masofa, og'irlik, yuk turi, transport turi va yetkazish muddatiga qarab hisoblanadi.`,
    faqAnswer2: `Yukni kuzatishning bir necha usuli bor:\n\n1. Xarita orqali kuzatish:\n   • Xarita paneliga o'ting\n   • Yuk ID ni kiriting\n   • Real-vaqtda harakatni ko'ring\n\n2. Bildirishnomalar orqali:\n   • Har bir holat o'zgarishida push-bildirishnoma olasiz\n   • SMS orqali yangilanishlar\n   • Email orqali status xabarlari\n\n3. Telefon orqali:\n   • Haydovchi bilan bevosita aloqa\n   • Qo'llab-quvvatlash xizmati: +998 90 123 45 67`,
    faqAnswer3: `Biz quyidagi to'lov usullarini qabul qilamiz:\n\n1. Onlayn to'lovlar:\n   • Visa, MasterCard, Humo, UzCard\n   • Click (5% chegirma)\n   • Payme (3% chegirma)\n   • Apelsin (2% chegirma)\n\n2. Naqd to'lov:\n   • Yuk yetkazilganda haydovchiga\n   • Platforma ofisida\n\n3. Bank o'tkazmasi:\n   • Korporativ mijozlar uchun\n   • Oylik hisob-kitob\n\nBarcha to'lovlar xavfsiz va sertifikatlangan. Har bir tranzaksiya sug'urtalangan.`,
    faqAnswer4: `Yukni bekor qilish siyosati:\n\n1. Yuk yuklanmagan:\n   • 100% pul qaytariladi\n   • 24 soat ichida hisobingizga\n\n2. Yuk yuklangan, lekin jo'natilmagan:\n   • 70% pul qaytariladi\n   • 30% haydovchiga kompensatsiya\n\n3. Yuk yo'lda:\n   • Pul qaytarilmaydi\n   • Boshqa manzilga o'zgartirish mumkin\n   • Qo'shimcha to'lov talab qilinadi\n\nBekor qilish uchun "Yuklar" panelidan yukni tanlang va "Bekor qilish" tugmasini bosing.`,
    faqAnswer5: `Haydovchi tanlash tartibi:\n\n1. Avtomatik tanlash:\n   • Platforma eng yaxshi taklifni avtomatik tanlaydi\n   • Reyting, narx, masofa asosida\n\n2. Qo'lda tanlash:\n   • "Haydovchilar" paneliga o'ting\n   • Filtrlardan foydalaning (reyting, transport, narx)\n   • Haydovchini tanlang va taklif bering\n\nReyting tizimi:\n   • 5 yulduzli baholash\n   • Har bir yukdan keyin baholang\n   • Reyting quyidagilarga asoslanadi:\n     ✓ Vaqtiga rioya qilish\n     ✓ Yukni saqlash holati\n     ✓ Xizmat ko'rsatish sifat\n     ✓ Aloqa vaqti\n\nMinimal ishonchli reyting: 4.0 ★`,

    // Tutorials
    videoTutorials: "Video Qo'llanmalar",
    viewAllVideos: "Barcha videolarni ko'rish",
    tutorial1: "Yuk qo'shish - To'liq qo'llanma",
    tutorial2: "Yukni real-vaqtda kuzatish",
    tutorial3: "Narx kalkulyatori - Qanday ishlatiladi?",

    // Tutorial views/date
    views: "ko'rish",

    // Contact form
    contactUs: "Murojaat Qilish",
    responseTime: "Javob vaqti:",
    daysResponse: "1-2 ish kuni",
    yourName: "Ismingiz *",
    yourEmail: "Email *",
    yourPhone: "Telefon *",
    subject: "Mavzu *",
    yourMessage: "Xabaringiz *",
    attachFile: "Fayl biriktirish",
    dragFile: "Faylni shu yerga torting yoki",
    chooseFile: "Fayl tanlash",
    fileTypes: "PNG, JPG, PDF, DOC (max 5MB)",
    clear: "Tozalash",
    send: "Yuborish",

    // Form subjects
    chooseSubject: "Mavzuni tanlang",
    technical: "Texnik muammo",
    billing: "To'lov muammosi",
    delivery: "Yetkazish muammosi",
    driverIssue: "Haydovchi muammosi",

    // Chat
    onlineChat: "Onlayn Chat",
    online: "Onlayn",
    responseTimeShort: "Javob vaqti: 2 daqiqa",
    supportTeam: "Yuk.uz Qo'llab-quvvatlash",
    typeMessage: "Xabaringizni yozing...",

    // Notifications
    ratingSubmitted: "Bahoyingiz qabul qilindi! Rahmat!",
    feedbackImportant: "Sizning fikringiz biz uchun muhim.",
    categoryLoading: "kategoriyasi yuklanmoqda...",
    videoLoading: "video oynada ochilmoqda...",
    callNumber: "Qo'ng'iroq qilish: +998 90 123 45 67",
    searchEmpty: "Iltimos, qidiruv so'zini kiriting!",
    searching: "Qidiruv amalga oshirilmoqda...",
    fillAllFields: "Iltimos, barcha maydonlarni to'ldiring!",
    sendingRequest: "Murojaatingiz yuborilmoqda...",
    requestSent: "Murojaatingiz muvaffaqiyatli yuborildi! Tez orada operator siz bilan bog'lanadi.",
    fileUploaded: "Fayl yuklandi:",

    // Chat responses
    chatGreeting: "Salom! Yuk.uz qo'llab-quvvatlash xizmatiga xush kelibsiz. Sizga qanday yordam bera olaman?",
    chatHelp: "Har qanday savolingiz bo'lsa, menga yozing. Men sizga tezda javob berishga harakat qilaman.",
    userMessage: "Salom, yuk qo'shishda muammo bor. Tizim \"Xatolik\" deyapti.",
    supportResponse: "Kechirasiz, muammo uchun. Iltimos, qanday xatolik chiqayotganini aytib bera olasizmi? Yoki ekran rasmini yuborishingiz mumkin.",
    chatResponses: [
      "Tushunarli. Bu muammoni tekshirib ko'ramiz.",
      "Iltimos, biroz kuting, muammoni hal qilishga harakat qilaman.",
      "Bunday holatlar uchun kechirasiz. Texnik guruhga xabar beraman.",
      "Muammo haqida qo'shimcha ma'lumot bera olasizmi?",
      "Yordamingizga rahmat. Tez orada hal qilamiz."
    ]
  },
  ru: {
    // Page header
    heroTitle: "Центр Помощи",
    heroSubtitle: "Найдите ответы на любые вопросы или свяжитесь с нами",

    // Quick links
    quickLinks: "Быстрый переход",
    helpCenter: "Центр помощи",
    search: "Поиск",
    categories: "Категории",
    faq: "Вопрос-ответ",
    tutorials: "Видеоуроки",
    contact: "Контактный центр",
    chat: "Онлайн чат",

    // Contact card
    support247: "Поддержка 24/7",
    supportDescription: "Получите помощь в любое время",
    callNow: "Позвонить",
    whatsapp: "Через WhatsApp",
    workingHours: "Пн-Пт: 09:00-18:00",

    // Search section
    whatHelpNeeded: "Какая помощь нужна?",
    searchPlaceholder: "Например: 'Как добавить груз?', 'Как рассчитать цену?', 'Отслеживание груза'...",

    // Search tips
    addCargo: "Добавление груза",
    paymentMethods: "Способы оплаты",
    chooseDriver: "Выбор водителя",
    trackCargo: "Отслеживание груза",
    contract: "Договор",
    cancel: "Отмена",

    // Categories
    helpCategories: "Категории Помощи",
    viewAll: "Посмотреть все",

    // Category titles
    addCargoCat: "Добавление Груза",
    drivers: "Водители",
    paymentPrices: "Оплата и Цены",
    trackingMap: "Отслеживание и Карта",
    securityPrivacy: "Безопасность и Конфиденциальность",
    settingsAccount: "Настройки и Аккаунт",

    // Category counts
    articlesCount: "статей",

    // FAQ
    faqTitle: "Часто Задаваемые Вопросы",
    viewAllQuestions: "Посмотреть все вопросы",
    helpful: "Полезно",
    notHelpful: "Не полезно",

    // FAQ questions
    faq1: "Как добавить груз и рассчитать цену?",
    faq2: "Как отслеживать груз и узнавать его статус?",
    faq3: "Как произвести оплату и какие способы доступны?",
    faq4: "Можно ли отменить груз и возвращаются ли деньги?",
    faq5: "Как выбрать водителя и каков его рейтинг?",

    // FAQ answers
    faqAnswer1: `Чтобы добавить груз, выполните следующие шаги:\n\n1. Нажмите кнопку "Добавить груз"\n2. Введите данные груза (откуда, куда, вес, объем)\n3. Выберите тип груза и транспорта\n4. Калькулятор цен автоматически рассчитает стоимость\n5. Подтвердите предложение и ждите водителя\n\nЦена рассчитывается на основе расстояния, веса, типа груза, типа транспорта и сроков доставки.`,
    faqAnswer2: `Есть несколько способов отслеживания груза:\n\n1. Отслеживание через карту:\n   • Перейдите в панель карты\n   • Введите ID груза\n   • Смотрите перемещение в реальном времени\n\n2. Через уведомления:\n   • Вы получите push-уведомления при каждом изменении статуса\n   • Обновления по SMS\n   • Сообщения о статусе по email\n\n3. По телефону:\n   • Прямой контакт с водителем\n   • Служба поддержки: +998 90 123 45 67`,
    faqAnswer3: `Мы принимаем следующие способы оплаты:\n\n1. Онлайн платежи:\n   • Visa, MasterCard, Humo, UzCard\n   • Click (5% скидка)\n   • Payme (3% скидка)\n   • Apelsin (2% скидка)\n\n2. Наличные:\n   • Водителю при доставке груза\n   • В офисе платформы\n\n3. Банковский перевод:\n   • Для корпоративных клиентов\n   • Ежемесячный расчет\n\nВсе платежи безопасны и сертифицированы. Каждая транзакция застрахована.`,
    faqAnswer4: `Политика отмены груза:\n\n1. Груз не загружен:\n   • 100% возврат денег\n   • На ваш счет в течение 24 часов\n\n2. Груз загружен, но не отправлен:\n   • 70% возврат денег\n   • 30% компенсация водителю\n\n3. Груз в пути:\n   • Деньги не возвращаются\n   • Можно изменить адрес назначения\n   • Требуется дополнительная оплата\n\nДля отмены выберите груз в панели "Грузы" и нажмите кнопку "Отменить".`,
    faqAnswer5: `Процесс выбора водителя:\n\n1. Автоматический выбор:\n   • Платформа автоматически выбирает лучшее предложение\n   • На основе рейтинга, цены, расстояния\n\n2. Ручной выбор:\n   • Перейдите в панель "Водители"\n   • Используйте фильтры (рейтинг, транспорт, цена)\n   • Выберите водителя и отправьте предложение\n\nСистема рейтинга:\n   • 5-звездочная оценка\n   • Оценивайте после каждой перевозки\n   • Рейтинг основан на:\n     ✓ Соблюдении сроков\n     ✓ Состоянии груза\n     ✓ Качестве обслуживания\n     ✓ Времени связи\n\nМинимальный доверенный рейтинг: 4.0 ★`,

    // Tutorials
    videoTutorials: "Видеоуроки",
    viewAllVideos: "Посмотреть все видео",
    tutorial1: "Добавление груза - Полное руководство",
    tutorial2: "Отслеживание груза в реальном времени",
    tutorial3: "Калькулятор цен - Как использовать?",

    // Tutorial views/date
    views: "просмотров",

    // Contact form
    contactUs: "Обратная связь",
    responseTime: "Время ответа:",
    daysResponse: "1-2 рабочих дня",
    yourName: "Ваше имя *",
    yourEmail: "Email *",
    yourPhone: "Телефон *",
    subject: "Тема *",
    yourMessage: "Ваше сообщение *",
    attachFile: "Прикрепить файл",
    dragFile: "Перетащите файл сюда или",
    chooseFile: "Выбрать файл",
    fileTypes: "PNG, JPG, PDF, DOC (макс. 5MB)",
    clear: "Очистить",
    send: "Отправить",

    // Form subjects
    chooseSubject: "Выберите тему",
    technical: "Техническая проблема",
    billing: "Проблема с оплатой",
    delivery: "Проблема с доставкой",
    driverIssue: "Проблема с водителем",

    // Chat
    onlineChat: "Онлайн Чат",
    online: "Онлайн",
    responseTimeShort: "Время ответа: 2 минуты",
    supportTeam: "Поддержка Yuk.uz",
    typeMessage: "Введите ваше сообщение...",

    // Notifications
    ratingSubmitted: "Ваша оценка принята! Спасибо!",
    feedbackImportant: "Ваше мнение важно для нас.",
    categoryLoading: "категория загружается...",
    videoLoading: "видео открывается в окне...",
    callNumber: "Звонок: +998 90 123 45 67",
    searchEmpty: "Пожалуйста, введите поисковый запрос!",
    searching: "Поиск выполняется...",
    fillAllFields: "Пожалуйста, заполните все поля!",
    sendingRequest: "Ваш запрос отправляется...",
    requestSent: "Ваш запрос успешно отправлен! Оператор свяжется с вами в ближайшее время.",
    fileUploaded: "Файл загружен:",

    // Chat responses
    chatGreeting: "Здравствуйте! Добро пожаловать в службу поддержки Yuk.uz. Чем я могу вам помочь?",
    chatHelp: "Если у вас есть вопросы, напишите мне. Я постараюсь быстро ответить вам.",
    userMessage: "Здравствуйте, есть проблема с добавлением груза. Система пишет \"Ошибка\".",
    supportResponse: "Извините за проблему. Пожалуйста, можете сказать, какая ошибка появляется? Или вы можете отправить скриншот экрана.",
    chatResponses: [
      "Понятно. Проверим эту проблему.",
      "Пожалуйста, подождите немного, попытаемся решить проблему.",
      "Извините за такие ситуации. Сообщу технической группе.",
      "Можете предоставить дополнительную информацию о проблеме?",
      "Спасибо за вашу помощь. Решим в ближайшее время."
    ]
  },
  en: {
    // Page header
    heroTitle: "Help Center",
    heroSubtitle: "Find answers to any questions or contact us",

    // Quick links
    quickLinks: "Quick Navigation",
    helpCenter: "Help Center",
    search: "Search",
    categories: "Categories",
    faq: "FAQ",
    tutorials: "Video Tutorials",
    contact: "Contact Center",
    chat: "Online Chat",

    // Contact card
    support247: "24/7 Support",
    supportDescription: "Get help anytime",
    callNow: "Call Now",
    whatsapp: "Via WhatsApp",
    workingHours: "Mon-Fri: 09:00-18:00",

    // Search section
    whatHelpNeeded: "What help do you need?",
    searchPlaceholder: "Example: 'How to add cargo?', 'How to calculate price?', 'Cargo tracking'...",

    // Search tips
    addCargo: "Add cargo",
    paymentMethods: "Payment methods",
    chooseDriver: "Choose driver",
    trackCargo: "Track cargo",
    contract: "Contract",
    cancel: "Cancel",

    // Categories
    helpCategories: "Help Categories",
    viewAll: "View All",

    // Category titles
    addCargoCat: "Add Cargo",
    drivers: "Drivers",
    paymentPrices: "Payment & Prices",
    trackingMap: "Tracking & Map",
    securityPrivacy: "Security & Privacy",
    settingsAccount: "Settings & Account",

    // Category counts
    articlesCount: "articles",

    // FAQ
    faqTitle: "Frequently Asked Questions",
    viewAllQuestions: "View All Questions",
    helpful: "Helpful",
    notHelpful: "Not Helpful",

    // FAQ questions
    faq1: "How to add cargo and calculate the price?",
    faq2: "How to track cargo and check its status?",
    faq3: "How to make payment and what methods are available?",
    faq4: "Can I cancel cargo and will money be refunded?",
    faq5: "How to choose a driver and what is their rating?",

    // FAQ answers
    faqAnswer1: `To add cargo, follow these steps:\n\n1. Click "Add cargo" button\n2. Enter cargo details (from, to, weight, volume)\n3. Select cargo type and vehicle type\n4. Price calculator will automatically calculate\n5. Confirm the offer and wait for driver\n\nPrice is calculated based on distance, weight, cargo type, vehicle type and delivery time.`,
    faqAnswer2: `There are several ways to track cargo:\n\n1. Tracking through map:\n   • Go to map panel\n   • Enter cargo ID\n   • See real-time movement\n\n2. Through notifications:\n   • You will get push notifications for each status change\n   • Updates via SMS\n   • Status messages via email\n\n3. By phone:\n   • Direct contact with driver\n   • Support service: +998 90 123 45 67`,
    faqAnswer3: `We accept the following payment methods:\n\n1. Online payments:\n   • Visa, MasterCard, Humo, UzCard\n   • Click (5% discount)\n   • Payme (3% discount)\n   • Apelsin (2% discount)\n\n2. Cash payment:\n   • To driver upon cargo delivery\n   • At platform office\n\n3. Bank transfer:\n   • For corporate clients\n   • Monthly billing\n\nAll payments are secure and certified. Each transaction is insured.`,
    faqAnswer4: `Cargo cancellation policy:\n\n1. Cargo not loaded:\n   • 100% money refund\n   • To your account within 24 hours\n\n2. Cargo loaded but not dispatched:\n   • 70% money refund\n   • 30% compensation to driver\n\n3. Cargo in transit:\n   • No money refund\n   • Can change destination address\n   • Additional payment required\n\nTo cancel, select cargo in "Cargo" panel and click "Cancel" button.`,
    faqAnswer5: `Driver selection process:\n\n1. Automatic selection:\n   • Platform automatically selects best offer\n   • Based on rating, price, distance\n\n2. Manual selection:\n   • Go to "Drivers" panel\n   • Use filters (rating, vehicle, price)\n   • Select driver and send offer\n\nRating system:\n   • 5-star rating\n   • Rate after each shipment\n   • Rating based on:\n     ✓ Timeliness\n     ✓ Cargo condition\n     ✓ Service quality\n     ✓ Response time\n\nMinimum trusted rating: 4.0 ★`,

    // Tutorials
    videoTutorials: "Video Tutorials",
    viewAllVideos: "View All Videos",
    tutorial1: "Add cargo - Complete guide",
    tutorial2: "Track cargo in real time",
    tutorial3: "Price calculator - How to use?",

    // Tutorial views/date
    views: "views",

    // Contact form
    contactUs: "Contact Us",
    responseTime: "Response time:",
    daysResponse: "1-2 business days",
    yourName: "Your Name *",
    yourEmail: "Email *",
    yourPhone: "Phone *",
    subject: "Subject *",
    yourMessage: "Your Message *",
    attachFile: "Attach File",
    dragFile: "Drag file here or",
    chooseFile: "Choose File",
    fileTypes: "PNG, JPG, PDF, DOC (max 5MB)",
    clear: "Clear",
    send: "Send",

    // Form subjects
    chooseSubject: "Choose subject",
    technical: "Technical issue",
    billing: "Billing issue",
    delivery: "Delivery issue",
    driverIssue: "Driver issue",

    // Chat
    onlineChat: "Online Chat",
    online: "Online",
    responseTimeShort: "Response time: 2 minutes",
    supportTeam: "Yuk.uz Support",
    typeMessage: "Type your message...",

    // Notifications
    ratingSubmitted: "Your rating has been submitted! Thank you!",
    feedbackImportant: "Your feedback is important to us.",
    categoryLoading: "category loading...",
    videoLoading: "video opening in window...",
    callNumber: "Calling: +998 90 123 45 67",
    searchEmpty: "Please enter search query!",
    searching: "Searching...",
    fillAllFields: "Please fill all fields!",
    sendingRequest: "Your request is being sent...",
    requestSent: "Your request has been sent successfully! Operator will contact you soon.",
    fileUploaded: "File uploaded:",

    // Chat responses
    chatGreeting: "Hello! Welcome to Yuk.uz support service. How can I help you?",
    chatHelp: "If you have any questions, write to me. I'll try to respond quickly.",
    userMessage: "Hello, I have a problem adding cargo. The system says \"Error\".",
    supportResponse: "Sorry for the problem. Please, can you tell what error is appearing? Or you can send a screenshot.",
    chatResponses: [
      "Understood. Let's check this problem.",
      "Please wait a bit, I'll try to solve the problem.",
      "Sorry for such situations. I'll inform the technical team.",
      "Can you provide additional information about the problem?",
      "Thanks for your help. We'll solve it soon."
    ]
  }
};

const Yordam = ({ currentLang = 'uz' }) => {
  // Tarjima obyektini olish
  const t = translations[currentLang] || translations['uz'];

  // FAQ state
  const [openFaqs, setOpenFaqs] = useState([1]);
  const [helpfulVotes, setHelpfulVotes] = useState({
    1: { helpful: 124, notHelpful: 12 },
    2: { helpful: 89, notHelpful: 8 },
    3: { helpful: 156, notHelpful: 15 },
    4: { helpful: 67, notHelpful: 23 },
    5: { helpful: 94, notHelpful: 11 }
  });

  // Form state
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: '', file: null
  });

  // Chat state
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'support', text: t.chatGreeting, time: '15:30' },
    { id: 2, sender: 'support', text: t.chatHelp, time: '15:31' },
    { id: 3, sender: 'user', text: t.userMessage, time: '15:32' },
    { id: 4, sender: 'support', text: t.supportResponse, time: '15:32' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [notification, setNotification] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('help-center');
  const fileInputRef = useRef(null);

  // Intersection Observer for active section highlighting
  useEffect(() => {
    const sections = ['help-center', 'search', 'categories', 'faq', 'tutorials', 'contact', 'chat'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: '-100px 0px -50% 0px' }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Data
  const categories = [
    { id: 1, title: t.addCargoCat, count: `12 ${t.articlesCount}`, icon: FaBox },
    { id: 2, title: t.drivers, count: `8 ${t.articlesCount}`, icon: FaTruck },
    { id: 3, title: t.paymentPrices, count: `15 ${t.articlesCount}`, icon: FaMoneyBillWave },
    { id: 4, title: t.trackingMap, count: `6 ${t.articlesCount}`, icon: FaMapMarkedAlt },
    { id: 5, title: t.securityPrivacy, count: `10 ${t.articlesCount}`, icon: FaUserShield },
    { id: 6, title: t.settingsAccount, count: `7 ${t.articlesCount}`, icon: FaCog }
  ];

  const quickLinks = [
    { id: 'help-center', title: t.helpCenter, icon: FaHome },
    { id: 'search', title: t.search, icon: FaSearch },
    { id: 'categories', title: t.categories, icon: FaCog },
    { id: 'faq', title: t.faq, icon: FaQuestionCircle },
    { id: 'tutorials', title: t.tutorials, icon: FaPlayCircle },
    { id: 'contact', title: t.contact, icon: FaHeadset },
    { id: 'chat', title: t.chat, icon: FaComments }
  ];

  const searchTips = [t.addCargo, t.paymentMethods, t.chooseDriver, t.trackCargo, t.contract, t.cancel];
  const tutorials = [
    { id: 1, title: t.tutorial1, duration: '5:24', views: '1.2k', date: '2 hafta oldin' },
    { id: 2, title: t.tutorial2, duration: '7:15', views: '890', date: '1 oy oldin' },
    { id: 3, title: t.tutorial3, duration: '4:38', views: '1.5k', date: '3 kun oldin' }
  ];

  // FAQ Data
  const faqData = [
    {
      id: 1,
      question: t.faq1,
      answer: t.faqAnswer1
    },
    {
      id: 2,
      question: t.faq2,
      answer: t.faqAnswer2
    },
    {
      id: 3,
      question: t.faq3,
      answer: t.faqAnswer3
    },
    {
      id: 4,
      question: t.faq4,
      answer: t.faqAnswer4
    },
    {
      id: 5,
      question: t.faq5,
      answer: t.faqAnswer5
    }
  ];

  // Helper functions
  const toggleFaq = (id) => {
    setOpenFaqs(prev => prev.includes(id) ? prev.filter(faqId => faqId !== id) : [...prev, id]);
  };

  const markHelpful = (faqId, type) => {
    setHelpfulVotes(prev => ({
      ...prev,
      [faqId]: { ...prev[faqId], [type]: prev[faqId][type] + 1 }
    }));
    const message = type === 'helpful' ? t.ratingSubmitted : t.feedbackImportant;
    showNotification(message, 'success');
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, subject, message } = formData;

    if (!name || !email || !phone || !subject || !message) {
      showNotification(t.fillAllFields, 'error');
      return;
    }

    showNotification(t.sendingRequest, 'success');

    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', file: null });
      showNotification(t.requestSent, 'success');
    }, 1500);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, file }));
      showNotification(`${t.fileUploaded} ${file.name}`, 'success');
    }
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;

    const newMessage = {
      id: chatMessages.length + 1,
      sender: 'user',
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newMessage]);
    setChatInput('');

    setTimeout(() => {
      const responses = t.chatResponses;

      const supportMessage = {
        id: chatMessages.length + 2,
        sender: 'support',
        text: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, supportMessage]);
    }, 2000);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      showNotification(t.searchEmpty, 'warning');
      return;
    }
    showNotification(t.searching, 'success');
  };

  const callSupport = () => {
    showNotification(t.callNumber, 'success');
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/998901234567?text=Salom! Yuk.uz yordam markazidan yozmoqdaman.', '_blank');
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };
  return (<>
    <div className="min-h-screen bg-linear-to-br container mx-auto">
      {/* Main Content */}
      <main className="py-8 from-blue-50 to-purple-50 text-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header with ID */}
          <div id="help-center" className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{t.heroTitle}</h1>
            <p className="text-gray-600">{t.heroSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
            {/* Sidebar */}
            <div className="space-y-6 lg:sticky lg:top-24 h-fit">
              {/* Quick Links */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3"><FaBolt className="text-blue-600" />{t.quickLinks}</h3>
                <div className="space-y-1">
                  {quickLinks.map((link) => (
                    <button key={link.id} onClick={() => scrollToSection(link.id)} className={`w-full text-left flex items-center gap-3 py-3 px-4 rounded-xl font-medium transition-all ${activeSection === link.id ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-600 hover:text-white'}`}> <link.icon className="w-5" /> {link.title}</button>
                  ))}
                </div>
              </div>
              {/* Contact Card */}
              <div className="bg-linear-to-br from-blue-600 to-purple-700 text-white rounded-2xl p-6 text-center">
                <div className="w-15 h-15 bg-white/20 rounded-full flex items-center justify-center text-2xl mx-auto mb-4"><FaHeadset /></div>
                <h3 className="text-xl font-bold mb-2">{t.support247}</h3>
                <p className="opacity-90 text-sm mb-6">{t.supportDescription}</p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <FaPhone className="opacity-90" />
                    <span>+998 90 123 45 67</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <FaEnvelope className="opacity-90" />
                    <span>support@yuk.uz</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <FaClock className="opacity-90" />
                    <span>{t.workingHours}</span>
                  </div>
                </div>
                <button onClick={callSupport} className="w-full py-3 rounded-xl font-semibold text-sm bg-white text-blue-600 flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-lg transition-all"><FaPhone /> {t.callNow}</button>
                <button onClick={openWhatsApp} className="w-full py-3 rounded-xl font-semibold text-sm bg-transparent border border-white/30 text-white flex items-center justify-center gap-2 mt-3 hover:bg-white/10 transition-all"><FaWhatsapp /> {t.whatsapp}</button>
              </div>
            </div>
            {/* Main Content */}
            <div className="space-y-8">
              {/* Search Section with ID */}
              <section id="search" className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.whatHelpNeeded}</h2>
                  <p className="text-gray-600 text-sm">{t.heroSubtitle}</p>
                </div>
                <div className="relative mb-4">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" className="w-full py-3 px-4 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder={t.searchPlaceholder} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} />
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {searchTips.map((tip) => (
                    <button key={tip} onClick={() => { setSearchQuery(tip); handleSearch(); }} className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-blue-600 hover:text-white transition-all">{tip}</button>
                  ))}
                </div>
              </section>
              {/* Categories Section with ID */}
              <section id="categories" className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{t.helpCategories}</h2>
                  <button onClick={() => scrollToSection('categories')} className="text-blue-600 font-semibold text-sm flex items-center gap-2">{t.viewAll} <FaArrowRight /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category, index) => (
                    <button key={category.id} onClick={() => showNotification(`${category.title} ${t.categoryLoading}`, 'success')} className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center hover:-translate-y-1 hover:shadow-lg hover:border-blue-500 transition-all">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl mb-4 ${index % 6 === 0 ? 'bg-linear-to-br from-blue-600 to-blue-500' : index % 6 === 1 ? 'bg-linear-to-br from-purple-700 to-purple-500' : index % 6 === 2 ? 'bg-linear-to-br from-cyan-500 to-cyan-400' : index % 6 === 3 ? 'bg-linear-to-br from-yellow-500 to-yellow-400' : index % 6 === 4 ? 'bg-linear-to-br from-pink-600 to-pink-400' : 'bg-linear-to-br from-teal-500 to-cyan-400'}`}><category.icon /></div>
                      <h3 className="font-semibold text-gray-900 mb-1">{category.title}</h3>
                      <span className="text-xs text-gray-500">{category.count}</span>
                    </button>
                  ))}
                </div>
              </section>
              {/* FAQ Section with ID */}
              <section id="faq" className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{t.faqTitle}</h2>
                  <button onClick={() => scrollToSection('faq')} className="text-blue-600 font-semibold text-sm flex items-center gap-2">{t.viewAllQuestions}<FaArrowRight /></button>
                </div>
                <div className="space-y-3">
                  {faqData.map((faq) => (
                    <div key={faq.id} className="border border-gray-200 rounded-xl overflow-hidden">
                      <div className={`py-4 px-6 flex items-center justify-between cursor-pointer transition-all ${openFaqs.includes(faq.id) ? 'bg-blue-600 text-white' : 'bg-gray-50 hover:bg-gray-100'}`} onClick={() => toggleFaq(faq.id)}>
                        <span className="font-semibold text-sm">{faq.question}</span><FaChevronDown className={`transition-all ${openFaqs.includes(faq.id) ? 'rotate-180 text-white' : 'text-gray-500'}`} />
                      </div>
                      <div className={`overflow-hidden transition-all ${openFaqs.includes(faq.id) ? 'max-h-125 py-6 px-6' : 'max-h-0'}`}>
                        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{faq.answer}</p>
                        <div className="flex gap-2 mt-4">
                          <button onClick={() => markHelpful(faq.id, 'helpful')} className="py-2 px-4 rounded-lg border border-gray-300 text-sm hover:bg-gray-50 flex items-center gap-2"><FaThumbsUp /> {t.helpful} ({helpfulVotes[faq.id]?.helpful})</button>
                          <button onClick={() => markHelpful(faq.id, 'notHelpful')} className="py-2 px-4 rounded-lg border border-gray-300 text-sm hover:bg-gray-50 flex items-center gap-2"><FaThumbsDown /> {t.notHelpful} ({helpfulVotes[faq.id]?.notHelpful})</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              {/* Video Tutorials Section with ID */}
              <section id="tutorials" className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{t.videoTutorials}</h2>
                  <button onClick={() => scrollToSection('tutorials')} className="text-blue-600 font-semibold text-sm flex items-center gap-2">{t.viewAllVideos}<FaArrowRight /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {tutorials.map((tutorial) => (
                    <div key={tutorial.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all">
                      <div className="relative h-40 bg-linear-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                        <button onClick={() => showNotification(`"${tutorial.title}" ${t.videoLoading}`, 'success')} className="absolute w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-blue-600 text-xl cursor-pointer hover:scale-110 transition-all"><FaPlay /></button>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">{tutorial.duration}</div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 text-sm mb-2">{tutorial.title}</h3>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span className="flex items-center gap-1"><FaEye /> {tutorial.views} {t.views}</span>
                          <span className="flex items-center gap-1"><FaCalendar /> {tutorial.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              {/* Contact Form Section with ID */}
              <section id="contact" className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{t.contactUs}</h2>
                  <div className="text-sm text-gray-600">{t.responseTime} <strong>{t.daysResponse}</strong></div>
                </div>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-gray-700 text-sm flex items-center gap-2 mb-2"><FaUser className="text-blue-600" /> {t.yourName}</label>
                      <input name="name" value={formData.name} onChange={handleFormChange} required className="w-full py-2.5 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-700 text-sm flex items-center gap-2 mb-2"><FaEnvelope className="text-blue-600" /> {t.yourEmail}</label>
                      <input type="email" name="email" value={formData.email} onChange={handleFormChange} required className="w-full py-2.5 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-gray-700 text-sm flex items-center gap-2 mb-2"><FaPhone className="text-blue-600" /> {t.yourPhone}</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} required className="w-full py-2.5 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-700 text-sm flex items-center gap-2 mb-2"><FaTag className="text-blue-600" /> {t.subject}</label>
                      <select name="subject" value={formData.subject} onChange={handleFormChange} required className="w-full py-2.5 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">{t.chooseSubject}</option>
                        <option value="technical">{t.technical}</option>
                        <option value="billing">{t.billing}</option>
                        <option value="delivery">{t.delivery}</option>
                        <option value="driver">{t.driverIssue}</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="font-semibold text-gray-700 text-sm flex items-center gap-2 mb-2"><FaComment className="text-blue-600" /> {t.yourMessage}</label>
                    <textarea name="message" value={formData.message} onChange={handleFormChange} required rows={4} className="w-full py-2.5 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="font-semibold text-gray-700 text-sm flex items-center gap-2 mb-2"><FaPaperclip className="text-blue-600" /> {t.attachFile}</label>
                    <div onClick={() => fileInputRef.current.click()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors">
                      <FaCloudUploadAlt className="text-gray-400 text-2xl mx-auto mb-2" />
                      <p className="text-gray-600 text-sm">{t.dragFile}</p>
                      <button type="button" className="mt-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">{t.chooseFile}</button>
                      <p className="text-xs text-gray-500 mt-2">{t.fileTypes}</p>
                    </div>
                    <input ref={fileInputRef} type="file" onChange={handleFileUpload} className="hidden" />
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <button type="button" onClick={() => setFormData({ name: '', email: '', phone: '', subject: '', message: '', file: null })} className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50">{t.clear}</button>
                    <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"><FaPaperPlane /> {t.send}</button>
                  </div>
                </form>
              </section>
              {/* Chat Support Section with ID */}
              <section id="chat" className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{t.onlineChat}</h2>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>{t.online}</span>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-xl overflow-hidden h-96 flex flex-col">
                  <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
                    <div className="font-semibold">{t.supportTeam}</div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>{t.responseTimeShort}</span>
                    </div>
                  </div>
                  <div className="flex-1 p-4 overflow-y-auto space-y-3">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`max-w-[80%] p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-600 text-white ml-auto' : 'bg-gray-100'}`}>
                        <p className="text-sm">{msg.text}</p>
                        <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t flex gap-2">
                    <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={t.typeMessage} />
                    <button onClick={sendMessage} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><FaPaperPlane /></button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white flex items-center gap-3 animate-slide-in-right ${notification.type === 'success' ? 'bg-green-500' : notification.type === 'error' ? 'bg-red-500' : 'bg-yellow-500'}`}>
          {notification.type === 'success' ? <FaCheckCircle /> : notification.type === 'error' ? <FaTimesCircle /> : <FaExclamationCircle />}
          <span>{notification.message}</span>
        </div>
      )}
    </div>
  </>);
};

export default Yordam;
