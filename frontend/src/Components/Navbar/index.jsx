import React from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function NavbarComponent() {
  const router = useRouter();
  const authState = useSelector((state) => state.auth);
  return (
    <div className={styles.container}>
      <nav className={styles.navBar}>
        <h1
          className={styles.homeHeading}
          style={{ cursor: "pointer" }}
          onClick={() => {
            router.push("/");
          }}
        >
          <img src="image/Logo.png" alt=""></img>
        </h1>
        <div className={styles.navBarOptionContainer}>
          {authState.profileFetched && (
            <div>
              <div style={{ display: "flex", gap: "1.2rem" }}>
                <p>Hey {authState.user.userProfile.userId.name}</p>
                <p style={{ fontWeight: "bold", cursor: "pointer" }}>Profile</p>
              </div>
            </div>
          )}

          {!authState.profileFetched && (
            <div
              onClick={() => {
                router.push("/login");
              }}
              className={styles.buttonJoin}
            >
              <p>Be a part</p>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
