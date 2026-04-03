import React from 'react';
import { BeforeAfterWipe } from './BeforeAfterWipe';
import { GARDEN_PLACEHOLDERS } from '../constants/gardenPlaceholders';

export function AutoBeforeAfter() {
  return (
    <BeforeAfterWipe
      beforeSource={GARDEN_PLACEHOLDERS.path}
      afterSource={GARDEN_PLACEHOLDERS.pool}
      height={420}
      sweepDurationMs={2500}
    />
  );
}
