import { Button, Grid, Box } from '@mui/material';

export const Keypad = ({ getValue, labelLeftButton, labelRightButton, buttonEnabled }) => {
    return (
        <>
            <Grid container justifyContent='center'>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', labelLeftButton, '0', labelRightButton].map((i) => (
                    <Grid item xs={4} key={i}>
                        <Box display='flex' justifyContent='center'>
                            <Button
                                onClick={() => getValue(i)}
                                variant='contained'
                                sx={{ borderRadius: '20%', color: 'white', width: '50%', height: '6vh', margin: '15px 0px' }}
                                disabled={i === buttonEnabled.label && buttonEnabled.status}
                            >{i}</Button>
                        </Box>
                        {(i === '3' || i === '6' || i === '9') && <br />}
                    </Grid>
                ))}
            </Grid>
        </>
    );
}