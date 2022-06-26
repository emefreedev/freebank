import React, { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Slide, Stack } from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';

import { Keypad, ScreenViewer } from '../components';
import { usehelp } from '../helpers';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const ModalEnterNewValue = ({ open, closeModal, getNewValue }) => {
    const helper = usehelp();

    const [value, setValue] = useState([]);

    const cleanScreen = () => { setValue([]); };

    const getInputId = (id) => { /* console.log('id: ', id); */ };

    const getValue = (keyValue) => {
        if (keyValue !== 'Close' && keyValue !== 'Send') {
            setValue(value + keyValue);
        } else if (keyValue === 'Send') {
            getNewValue(value);
            closeModal();
        } else {
            keyValue === 'Close' && closeModal();
        }
    }

    return (
        <div>
            <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={closeModal} aria-describedby="alert-dialog-slide-description" >
                <DialogTitle>Enter new amount to extract</DialogTitle>
                <DialogContent>

                    <Stack direction='row' alignItems='center' justifyContent='center' spacing={2} sx={{ margin: '6vh 0px' }}>
                        <ScreenViewer fieldValue={`USD ${helper.convertAmountNumberToString(value)}`} getInputId={getInputId} label='Enter new value' />
                        <Button onClick={() => cleanScreen()} startIcon={<BackspaceIcon />} color='error' >Delete</Button>
                    </Stack>

                    <Keypad
                        getValue={getValue}
                        labelLeftButton={'Close'}
                        labelRightButton={'Send'}
                        buttonEnabled={{ label: 'Send', status: false }}
                    />

                </DialogContent>
            </Dialog>
        </div>
    );
};
