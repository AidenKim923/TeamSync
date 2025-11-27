import { io } from 'socket.io-client'

class SocketService {
  constructor() {
    this.socket = null
  }

  connect() {
    const token = localStorage.getItem('token')

    this.socket = io('ws://localhost:8000', {
      auth: { token },
      transports: ['websocket'],
      autoConnect: true
    })

    this.socket.on('connect', () => {
      console.log('WebSocket 연결됨')
    })

    this.socket.on('disconnect', () => {
      console.log('WebSocket 연결 해제됨')
    })

    this.socket.on('error', (error) => {
      console.error('WebSocket 에러:', error)
    })
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  // 채팅 관련
  joinChatRoom(roomId) {
    if (this.socket) {
      this.socket.emit('join_room', { room_id: roomId })
    }
  }

  leaveChatRoom(roomId) {
    if (this.socket) {
      this.socket.emit('leave_room', { room_id: roomId })
    }
  }

  sendMessage(roomId, message) {
    if (this.socket) {
      this.socket.emit('send_message', { room_id: roomId, message })
    }
  }

  onMessage(callback) {
    if (this.socket) {
      this.socket.on('chat_message', callback)
    }
  }

  // 알림 관련
  onNotification(callback) {
    if (this.socket) {
      this.socket.on('notification', callback)
    }
  }
}

export default new SocketService()
