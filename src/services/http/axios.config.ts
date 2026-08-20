import axios from 'axios';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const commonHeaders = {
  'Content-Type': 'application/json',
};

export const normalizeError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return {
      message: (error.response?.data as { message?: string })?.message || error.message,
      status: error.response?.status,
      code: error.code,
    };
  }
  return {
    message: 'An unexpected error occurred',
  };
};
