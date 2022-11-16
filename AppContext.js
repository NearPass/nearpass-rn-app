import React from "react";
export const AppContext = React.createContext(null);

const AppContextProvider = ({ children }) => {
    let [accountId, setAccountId] = React.useState();
    let [walletConnected, setWalletConnected] = React.useState(false);

    return (
        <AppContext.Provider
            value={{
                accountId,
                walletConnected,
                setAccountId,
                setWalletConnected,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
