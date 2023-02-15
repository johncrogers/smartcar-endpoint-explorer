import React from "react";

import { RequestForm, RequestFormProps } from "./RequestForm";
import { ResponseDisplay } from "./ResponseDisplay";
import { useEndpointExplorer } from "./useEndpointExplorer";

type EndpointExplorerProps = Pick<RequestFormProps, "endpointConfiguration">;

export const EndpointExplorer: React.FC<EndpointExplorerProps> = (
  props: EndpointExplorerProps
) => {
  const { endpointConfiguration } = props;
  const [{ request, response, loading, error }, { executeRequest }] =
    useEndpointExplorer(endpointConfiguration);
  const onChangeBaseUrl: RequestFormProps["onChangeBaseUrl"] = () => {
    // set url
  };
  const onChangeRequestBodyProperty: RequestFormProps["onChangeRequestBodyProperty"] =
    () => {
      // set values
    };
  const onSubmitRequest: RequestFormProps["onSubmitRequest"] = (event) => {
    // collect values
    const url = "";
    const method = "";
    const body = {};

    console.log(event);

    // submit request
    executeRequest({
      url,
      method,
      body,
    });
  };

  return (
    <>
      <RequestForm
        endpointConfiguration={endpointConfiguration}
        onChangeBaseUrl={onChangeBaseUrl}
        onChangeRequestBodyProperty={onChangeRequestBodyProperty}
        onSubmitRequest={onSubmitRequest}
      />
      <ResponseDisplay response={response} />
    </>
  );
};
