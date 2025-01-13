# 📱 AI Call Agent Frontend

<div align="center">

![GitHub last commit](https://img.shields.io/github/last-commit/Krishnaidnani/AI-Call-Agent-Frontend)
![License](https://img.shields.io/badge/license-MIT-blue)
![React Version](https://img.shields.io/badge/react-%3E%3D18.0.0-brightgreen)

*A modern React-based interface for AI-powered pizza order management*

[Backend Repository](https://github.com/Krishnaidnani/AI-Call-Agent-Backend)

</div>

## 🌟 Overview

The **AI Call Agent Frontend** is a sophisticated React application designed to manage and interact with AI-driven call systems for pizza order management. It provides real-time call management, customer metrics, and performance visualizations, fully integrated with our [Backend API](https://github.com/Krishnaidnani/AI-Call-Agent-Backend) and WebSocket communication.

## ✨ Key Features

* **📞 Real-time Call Management**
  - Start and end AI-managed calls with customers
  - Display active orders and call details dynamically
  - Real-time message updates and interactions

* **📊 Customer Metrics Dashboard**
  - Visualize key metrics including average order time
  - Track customer satisfaction and popular toppings
  - Interactive charts for trend analysis

* **💻 Responsive Design**
  - Optimized for both desktop and mobile viewing
  - Intuitive user interface with smooth transitions
  - Accessible across all device sizes

* **🎯 Interactive Components**
  - Quick-access sidebar navigation
  - Smooth slide-in menus
  - Dynamic content toggles

## 🛠️ Technology Stack

* **Core Technologies**
  - React.js
  - Tailwind CSS
  - Socket.IO (WebSocket)
  - Recharts

* **Additional Libraries**
  - Lucide-react for icons
  - React Hooks
  - Various npm utilities

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

```bash
Node.js (≥ 16.x)
npm (≥ 8.x) or yarn
```

### Installation Steps

1. **Clone the Repository**
```bash
git clone https://github.com/Krishnaidnani/AI-Call-Agent-Frontend.git
cd AI-Call-Agent-Frontend
```

2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure Environment**
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=https://your-backend-api-url.com
```

4. **Launch the Application**
```bash
npm start
# or
yarn start
```

Your application will be running at `http://localhost:3000` 🎉

## 📁 Project Structure

```
AI-Call-Agent-Frontend/
├── public/               # Static files
├── src/
│   ├── components/       # React components
│   │   ├── Dashboard/
│   │   ├── VoiceChat/
│   │   └── MenuCard/
│   ├── api.js           # API integration
│   ├── App.jsx          # Main component
│   ├── main.jsx         # Entry point
│   └── socket.js        # WebSocket setup
├── .env.example         # Environment template
├── package.json         # Dependencies
└── README.md           # Documentation
```

## 🎮 Key Components

* **Dashboard**
  - Real-time metrics visualization
  - Customer data analytics
  - Performance tracking

* **VoiceChat**
  - AI call interaction interface
  - Real-time message handling
  - Call status management

* **MenuCard**
  - Sliding detail panels
  - Order information display
  - Customer interaction history

## 📝 Usage Guide

1. **Initiate a Call**
   - Click "Start Call" for AI simulation
   - Monitor real-time chat interactions
   - Track call progress

2. **Monitor Metrics**
   - View active order counts
   - Track satisfaction scores
   - Analyze performance data

3. **Access Features**
   - Use sidebar navigation
   - Explore slide-in menus
   - View detailed customer data

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
```bash
git checkout -b feature/AmazingFeature
```

2. Commit your changes
```bash
git commit -m "Add some AmazingFeature"
```

3. Push to the branch
```bash
git push origin feature/AmazingFeature
```

4. Open a Pull Request

## 🐛 Issues

Found a bug or have a suggestion? [Open an issue](https://github.com/Krishnaidnani/AI-Call-Agent-Frontend/issues) on GitHub.

---

<div align="center">
  
### Star ⭐ this repository if you find it helpful!

[Report Bug](https://github.com/Krishnaidnani/AI-Call-Agent-Frontend/issues) · [Request Feature](https://github.com/Krishnaidnani/AI-Call-Agent-Frontend/issues)

</div>