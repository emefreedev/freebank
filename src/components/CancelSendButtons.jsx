import { Button, Grid, Stack } from "@mui/material";
import { useContext } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CancelIcon from '@mui/icons-material/Cancel';

import { DataContext } from '../context/DataProvider';

export const CancelSendButtons = ({ sendFunction, disabledBtnSend }) => {
    const { logout } = useContext(DataContext);

    return (
        <Grid item xs={12}>
            <Stack spacing={4} direction='row' justifyContent='center' mt={5}>
                <Button onClick={() => logout()} startIcon={<CancelIcon />} variant='contained' color='error' size='small'>Cancel</Button>
                <Button onClick={() => sendFunction()} disabled={disabledBtnSend} endIcon={<ArrowForwardIosIcon />} variant='contained' color='success' size='small'>Continue</Button>
            </Stack>
        </Grid>
    );
}