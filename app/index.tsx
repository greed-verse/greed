import { Redirect, useRouter } from "expo-router";
import React from "react";

export default function Index() {
  const router = useRouter();
  return <Redirect href="/(unauth)/login" />;
}
