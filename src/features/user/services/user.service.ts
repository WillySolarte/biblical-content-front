import { apiGetNestedData } from "@/config/api-wrapper";
import { UserActiveResponseSchema } from "../schemas/user.schema";
import type { TUserActive } from "../types/user.types";

export const MOCK_USER: TUserActive = {
  id: "usr_studio_01",
  name: "Pastor David Morales",
  email: "david.morales@bibliastudio.com",
  role: "CREATOR",
  photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
};

export async function getUserAuthenticated(): Promise<TUserActive> {
  const isMockLoggedIn = typeof window !== 'undefined' && localStorage.getItem('biblia_studio_logged_in') === 'true';

  try {
    const url = '/user/me';
    return await apiGetNestedData(url, UserActiveResponseSchema);
  } catch (error) {
    if (isMockLoggedIn) {
      return MOCK_USER;
    }
    throw error;
  }
}
