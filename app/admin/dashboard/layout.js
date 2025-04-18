import { generateMetadata } from '@/utilities/metaData';
export const metadata = () => generateMetadata({ title: "Dashboard" });
export default function layout({children}) {
  return (
    <>
        {children}
    </>
  )
}
