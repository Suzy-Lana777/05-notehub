/// <reference types="vite/client" />

declare module '*.module.css' {
  const classes: { [key: string]: string };
  // export default
}

interface ImportMetaEnv {
  readonly VITE_NOTEHUB_TOKEN: string;
  readonly VITE_API_KEY?: string;
  // інші змінні, якщо треба
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
