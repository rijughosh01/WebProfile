import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  return (
    <>
     <div className={styles.container}>
      <div className={styles.mainContiner}>
        <div className={styles.mainContiner_left}>
          <p>Connect with friend</p>
          <p>and the world around you</p>

          <div onClick={() => {
            router.push("/login");
          }} className="buttonJoin">
            <p>Join Now</p>
          </div>
        </div>
        <div className={styles.mainContiner_right}>
          <img src="image/Register.jpg" alt=""/>
        </div>
      </div>
     </div>
    </>
  );
}
