import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

/** PostHog solo si hay clave — patrón Orbit (carga diferida, no bloquea first paint) */
function LazyPostHogProvider({ children }) {
  const [Provider, setProvider] = React.useState(null);

  React.useEffect(() => {
    const posthogKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
    if (!posthogKey) return;

    const init = () => {
      import("posthog-js").then((posthogModule) => {
        const posthog = posthogModule.default;
        posthog.init(posthogKey, {
          api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
          person_profiles: "identified_only",
          capture_pageview: true,
          capture_pageleave: true,
          disable_surveys: true,
        });
        window.__posthog = posthog;

        window.addEventListener("error", (e) => {
          posthog.capture("$exception", {
            message: e.message,
            source: e.filename,
            line: e.lineno,
          });
        });
        window.addEventListener("unhandledrejection", (e) => {
          posthog.capture("$exception", { message: String(e.reason), type: "unhandledrejection" });
        });

        return import("@posthog/react").then((mod) => {
          setProvider(() => ({ Prov: mod.PostHogProvider, EB: mod.PostHogErrorBoundary, ph: posthog }));
        });
      });
    };

    if ("requestIdleCallback" in window) {
      requestIdleCallback(init);
    } else {
      setTimeout(init, 1);
    }
  }, []);

  if (Provider) {
    return (
      <Provider.Prov client={Provider.ph}>
        <Provider.EB>{children}</Provider.EB>
      </Provider.Prov>
    );
  }
  return children;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LazyPostHogProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LazyPostHogProvider>
  </StrictMode>
);
