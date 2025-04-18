import useAuthFunc from "@/hook/auth";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function PrivateLayout({ children, requiredRole }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isMounted, processing, user } = useAuthFunc();

  if (!isMounted || (isMounted && processing)) {
    return <>loading...</>;
  }

  // if (requiredRole && user?.role !== requiredRole) {
  //   router.push("/unauthorized");
  //   return null;
  // }

  return <>{children}</>;
}
