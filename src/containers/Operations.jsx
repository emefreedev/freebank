import { useContext, useEffect, useState } from "react";
import { Grid, Typography, Button, Stack, Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { DataContext } from '../context/DataProvider';

export const Operations = () => {
    const { userData } = useContext(DataContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        userData ? setLoading(false) : navigate("/", { replace: true });
    }, []);

    return (
        <>
            {
                loading ? (<Box sx={{ display: 'flex' }}><CircularProgress /></Box>
                ) : (
                    <Grid container justifyContent='center' alignContent='center'>
                        <Grid item xs={5} mt={10}>
                            <Typography variant='h5' align='center'>Wellcome <br /> {userData.username}</Typography>
                            <Typography variant='body2' align='center'>What do you want to do?</Typography>
                        </Grid>
                        <Grid item xs={6} mt={10}>
                            <Stack spacing={4}>
                                <Button onClick={() => navigate("/withdrawal", { replace: true })} variant='contained' color='primary' size='large'>Cash Withdrawal</Button>
                                <Button onClick={() => navigate("/balance", { replace: true })} variant='contained' color='primary' size='large'>Balance Inquiry</Button>
                                <Button onClick={() => navigate("/deposit", { replace: true })} variant='contained' color='primary' size='large'>Deposit</Button>

                                <Button onClick={() => navigate("/", { replace: true })} variant='contained' color='error' size='small'>Cancel</Button>
                            </Stack>
                        </Grid>
                    </Grid>
                )}
        </>
    );
}