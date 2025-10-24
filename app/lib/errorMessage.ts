/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios';

function isAxiosError(error: unknown): error is AxiosError {
  return typeof error === 'object' && error !== null && 'isAxiosError' in error;
}

export function extractErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  if (error instanceof Error && error.message) return error.message;
  if (isAxiosError(error) && (error as any).response?.data?.message) {
    return (error as any).response.data.message;
  }
  return 'Erreur inconnue';
}
