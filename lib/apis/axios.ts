import axios from "axios";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => Promise<void>)[] = [];

const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// --- Add token from localStorage ---
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Subscribe to token refresh ---
async function onTokenRefreshed(token: string) {
  for (const cb of refreshSubscribers) {
    await cb(token);
  }
  refreshSubscribers = [];
}

function addRefreshSubscriber(cb: (token: string) => Promise<void>) {
  refreshSubscribers.push(cb);
}

// --- Response interceptor ---
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    debugger;
    if (!window.location.pathname.startsWith("/auth")) {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return addRefreshSubscriber(async (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return await api(originalRequest);
          });
        }

        isRefreshing = true;

        try {
          const refreshToken = localStorage.getItem("refresh_token");
          if (!refreshToken) throw new Error("No refresh token");

          const res = await axios.post("https://dummyjson.com/auth/refresh", {
            refreshToken,
          });

          const newToken = res?.data?.accessToken;
          const newRefreshToken = res?.data?.refreshToken;
          localStorage.setItem("token", newToken);
          localStorage.setItem("refresh_token", newRefreshToken);

          return await onTokenRefreshed(newToken);
        } catch (refreshError) {
          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
          if (typeof window !== "undefined") {
            window.location.href = "/auth";
          }
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // Global error handling
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";

      return Promise.reject(new Error(message));
    } else {
      return error;
    }
  }
);

export default api;
