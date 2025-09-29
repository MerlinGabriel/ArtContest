// Minimal EIP-1193 provider typing to satisfy TypeScript
// Extend if you need stricter typings
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] | object }) => Promise<unknown>;
      on?: (event: string, handler: (...args: any[]) => void) => void;
      removeListener?: (event: string, handler: (...args: any[]) => void) => void;
      isMetaMask?: boolean;
      [key: string]: unknown;
    };
  }
}

export {};


