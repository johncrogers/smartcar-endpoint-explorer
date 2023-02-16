import React from "react";

import { RequestForm, RequestFormProps } from "./RequestForm";
import { ResponseDisplay } from "./ResponseDisplay";
import { useEndpointExplorer } from "./useEndpointExplorer";

type EndpointExplorerProps = Pick<RequestFormProps, "endpointConfiguration">;

export const EndpointExplorer: React.FC<EndpointExplorerProps> = (
  props: EndpointExplorerProps
) => {
  const { endpointConfiguration } = props;
  const [
    { request, response, loading, error },
    { executeRequest, setUrl, setBody },
  ] = useEndpointExplorer(endpointConfiguration);
  const onChangeBaseUrl: RequestFormProps["onChangeBaseUrl"] = (event) => {
    setUrl(event.target.value);
  };
  const onChangeRequestBodyProperty: RequestFormProps["onChangeRequestBodyProperty"] =
    (propertyName, event) => {
      setBody({
        ...request.body,
        [propertyName]: event.target.value,
      });
    };
  const onSubmitRequest: RequestFormProps["onSubmitRequest"] = (event) => {
    /*
    The native structure is registering the inputs in an special array preventing it from serving this challenge well.
    I would prefer to have used a library to solve this but I wanted to give native
    JavaScript a chance. That being said, an object could be used to represent the request
    in React state. It's key's and values could be set dynamically to account for the 
    programmatic nature of building bodies up. Nearly all of this code could be generated
    depending on what API specifications are available.
     */
    event.preventDefault();
    const url = event.target[0].value;
    const email = event.target[1]?.value;
    const fullName = event.target[2]?.value;
    const phone = event.target[3]?.value;

    executeRequest({
      url,
      method: endpointConfiguration.method,
      body: {
        email,
        fullName,
        phone,
      },
    });
  };

  return (
    <>
      <RequestForm
        endpointConfiguration={endpointConfiguration}
        request={request}
        onChangeBaseUrl={onChangeBaseUrl}
        onChangeRequestBodyProperty={onChangeRequestBodyProperty}
        onSubmitRequest={onSubmitRequest}
      />
      <ResponseDisplay response={response} loading={loading} error={error} />
    </>
  );
};
