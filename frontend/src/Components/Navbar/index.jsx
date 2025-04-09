import React from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";

export default function NavbarComponent() {
  const router = useRouter();
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
          <img src="image/Logo2.png" alt=""></img>
        </h1>
        <div className={styles.navBarOptionContainer}>
          <div
            onClick={() => {
              router.push("/login");
            }}
            className={styles.buttonJoin}
          >
            <p>Be a part</p>
          </div>
        </div>
      </nav>
    </div>
  );
}
