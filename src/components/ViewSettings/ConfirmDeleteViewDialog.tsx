// React
import { useState } from 'react';

// Components
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Services
import { deleteView } from '~/services/database';

export interface ConfirmDeleteViewDialogProps {
    open: boolean;
    viewId: string | null;
    publicMode: boolean;
    onCancel: () => void;
    onDelete: () => void;
}

export default function ConfirmDeleteViewDialog(
    props: ConfirmDeleteViewDialogProps
) {
    const [loading, setLoading] = useState(false);
    const closeDialog = () => {
        props.onCancel();
    };
    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteView(props.viewId, props.publicMode);
            // If no errors were caught
            closeDialog();
            props.onDelete();
        } catch (error: unknown) {
            // If delete does not work, it will be obvious as dialog will remain
            // and the loading animation will finish.
            console.error('An error occurred while deleting: ', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Dialog open={props.open}>
            <DialogTitle>Delete View</DialogTitle>
            <DialogContent>
                <Typography>
                    Are you sure you wish to delete this view?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Cancel</Button>
                <LoadingButton
                    variant='contained'
                    onClick={handleDelete}
                    loading={loading}
                >
                    Delete
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}
