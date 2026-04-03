import AsyncStorage from '@react-native-async-storage/async-storage';
import { DesignHistoryItem, PlannerPlan } from '../types';

const KEYS = {
  hasCompletedIntro: 'hasCompletedIntro',
  isSubscribedMock: 'isSubscribedMock',
  generationCount: 'generationCount',
  history: 'history',
  hasSeenOffer: 'hasSeenOffer',
  favoriteStyles: 'favoriteStyles',
  plannerPlans: 'plannerPlans',
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
  async removeHistory(id: string) {
    const list = await this.getJSON<DesignHistoryItem[]>(KEYS.history, []);
    await this.setJSON(
      KEYS.history,
      list.filter((item) => item.id !== id),
    );
  },
  async getFavoriteStyles() {
    return this.getJSON<string[]>(KEYS.favoriteStyles, []);
  },
  async toggleFavoriteStyle(styleId: string) {
    const list = await this.getFavoriteStyles();
    const next = list.includes(styleId) ? list.filter((id) => id !== styleId) : [styleId, ...list];
    await this.setJSON(KEYS.favoriteStyles, next);
    return next;
  },
  async addPlannerPlan(plan: PlannerPlan) {
    const list = await this.getJSON<PlannerPlan[]>(KEYS.plannerPlans, []);
    const next = [plan, ...list].slice(0, 20);
    await this.setJSON(KEYS.plannerPlans, next);
  },
};
