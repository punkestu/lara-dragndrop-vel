import { writable } from "svelte/store";

// export const modal = writable(null);
export const zoomLevel = writable(1);
export const origin = writable([0, 0]);
export const panning = writable(true);