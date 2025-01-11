import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { BrowserRouter } from 'react-router-dom';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import '@cloudscape-design/global-styles/index.css';
import messages from '@cloudscape-design/components/i18n/messages/all.all';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <StrictMode>
        <I18nProvider messages={[messages]}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </I18nProvider>
    </StrictMode>
);
