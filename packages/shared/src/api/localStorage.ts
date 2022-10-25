import localforage from 'localforage'
import config from '../config'

export async function getAuthToken(): Promise<string | null> {
  return localforage.getItem<string>(config.tokenKey as string)
}

export async function setAuthToken(token: string): Promise<void> {
  await localforage.setItem(config.tokenKey as string, token)
}

export async function removeAuthToken(): Promise<void> {
  await localforage.setItem(config.tokenKey as string, '')
}
