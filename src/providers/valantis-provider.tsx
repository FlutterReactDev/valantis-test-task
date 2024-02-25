import { ValantisProvider as Provider } from "@components/valantis-query";
import { queryClient } from "@constants/query-client";
import { VALANTIS_BACKEND_URL } from "@constants/valantis-backend-url";
import { FC, PropsWithChildren } from "react";
export const ValantisProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider
      baseUrl={VALANTIS_BACKEND_URL}
      queryClientProviderProps={{
        client: queryClient,
      }}
    >
      {children}
    </Provider>
  );
};
