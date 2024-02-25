import { FC, PropsWithChildren } from "react";
import { ValantisProvider } from "./valantis-provider";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return <ValantisProvider>{children}</ValantisProvider>;
};
