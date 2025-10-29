'use client';

import { firebaseApp } from './config';
import { getAnalytics, isSupported } from 'firebase/analytics';

export const analytics = isSupported().then(yes => yes ? getAnalytics(firebaseApp) : null);
