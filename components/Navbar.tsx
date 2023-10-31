import { ConnectWallet, useAddress, useDisconnect } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const address = useAddress();
    const disconnect = useDisconnect();

    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    function disconnectWallet() {
        disconnect();
        setIsProfileDropdownOpen(false);
    }
    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <Link href="/">
                    <p>Home</p>
                </Link>
                <div className={styles.navLinks}>
                    <Link href="/stake">
                        <p>Stake</p>
                    </Link>
                </div>
                <div>
                    {!address ? (
                        <ConnectWallet 
                            btnTitle="Login"
                            theme="light"
                            className={styles.connectWalletBtn}
                        />
                    ) : (
                        <div
                            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                        >
                            <img src={`https://avatars.dicebear.com/api/avataaars/1.svg`} alt="avatar" className={styles.avatar}/>
                        </div>
                    )}
                </div>
                {isProfileDropdownOpen && (
                    <div className={styles.profileDropdown}>
                        <button
                            onClick={disconnectWallet}
                        >Logout</button>
                    </div>
                )}
            </div>
        </div>
    )
}