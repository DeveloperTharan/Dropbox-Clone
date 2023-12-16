import { SignUp } from "@clerk/nextjs";
import NavBar from "../../NavBar";

export default function Page() {
  return (
    <>
      <NavBar />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <SignUp />
      </div>
    </>
  );
}
