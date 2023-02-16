import React from "react";

import { Button, Card, CardBody, CardHeader } from "reactstrap";

import { Code } from "./Code";
import { EndpointConfiguration } from "./EndpointConfiguration";
import { RequestValues } from "./useEndpointExplorer";

export type RequestFormProps = {
  endpointConfiguration: EndpointConfiguration;
  request: RequestValues;
  response: Record<string, unknown> | null;
  error: Record<string, unknown> | null;
  loading: boolean;
  onClickResetForm: () => void;
  onChangeBaseUrl: React.ChangeEventHandler<HTMLInputElement>;
  onChangeRequestBodyProperty: (
    propertyName: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onSubmitRequest: React.FormEventHandler<HTMLFormElement>;
};

const selectors = {
  base: "RequestForm",
  title: "RequestForm__title",
  method: "RequestForm__method",
  url: "RequestForm__url",
  body: "RequestForm__body",
  bodyField: "RequestForm__bodyField",
  resetButton: "RequestForm__resetButton",
  submitButton: "RequestForm__submitButton",
  response: "RequestForm__response",
  loading: "RequestForm__loading",
  error: "RequestForm__error",
};

export const RequestForm: React.FC<RequestFormProps> = (
  props: RequestFormProps
) => {
  const {
    endpointConfiguration,
    request,
    loading,
    error,
    response,
    onChangeBaseUrl,
    onChangeRequestBodyProperty,
    onClickResetForm,
    onSubmitRequest,
  } = props;

  return (
    <form onSubmit={onSubmitRequest} data-cy={selectors.base}>
      <Card>
        <CardHeader className="d-flex justify-content-between bg-primary text-white">
          <h3 className="my-auto" data-cy={selectors.title}>
            {endpointConfiguration.title}
          </h3>
          <div className="d-flex w-50">
            <h5 className="my-auto mx-2" data-cy={selectors.method}>
              <strong>{endpointConfiguration.method}</strong>
            </h5>
            <div className="w-100 my-auto" data-cy={selectors.url}>
              <input
                className="w-100"
                type="text"
                placeholder="Base Url"
                value={request.url}
                onChange={onChangeBaseUrl}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody>
          {!!endpointConfiguration.body && (
            <div className="mb-2">
              <h5 className="mb-0 p-2 bg-secondary text-white text-start border border-bottom-0">
                <strong>Body:</strong>
              </h5>
              <div className="pb-2 bg-light border" data-cy={selectors.body}>
                {endpointConfiguration.body.map((fieldConfiguration) => {
                  return (
                    <div
                      data-cy={`${selectors.bodyField} ${fieldConfiguration.name}`}
                      key={fieldConfiguration.name}
                    >
                      <label>{fieldConfiguration.name}:</label>
                      <div>
                        <input
                          {...fieldConfiguration}
                          value={
                            (typeof fieldConfiguration.name === "string" &&
                            request.body
                              ? request.body[fieldConfiguration.name]
                              : undefined) as any
                          }
                          onChange={(event) => {
                            if (typeof fieldConfiguration.name === "string") {
                              onChangeRequestBodyProperty(
                                fieldConfiguration.name,
                                event
                              );
                            }
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {(response || loading || error) && (
            <div className="mb-2 border" data-cy={selectors.response}>
              <div className="bg-secondary text-white text-start px-2 border-bottom-1">
                <strong>Response:</strong>
              </div>
              {loading && <div data-cy={selectors.loading}>Loading...</div>}
              {error && <div data-cy={selectors.error}>An error occurred</div>}
              {response && <Code codeString={JSON.stringify(response)} />}
            </div>
          )}
          <div className="d-flex justify-content-end">
            <Button data-cy={selectors.resetButton} onClick={onClickResetForm}>
              Reset
            </Button>
            <Button
              type="submit"
              color="primary"
              className="mx-2"
              data-cy={selectors.submitButton}
            >
              Submit
            </Button>
          </div>
        </CardBody>
      </Card>
    </form>
  );
};
