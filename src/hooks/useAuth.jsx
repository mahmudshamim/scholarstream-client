import { useContext } from "react";
// Assuming you have an AuthContext created. If not, I need to find where it is or create it.
// I will assume for now there is an AuthProvider. I need to check main.jsx or App.jsx to see how auth is provided. 
// Wait, I haven't seen an AuthProvider yet. The previous tasks just updated Login/Register.
// I should check if AuthProvider exists. If not, I need to create it.
// I will create a standard useAuth hook that can be used once the provider is in place.
// Actually, looking at the file list, I don't see an AuthProvider. I need to create that too.

import { AuthContext } from "../providers/AuthProvider";

const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
};

export default useAuth;
