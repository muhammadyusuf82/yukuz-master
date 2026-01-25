import React, { useEffect, useState, useMemo } from "react";
import {
  FaMapMarkerAlt, FaFlagCheckered, FaBox, FaClock,
  FaArrowUp, FaArrowDown, FaWallet, FaCheckCircle, FaInbox,
  FaEdit, FaTrash, FaTimes
} from "react-icons/fa";

const translation = {
  uz: {
    myCargos: "Men yetkazgan yuklar",
    myPlacedCargos: "Men joylagan yuklar",
    totalLoads: "Umumiy yuklar",
    delivered: "Yetkazilgan",
    inProgress: "Jarayonda",
    totalIncome: "Jami daromad",
    money: " ming",
    loading: "Yukni yuklash",
    unloading: "Yukni tushirish",
    weight: "Og'irlik",
    size: "Hajm",
    details: "Batafsil",
    loadingData: "Ma'lumotlar yuklanmoqda",
    noCargos: "Yuklaringiz yo'q",
    noCargosYet: "Hozircha hech qanday yuk topilmadi.",
    price: "Narxi",
    desc: "Tavsif",
    cancel: "Bekor qilish",
    save: "Saqlash",
    edit: "Yukni tahrirlash"
  },

  ru: {
    myCargos: "Доставленные мной товары",
    myPlacedCargos: "Багаж, который я положил",
    totalLoads: "Все грузы",
    delivered: "Доставлено",
    inProgress: "В процессе",
    totalIncome: "Совокупный доход",
    money: " тысяча",
    loading: "Погрузка груза",
    unloading: "Разгрузка",
    weight: "Масса",
    size: "Размер",
    details: "Подробнее",
    loadingData: "Загрузка данных",
    noCargos: "У вас нет багажа",
    noCargosYet: "Груз пока не найден.",
    price: "Цена",
    desc: "Описание",
    cancel: "Отмена",
    save: "Сохранять",
    edit: "Редактировать загрузку"
  },

  en: {
    myCargos: "The goods I delivered",
    myPlacedCargos: "The luggage I have placed",
    totalLoads: "Total loads",
    delivered: "Delivered",
    inProgress: "In progress",
    totalIncome: "Total income",
    money: " thousand",
    loading: "Loading cargo",
    unloading: "Unloading",
    weight: "Weight",
    size: "Size",
    details: "More details",
    loadingData: "Loading data",
    noCargos: "You have no luggage",
    noCargosYet: "No cargo has been found yet.",
    price: "Price",
    desc: "Description",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit load"
  }
}

