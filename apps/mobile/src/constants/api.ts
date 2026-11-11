import { Platform } from 'react-native';

/**
 * The Android emulator can't reach the host machine via `localhost` — it
 * needs the special `10.0.2.2` alias. iOS simulators and physical devices
 * reach a dev server on the host directly.
 */
const LOCAL_API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

/**
 * Set to the deployed API's URL (e.g. a Vercel production URL) for release
 * builds. Falls back to the local API dev server otherwise.
 */
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? LOCAL_API_URL;
