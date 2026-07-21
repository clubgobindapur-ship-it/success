export interface AnalyticsEvent {
  eventName: string;
  params: Record<string, any>;
  timestamp: string;
}

type EventSubscriber = (event: AnalyticsEvent) => void;
const subscribers: Set<EventSubscriber> = new Set();

/**
 * Subscriber pattern to allow the UI to show real-time events.
 */
export function subscribeToAnalytics(callback: EventSubscriber): () => void {
  subscribers.add(callback);
  return () => {
    subscribers.delete(callback);
  };
}

/**
 * Initializes Google Analytics 4 dynamically on the client side using the provided Measurement ID
 */
export function initializeGA4(): void {
  const measurementId = "G-PHCLL7NSFG";
  if (typeof window === "undefined") return;

  // Check if already loaded
  if (document.getElementById("ga4-script")) return;

  try {
    // Inject gtag.js script
    const script = document.createElement("script");
    script.id = "ga4-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Setup dataLayer and gtag function
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    (window as any).gtag = gtag;
    
    gtag("js", new Date());
    gtag("config", measurementId, {
      page_path: window.location.hash || "/",
    });
    
    console.log(`Google Analytics 4 (${measurementId}) successfully initialized.`);
  } catch (err) {
    console.error("Failed to initialize Google Analytics 4:", err);
  }
}

/**
 * Tracks a custom event in Google Analytics 4 and emits it to our real-time UI subscriber
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}): void {
  const timestamp = new Date().toLocaleTimeString("bn-BD", { hour12: true });
  const event: AnalyticsEvent = { eventName, params, timestamp };

  console.log(`[GA4 Event] ${eventName}:`, params);

  // Send to official Google Analytics if initialized
  if (typeof window !== "undefined" && (window as any).gtag) {
    try {
      (window as any).gtag("event", eventName, params);
    } catch (err) {
      console.warn("GA4 gtag transmission error:", err);
    }
  }

  // Publish event to UI logger
  subscribers.forEach((sub) => sub(event));
}
