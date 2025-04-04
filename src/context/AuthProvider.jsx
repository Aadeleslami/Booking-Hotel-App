import { createContext, useContext, useReducer } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();
const initialState = {
  user: null,
  isAuthentication: false,
};
function authReducer(state, { type, payload }) {
  switch (type) {
    case "login":
      return {
        user: payload,
        isAuthentication: true,
      };
    case "logout":
      return {
        user: null,
        isAuthentication: false,
      };
    default:
      toast.error("unknown action");
  }
}

const FAKE_USER = {
  name: "adel",
  email: "adeleslami0077@yahoo.com",
  password: "1234",
};
export default function AuthProvider({ children }) {
  const [{ user, isAuthentication }, dispatch] = useReducer(
    authReducer,
    initialState
  );
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthentication, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
