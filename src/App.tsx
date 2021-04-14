import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import GlobalStyles from "./styles/GlobalStyles";
import CqlEditor from "./cql-editor/CqlEditor";

const Title = styled.h1`
  ${tw`col-span-5 text-4xl`}
`;

const MainDiv = styled.div`
  ${tw`bg-gray-400 col-span-3 h-96`}
`;
const AppDiv = styled.div`
  ${tw`grid grid-cols-5 gap-4`}
`;
const NavLink = styled.li`
  ${tw`py-5 px-3`}
`;
const Footer = styled.footer`
  ${tw`text-center col-span-5`}
`;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <AppDiv>
        <Title>MADiE</Title>
        <nav>
          <ul>
            <NavLink>
              <button>Some navigation thing here</button>
            </NavLink>
            <NavLink>
              <button>Some other navigation</button>
            </NavLink>
          </ul>
        </nav>
        <MainDiv>
          <CqlEditor />
        </MainDiv>
        <aside>Some helper text</aside>
        <Footer>Some footer text</Footer>
      </AppDiv>
    </>
  );
};

export default App;
