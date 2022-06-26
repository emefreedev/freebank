import usermock from './mock/user.json';

export const useServices = () => {

    const fetchingUserData = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(usermock);
            }, 1000);
        });
    }

    const getUserValidation = async (data) => {
        const response = await fetchingUserData();

        if (response.userNumbCredential === data.user && response.pin === data.pin) {
            return { username: response.username, balance: response.balance };
        } else { return null; };
    }

    const getWithdrawals = async (data, currentState) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ username: currentState.username, balance: (currentState.balance - Number(data)) });
            }, 1000);
        });
    }

    const getDeposits = async (data, currentState) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ username: currentState.username, balance: currentState.balance + Number(data) });
            }, 1000);
        });
    }

    return { getUserValidation, getWithdrawals, getDeposits };
};