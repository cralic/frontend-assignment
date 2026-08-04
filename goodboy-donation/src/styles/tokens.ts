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
  flag: {
    blue: "#0052B4",
    red: "#D80027",
  },
} as const;

export const radius = {
  checkbox: 4,
  control: 8,
  segmented: 12,
  image: 20,
  stepper: 32,
} as const;

export const space = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
} as const;

export const font = {
  sans: "var(--font-sans), Inter, system-ui, sans-serif",
} as const;

export const tokens = {
  colors,
  radius,
  space,
  font,
} as const;

export type AppTokens = typeof tokens;
