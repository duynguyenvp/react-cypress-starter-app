import { useState } from "react";

export const defaultAuthState = {
  setAuth: () => {},
  auth: {}
};

export function useAuth() {
  const [auth, setAuth] = useState(() => defaultAuthState.auth);

  return [auth, setAuth];
}
