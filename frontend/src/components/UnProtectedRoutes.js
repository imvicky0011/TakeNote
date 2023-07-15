import { Navigate } from "react-router-dom";

const UnProtectedRoutes = ({loggenId, children}) => {
    if(loggenId) {
        return <Navigate to = "/" replace/>
    }
    return children
}

export default UnProtectedRoutes