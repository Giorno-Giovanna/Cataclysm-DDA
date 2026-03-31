import { storage } from './storage';

export const getSubscriptionState = async () => ({
  isSubscribed: await storage.getBool(storage.keys.isSubscribedMock),
});

export const purchasePlan = async (_planId: string) => {
  await new Promise((r) => setTimeout(r, 900));
  await storage.setBool(storage.keys.isSubscribedMock, true);
  return { success: true };
};

export const restorePurchases = async () => getSubscriptionState();

export const hasActiveSubscription = async () => (await getSubscriptionState()).isSubscribed;
