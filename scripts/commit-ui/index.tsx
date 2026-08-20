#!/usr/bin/env tsx
import { render } from 'ink';
import React from 'react';

import Pipeline from './pipeline';

const { waitUntilExit } = render(<Pipeline />);

try {
    await waitUntilExit();
} catch {
    process.exit(1);
}
