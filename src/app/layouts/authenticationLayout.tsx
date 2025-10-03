import React from "react";
import { Outlet, useMatches } from "react-router";
import { Card } from "antd";

// Define the type for the context data
export type AuthLayoutContextType = {
  image?: string;
  title?: string;
  formTitle?: string;
  formDescription?: string;
};

const AuthenticationLayout: React.FC = () => {
  const matches = useMatches();
  const currentMatch = matches[matches.length - 1];
  const routeData = currentMatch.loaderData as AuthLayoutContextType;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <div className="flex items-center justify-center p-4 ">
        <Card className="shadow w-full max-w-lg rounded-3xl!">
          <h1 className="font-semibold text-2xl mb-2">{routeData.formTitle}</h1>
          <p className="mb-2">{routeData.formDescription}</p>
          <div className="mt-10">
            <Outlet />
          </div>
        </Card>
      </div>

      <div className="hidden lg:block p-4">
        <img
          className="w-full h-full object-cover rounded-4xl"
          src={routeData.image}
          title="auth-background"
          alt="auth-background"
        />
      </div>
    </div>
  );
};

export default AuthenticationLayout;
