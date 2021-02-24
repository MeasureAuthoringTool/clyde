import styled from "styled-components";
import tw from "twin.macro";

const StyledForm = styled.main.attrs({
    className: "flex flex-col h-screen justify-center items-center bg-gray-100"
})
    `
      & {
        form {
          ${tw`bg-yellow-100 text-center rounded py-8 px-5 shadow max-w-xs`}
        }

        input {
          ${tw`border-gray-300 mb-4 w-full border-solid border rounded py-2 px-4`}
        }

        button {
          ${tw`bg-red-900 hover:bg-green-700 text-white font-bold py-2 px-4 border border-blue-700 rounded capitalize`}
        }

        h1 {
          ${tw`bg-green-100  rounded uppercase p-3 hover:animate-bounce shadow-2xl`}
        }
      }
    `;


const Circle = styled.h2.attrs({
    className: "rounded-full mt-8 h-24 w-24 flex items-center justify-center text-grey-700 capitalize ring-8  bg-opacity-90 " +
        "bg-yellow-300"
})``;

export {Circle, StyledForm};
