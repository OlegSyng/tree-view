import { useContext } from "react";
import { AuthContext } from "../context/authorization-store";

export function useAuthContext() {
    return useContext(AuthContext)
}