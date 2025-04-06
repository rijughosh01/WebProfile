import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
     <div className="container">
      <div className="mainContiner">
        <div className="mainContiner_left">
          <p>Connect with friend</p>
          <p>and the world around you</p>
          <div onClick={() => {
            
          }} className="buttonJoin">
            <p>Join Now</p>
          </div>
        </div>
        <div className="mainContiner_right">
          <img src="image/Register.jpg" alt=""/>
        </div>
      </div>
     </div>
    </>
  );
}
