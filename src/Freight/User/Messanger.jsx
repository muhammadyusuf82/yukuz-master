import React, { useEffect, useState } from 'react'
import { 
  FaSearch, 
  FaUserCircle, 
  FaClock, 
  FaEnvelope, 
  FaEnvelopeOpen,
  FaUser,
  FaPhone,
  FaTruck,
  FaBox,
  FaStar,
  FaCheckCircle,
  FaComments,
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp
} from "react-icons/fa"
import { CiCircleChevLeft } from "react-icons/ci";
import Chat from './Chat'

const BASE_HTTP_URL = 'https://tokennoty.pythonanywhere.com/api/'

const Messanger = () => {
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeChat, setActiveChat] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterUnread, setFilterUnread] = useState(false)
  const [sortOrder, setSortOrder] = useState('desc') // 'asc' or 'desc'

  useEffect(() => {
    fetchChats()
    
    // Check URL for chat parameter
    const urlParams = new URLSearchParams(window.location.search)
    const chatParam = urlParams.get('chat')
    if (chatParam) {
      setActiveChat(chatParam)
    }
  }, [])

  const fetchChats = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token') || localStorage.getItem('access_token')
      const currentUser = JSON.parse(localStorage.getItem('user'))
      
      if (!token || !currentUser) {
        console.error('User not authenticated')
        setLoading(false)
        return
      }

      // In a real app, you would have an endpoint to fetch all chats
      // For now, we'll simulate with a sample data and later integrate with API
      
      // This is a simulation - replace with actual API call
      setTimeout(() => {
        const sampleChats = [
          {
            id: 1,
            username: "john_doe",
            first_name: "John",
            last_name: "Doe",
            last_message: "Yukni qachon olib ketishingiz mumkin?",
            last_message_time: "2026-01-15T14:30:00Z",
            unread_count: 3,
            freight_id: 123,
            freight_type: "Don mahsulotlari",
            user_type: "owner"
          },
          {
            id: 2,
            username: "jane_smith",
            first_name: "Jane",
            last_name: "Smith",
            last_message: "Taklifingizni ko'rib chiqdim, narzni kelishamiz",
            last_message_time: "2026-01-14T11:20:00Z",
            unread_count: 0,
            freight_id: 124,
            freight_type: "Elektr jihozlari",
            user_type: "owner"
          },
          {
            id: 3,
            username: "bob_wilson",
            first_name: "Bob",
            last_name: "Wilson",
            last_message: "Yukni qabul qildim, rahmat!",
            last_message_time: "2026-01-13T09:15:00Z",
            unread_count: 1,
            freight_id: 125,
            freight_type: "Mebel",
            user_type: "driver"
          },
          {
            id: 4,
            username: "alice_johnson",
            first_name: "Alice",
            last_name: "Johnson",
            last_message: "Kechirasiz, yana bir marta taklif berishim mumkinmi?",
            last_message_time: "2026-01-12T16:45:00Z",
            unread_count: 0,
            freight_id: 126,
            freight_type: "Kiyim-kechak",
            user_type: "owner"
          },
          {
            id: 5,
            username: "charlie_brown",
            first_name: "Charlie",
            last_name: "Brown",
            last_message: "Yuk o'lchamlari to'g'rimi?",
            last_message_time: "2026-01-11T13:10:00Z",
            unread_count: 5,
            freight_id: 127,
            freight_type: "Qurilish materiallari",
            user_type: "owner"
          }
        ]
        
        // For demo, if a chat was passed in URL, add it to the list
        const urlParams = new URLSearchParams(window.location.search)
        const chatParam = urlParams.get('chat')
        if (chatParam && !sampleChats.find(c => c.username === chatParam)) {
          sampleChats.unshift({
            id: 0,
            username: chatParam,
            first_name: "Yangi",
            last_name: "Foydalanuvchi",
            last_message: "Yangi chat",
            last_message_time: new Date().toISOString(),
            unread_count: 1,
            freight_id: null,
            freight_type: "Noma'lum",
            user_type: "owner"
          })
        }
        
        setChats(sampleChats)
        setLoading(false)
      }, 1000)
      
    } catch (error) {
      console.error('Error fetching chats:', error)
      setLoading(false)
    }
  }

  const filteredAndSortedChats = chats
    .filter(chat => {
      const matchesSearch = chat.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           chat.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           chat.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           chat.freight_type.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesUnread = filterUnread ? chat.unread_count > 0 : true
      
      return matchesSearch && matchesUnread
    })
    .sort((a, b) => {
      const timeA = new Date(a.last_message_time).getTime()
      const timeB = new Date(b.last_message_time).getTime()
      return sortOrder === 'desc' ? timeB - timeA : timeA - timeB
    })

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else if (diffDays === 1) {
      return 'Kecha'
    } else if (diffDays < 7) {
      return `${diffDays} kun oldin`
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    }
  }

  const getUserAvatar = (chat) => {
    const colors = [
      'bg-linear-to-br from-blue-500 to-cyan-600',
      'bg-linear-to-br from-purple-500 to-pink-600',
      'bg-linear-to-br from-green-500 to-emerald-600',
      'bg-linear-to-br from-yellow-500 to-orange-600',
      'bg-linear-to-br from-red-500 to-pink-600'
    ]
    const colorIndex = chat.id % colors.length
    return colors[colorIndex]
  }

  const getUserInitials = (chat) => {
    return `${chat.first_name?.[0] || ''}${chat.last_name?.[0] || ''}`.toUpperCase()
  }

  return (
    <div className="flex h-screen bg-linear-to-br from-gray-50 to-blue-50">
      {/* Left Sidebar - Chats List */}
      <div className="w-full lg:w-[35%] border-r border-gray-200 bg-white flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <button onClick={()=>history.back()} className='p-2 bg-linear-to-r from-blue-100 to-purple-100 rounded-xl'><CiCircleChevLeft className='text-xl text-blue-600'/> </button>
              <div className="p-2 bg-linear-to-r from-blue-100 to-purple-100 rounded-xl">
                <FaComments className="text-blue-600 text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Chatlar</h1>
                <p className="text-sm text-gray-500">Barcha suhbatlaringiz</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setFilterUnread(!filterUnread)}
                className={`p-2 rounded-lg ${filterUnread ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                title="Faqat o'qilmaganlar"
              >
                <FaFilter className="text-sm" />
              </button>
              <button
                onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
                title="Tartiblash"
              >
                {sortOrder === 'desc' ? <FaSortAmountDown /> : <FaSortAmountUp />}
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Chatlarni qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Chats List */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-3 text-gray-600">Chatlar yuklanmoqda...</p>
              </div>
            </div>
          ) : filteredAndSortedChats.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-4">
                <FaEnvelope className="text-blue-400 text-2xl" />
              </div>
              <p className="text-lg font-medium">Chatlar topilmadi</p>
              <p className="text-sm text-center mt-1">
                {filterUnread 
                  ? "O'qilmagan xabarlar yo'q" 
                  : "Hali chatlar mavjud emas. Yuk egasi bilan bog'laning."}
              </p>
              {filterUnread && (
                <button
                  onClick={() => setFilterUnread(false)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Barcha chatlarni ko'rish
                </button>
              )}
            </div>
          ) : (
            filteredAndSortedChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveChat(chat.username)}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                  activeChat === chat.username ? 'bg-blue-50 border-r-4 border-r-blue-500' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full ${getUserAvatar(chat)} flex items-center justify-center text-white font-bold`}>
                      {getUserInitials(chat)}
                    </div>
                    {chat.unread_count > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-bold">{chat.unread_count}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-800 truncate">
                        {chat.first_name} {chat.last_name}
                        <span className="ml-2 text-xs text-gray-500">@{chat.username}</span>
                      </h3>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatTime(chat.last_message_time)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mb-1">
                      <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        chat.user_type === 'owner' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {chat.user_type === 'owner' ? 'Yuk egasi' : 'Haydovchi'}
                      </div>
                      {chat.freight_type && (
                        <div className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium flex items-center">
                          <FaBox className="mr-1 text-xs" />
                          {chat.freight_type}
                        </div>
                      )}
                    </div>
                    <p className={`text-sm truncate ${chat.unread_count > 0 ? 'text-gray-800 font-medium' : 'text-gray-600'}`}>
                      {chat.last_message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                <span>Jami: {chats.length}</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                <span>O'qilmagan: {chats.filter(c => c.unread_count > 0).length}</span>
              </div>
            </div>
            <button
              onClick={fetchChats}
              className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors"
            >
              Yangilash
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <Chat username={activeChat} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-gray-500">
            <div className="w-32 h-32 rounded-full bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-6">
              <FaComments className="text-blue-400 text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Suhbatni boshlang</h2>
            <p className="text-center max-w-md mb-6">
              Chap tomondan chatni tanlang yoki yangi suhbat boshlash uchun yuk egasi bilan bog'laning
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <FaUser className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">Yuk egasi</h3>
                <p className="text-sm text-gray-600">Yuk egasi bilan suhbatlashish</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-3">
                  <FaTruck className="text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">Haydovchi</h3>
                <p className="text-sm text-gray-600">Haydovchi bilan suhbatlashish</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Messanger