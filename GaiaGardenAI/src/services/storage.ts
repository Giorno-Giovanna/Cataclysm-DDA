import AsyncStorage from '@react-native-async-storage/async-storage';
import { DesignHistoryItem } from '../types';

const KEYS = {
  hasCompletedIntro: 'hasCompletedIntro',
  isSubscribedMock: 'isSubscribedMock',
  generationCount: 'generationCount',
  history: 'history',
  hasSeenOffer: 'hasSeenOffer',
};

export const storage = {
  setBool: async (k: string, v: boolean) => AsyncStorage.setItem(k, String(v)),
  getBool: async (k: string) => (await AsyncStorage.getItem(k)) === 'true',
  setJSON: async (k: string, v: unknown) => AsyncStorage.setItem(k, JSON.stringify(v)),
  getJSON: async <T,>(k: string, fallback: T) => {
    const v = await AsyncStorage.getItem(k);
    return v ? (JSON.parse(v) as T) : fallback;
  },
  keys: KEYS,
  async addHistory(item: DesignHistoryItem) {
    const list = await this.getJSON<DesignHistoryItem[]>(KEYS.history, []);
    const next = [item, ...list].slice(0, 50);
    await this.setJSON(KEYS.history, next);
  },
};
