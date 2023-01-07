import "../styles/globals.css";
import UserState from "../context/userContext";

export default function App({ Component, pageProps }) {
  return (
    <UserState>
      <Component {...pageProps} />
    </UserState>
  );
}
