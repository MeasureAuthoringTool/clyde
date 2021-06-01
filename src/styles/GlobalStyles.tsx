import React from "react";
import { createGlobalStyle } from "styled-components";
import tw, { GlobalStyles as BaseStyles } from "twin.macro";

const CustomStyles = createGlobalStyle`
  body {
    ${tw`antialiased`}
  }
  .commentCql {
    ${tw`text-gray-400`}
  }
  .tickCql {
    ${tw`text-yellow-300`}
  }
  .defineNameCql {
    ${tw`text-blue-500`}
  }
  .keywordCql {
    color: magenta;
  }
  .constantLanguageCql {
    color: coral;
  }
  .dateTimeCql {
    ${tw`text-red-300`}
  }
  .numberCql {
    ${tw`text-yellow-500`}
  }
  .contextCql {
    ${tw`text-yellow-200`}
  }
  .draftBlock {
    ${tw`bg-gray-800 text-white`}
    font-family: Hack, monospace;
  }
`;

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);

export default GlobalStyles;
