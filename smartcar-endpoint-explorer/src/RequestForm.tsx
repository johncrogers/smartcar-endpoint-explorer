import React from "react";

import { EndpointConfiguration } from "./EndpointConfiguration";

export type RequestFormProps = {
  endpointConfiguration: EndpointConfiguration;
  onChangeBaseUrl: React.ChangeEventHandler<HTMLInputElement>;
  onChangeRequestBodyProperty: (
    propertyName: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onSubmitRequest: React.FormEventHandler<HTMLFormElement>;
};

const selctors = {
  base: "RequestForm",
  title: "RequestForm__title",
  method: "RequestForm__method",
  url: "RequestForm__url",
  body: "RequestForm__body",
  bodyField: "RequestForm__bodyField",
};

export const RequestForm: React.FC<RequestFormProps> = (
  props: RequestFormProps
) => {
  const {
    endpointConfiguration: { title, method, url, body },
    onChangeBaseUrl,
    onChangeRequestBodyProperty,
    onSubmitRequest,
  } = props;

  return (
    <form onSubmit={onSubmitRequest} data-cy={selctors.base}>
      <div data-cy={selctors.title}>{title}</div>
      <div data-cy={selctors.method}>
        <div>Method:</div>
        <div>{method}</div>
      </div>
      <div data-cy={selctors.url}>
        <div>Base URL:</div>
        <div>{url}</div>
        <input
          type="text"
          placeholder="Base Url"
          value={url}
          onChange={onChangeBaseUrl}
        />
      </div>
      <div data-cy={selctors.body}>
        <div>Body:</div>
        {body.map((fieldConfiguration) => {
          return (
            <div data-cy={selctors.bodyField} key={fieldConfiguration.name}>
              <div>{fieldConfiguration.name}:</div>
              <div>
                <input
                  {...fieldConfiguration}
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
      <button type="submit">Submit</button>
    </form>
  );
};
