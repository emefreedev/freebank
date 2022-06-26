
export const usehelp = () => {

    const convertAmountNumberToString = (number) => {
        const numb = number.toString();
        let newStringNumber = '';

        if (numb.length < 4) {
            newStringNumber = `${numb}`

        } else if (numb.length > 3 && numb.length < 7) {
            let thousands = numb.length === 4 ? 1 : numb.length === 5 ? 2 : 3;
            newStringNumber = `${numb.slice(0, thousands)}.${numb.slice(-3)}`

        } else if (numb.length > 6 && numb.length < 10) {
            let million = numb.length === 7 ? 1 : numb.length === 8 ? 2 : 3;
            newStringNumber = `${numb.slice(0, million)}.${numb.slice(-6, -3)}.${numb.slice(-3)}`
        }

        return newStringNumber;
    }


    return { convertAmountNumberToString };
};