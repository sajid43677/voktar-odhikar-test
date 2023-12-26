import "../styles/globals.css";
import "../styles/Distributor/card.css"; // Import a CSS file for styling
import { AuthProvider } from "./utils/Distributor/authcontext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
