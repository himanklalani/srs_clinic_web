export type CookieCategory = 'strictly_necessary' | 'functional' | 'analytics' | 'marketing';

export interface CookieConsentState {
  strictly_necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const defaultConsentState: CookieConsentState = {
  // Strictly necessary is always true and cannot be disabled
  strictly_necessary: true,
  // By GDPR default, optional cookies are opt-in (false)
  functional: false,
  analytics: false,
  marketing: false,
};

export const cookieCategories = [
  {
    id: 'strictly_necessary',
    name: 'Strictly Necessary',
    description: 'Required for the website to function (e.g., security, sessions). Cannot be disabled.',
    isRequired: true,
  },
  {
    id: 'functional',
    name: 'Functional',
    description: 'Enables enhanced functionality and personalization (e.g., remembering your preferred clinic location).',
    isRequired: false,
  },
  {
    id: 'analytics',
    name: 'Analytics',
    description: 'Allows us to measure visits and traffic sources to improve the performance of our site (e.g., Google Analytics).',
    isRequired: false,
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Reserved for future tracking related to marketing campaigns or targeted advertisements.',
    isRequired: false,
  },
] as const;
