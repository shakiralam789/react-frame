import Image from "next/image";

export default function AuthCard({ title,desc, logo, children }) {
  return (
    <div className="w-full max-w-md bg-white bg-opacity-80 rounded-lg shadow-xl p-8">
      {logo && (
        <div className="flex justify-center mb-6">
          <Image
            height={100}
            width={100}
            src={logo}
            alt="Logo"
            className="w-24 h-24"
          />
        </div>
      )}
      <h2 className="font-28 font-semibold text-gray-800 mb-2">
        {title}
      </h2>
      {desc && <p className="font-14 text-gray-600 mb-6">{desc}</p>}
      {children}
    </div>
  );
}
