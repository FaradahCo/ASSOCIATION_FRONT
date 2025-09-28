import React from "react";
import { Outlet } from "react-router";

const AuthenticationLayout: React.FC = () => {
  return (
    <div className="relative h-screen p-4">
      {/* Image Background - Full Width on Large Screens */}
      <div className="hidden lg:block absolute inset-0 lg:left-1/4 p-4">
        <img
          className="w-full h-full object-cover rounded-4xl"
          src="/images/auth-background.png"
          title="auth-background"
          alt="auth-background"
        />
      </div>

      {/* Form Overlay */}
      <div className="relative z-10 w-full lg:w-1/3 h-full overflow-y-auto flex flex-col justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthenticationLayout;
