import { create } from "zustand";

interface userData {
  name: string;
  email: string;
  userid: number;
  isLogedin: boolean;
}
interface UserState {
  user: userData;
  authentication: (data: userData) => void;
  logout: () => void;
}

export const useUserState = create<UserState>()((set) => ({
  user: { email: "", name: "", userid: 0, isLogedin: false },
  authentication: (data: userData) =>
    set(() => ({
      user: {
        email: data.email,
        name: data.name,
        userid: data.userid,
        isLogedin: true,
      },
    })),
  logout: () =>
    set(() => ({
      user: { email: "", name: "", userid: 0, isLogedin: false },
    })),
}));
