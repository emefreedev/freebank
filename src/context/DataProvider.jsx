import { createContext, useState } from "react";

import { useServices } from '../helpers';

export const DataContext = createContext();
export const DataProvider = ({ children }) => {
    const service = useServices(null);

    const [userData, setUserData] = useState(null);
    const [feedback, setFeedback] = useState(null);

    const login = async (data) => {
        const response = await service.getUserValidation(data);
        if (response) {
            setUserData({ username: response.username, balance: response.balance });
            return { data: 'ok' };
        } else { return null; };
    }

    const logout = () => {
        setUserData(null)
        window.location.href = '/'
    }

    const withdrawals = async (data) => {
        const response = await service.getWithdrawals(data, userData);

        if (response) {
            setUserData({ username: response.username, balance: response.balance });
            return response;
        } else { return null; };
    }

    const deposit = async (data) => {
        const response = await service.getDeposits(data, userData);

        if (response) {
            setUserData({ username: response.username, balance: response.balance });
            return response;
        } else { return null; };
    }

    const setFeedbackMessage = (data) => {
        setFeedback(data);
    }

    const contextValues = {
        login,
        logout,
        withdrawals,
        deposit,
        setFeedbackMessage,
        userData,
        feedback,
    };

    return (
        <DataContext.Provider value={contextValues}>
            {children}
        </DataContext.Provider>
    );
};
