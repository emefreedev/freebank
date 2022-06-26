import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle, Box, Button, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PriceChangeIcon from '@mui/icons-material/PriceChange';

import { DataContext } from '../context/DataProvider';
import { ModalEnterNewValue, YourBalance, CancelSendButtons } from '../components';
import { usehelp } from '../helpers';

export const CashWithdrawal = () => {
    const { userData, withdrawals, setFeedbackMessage } = useContext(DataContext);
    const navigate = useNavigate();
    const helper = usehelp();

    const [loading, setLoading] = useState(true);
    const [suggestedAmounts, setSuggestedAmounts] = useState(null);
    const [amountToExtract, setAmountToExtract] = useState(null);
    const [amountGreaterThanBalance, setAmountGreaterThanBalance] = useState(null);
    const [disabledContinue, setDisabledContinue] = useState(true);
    const [open, setOpen] = useState(false);

    const openModal = () => { setOpen(true) }
    const closeModal = () => { setOpen(false) }

    const getAmountToExtract = (value) => {
        const numbConverted = helper.convertAmountNumberToString(value);
        setAmountToExtract({ valueNumb: value, valueString: numbConverted });
        if (value > userData.balance) {
            setAmountGreaterThanBalance({
                type: 'error',
                title: 'Extraction Blocked',
                message: 'The amount entered is greater than the balance.'
            })
            setDisabledContinue(true);
        } else {
            setDisabledContinue(false);
        }
    }

    const confirmWithdrawal = async () => {
        const response = await withdrawals(amountToExtract.valueNumb)
        if (response) {
            setFeedbackMessage({
                type: 'success',
                title: 'Cash Withdrawals',
                message: `Mr./Mrs. ${response.username} your withdrawals was successful and your current balance is ${helper.convertAmountNumberToString(response.balance)}.`
            })
            navigate("/feedback", { replace: true });
        }
    }
    useEffect(() => {
        if (userData) {
            let amounts = []
            for (let i = 0; i < 4; i++) {
                amounts.push(Math.round(userData.balance / (i + 1)));
            }
            setSuggestedAmounts(amounts);
            setLoading(false);
        } else {
            navigate("/", { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {loading ? (<Box sx={{ display: 'flex' }}><CircularProgress /></Box>
            ) : (<>
                <ModalEnterNewValue open={open} closeModal={closeModal} getNewValue={getAmountToExtract} />

                <Button onClick={() => navigate("/operations", { replace: true })} startIcon={<ArrowBackIosIcon />} variant='outlined' color='info' size='small' sx={{ margin: '5vh 0px 5vh 5vw' }}>Back to Options</Button>
                <Typography align='center' variant='h5' color='primary'>Cash Withdrawal</Typography>

                <YourBalance />

                {amountToExtract && (
                    <Stack direction='row' justifyContent='center' spacing={8} mt={3}>
                        <Typography align='left' variant='h6' color='error'>Amount to extract</Typography>
                        <Typography align='right' variant='h6' color='error'>
                            {`USD -${amountToExtract.valueString}`}
                        </Typography>
                    </Stack>
                )}

                {amountGreaterThanBalance && (
                    <Alert severity={amountGreaterThanBalance.type} onClose={() => setAmountGreaterThanBalance(null)}>
                        <AlertTitle>{amountGreaterThanBalance.title}</AlertTitle>
                        {amountGreaterThanBalance.message}
                    </Alert>
                )}

                <Grid container justifyContent='center' >

                    <Grid item xs={10} p={2} mt={4}>
                        <Box justifyContent='center'>
                            {suggestedAmounts.length > 0 && suggestedAmounts.map((i) => (
                                <Button onClick={(e) => getAmountToExtract(e.target.value)} value={i} sx={{ width: '30vw', marginLeft: '5vw', marginTop: '20px' }} variant='outlined' key={i.toString()}>{`USD ${helper.convertAmountNumberToString(i)}`}</Button>
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs={4} mt={2} >
                        <Box display='flex' justifyContent='center'><Button onClick={() => openModal()} startIcon={<PriceChangeIcon />} color='success' variant='outlined'>Another amount</Button></Box>
                    </Grid>

                    <CancelSendButtons sendFunction={confirmWithdrawal} disabledBtnSend={disabledContinue} />

                </Grid>
            </>)}
        </>
    );
}