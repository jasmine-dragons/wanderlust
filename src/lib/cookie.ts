import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import type { OptionsType } from 'cookies-next/lib/types';

export const getClientCookie = (key: string): string => {
  return getCookie(key) as string;
};

export const getServerCookie = (key: string, options: OptionsType): string => {
  return getCookie(key, options) as string;
};

export const setClientCookie = (key: string, value: string): void => {
  setCookie(key, value);
};

export const setServerCookie = (key: string, value: string, options: OptionsType): void => {
  setCookie(key, value, options);
};

export const deleteClientCookie = (key: string): void => {
  deleteCookie(key);
};

export const deleteServerCookie = (key: string, options: OptionsType): void => {
  deleteCookie(key, options);
};
