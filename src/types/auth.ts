export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginRequest {
  email: string;
}

export interface OTPVerificationRequest {
  email: string;
  otp: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
}
