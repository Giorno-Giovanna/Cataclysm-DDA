export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  OnboardingRecreate: undefined;
  OnboardingDesignEdit: undefined;
  ReviewPrompt: undefined;
  Paywall: { source?: 'onboarding' | 'app' } | undefined;
  OneTimeOffer: undefined;
  MainTabs: { showOfferAfterPaywall?: boolean } | undefined;
  GardenDesign: { mode?: 'normal' | 'add' } | undefined;
  Result: any;
  Chat: undefined;
  Settings: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  History: undefined;
};
