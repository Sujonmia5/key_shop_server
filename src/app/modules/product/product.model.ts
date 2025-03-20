import { model, Schema } from "mongoose";
import {
  IAccessory,
  IKeyboard,
  IKeycap,
  IProduct,
  ISwitch,
} from "./prodcut.interface";
import {
  category,
  ConnecntionType,
  Device,
  discriminatorKey,
  KeyboardSizes,
  OS,
} from "./product.constent";

const productSchema = new Schema<IProduct>(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    stock: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: String,
      enum: Object.values(category),
      required: true,
    },
    ratings: {
      average: {
        type: Number,
        default: 0,
      },
      totalReviews: {
        type: Number,
        default: 0,
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    discriptions: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    customStyles: {
      isStyled: {
        type: Boolean,
        default: false,
      },
      styleTitle: {
        type: String,
      },
      styleDescription: {
        type: String,
      },
      styleImage: [
        {
          type: String,
        },
      ],
    },
    warranty: {
      type: String,
      required: true,
    },
    additionalInfo: {
      countryOfOrigin: {
        type: String,
      },
      madeIn: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
    discriminatorKey,
  }
);

// Keyboard Schema
const keyboardSchema = new Schema<IKeyboard>(
  {
    keyboardCategory: {
      type: String,
      required: true,
    },
    features: {
      series: {
        type: String,
      },
      styleAndSize: {
        type: String,
        enum: Object.values(KeyboardSizes),
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      connectionType: {
        type: String,
        enum: Object.values(ConnecntionType),
        required: true,
      },
      interface: {
        type: String,
        enum: ["USB", "Bluetooth"],
        required: true,
      },
      languages: {
        english: {
          type: Boolean,
          required: true,
        },
        bangla: {
          type: Boolean,
          required: true,
        },
      },
      rgb: {
        type: Boolean,
        required: true,
      },
      fingerprintSensor: {
        type: Boolean,
        required: true,
      },
      mechanicalKeys: {
        type: Boolean,
        required: true,
      },
      switchType: {
        type: String,
      },
      multimediaKeys: {
        type: String,
      },
      totalKeys: {
        type: Number,
        required: true,
      },
      compatibility: {
        os: [
          {
            type: String,
            enum: Object.values(OS),
            required: true,
          },
        ],
        devices: [
          {
            type: String,
            enum: Object.values(Device),
            required: true,
          },
        ],
      },
      physicalDescription: {
        color: {
          type: String,
          required: true,
        },
        cableLength: {
          type: String,
        },
      },

      keyMaterial: {
        type: String,
        required: true,
      },
    },
  },
  { discriminatorKey }
);

// Switch Schema
const switchSchema = new Schema<ISwitch>(
  {
    features: {
      color: [
        {
          type: String,
          required: true,
        },
      ],
      languages: {
        english: {
          type: Boolean,
          required: true,
        },
        bangla: {
          type: Boolean,
          required: true,
        },
      },
      switchType: {
        type: String,
        required: true,
      },
      weight: {
        type: String,
        required: true,
      },
      Compatibility: {
        type: String,
      },
      material: [
        {
          type: String,
          required: true,
        },
      ],
      spring: {
        type: String,
      },
      distance: {
        type: Number,
      },

      keyMaterial: {
        type: String,
        required: true,
      },
      switchQuantity: {
        type: Number,
      },
    },
  },
  { discriminatorKey }
);

// Keycap Schema
const keycapSchema = new Schema<IKeycap>(
  {
    features: {
      color: [
        {
          type: String,
          required: true,
        },
      ],
      keycapStyle: [
        {
          type: String,
          required: true,
        },
      ],
      weight: {
        type: String,
        required: true,
      },
      material: [
        {
          type: String,
          required: true,
        },
      ],
      keyMaterial: {
        type: String,
        required: true,
      },
      keycapQuantity: {
        type: Number,
      },
    },
  },
  { discriminatorKey }
);

// Accessory Schema
const accessorySchema = new Schema<IAccessory>(
  {
    features: {
      size: [
        {
          type: String,
        },
      ],
      color: [
        {
          type: String,
        },
      ],
      style: [
        {
          type: String,
        },
      ],
      accessoryType: {
        type: String,
        required: true,
      },
      weight: {
        type: String,
        required: true,
      },
      material: [
        {
          type: String,
          required: true,
        },
      ],
    },
    warnings: [
      {
        type: String,
      },
    ],
  },
  { discriminatorKey }
);

productSchema.pre("save", async function (next) {
  if (this.isModified("brand") && this.isModified("category")) {
    this.brand = this.brand.toLowerCase();
  }
  next();
});

productSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productSchema.pre("findOne", async function (next) {
  this.findOneAndUpdate({ isDeleted: { $ne: true } });
  next();
});

const MProduct = model("Product", productSchema);

const MKeyboard = MProduct.discriminator("Keyboard", keyboardSchema);

const MSwitch = MProduct.discriminator("Switch", switchSchema);

const MKeycap = MProduct.discriminator("Keycap", keycapSchema);

const MAccessory = MProduct.discriminator("Accessory", accessorySchema);

export { MProduct, MKeyboard, MSwitch, MKeycap, MAccessory };
