// src/hooks/usePageTracking.js
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import posthog from 'posthog-js'

export function usePageTracking() {
  const location = useLocation()

  useEffect(() => {
    posthog.capture('$pageview')
  }, [location.pathname])
}
