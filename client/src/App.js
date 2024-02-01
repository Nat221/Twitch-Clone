import { Toaster } from "react-hot-toast";

export const App = ({ children }) => {
  console.log(children);
  return (
    <>
      {children}
      <Toaster position="bottom-right" reverseOrder="false" />
    </>
  );
};
