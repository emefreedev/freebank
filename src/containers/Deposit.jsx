import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PriceChangeIcon from '@mui/icons-material/PriceChange';

import { DataContext } from '../context/DataProvider';
import { YourBalance, CancelSendButtons, ModalEnterNewValue } from '../components';
import { usehelp } from '../helpers';

export const Deposit = () => {
    const { deposit, setFeedbackMessage } = useContext(DataContext);
    const navigate = useNavigate();
    const helper = usehelp();

    const [disabledContinue, setDisabledContinue] = useState(true);
    const [open, setOpen] = useState(false);
    const [amountToDeposit, setAmountToDeposit] = useState(null);

    const openModal = () => { setOpen(true) }
    const closeModal = () => { setOpen(false) }

    const getAmount = (amount) => {
        if (amount && amount.length > 0) {
            const numbConverted = helper.convertAmountNumberToString(amount);
            setAmountToDeposit({ valueNumb: amount, valueString: numbConverted });
            setDisabledContinue(false);
        } else if (amount.length === 0) {
            setAmountToDeposit(null);
            setDisabledContinue(true);
        }

    }

    const confirmDeposit = async () => {
        const response = await deposit(amountToDeposit.valueNumb)
        if (response) {
            setFeedbackMessage({
                type: 'success',
                title: 'Cash Deposit',
                message: `Mr./Mrs. ${response.username} your deposit was successful and your current balance is ${helper.convertAmountNumberToString(response.balance)}.`
            })
            navigate("/feedback", { replace: true });
        }
    }

    return (<>
        <Button onClick={() => navigate("/operations", { replace: true })} startIcon={<ArrowBackIosIcon />} variant='outlined' color='info' size='small' sx={{ margin: '5vh 0px 5vh 5vw' }}>Back to Options</Button>
        <Typography align='center' variant='h5' color='primary'>Deposit Money</Typography>

        <ModalEnterNewValue open={open} closeModal={closeModal} getNewValue={getAmount} />

        <Grid container justifyContent='center' >

            <YourBalance />

            {amountToDeposit && (
                <Stack direction='row' justifyContent='center' spacing={8} mt={3}>
                    <Typography align='left' variant='h6' color='green'>Amount to deposit</Typography>
                    <Typography align='right' variant='h6' color='green'>
                        {`USD +${amountToDeposit.valueString}`}
                    </Typography>
                </Stack>
            )}

            <Grid item xs={12} mt={2} >
                <Box display='flex' justifyContent='center'>
                    <Button onClick={() => openModal()} startIcon={<PriceChangeIcon />} color='success' variant='outlined'>Enter an amount</Button>
                </Box>
            </Grid>

            <CancelSendButtons sendFunction={confirmDeposit} disabledBtnSend={disabledContinue} />
        </Grid>
    </>);
}