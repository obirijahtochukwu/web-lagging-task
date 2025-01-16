import { Suspense } from "react";
import SearchFilterContextProvider from "./SearchFilterContext/SearchFIlterContext";
import UserContextProvider from "./UserContext";
import AppContextProvider from "./AppContext/AppContext";

const composeProviders = (...providers: ContextProvider[]): ContextProvider => {
    return ({ children }: ContextProviderProps) =>
        providers.reduceRight(
            (acc, Provider) => <Suspense fallback={<></>}>
                <Provider>{acc}</Provider>
            </Suspense>,
            children
        );
};

const AppProviders = composeProviders(
    UserContextProvider,
    AppContextProvider,
    SearchFilterContextProvider,
);

export default AppProviders;