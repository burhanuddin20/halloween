import type { AppProps } from "next/app";
import { ThirdwebProvider, useContract } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Navbar from "../components/Navbar";


// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "mumbai";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
    clientId={process.env.NEXT_PUBLIC_CLIENT_ID2}
      activeChain={activeChain}
    >
      <Navbar />

      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
function Component() {
  const CONTRACT_ADDRESS = "0x847560198Eafa1df1790e63Fd5d919324A213907";
  // Might need to specify the ABI here
  const { contract, isLoading } = useContract(CONTRACT_ADDRESS);
}

export default MyApp;

