import { useState, useEffect, useContext } from 'react';
import { Grid, Stack, Typography, Alert, AlertTitle } from '@mui/material';
import { useNavigate } from "react-router-dom";

import { ScreenViewer, Keypad } from '../components';
import { DataContext } from '../context/DataProvider';

export const SignIn = () => {
    const navigate = useNavigate();
    const { login } = useContext(DataContext);

    const [showAlert, setShowAlert] = useState(null);
    const [buttonEnabled, setButtonEnabled] = useState({ label: 'Enter', status: true });
    const [inputId, setInputId] = useState('');
    const [user, setUser] = useState([]);
    const [pin, setPin] = useState([]);

    const validateInput = (value, param) => {
        const rgx = /[0-9]/g
        let tocompare = value.match(rgx);
        if (tocompare.length === 1) {
            /** User must be 10 characters and pin must be 6 characters. */
            (user.length < 10 && param === 'user') && setUser(user + value);
            (pin.length < 6 && param === 'pin') && setPin(pin + value);
        };
    }

    const validateCredentials = async () => {
        const response = await login({ user: user, pin: pin });
        !response ? setShowAlert({
            type: 'error',
            title: 'Action Blocked',
            message: 'Your credentials are incorrect'
        }) : navigate("/operations", { replace: true });
    }

    const getButtonValue = (value) => {
        if (value === 'Enter' && !buttonEnabled.status) {
            validateCredentials();
        }

        if (inputId === 'user-id' && value !== 'Enter') {
            value === 'Erase' ? setUser([]) : validateInput(value, 'user');
        } else if (inputId === 'pin-id' && value !== 'Enter') {
            value === 'Erase' ? setPin([]) : validateInput(value, 'pin');
        };
    };

    const getInputId = (id) => { setInputId(id); };

    useEffect(() => {
        (user.length === 10 && pin.length === 6) && setButtonEnabled({ ...buttonEnabled, status: false });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, pin]);

    return (
        <>
            {showAlert && (
                <Alert severity={showAlert.type} onClose={() => setShowAlert(null)}>
                    <AlertTitle>{showAlert.title}</AlertTitle>
                    {showAlert.message}
                </Alert>
            )}
            <Typography variant='h4' align='center' color='primary' mt={6} >Wellcome to The FreeBank</Typography>
            <Typography variant='h6' align='center' >Please, enter your credentials</Typography>

            <Stack direction='column' alignItems='center' spacing={2} sx={{ margin: '6vh 0px' }}>
                <ScreenViewer label='user' fieldValue={user} getInputId={getInputId} />
                <ScreenViewer label='pin' fieldValue={pin} getInputId={getInputId} />
            </Stack>

            <Grid container justifyContent='center'>
                <Grid item xs={8}>
                    <Keypad getValue={getButtonValue} labelLeftButton='Erase' labelRightButton='Enter' buttonEnabled={buttonEnabled} />
                </Grid>
            </Grid>
        </>
    );
}