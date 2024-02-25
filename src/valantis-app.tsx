import { Providers } from "@providers/providers";
import React from "react";
import App from "./App";

export const ValantisApp = () => {
  return (
    <React.StrictMode>
      <Providers>
        <App />
      </Providers>
    </React.StrictMode>
  );
};
