import { generateMetadata } from '@/utilities/metaData';
export const metadata = () => generateMetadata({ title: "Create User" });
export default function layout({children}) {
  return (
    <>
        {children}
    </>
  )
}
