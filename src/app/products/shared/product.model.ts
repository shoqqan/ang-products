type ProfileType = "furniture" | "equipment" | "stationary" | "part"

export interface Profile {
  type: ProfileType;
  available: boolean;
  backlog: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  sku: string;
  cost: number;
  profile: Profile;
}
