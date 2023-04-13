interface Config {
  baseUrl: string;
}

// @ts-ignore
export const config: Config | undefined = window?._CONFIG;

export const internalApiBaseUrl = config?.baseUrl || window.location.origin;
