'use client';

import React, { useEffect, useState } from 'react';

const DISPATCH_WEEKDAY = 3; // Wednesday, matching the weekly dispatch on the FAQ page

/** The next upcoming dispatch day, e.g. "Wednesday, 4 November". */
function nextDispatchLabel(from = new Date()): string {
  const daysAhead = ((DISPATCH_WEEKDAY - from.getDay() + 7) % 7) || 7;
  const next = new Date(from);
  next.setDate(from.getDate() + daysAhead);
  return next.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
}

/**
 * Inline text with the next dispatch date. The date is filled in after mount so the
 * server-rendered HTML never disagrees with the visitor's own clock.
 */
export const NextDispatch: React.FC<{ prefix?: string }> = ({ prefix = 'Next dispatch' }) => {
  const [label, setLabel] = useState('');
  useEffect(() => setLabel(nextDispatchLabel()), []);
  return <>{label ? `${prefix}: ${label}` : `${prefix}: every Wednesday`}</>;
};
