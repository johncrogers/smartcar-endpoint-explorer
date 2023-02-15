import { useCallback, useMemo, useState } from "react";

import { EndpointConfiguration } from "./EndpointConfiguration";

type RequestValues = {
  url: string;
  method: string;
  body: Record<string, unknown>;
};

export function useEndpointExplorer(
  endpointConfiguration: EndpointConfiguration
): [
  {
    request: RequestValues;
    response: null;
    loading: boolean;
    error: Record<string, unknown> | null;
  },
  {
    executeRequest: (values: RequestValues) => void;
  }
] {
  // State
  const [values, setValues] = useState<
    ReturnType<typeof useEndpointExplorer>[0]
  >({
    request: {
      url: endpointConfiguration.url,
      method: endpointConfiguration.method,
      body: endpointConfiguration.body.reduce(
        (
          body: ReturnType<typeof useEndpointExplorer>[0]["request"]["body"],
          bodyField
        ) => {
          if (typeof bodyField.name === "string") {
            body[bodyField.name] = null;
          }

          return body;
        },
        {} as ReturnType<typeof useEndpointExplorer>[0]["request"]
      ),
    },
    loading: false,
    response: null,
    error: null,
  });

  // Actions
  const executeRequest: ReturnType<
    typeof useEndpointExplorer
  >[1]["executeRequest"] = useCallback(
    (requestValues: RequestValues) => {
      setValues({ ...values, request: requestValues });
      fetch(requestValues.url, {
        method: requestValues.method,
        body: JSON.stringify(requestValues.body),
      });
    },
    [values]
  );

  return useMemo(() => {
    const API: ReturnType<typeof useEndpointExplorer> = [
      values,
      { executeRequest },
    ];

    return API;
  }, [values, executeRequest]);
}
