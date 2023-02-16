export type RequestBodyFieldConfiguration = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type RequestBody = RequestBodyFieldConfiguration[];

export type EndpointConfiguration = {
  title: string;
  url: string;
  method: string;
  body?: RequestBody;
};
