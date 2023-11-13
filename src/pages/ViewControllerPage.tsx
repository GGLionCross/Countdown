// React
import { useState } from 'react';

// Components
import { Box, Grid } from '@mui/material';
import ViewThumbnail from '../components/ViewThumbnail';
import ViewSettingsDrawer from '../components/ViewSettingsDrawer';

export default function ViewControllerPage() {
    const [viewId, setViewId] = useState<string | null>(null);
    const [showEditView, setShowEditView] = useState(false);
    const [showAddView, setShowAddView] = useState(false);
    // const openEditView = () => {
    //     setShowEditView(true);
    // }

    const openAddView = () => {
        setViewId(null);
        setShowAddView(true);
    };

    const closeEditView = () => {
        setShowEditView(false);
        setShowAddView(false);
    };

    return (
        <Box
            sx={{
                width: '100%',
                pt: 8,
            }}
        >
            <Grid container spacing={2} sx={{ p: 4 }}>
                <ViewThumbnail addView onClick={openAddView} />
            </Grid>
            <ViewSettingsDrawer
                viewId={viewId}
                open={showEditView || showAddView}
                add={showAddView}
                close={closeEditView}
            />
        </Box>
    );
}
