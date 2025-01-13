# AI Call Agent Frontend

Welcome to the AI Call Agent Frontend repository! This project is a React-based user interface designed to manage and interact with AI-driven call systems for pizza order management. It showcases real-time call management, customer metrics, and performance visualizations, and is fully integrated with a backend API and WebSocket communication.

## Features

- **Real-time Call Management:**
  - Start and end AI-managed calls with customers.
  - Display active orders and call details dynamically.

- **Customer Metrics Dashboard:**
  - Visualize metrics such as average order time, customer satisfaction, and popular toppings.
  - Trends and analytics via interactive charts.

- **Responsive Design:**
  - Optimized for desktop and mobile viewing.

- **Interactive UI Components:**
  - Sidebar navigation for quick access to features.
  - Slide-in menus and dynamic content toggles.

- **Voice Chat Integration:**
  - Simulated interaction with AI-powered customer service agents.

## Technologies Used

- **Frontend Framework:** React.js
- **State Management:** React Hooks (useState, useEffect)
- **Styling:** Tailwind CSS
- **Data Visualization:** Recharts
- **Icons:** Lucide-react
- **Real-time Communication:** WebSocket (via Socket.IO)

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (v16.x or later)
- **npm** (v8.x or later) or **yarn**
- A backend API to support the frontend operations (see [AI Call Agent Backend](https://github.com/Krishnaidnani/AI-Call-Agent-Backend))

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Krishnaidnani/AI-Call-Agent-Frontend.git
   cd AI-Call-Agent-Frontend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory with the following variables:
   ```env
   REACT_APP_API_URL=https://your-backend-api-url.com
   ```

4. **Start the Development Server:**
   ```bash
   npm start
   # or
   yarn start
   ```

   The application will be accessible at `http://localhost:3000`.

## Folder Structure

```
AI-Call-Agent-Frontend/
├── public/               # Static files (index.html, images, etc.)
├── src/
│   ├── components/       # Reusable React components (e.g., VoiceChat, MenuCard)
│   ├── api.js             # API abstraction for backend calls
│   ├── App.jsx            # Application entry point
│   ├── main.jsx          # React DOM renderer
│   └── socket.js         # WebSocket connection setup
├── .env.example                # Environment variables
├── package.json          # Project metadata and dependencies
└── README.md             # Documentation
```

## Key Components

- **Dashboard:**
  - Displays customer metrics, real-time order data, and visual analytics.

- **VoiceChat:**
  - Handles AI call interactions and real-time message updates.

- **MenuCard:**
  - A sliding menu component to display additional details.

- **Charts:**
  - Interactive charts (using Recharts) for performance visualization.

## Usage

1. **Start a Call:**
   - Click the "Start Call" button to initiate a simulated AI call.
   - View real-time messages and interactions in the chat panel.

2. **Manage Metrics:**
   - View active orders, customer satisfaction, and other metrics on the dashboard.

3. **Explore Menus:**
   - Use the slide-in menu to view additional options and customer data.


## Contributions

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request on GitHub.

## Issues

If you encounter any issues, feel free to [open an issue](https://github.com/Krishnaidnani/AI-Call-Agent-Frontend/issues).


---

Thank you for checking out the AI Call Agent Frontend! If you like this project, consider giving it a ⭐ on GitHub.

