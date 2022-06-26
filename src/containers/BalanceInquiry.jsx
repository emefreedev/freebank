import { useContext } from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { DataContext } from '../context/DataProvider';
import { usehelp } from '../helpers';

export const BalanceInquiry = () => {
    const { userData, logout } = useContext(DataContext);
    const navigate = useNavigate();
    const helper = usehelp();

    return (
        <>
            <Button onClick={() => navigate("/operations", { replace: true })} startIcon={<ArrowBackIosIcon />} variant='outlined' color='info' size='small' sx={{ margin: '5vh 0px 5vh 5vw' }}>Back to Options</Button>

            <Typography align='center' variant='h4' color='primary'>Balance Inquiry</Typography>
            <Typography align='center' variant='h6' m={6}>{`Hi Mr./Mrs. ${userData.username} your current balance is ${helper.convertAmountNumberToString(userData.balance)}`}</Typography>
            <Box display='flex' justifyContent='center'><Button onClick={() => logout()} startIcon={<CancelIcon />} variant='contained' color='error' size='small' >Cancel</Button></Box>
        </>
    );
}