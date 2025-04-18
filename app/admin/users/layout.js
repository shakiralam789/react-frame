import { generateMetadata } from "@/utilities/metaData";

export const metadata = () => generateMetadata({ title: "Users" });

export default function Layout({ children }) {
  return <>{children}</>;
}
