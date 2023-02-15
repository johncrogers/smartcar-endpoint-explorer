import React from "react";

export type ResponseDisplayProps = {
  response: string | null;
};

export const ResponseDisplay: React.FC<ResponseDisplayProps> = (
  props: ResponseDisplayProps
) => {
  const { response } = props;

  return (
    <div>
      <div>Response:</div>
      <div>{response}</div>
    </div>
  );
};
