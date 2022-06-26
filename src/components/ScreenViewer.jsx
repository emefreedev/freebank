import { TextField } from '@mui/material';

export const ScreenViewer = ({ label, fieldValue, getInputId }) => {

    return (
        <TextField
            label={label}
            id={`${label}-id`}
            value={fieldValue}
            size='small'
            onFocus={(e) => getInputId(e.target.id)}
        />
    );
}