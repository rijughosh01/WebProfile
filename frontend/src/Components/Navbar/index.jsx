import React from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "@/config/redux/reducer/authReducer";

export default function NavbarComponent() {
  const router = useRouter();
  const dispatch = useDispatch();
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
                <p>Hey, {authState.user.userProfile.userId.name}</p>
                <p style={{ fontWeight: "bold", cursor: "pointer" }}>Profile</p>

                <p
                  onClick={() => {
                    localStorage.removeItem("token");
                    router.push("/login");
                    dispatch(reset());
                  }}
                  className={styles.logout}
                >
                  Logout
                </p>
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
