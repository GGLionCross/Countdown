// React
import { useState } from 'react';

// Components
import { Box, Grid } from '@mui/material';
import ViewThumbnail from '../component/ViewThumbnail';
import EditView from '../component/EditView';

export default function ViewControllerPage() {
    const [showEditView, setShowEditView] = useState(false);
    const [showAddView, setShowAddView] = useState(false);
    // const openEditView = () => {
    //     setShowEditView(true);
    // }

    const openAddView = () => {
        setShowAddView(true);
    }

    const closeEditView = () => {
        setShowEditView(false);
        setShowAddView(false);
    }

    return (
        <Box
            sx={{
                width: '100%',
                pt: 8
            }}
        >
            <Grid container spacing={2} sx={{ p: 4 }}>
                <ViewThumbnail addView onClick={openAddView} />
            </Grid>
            <EditView
                show={showEditView || showAddView}
                add={showAddView}
                close={closeEditView}
            />
        </Box>
    )
}