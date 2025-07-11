import { useKeycloak } from "@react-keycloak/web";
import { useLocation } from "react-router-dom";

function SecuredRoute({ children }) {
    // const { keycloak, initialized } = useKeycloak();
    const location = useLocation();

    // if(!initialized) {
    //   return <div>initializing keycloak...</div>
    // }

    // if(!keycloak.authenticated) {
    //   console.log("Not authenticated, redirecting to login");
    //   keycloak.login({
    //     redirectUri: window.location.origin + location.pathname
    //   });

    //   return <div>Redirecting to login...</div>
    // }

    return children;
}
export default SecuredRoute