import {
  QueryClientProvider,
  QueryClientProviderProps,
} from "@tanstack/react-query";
import Valantis from "@utils/valantis";
import { FC, PropsWithChildren, createContext, useContext } from "react";
export interface ValantisContextState {
  client: Valantis;
}
const ValantisContext = createContext<ValantisContextState | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useValantis = () => {
  const context = useContext(ValantisContext);

  if (!context) {
    throw new Error("useValantis must be used within a provider");
  }
  return context;
};

export interface ValantisProviderProps {
  queryClientProviderProps: QueryClientProviderProps;
  baseUrl: string;
  valantisClient?: Valantis;
}
export const ValantisProvider: FC<PropsWithChildren<ValantisProviderProps>> = (
  props
) => {
  const {
    queryClientProviderProps,
    children,
    baseUrl,
    valantisClient = new Valantis({
      baseUrl,
    }),
  } = props;
  return (
    <QueryClientProvider {...queryClientProviderProps}>
      <ValantisContext.Provider
        value={{
          client: valantisClient,
        }}
      >
        {children}
      </ValantisContext.Provider>
    </QueryClientProvider>
  );
};
