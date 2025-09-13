import { useContext } from "react";
import { useAuth as useAuthContext } from "../context/AuthContext";
export default function useAuth() {
  return useAuthContext();
}
