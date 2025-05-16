
import { Navigate } from "react-router-dom";

// Redirect from the default index page to our Homepage
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
