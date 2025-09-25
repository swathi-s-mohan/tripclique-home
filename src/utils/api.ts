import { API_BASE_URL } from '@/constants';

interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: Record<string, unknown> | string;
}

export const apiRequest = async (endpoint: string, options: ApiRequestOptions = {}) => {
  const { method = 'GET', headers = {}, body } = options;
  
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
      ...headers,
    },
    mode: 'cors',
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Specific API functions
export const createTrip = async (tripData: {
  trip_name: string;
  user_id: string;
  date_ranges: string[];
  preferred_places: string[];
  budget: number;
  preferences: string[];
  must_haves: string[];
}) => {
  return apiRequest('/trips', {
    method: 'POST',
    body: tripData,
  });
};

export const getTripsByUser = async (username: string) => {
  return apiRequest(`/trips/by-user/${username}`, {
    method: 'GET',
  });
};
export const signUp = async (userData: {
  username: string;
  password: string;
}) => {
  return apiRequest('/users/signup', {
    method: 'POST',
    body: userData,
  });
};

export const login = async (userData: {
  username: string;
  password: string;
}) => {
  return apiRequest('/users/login', {
    method: 'POST',
    body: userData,
  });
};

export const getChatsByTripId = async (tripId: string) => {
  return apiRequest(`/chats/${tripId}`, {
    method: 'GET',
  });
};

export const sendChatMessage = async (messageData: {
  trip_id: string;
  username: string;
  message: string;
  time: string;
}) => {
  return apiRequest('/chats', {
    method: 'POST',
    body: messageData,
  });
};

export const joinTripByCode = async (
  code: string,
  body: { user_id: string }
) => {
  return apiRequest(`/trips/join?code=${encodeURIComponent(code)}`, {
    method: 'POST',
    body,
  });
};
