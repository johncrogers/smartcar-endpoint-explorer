import { useCallback, useMemo, useState } from "react";

import { EndpointConfiguration } from "./EndpointConfiguration";

export type RequestValues = {
  url: string;
  method: string;
  body?: Record<string, unknown>;
};

export function useEndpointExplorer(
  endpointConfiguration: EndpointConfiguration
): [
  {
    request: RequestValues;
    response: Record<string, unknown> | null;
    loading: boolean;
    error: Record<string, unknown> | null;
  },
  {
    resetForm: () => void;
    setUrl: (url: typeof values.request.url) => void;
    setMethod: (method: typeof values.request.method) => void;
    setBody: (body: typeof values.request.body) => void;
    executeRequest: (values: RequestValues) => void;
  }
] {
  // State
  const [values, setValues] = useState<
    ReturnType<typeof useEndpointExplorer>[0]
  >({
    request: getDefaultValue(endpointConfiguration),
    loading: false,
    response: null,
    error: null,
  });

  // Actions
  const resetForm = useCallback(() => {
    setValues({
      error: null,
      loading: false,
      response: null,
      request: getDefaultValue(endpointConfiguration),
    });
  }, [endpointConfiguration]);
  const setUrl = useCallback(
    (url: typeof values.request.url) => {
      setValues({
        ...values,
        request: {
          ...values.request,
          url,
        },
      });
    },
    [values]
  );
  const setMethod = useCallback(
    (method: typeof values.request.method) => {
      setValues({
        ...values,
        request: {
          ...values.request,
          method,
        },
      });
    },
    [values]
  );
  const setBody = useCallback(
    (body: typeof values.request.body) => {
      setValues({
        ...values,
        request: {
          ...values.request,
          body,
        },
      });
    },
    [values]
  );
  const executeRequest: ReturnType<
    typeof useEndpointExplorer
  >[1]["executeRequest"] = useCallback(
    async (requestValues: RequestValues) => {
      setValues({
        request: requestValues,
        loading: true,
        error: null,
        response: null,
      });
      fetch(requestValues.url, {
        method: requestValues.method,
        body: requestValues.body
          ? JSON.stringify(requestValues.body)
          : undefined,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setValues({
            ...values,
            loading: false,
            error: null,
            response: data,
          });
        })
        .catch((error) => {
          setValues({
            ...values,
            loading: false,
            error,
            response: null,
          });
        });
    },
    [values]
  );

  return useMemo(() => {
    const API: ReturnType<typeof useEndpointExplorer> = [
      values,
      { executeRequest, setUrl, setMethod, setBody, resetForm },
    ];

    return API;
  }, [values, executeRequest, setUrl, setMethod, setBody, resetForm]);
}

function getDefaultValue(
  endpointConfiguration: EndpointConfiguration
): RequestValues {
  return {
    url: endpointConfiguration.url,
    method: endpointConfiguration.method,
    body: !!endpointConfiguration.body
      ? endpointConfiguration.body.reduce(
          (
            body: ReturnType<typeof useEndpointExplorer>[0]["request"]["body"],
            bodyField
          ) => {
            if (!!body && typeof bodyField.name === "string") {
              body[bodyField.name] = "";
            }

            return body;
          },
          {} as ReturnType<typeof useEndpointExplorer>[0]["request"]
        )
      : undefined,
  };
}
