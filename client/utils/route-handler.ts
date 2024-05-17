import { redirect } from "next/navigation";

export const handleAuthRoute = (routes: string[]) => {
  const requiredRoute = routes.some(
    (route) => route === "sign-in" || route === "sign-up"
  );

  if (routes.length <= 1 && requiredRoute) {
    return routes;
  } else {
    return redirect("/auth/sign-in");
  }
};

export const handleMainRoute = (routes: string[]) => {
  if (routes.length <= 1) {
    return routes[0];
  } else {
    return routes[1] || "/dashboard";
  }
};
