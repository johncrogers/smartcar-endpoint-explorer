import React from "react";

export type ResponseDisplayProps = {
  response: Record<string, unknown> | null;
  error: Record<string, unknown> | null;
  loading: boolean;
};

export const ResponseDisplay: React.FC<ResponseDisplayProps> = (
  props: ResponseDisplayProps
) => {
  const { response, loading, error } = props;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>An error occurred</div>;
  return (
    <div>
      <div>Response:</div>
      <div>{JSON.stringify(response)}</div>
    </div>
  );
};
