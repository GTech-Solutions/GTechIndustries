import { render } from '@testing-library/react';

import CloudGaze from './cloud-gaze';

describe('CloudGaze', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<CloudGaze />);
        expect(baseElement).toBeTruthy();
    });
});
