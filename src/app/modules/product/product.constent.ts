export const discriminatorKey = "kind";
export const category = {
  KEYBOARD: "Keyboard",
  KEYCAP: "Keycap",
  SWITCH: "Switch",
  ACCESSORY: "Accessory",
} as const;

export const ConnecntionType = {
  WIRED: "Wired",
  WIRELESS: "Wireless",
  BOTH: "Both",
} as const;

export const KeyboardSizes = {
  "60%": "60%",
  "65%": "65%",
  "75%": "75%",
  TKL: "TKL",
  FULLSIZE: "Full-Size",
  TENKEYLESS: "Tenkeyless",
  COMPACT: "Compact",
  MINI: "Mini",
  FOLDABLE: "Foldable",
} as const;

export const OS = {
  WINDOWS: "Windows",
  MACOS: "MacOS",
  LINUX: "Linux",
  ANDROID: "Android",
  iOS: "iOS",
} as const;

export const Device = {
  DESKTOP: "Desktop",
  TABLET: "Tablet",
  MOBILE: "Mobile",
  LAPTOP: "Laptop",
};
