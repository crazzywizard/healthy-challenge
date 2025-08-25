declare module 'minimatch' {
  const minimatch: {
    (pattern: string, str: string, options?: object): boolean;
    filter(pattern: string): (str: string) => boolean;
  };
  export = minimatch;
}

declare module 'next-pwa' {
  const withPWA: (config: object) => object;
  export default withPWA;
}
