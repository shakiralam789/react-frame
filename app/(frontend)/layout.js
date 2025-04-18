import React from "react";

export default function layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* <Header /> */}
      <main className="w-full flex-1 flex flex-wrap px-4">
        <div className="w-full">{children}</div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
