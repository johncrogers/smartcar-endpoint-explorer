import React from "react";

import { EndpointConfiguration } from "./EndpointConfiguration";
import { RequestValues } from "./useEndpointExplorer";

export type RequestFormProps = {
  endpointConfiguration: EndpointConfiguration;
  request: RequestValues;
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
};

export const RequestForm: React.FC<RequestFormProps> = (
  props: RequestFormProps
) => {
  const {
    endpointConfiguration,
    request,
    onChangeBaseUrl,
    onChangeRequestBodyProperty,
    onSubmitRequest,
  } = props;

  return (
    <form onSubmit={onSubmitRequest} data-cy={selectors.base}>
      <div data-cy={selectors.title}>{endpointConfiguration.title}</div>
      <div data-cy={selectors.method}>
        <div>Method:</div>
        <div>{endpointConfiguration.method}</div>
      </div>
      <div data-cy={selectors.url}>
        <div>Base URL:</div>
        <input
          type="text"
          placeholder="Base Url"
          value={endpointConfiguration.url}
          onChange={onChangeBaseUrl}
        />
      </div>
      {!!endpointConfiguration.body && (
        <div data-cy={selectors.body}>
          <div>Body:</div>
          {endpointConfiguration.body.map((fieldConfiguration) => {
            return (
              <div
                data-cy={`${selectors.bodyField} ${fieldConfiguration.name}`}
                key={fieldConfiguration.name}
              >
                <div>{fieldConfiguration.name}:</div>
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
      )}
      <div>
        <input type="reset" data-cy={selectors.resetButton} />
        <button type="submit" data-cy={selectors.submitButton}>
          Submit
        </button>
      </div>
    </form>
  );
};
