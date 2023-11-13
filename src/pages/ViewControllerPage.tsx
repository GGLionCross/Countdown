// React
import { useEffect, useState } from 'react';

// Components
import { Box, Grid } from '@mui/material';
import ViewThumbnail from '../components/ViewThumbnail';
import ViewSettingsDrawer from '../components/ViewSettingsDrawer';

// Services
import { ViewSchema, subscribeToViews } from '../services/database';
import { off } from 'firebase/database';

export default function ViewControllerPage() {
    const [views, setViews] = useState<ViewSchema<string, string> | null>(null);
    useEffect(() => {
        const { viewsRef, unsubscribe } = subscribeToViews(setViews);
        return () => off(viewsRef, 'value', unsubscribe);
    }, []);

    // Controls the ViewSettingsDrawer component
    const [viewId, setViewId] = useState<string | null>(null);
    const [viewData, setViewData] = useState<ViewSchema<string, string> | null>(
        null
    );
    const [showEditView, setShowEditView] = useState(false);
    const [showAddView, setShowAddView] = useState(false);
    const openEditView = (vId: string, vData: ViewSchema<string, string>) => {
        setViewId(vId);
        setViewData(vData);
        setShowEditView(true);
    };
    const openAddView = () => {
        setViewId(null);
        setViewData(null);
        setShowAddView(true);
    };
    const closeEditView = () => {
        setShowEditView(false);
        setShowAddView(false);
        setViewId(null);
        setViewData(null);
    };

    return (
        <Box
            sx={{
                width: '100%',
                pt: 8,
            }}
        >
            <Grid container spacing={2} sx={{ p: 4 }}>
                {views
                    ? Object.entries(views).map(([vId, vData]) => (
                          <ViewThumbnail
                              viewId={vId}
                              viewData={vData}
                              onClick={() => openEditView(vId, vData)}
                          />
                      ))
                    : null}
                <ViewThumbnail addView onClick={openAddView} />
            </Grid>
            <ViewSettingsDrawer
                viewId={viewId}
                viewData={viewData}
                open={showEditView || showAddView}
                add={showAddView}
                close={closeEditView}
            />
        </Box>
    );
}
