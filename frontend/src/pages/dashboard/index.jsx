import { getAboutUser, getAllUsers } from "@/config/redux/action/authAction";
import { getAllPosts } from "@/config/redux/action/postAction";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserLayout from "@/layout/UserLayout";
import DashboardLayout from "@/layout/DashboardLayout";

export default function Dashboard() {
  const router = useRouter();

  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    if (authState.isTokenThere) {
      console.log("AUTH TOKEN");
      dispatch(getAllPosts());
      dispatch(getAboutUser({ token: localStorage.getItem("token") }));
    }
    if (!authState.all_profiles_fetched) {
      dispatch(getAllUsers());
    }
  }, [authState.isTokenThere]);

  return (
    <UserLayout>
      <DashboardLayout>
        <div>
          <h1>Dashboard</h1>
        </div>
      </DashboardLayout>
    </UserLayout>
  );
}
