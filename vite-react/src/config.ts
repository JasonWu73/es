interface ConfigItem {
  baseUrl: string;
}

type Config = ConfigItem | undefined;

export function getInternalApiBaseUrl() {
  // @ts-ignore
  const config = window._CONFIG as Config;

  return config?.baseUrl || window.location.origin;
}
