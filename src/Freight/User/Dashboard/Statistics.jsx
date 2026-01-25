import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import { FaChartLine, FaCalendarAlt, FaChevronDown, FaBoxOpen, FaPlus } from "react-icons/fa";

const COLORS = ['#4361ee', '#7209b7', '#f72585'];

const translate = {
    uz: {
        heroTitle: "Analitika va Statistika",
        heroDesc: "Biznesingiz ko'rsatkichlarini kuzatib boring",
        last: "Oxirgi",
        day: "kun",
        year: "Shu yil"
    },

    ru: {
        heroTitle: "Аналитика и статистика",
        heroDesc: "Отслеживайте показатели своего бизнеса.",
        last: "Последний",
        day: "день",
        year: "В этом году"
    },

    en: {
        heroTitle: "Analytics and Statistics",
        heroDesc: "Track your business metrics",
        last: "Last",
        day: "day",
        year: "This year"
    }
}

const Statistics = ({ currentLang }) => {
    const navigate = useNavigate();
    const [rawFreightData, setRawFreightData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('7');

    const t = translate[currentLang || 'uz']

    const baseUrl = 'https://tokennoty.pythonanywhere.com/api/freight/?owner__username=';

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) { navigate('/login'); return; }

            try {
                const userRes = await fetch('https://tokennoty.pythonanywhere.com/api/users/', {
                    method: 'GET',
                    headers: { 'Authorization': `Token ${token}` }
                });
                if (userRes.status === 401) { navigate('/login'); return; }

                const users = await userRes.json();
                const currentUser = Array.isArray(users) ? users[0] : users;

                const freightRes = await fetch(baseUrl + (currentUser?.username || ""), {
                    method: 'GET',
                    headers: { 'Authorization': `Token ${token}` }
                });
                const freightData = await freightRes.json();
                setRawFreightData(Array.isArray(freightData) ? freightData : []);
            } catch (error) {
                console.error("Xatolik:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [navigate]);

    const processed = useMemo(() => {
        const now = new Date();
        const filtered = rawFreightData.filter(item => {
            const itemDate = new Date(item.created_at);
            const diffDays = (now - itemDate) / (1000 * 60 * 60 * 24);
            return diffDays <= parseInt(timeRange);
        });

        const dailyMap = {};
        filtered.forEach(item => {
            const dateStr = new Date(item.created_at).toLocaleDateString('uz-UZ', { weekday: 'short' });
            if (!dailyMap[dateStr]) {
                dailyMap[dateStr] = { name: dateStr, yuklar: 0, daromad: 0 };
            }
            dailyMap[dateStr].yuklar += Number(item.weight || 0);
            dailyMap[dateStr].daromad += parseFloat(item.freight_rate_amount || 0);
        });

        const statusCounts = { 'Yetkazilgan': 0, 'Yo\'lda': 0, 'Kutilmoqda': 0 };
        filtered.forEach(item => {
            const s = item.status?.toLowerCase();
            if (s === 'delivered' || s === 'completed') statusCounts['Yetkazilgan']++;
            else if (s === 'shipped' || s === 'in transit') statusCounts['Yo\'lda']++;
            else statusCounts['Kutilmoqda']++;
        });

        return {
            chartData: Object.values(dailyMap),
            pieData: Object.keys(statusCounts).map(key => ({ name: key, value: statusCounts[key] })),
            totalRevenue: filtered.reduce((acc, curr) => acc + parseFloat(curr.freight_rate_amount || 0), 0),
            count: filtered.length,
            hasData: filtered.length > 0
        };
    }, [rawFreightData, timeRange]);

    // Ma'lumot yo'q bo'lganda chiqadigan chiroyli UI
    const EmptyState = () => (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-4xl border border-dashed border-slate-200 shadow-sm">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <FaBoxOpen className="text-slate-300 text-5xl" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">Hozircha ma'lumot mavjud emas</h3>
            <p className="text-slate-500 text-center max-w-sm mb-8">
                Tanlangan vaqt oralig'ida ({timeRange} kun) hech qanday yuk tashuvlari topilmadi.
            </p>
        </div>
    );

    if (loading) return (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium animate-pulse">Statistika yuklanmoqda...</p>
        </div>
    );

    return (
        <div className="space-y-6 pb-10">
            {/* Sarlavha qismi doim ko'rinadi (Filtr uchun) */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-4xl border border-slate-100 shadow-sm gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">{t.heroTitle}</h2>
                    <p className="text-slate-500 text-sm">Biznesingiz ko'rsatkichlarini kuzatib boring</p>
                </div>
                <div className="relative">
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="appearance-none bg-slate-50 border border-slate-100 py-2.5 px-5 pr-12 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all"
                    >
                        <option value="7">Oxirgi 7 kun</option>
                        <option value="30">Oxirgi 30 kun</option>
                        <option value="365">Shu yil</option>
                    </select>
                    <FaChevronDown className="absolute right-4 top-3.5 text-slate-400 text-[10px]" />
                </div>
            </div>

            {!processed.hasData ? (
                <EmptyState />
            ) : (
                <>
                    {/* Grafiklar gridi */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm">
                            <h3 className="font-bold text-slate-700 mb-6">Yuklar hajmi (kg)</h3>
                            <div className="h-75 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={processed.chartData}>
                                        <defs>
                                            <linearGradient id="colorYuk" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#4361ee" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#4361ee" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                        <YAxis hide />
                                        <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                        <Area type="monotone" dataKey="yuklar" stroke="#4361ee" strokeWidth={3} fillOpacity={1} fill="url(#colorYuk)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm">
                            <h3 className="font-bold text-slate-700 mb-6">Daromad (UZS)</h3>
                            <div className="h-75 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={processed.chartData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                        <Tooltip
                                            cursor={{ fill: '#f8fafc' }}
                                            contentStyle={{ borderRadius: '16px', border: 'none' }}
                                            formatter={(value) => new Intl.NumberFormat('uz-UZ').format(value) + ' so\'m'}
                                        />
                                        <Bar dataKey="daromad" fill="#7209b7" radius={[10, 10, 0, 0]} barSize={30} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1 bg-white p-6 rounded-4xl border border-slate-100 shadow-sm flex flex-col items-center">
                            <h3 className="font-bold text-slate-700 mb-4 w-full">Holat taqsimoti</h3>
                            <div className="h-50 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={processed.pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                            {processed.pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex flex-wrap justify-center gap-4 mt-2">
                                {processed.pieData.map((item, i) => (
                                    <div key={i} className="flex items-center gap-1 text-[10px] font-medium text-slate-500">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                                        {item.name}: {item.value}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-2 bg-linear-to-br from-[#4361ee] to-[#7209b7] p-8 rounded-4xl text-white relative overflow-hidden flex flex-col justify-center">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-2">Umumiy hisob</h3>
                                <p className="opacity-90 text-lg mb-1">
                                    Jami daromad: <span className="font-bold">{processed.totalRevenue.toLocaleString()} UZS</span>
                                </p>
                                <p className="opacity-80 text-sm">Tanlangan davrda {processed.count} ta yuk tashuv amalga oshirildi.</p>
                            </div>
                            <FaChartLine className="absolute -right-10 -bottom-10 text-white opacity-10 text-[200px]" />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Statistics;
