/**
 * Analytics helper functions for Google Tag Manager integration
 * These functions push events to the dataLayer for tracking conversions
 */

declare global {
  interface Window {
    dataLayer?: any[]
  }
}

/**
 * Initialize dataLayer if it doesn't exist
 */
function initDataLayer() {
  if (typeof window !== 'undefined' && !window.dataLayer) {
    window.dataLayer = []
  }
}

/**
 * Track custom events for Google Tag Manager
 * @param eventName - Name of the event
 * @param eventData - Additional event data
 */
export function trackEvent(eventName: string, eventData?: Record<string, any>) {
  if (typeof window === 'undefined') return

  initDataLayer()

  const event = {
    event: eventName,
    ...eventData,
  }

  window.dataLayer?.push(event)

  // Also log in development for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', event)
  }
}

/**
 * Track form submissions
 */
export function trackFormSubmission(formLocation: string, formData?: Record<string, any>) {
  trackEvent('contact_form_submitted', {
    form_location: formLocation,
    ...formData,
  })
}

/**
 * Track WhatsApp button clicks
 */
export function trackWhatsAppClick(location: string) {
  trackEvent('whatsapp_button_clicked', {
    location,
  })
}

/**
 * Track call button clicks
 */
export function trackCallClick(location: string) {
  trackEvent('call_button_clicked', {
    location,
  })
}

/**
 * Track page views (for service pages)
 */
export function trackPageView(pageName: string, pageData?: Record<string, any>) {
  trackEvent('page_view', {
    page_name: pageName,
    ...pageData,
  })
}

