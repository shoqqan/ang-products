type ProfileType = "furniture" | "equipment" | "stationary" | "part"

export type Profile = Record<string, any>;

export interface Product {
  id: number;
  name: string;
  description: string;
  sku: string;
  cost: number;
  profile: Profile;
}
