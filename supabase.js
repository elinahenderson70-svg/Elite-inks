/*
 * ELITE INK — SUPABASE CONFIGURATION
 *
 * IMPORTANT:
 * 1. Replace SUPABASE_URL with your Supabase project URL.
 * 2. Replace SUPABASE_ANON_KEY with your Supabase publishable/anon key.
 * 3. Never put your Supabase service_role or secret key in browser code.
 *
 * This file initializes Supabase when valid credentials are provided.
 * Booking data will not be saved to Supabase automatically until the
 * booking and admin pages are connected to the database.
 */

(() => {
  "use strict";

  const SUPABASE_URL = "https://nywvzauhxzegbwwipdqi.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_Wech5BynoPAXAl90h0XjXw_dudU5jpC";

  const isConfigured =
    SUPABASE_URL.startsWith("https://") &&
    !SUPABASE_URL.includes("YOUR_SUPABASE") &&
    SUPABASE_ANON_KEY !== "sb_publishable_Wech5BynoPAXAl90h0XjXw_dudU5jpC" &&
    SUPABASE_ANON_KEY !== "sb_publishable_Wech5BynoPAXAl90h0XjXw_dudU5jpC  " &&
    SUPABASE_ANON_KEY.trim() !== "";

  if (!isConfigured) {
    console.warn(
      "Elite Ink: Supabase is not configured yet. Add your project URL and publishable/anon key to supabase.js."
    );

    window.eliteInkSupabase = null;
    window.eliteInkSupabaseReady = Promise.resolve(null);
    return;
  }

  // Load the official Supabase JavaScript library.
  const script = document.createElement("script");
  script.src =
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js";
  script.async = true;

  window.eliteInkSupabaseReady = new Promise((resolve, reject) => {
    script.onload = () => {
      try {
        if (!window.supabase?.createClient) {
          throw new Error("The Supabase library could not be initialized.");
        }

        window.eliteInkSupabase = window.supabase.createClient(
          SUPABASE_URL,
          SUPABASE_ANON_KEY
        );

        console.info("Elite Ink: Supabase client initialized.");
        resolve(window.eliteInkSupabase);
      } catch (error) {
        console.error("Elite Ink: Supabase initialization failed.", error);
        reject(error);
      }
    };

    script.onerror = () => {
      const error = new Error(
        "Could not load the Supabase library. Check your internet connection."
      );

      console.error("Elite Ink:", error.message);
      reject(error);
    };

    document.head.appendChild(script);
  });
})();  