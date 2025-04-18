export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-no-repeat bg-cover bg-center w-full relative overflow-hidden">
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        {children}
      </div>
    </div>
  );
}
