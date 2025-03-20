import { ObjectId } from "mongoose";
import {
  category,
  ConnecntionType,
  Device,
  KeyboardSizes,
  OS,
} from "./product.constent";

// Define type aliases for better readability
type TConnectionType = (typeof ConnecntionType)[keyof typeof ConnecntionType];
type TSize = (typeof KeyboardSizes)[keyof typeof KeyboardSizes];
type TCategory = (typeof category)[keyof typeof category];
type TOS = (typeof OS)[keyof typeof OS];
type TDevice = (typeof Device)[keyof typeof Device];

// Base Product Interface
export interface IProduct {
  sellerId: ObjectId;
  sku: string;
  name: string;
  price: number;
  regularPrice: number;
  discount?: number;
  stock: number;
  images: string[];
  brand: string;
  model: string;
  category: TCategory;
  ratings?: {
    average?: number;
    totalReviews?: number;
  };
  isDeleted: boolean;
  discriptions: string;
  customStyles?: {
    isStyled?: boolean;
    styleTitle?: string;
    styleDescription?: string;
    styleImage?: string[];
  };
  additionalInfo?: {
    countryOfOrigin: string;
    madeIn: string;
  };
  warranty?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Keyboard-Specific Interface
export interface IKeyboard extends IProduct {
  keyboardCategory: string;
  features: {
    series?: string;
    styleAndSize: TSize;
    type: string;
    connectionType: TConnectionType;
    interface: "USB" | "Bluetooth";
    languages: {
      english: boolean;
      bangla: boolean;
    };
    rgb: boolean;
    fingerprintSensor: boolean;
    mechanicalKeys: boolean;
    switchType?: string;
    multimediaKeys?: string;
    totalKeys: number;
    compatibility: {
      os: TOS[];
      devices: TDevice[];
    };
    physicalDescription: {
      color: string;
      cableLength?: string;
    };

    keyMaterial: string;
  };
}

// Switch-Specific Interface
export interface ISwitch extends IProduct {
  features: {
    color: string[];
    languages: {
      english: boolean;
      bangla: boolean;
    };
    switchType: string;
    weight: string;
    Compatibility?: string;
    material: string[];
    spring?: string;
    distance?: number;
    keyMaterial: string;
    switchQuantity?: number;
  };
}

// Keycap-Specific Interface
export interface IKeycap extends IProduct {
  features: {
    color: string[];
    keycapStyle: string[];
    weight: string;
    material: string[];
    keyMaterial: string;
    keycapQuantity?: number;
  };
}

// Accessory-Specific Interface

export interface IAccessory extends IProduct {
  features: {
    size?: string[];
    color?: string[];
    style?: string[];
    accessoryType: string;
    weight: string;
    material: string[];
  };
  warnings?: string[];
}
