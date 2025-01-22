import React, { useState, useEffect, useCallback } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import './App.css';


const ENDPOINT = "https://chat-backend-app-i725.vercel.app/"; // Backend server URL

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(false); // For loading state in register/login

  // Initialize socket connection only once
  useEffect(() => {
    const socketInstance = socketIOClient(ENDPOINT, { withCredentials: true });

    setSocket(socketInstance);

    // Listen for new messages
    socketInstance.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup socket connection on component unmount
    return () => {
      socketInstance.off('newMessage');
      socketInstance.disconnect();
    };
  }, []);

  // Send message to the server
  const sendMessage = useCallback(() => {
    if (!message.trim()) {
      alert('Message cannot be empty.');
      return;
    }
    if (socket) {
      socket.emit('sendMessage', { sender: username, content: message });
      setMessage('');
    }
  }, [message, username, socket]);

  // Register user
  const register = async () => {
    if (!username || !password) {
      alert('Please fill in both username and password.');
      return;
    }

    setLoading(true); // Set loading to true
    try {
      await axios.post(`${ENDPOINT}/register`, { username, password });
      alert('Registration successful. Please login.');
    } catch (error) {
      console.error('Error registering user:', error.response?.data || error.message);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false); // Set loading to false after request completion
    }
  };

  // Login user
  const login = async () => {
    if (!username || !password) {
      alert('Please fill in both username and password.');
      return;
    }

    setLoading(true); // Set loading to true
    try {
      const response = await axios.post(`${ENDPOINT}/login`, { username, password });
      setToken(response.data.token);
      alert('Login successful.');
    } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message);
      alert('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false); // Set loading to false after request completion
    }
  };

  // Set Axios Authorization header on token change
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  return (
    <div>
      {!token ? (
        <div>
          <h2>Login/Register</h2>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={register} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
          <button onClick={login} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      ) : (
        <div>
          <h2>Chat</h2>
          <div style={{ border: '1px solid black', padding: '10px', height: '300px', overflowY: 'auto' }}>
            {messages.map((msg, index) => (
              <div key={index}>
                <strong>{msg.sender}:</strong> {msg.content}
              </div>
            ))}
          </div>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
}

export default App;
