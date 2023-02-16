import React from "react";

import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const Code: React.FC<{ codeString: string }> = (props: {
  codeString: string;
}) => {
  const { codeString } = props;

  return (
    <SyntaxHighlighter language="javascript" style={docco} wrapLongLines={true}>
      {codeString}
    </SyntaxHighlighter>
  );
};
