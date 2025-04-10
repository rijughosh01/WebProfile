import { getAboutUser } from "@/config/redux/action/authAction";
import { getAllPosts } from "@/config/redux/action/postAction";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserLayout from "@/layout/UserLayout";

export default function Dashboard() {
  const router = useRouter();

  const dispath = useDispatch();

  const authState = useSelector((state) => state.auth);

  const [isTokenThere, setIsTokenThere] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      router.push("/login");
    }
    setIsTokenThere(true);
  });

  useEffect(() => {
    if (isTokenThere) {
      dispath(getAllPosts());
      dispath(getAboutUser({ token: localStorage.getItem("token") }));
    }
  }, [isTokenThere]);

  return (
    <UserLayout>
      {authState.profileFetched && (
        <div>Hey, {authState.user.userProfile.userId.name}</div>
      )}
    </UserLayout>
  );
}
