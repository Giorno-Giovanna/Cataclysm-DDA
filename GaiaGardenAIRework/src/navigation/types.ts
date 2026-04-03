export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  OnboardingRecreate: undefined;
  OnboardingDesignEdit: undefined;
  ReviewPrompt: undefined;
  Paywall: { source?: 'onboarding' | 'app' } | undefined;
  OneTimeOffer: { title?: string } | undefined;
  MainTabs: { showOfferAfterPaywall?: boolean } | undefined;
  GardenDesign:
    | {
        mode?: 'normal' | 'add' | 'style' | 'create' | 'replace' | 'drag';
        selectedStyleId?: string;
        starterPrompt?: string;
        referenceTitle?: string;
      }
    | undefined;
  GardenPlanner: undefined;
  Result: any;
  Chat: undefined;
  Settings: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  History: undefined;
};
