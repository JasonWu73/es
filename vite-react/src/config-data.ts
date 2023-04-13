interface ConfigData {
  baseUrl: string;
}

// @ts-ignore
export const config: ConfigData | undefined = window?._CONFIG;

export const internalApiBaseUrl = config?.baseUrl || window.location.origin;
