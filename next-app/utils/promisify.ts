import { ComponentType } from 'react';

export function wait(seconds: number) {
  return new Promise(resolve => window.setTimeout(resolve, seconds * 1000));
}

// Add a fixed delay so you can see the loading state
export function delayForDemo(promise: Promise<{ default: ComponentType<any> }>) {
  return new Promise(resolve => window.setTimeout(resolve, 2000)).then(() => promise);
}
