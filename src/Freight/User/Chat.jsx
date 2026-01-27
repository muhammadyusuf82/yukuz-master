import { useEffect, useState, useRef } from "react"
import { FaPaperPlane, FaUserCircle, FaUser, FaClock, FaCheck, FaCheckDouble, FaArrowLeft } from "react-icons/fa"

const BASE_WEBSOCKET_URL = 'ws://127.0.0.1/:8000/ws/'
const BASE_HTTP_URL = 'http://127.0.0.1/:8000/api/'

const Chat = ({ username, isMobile, onBack }) => {
    const [messages, setMessages] = useState([])
    const [inputText, setInputText] = useState('')
    const [chatSocket, setChatSocket] = useState(null)
    const [isConnected, setIsConnected] = useState(false)
    const messagesEndRef = useRef(null)
    const inputRef = useRef(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token || !username) return

        const socket = new WebSocket(BASE_WEBSOCKET_URL + `chat/${token}/`)
        
        socket.onopen = () => {
            console.log('WebSocket connected')
            setIsConnected(true)
        }

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data)
            if (data.type === 'receive_message') {
                setMessages(prev => [...prev, {
                    sender_username: data.from,
                    text: data.text,
                    sent_at: new Date(),
                    is_you: false
                }])
            }
        }

        socket.onerror = (error) => {
            console.error('WebSocket error:', error)
            setIsConnected(false)
        }

        socket.onclose = () => {
            console.log('WebSocket disconnected')
            setIsConnected(false)
        }

        setChatSocket(socket)

        // Fetch previous messages
        const fetchMessages = async () => {
            try {
                const user = await (
                    await fetch(BASE_HTTP_URL + 'users/', { headers: { Authorization: `Token ${token}` } })
                ).json()
                const response = await fetch(BASE_HTTP_URL + `chat-messages/?username=${username}`, {
                    headers: { 
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                if (response.ok) {
                    const data = await response.json()
                    const formattedMessages = data.map(e => ({
                        ...e,
                        sent_at: new Date(e.sent_at),
                        is_you: e.sender_username === user?.username
                    }))
                    setMessages(formattedMessages.reverse())
                }
            } catch (error) {
                console.error('Error fetching messages:', error)
            }
        }

        fetchMessages()

        // Focus input on mobile
        if (isMobile) {
            setTimeout(() => {
                inputRef.current?.focus()
            }, 300)
        }

        return () => {
            socket.close()
        }
    }, [username, isMobile])

    // Scroll to bottom when new messages arrive
    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const sendMessage = async () => {
        if (!inputText.trim() || !chatSocket || !isConnected) return

        const token = localStorage.getItem('token')
        const user = await (
            await fetch(BASE_HTTP_URL + 'users/', { headers: { Authorization: `Token ${token}` } })
        ).json()

        const messageData = {
            'text': inputText,
            'username': username
        }
        
        chatSocket.send(JSON.stringify(messageData))
        
        setMessages(prev => [...prev, {
            text: inputText,
            sender_username: user?.username || 'you',
            sent_at: new Date(),
            is_you: true
        }])
        
        setInputText('')
        
        // Keep focus on input after sending
        if (isMobile) {
            setTimeout(() => {
                inputRef.current?.focus()
            }, 100)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    const formatTime = (date) => {
        if (!date) return ''
        const now = new Date()
        const messageDate = new Date(date)
        
        if (now.toDateString() === messageDate.toDateString()) {
            return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        } else {
            return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' }) + 
                   ' ' + messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    }

    return (
        <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Desktop Chat Header */}
            {!isMobile && (
                <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                    <FaUser className="text-white" />
                                </div>
                                {isConnected && (
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                )}
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">{username}</h2>
                                <div className="flex items-center space-x-2">
                                    <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                    <span className="text-xs text-gray-500">
                                        {isConnected ? 'Online' : 'Offline'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-4">
                            <FaPaperPlane className="text-blue-500 text-xl" />
                        </div>
                        <p className="text-lg font-medium">Chat boshlang</p>
                        <p className="text-sm mt-1">Biror xabar yuborish orqali suhbatni boshlashingiz mumkin</p>
                    </div>
                ) : (
                    messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.is_you ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className="flex max-w-[75%]">
                                {!message.is_you && (
                                    <div className="flex-shrink-0 mr-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                                            <FaUser className="text-white text-xs" />
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <div className={`px-4 py-3 rounded-2xl shadow-sm ${
                                        message.is_you 
                                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-none' 
                                            : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                                    }`}>
                                        <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
                                        <div className={`flex items-center justify-end mt-1 ${
                                            message.is_you ? 'text-blue-100' : 'text-gray-400'
                                        }`}>
                                            <FaClock className="text-xs mr-1" />
                                            <span className="text-xs">{formatTime(message.sent_at)}</span>
                                            {message.is_you && (
                                                <FaCheckDouble className="text-xs ml-2" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {message.is_you && (
                                    <div className="flex-shrink-0 ml-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                                            <FaUser className="text-white text-xs" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 bg-white p-4">
                <div className="flex items-center space-x-3">
                    <div className="flex-1">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Xabar yozing..."
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <button
                        onClick={sendMessage}
                        disabled={!inputText.trim() || !isConnected}
                        className={`p-3 rounded-full transition-all duration-200 flex-shrink-0 ${
                            inputText.trim() && isConnected
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:-translate-y-0.5 shadow-lg'
                                : 'bg-gray-300 cursor-not-allowed'
                        }`}
                    >
                        <FaPaperPlane className={`text-lg ${inputText.trim() && isConnected ? 'text-white' : 'text-gray-500'}`} />
                    </button>
                </div>
                <div className="flex items-center justify-between mt-2 px-2">
                    <span className={`text-xs ${isConnected ? 'text-green-600' : 'text-red-500'}`}>
                        {isConnected ? '🟢 Ulangan' : '🔴 Ulanmagan'}
                    </span>
                    <span className="text-xs text-gray-500">
                        {inputText.length}/1000
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Chat