export const colors = {
  content: {
    primary: "#111827",
    secondary: "#374151",
    tertiary: "#4B5563",
    quaternary: "#9CA3AF",
    quintary: "#D1D5DB",
    top: "#000000",
  },
  inverse: {
    content: {
      primary: "#FAFAFA",
    },
  },
  action: {
    primary: {
      default: "#4F46E5",
      hover: "#4338CA",
      active: "#3730A3",
      bg: "#E0E7FF",
      bg10: "#A5B4FC1A",
    },
    secondary: {
      default: "#F3F4F6",
      text: "#374151",
    },
  },
  surface: {
    primary: "#FFFFFF",
    tertiary: "#F3F4F6",
    muted: "#F0F0F0",
  },
  border: {
    default: "#D1D5DB",
  },
  divider: "#D1D5DB",
  feedback: {
    error: "#E11D48",
  },
  flag: {
    blue: "#0052B4",
    red: "#D80027",
  },
} as const;

export const radius = {
  checkbox: 4,
  control: 8,
  featuredIcon: 10,
  segmented: 12,
  link: 16,
  image: 20,
  stepper: 32,
} as const;

export const space = {
  4: 4,
  8: 8,
  10: 10,
  12: 12,
  16: 16,
  20: 20,
  24: 24,
  32: 32,
  40: 40,
  48: 48,
  60: 60,
  64: 64,
  80: 80,
} as const;

export const layout = {
  pageMaxWidth: 1440,
  containerMaxWidth: 1280,
  home: {
    contentWidth: 658,
    columnGap: 80,
  },
  contact: {
    imageWidth: 1120,
  },
} as const;

export const font = {
  sans: "var(--font-sans), Inter, system-ui, sans-serif",
} as const;

export const typography = {
  heading: {
    lg: {
      size: 48,
      lineHeight: 56,
      weight: 700,
      letterSpacing: -0.3,
      paragraphSpacing: 48,
    },
    xl: {
      size: 60,
      lineHeight: 72,
      weight: 600,
      letterSpacing: -0.3,
      paragraphSpacing: 56,
    },
  },
  text: {
    xl: {
      size: 20,
      lineHeight: 32,
      weight: 600,
      paragraphSpacing: 24,
      letterSpacing: 0,
    },
    md: {
      size: 16,
      lineHeight: 24,
      weight: 400,
      paragraphSpacing: 16,
      letterSpacing: 0,
    },
    sm: {
      size: 14,
      lineHeight: 20,
      weight: 500,
      paragraphSpacing: 12,
      letterSpacing: 0,
    },
  },
} as const;

export const tokens = {
  colors,
  radius,
  space,
  layout,
  font,
  typography,
} as const;

export type AppTokens = typeof tokens;
