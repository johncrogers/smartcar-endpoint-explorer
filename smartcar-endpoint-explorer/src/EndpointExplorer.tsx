import React from "react";

import { RequestForm, RequestFormProps } from "./RequestForm";
import { ResponseDisplay, ResponseDisplayProps } from "./ResponseDisplay";

type EndpointExplorerProps = RequestFormProps & ResponseDisplayProps;

export const EndpointExplorer: React.FC<EndpointExplorerProps> = (
  props: EndpointExplorerProps
) => {
  const {
    endpointConfiguration,
    response,
    onChangeBaseUrl,
    onChangeRequestBodyProperty,
    onSubmitRequest,
  } = props;

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
