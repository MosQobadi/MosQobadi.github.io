/**
 * Catalogue for the Fernwood Supply demo.
 *
 * It lives in its own module because both the page (to render the grid) and the
 * cart script (to price the basket) need it — one list, no chance of the two
 * drifting apart.
 */

/** The illustration shapes ProductMark.astro knows how to draw. */
export type MarkVariant =
  "leafy" | "tall" | "round" | "trailing" | "pot" | "can";

export type ShopCategory = "plants" | "pots" | "tools";

export type Product = {
  id: string;
  name: string;
  /** One line of shelf-talker copy. */
  blurb: string;
  /** In pence, so the arithmetic never lands on 0.30000000000000004. */
  price: number;
  category: ShopCategory;
  variant: MarkVariant;
  tint: string;
  wash: string;
  /** Shown as a small corner flag on the card. */
  badge?: string;
};

export const products: readonly Product[] = [
  {
    id: "monstera",
    name: "Monstera Deliciosa",
    blurb: "The big one. Wants a bright corner and forgives a missed watering.",
    price: 3800,
    category: "plants",
    variant: "leafy",
    tint: "#2f6b45",
    wash: "#eef4ef",
    badge: "Best seller",
  },
  {
    id: "snake",
    name: "Snake Plant 'Laurentii'",
    blurb: "Nearly unkillable. Happy in a dim hallway for months on end.",
    price: 2600,
    category: "plants",
    variant: "tall",
    tint: "#3d7a4e",
    wash: "#f0f4ee",
  },
  {
    id: "hearts",
    name: "String of Hearts",
    blurb: "Trails a metre off a shelf inside a year. Likes to dry out first.",
    price: 1800,
    category: "plants",
    variant: "trailing",
    tint: "#4a7c59",
    wash: "#f2f5f0",
  },
  {
    id: "echeveria",
    name: "Echeveria, set of three",
    blurb: "Three small rosettes in 6cm pots. Windowsill-sized.",
    price: 2200,
    category: "plants",
    variant: "round",
    tint: "#6b8f5e",
    wash: "#f3f5ee",
  },
  {
    id: "fig",
    name: "Fiddle-leaf Fig, 90cm",
    blurb: "A proper tree. Delivered in a wheeled crate, pot not included.",
    price: 7500,
    category: "plants",
    variant: "leafy",
    tint: "#26543a",
    wash: "#edf2ee",
    badge: "New in",
  },
  {
    id: "stoneware",
    name: "Ribbed stoneware pot, 16cm",
    blurb: "Hand-thrown, drainage hole, matching saucer.",
    price: 2400,
    category: "pots",
    variant: "pot",
    tint: "#b1613a",
    wash: "#f7f0ea",
  },
  {
    id: "charcoal",
    name: "Matte charcoal pot, 20cm",
    blurb: "Heavy enough to hold a top-heavy plant upright.",
    price: 3200,
    category: "pots",
    variant: "pot",
    tint: "#4b4f52",
    wash: "#f1f2f2",
  },
  {
    id: "can",
    name: "Brass watering can, 1.5L",
    blurb: "Long spout that reaches the back of a shelf. Ages beautifully.",
    price: 4200,
    category: "tools",
    variant: "can",
    tint: "#9a7431",
    wash: "#f7f3e9",
  },
];

export const categories = [
  { value: "all", label: "Everything" },
  { value: "plants", label: "Plants" },
  { value: "pots", label: "Pots" },
  { value: "tools", label: "Tools" },
] as const;

export const DELIVERY_PENCE = 495;
export const FREE_DELIVERY_OVER_PENCE = 5000;

export const formatPrice = (pence: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(
    pence / 100,
  );
