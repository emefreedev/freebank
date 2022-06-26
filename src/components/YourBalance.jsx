import { useContext } from "react";
import { Stack, Typography } from "@mui/material";

import { DataContext } from '../context/DataProvider';
import { usehelp } from '../helpers';

export const YourBalance = () => {
    const { userData } = useContext(DataContext);
    const helper = usehelp();

    return (
        <Stack direction='row' justifyContent='center' spacing={8} mt={3}>
            <Typography align='left' variant='h6'>Your Balance</Typography>
            <Typography align='right' variant='h5'>
                {`USD ${helper.convertAmountNumberToString(userData.balance)}`}
            </Typography>
        </Stack>
    );
}