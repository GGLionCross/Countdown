// React
import { useEffect, useState } from 'react';

// Components
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Services
import { off } from 'firebase/database';
import { subscribeToAllViews } from '~/services/database';
import { ViewSchema } from '~/services/database';

// Pages
import Root from './Root';
import ViewPage from '~/pages/ViewPage';

export default function AppRouter() {
    const [views, setViews] = useState<ViewSchema<string, string> | null>(null);
    useEffect(() => {
        const { viewsRef, unsubscribe } = subscribeToAllViews(setViews);
        return () => off(viewsRef, 'value', unsubscribe);
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Root />} />
                {views
                    ? Object.entries(views).map(([vId, vData]) => (
                          <Route
                              path={`/view/${vId}`}
                              key={vId}
                              element={<ViewPage viewData={vData} />}
                          />
                      ))
                    : null}
            </Routes>
        </BrowserRouter>
    );
}