const MyCargos = ({ onFreightDetail, currentLang }) => {
  const baseUrl = 'https://tokennoty.pythonanywhere.com/api/freight/?owner__username='
  const [user, setUser] = useState(null)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const t = translation[currentLang || 'uz']

  // Tahrirlash modal holatlari
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedFreight, setSelectedFreight] = useState(null)
  const [editFormData, setEditFormData] = useState({})

  const loadData = async () => {
    setLoading(true);
    let token = localStorage.getItem('token')
    // if (!token) token = await getAuthToken();

    try {
      const userRes = await fetch('https://tokennoty.pythonanywhere.com/api/users/', {
        method: 'GET',
        headers: { 'Authorization': `Token ${token}` }
      })
      const users = await userRes.json()
      const currentUser = Array.isArray(users) ? users[0] : users;
      setUser(currentUser)

      const freightRes = await fetch(baseUrl + (currentUser?.username || ""), {
        method: 'GET',
        headers: { 'Authorization': `Token ${token}` }
      })
      const freightData = await freightRes.json()
      setData(Array.isArray(freightData) ? freightData : [])
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // O'chirish funksiyasi
  const handleDelete = async (id) => {
    if (window.confirm("Rostdan ham ushbu yukni o'chirmoqchimisiz?")) {
      let token = localStorage.getItem('access_token');
      try {
        const res = await fetch(`https://tokennoty.pythonanywhere.com/api/freight/${id}/`, {
          method: 'DELETE',
          headers: { 'Authorization': `Token ${token}` }
        });
        if (res.ok) {
          alert("Yuk muvaffaqiyatli o'chirildi");
          loadData(); // Ma'lumotlarni qayta yuklash
        }
      } catch (error) {
        console.error("O'chirishda xato:", error);
      }
    }
  }

  // Tahrirlash modalini ochish
  const openEditModal = (item) => {
    setSelectedFreight(item);
    setEditFormData({
      weight: item.weight,
      volume: item.volume,
      freight_rate_amount: item.freight_rate_amount,
      description_uz: item.description_uz || "",
      vehicle_category: item.vehicle_category || "van"
    });
    setIsEditModalOpen(true);
  }

  // Tahrirlashni saqlash
  const handleUpdate = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem('access_token');
    try {
      const res = await fetch(`https://tokennoty.pythonanywhere.com/api/freight/${selectedFreight.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(editFormData)
      });
      if (res.ok) {
        alert("Ma'lumotlar yangilandi");
        setIsEditModalOpen(false);
        loadData();
      }
    } catch (error) {
      console.error("Yangilashda xato:", error);
    }
  }

  // Statistika hisoblash
  const statistics = useMemo(() => {
    const totalCount = data.length;
    const deliveredCount = data.filter(item => item.is_shipped === true).length;
    const inProgressCount = data.filter(item => item.status === "waiting for driver").length;
    const totalEarnings = data.reduce((sum, item) => sum + parseFloat(item.freight_rate_amount || 0), 0);
    const getPercent = (count) => totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;

    return {
      totalCount, deliveredCount, inProgressCount, totalEarnings,
      percentTotal: 100,
      percentDelivered: getPercent(deliveredCount),
      percentInProgress: getPercent(inProgressCount),
      percentEarnings: totalEarnings > 0 ? 15 : 0
    };
  }, [data]);

  const formatMoney = (amount) => {
    if (amount >= 1000000) return (amount / 1000000).toFixed(1).replace(/\.0$/, '') + ' mln';
    if (amount >= 1000) return (amount / 1000).toFixed(1).replace(/\.0$/, '') + t.money;
    return amount;
  };

  const results = [
    { id: 1, icon: FaBox, icon_color: '#4361ee', icon_bg: '#eceffd', benefit: true, percent: statistics.percentTotal, total: statistics.totalCount, title: t.totalLoads },
    { id: 2, icon: FaCheckCircle, icon_color: '#4cc9f0', icon_bg: '#edf9fd', benefit: true, percent: statistics.percentDelivered, total: statistics.deliveredCount, title: t.delivered },
    { id: 3, icon: FaClock, icon_color: '#ffcc02', icon_bg: '#fff9e6', benefit: statistics.percentInProgress < 50, percent: statistics.percentInProgress, total: statistics.inProgressCount, title: t.inProgress },
    { id: 4, icon: FaWallet, icon_color: '#f72585', icon_bg: '#fee9f3', benefit: true, percent: statistics.percentEarnings, total: formatMoney(statistics.totalEarnings), title: t.totalIncome },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600 mb-2"></div>
        <p className="text-gray-500 text-sm font-medium">{t.loadingData}...</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-50 min-h-screen px-4 pb-10">
        <h1 className="text-2xl font-bold text-blue-900 pt-6">
          {user?.role === 'driver' ? t.myCargos : t.myPlacedCargos}
        </h1>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 py-6">
          {results.map((item, index) => (
            <div key={index} className="bg-white shadow-sm rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: item.icon_bg }}>
                  <item.icon className="text-xl" style={{ color: item.icon_color }} />
                </div>
                <p className='flex gap-1 items-center rounded-lg py-1 px-2 text-xs font-bold' style={{
                  background: item.benefit ? '#edf9fd' : '#fee9f3',
                  color: item.benefit ? '#67d1f3' : '#f72585'
                }}>
                  {item.benefit ? <FaArrowUp /> : <FaArrowDown />}
                  <span>{item.percent}%</span>
                </p>
              </div>
              <h1 className='text-2xl font-bold mt-4 text-gray-800'>{item.total}</h1>
              <h3 className='text-xs text-gray-400 uppercase font-bold tracking-wider mt-1'>{item.title}</h3>
            </div>
          ))}
        </div>

        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm">
            <FaInbox className="text-6xl text-gray-200 mb-4" />
            <h3 className="text-gray-500 font-bold">{t.noCargos}</h3>
            <p className="text-gray-400 text-sm">{t.noCargosYet}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-50 transition-all hover:shadow-2xl">
                <div className="bg-blue-600 p-4 flex justify-between items-center">
                  <span className="text-white font-black tracking-widest text-sm uppercase">ID: #{item.id}</span>
                  <div className="flex gap-2">
                    <button onClick={() => openEditModal(item)} className="p-2 bg-white/20 hover:bg-white/40 rounded-lg text-white transition-colors cursor-pointer"><FaEdit /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500/20 hover:bg-red-600 rounded-lg text-white transition-colors cursor-pointer"><FaTrash /></button>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex flex-col items-center gap-1">
                      <FaMapMarkerAlt className="text-blue-600 text-xl" />
                      <div className="w-0.5 h-12 bg-blue-100"></div>
                      <FaFlagCheckered className="text-green-600 text-xl" />
                    </div>
                    <div className="flex flex-col gap-6">
                      <div>
                        <p className="text-gray-400 text-[10px] font-bold uppercase">{t.loading}</p>
                        <p className="text-blue-900 font-semibold">{item.route_starts_where_data?.region || "Noma'lum"}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-[10px] font-bold uppercase">{t.unloading}</p>
                        <p className="text-blue-900 font-semibold">{item.route_ends_where_data?.region || "Noma'lum"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="text-center p-3 bg-blue-50 rounded-xl">
                      <p className="text-blue-800 font-bold">{item.weight} {currentLang === 'ru' ? 'кг' : 'kg'}</p>
                      <p className="text-blue-600 text-[10px] uppercase font-bold">{t.weight}</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-xl">
                      <p className="text-blue-800 font-bold">{item.volume} m³</p>
                      <p className="text-blue-600 text-[10px] uppercase font-bold">{t.size}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t pt-4">
                    <p className="text-blue-600 text-xl font-black leading-5">
                      {item.freight_rate_amount ? parseInt(item.freight_rate_amount).toLocaleString() : '0'} {t.money}
                    </p>
                    <button
                      onClick={() => onFreightDetail('Batafsil', item.id, item)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-sm transition-all"
                    >
                      {t.details}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal - Chiroyli dizaynda */}
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)}></div>
            <div className="bg-white rounded-3xl w-full max-w-md p-6 relative z-10 shadow-2xl animate-in fade-in zoom-in duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">{t.edit}</h2>
                <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2"><FaTimes /></button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">{t.weight} ({currentLang === 'ru' ? 'кг' : 'kg'})</label>
                  <input
                    type="number"
                    value={editFormData.weight}
                    onChange={(e) => setEditFormData({ ...editFormData, weight: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">{t.size} (m³)</label>
                  <input
                    type="text"
                    value={editFormData.volume}
                    onChange={(e) => setEditFormData({ ...editFormData, volume: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">{t.price} (UZS)</label>
                  <input
                    type="text"
                    value={editFormData.freight_rate_amount}
                    onChange={(e) => setEditFormData({ ...editFormData, freight_rate_amount: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">{t.desc} (Uz)</label>
                  <textarea
                    value={editFormData.description_uz}
                    onChange={(e) => setEditFormData({ ...editFormData, description_uz: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none transition-all h-24 resize-none"
                  ></textarea>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors">{t.cancel}</button>
                  <button type="submit" className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95">{t.save}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyCargos;
