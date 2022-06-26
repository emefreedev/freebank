import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, CircularProgress, SvgIcon } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

import { DataContext } from '../context/DataProvider';

export const Feedback = () => {
    const { feedback } = useContext(DataContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        feedback && setLoading(false)
    }, []);

    return (
        <>
            {loading ? (<Box sx={{ display: 'flex' }}><CircularProgress /></Box>) : (
                <>
                    <Button onClick={() => navigate("/operations", { replace: true })} startIcon={<ArrowBackIosIcon />} variant='outlined' color='info' size='small' sx={{ margin: '5vh 0px 5vh 5vw' }}>Back to Options</Button>
                    <Typography variant='h4' align='center' mt={6} color={feedback.type === 'success' ? 'green' : 'red'} mb={2}>
                        {feedback.title}
                    </Typography>
                    <Box display='flex' justifyContent='center'>

                        <SvgIcon sx={{ fontSize: 40 }}>
                            {feedback.type === 'success' ? (
                                <CheckCircleIcon color='success' />
                            ) : (
                                <ErrorIcon color='error' />
                            )}
                        </SvgIcon>
                    </Box>
                    <Typography variant='h6' align='center' ml={4} mr={4} mt={2}>{feedback.message}</Typography>
                </>
            )}
        </>
    );
}