import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'regenerator-runtime/runtime';
import './index.css'; // Correct CSS import
import App from './App.jsx';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

// Optional: Enable debug logs in development
posthog.debug = import.meta.env.MODE === 'development';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostHogProvider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={{
        api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
        debug: import.meta.env.MODE === 'development',
      }}
    >
      <App />
    </PostHogProvider>
  </StrictMode>
);
