import { Routes, Route } from "react-router";
import { HOMEPAGE, LOGIN, REGISTER } from "./utils/paths";
import { LayoutDefault } from "./layouts";
import { Login, HomePage, Register, ListFilter } from "./components";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Routes>
        <Route path={HOMEPAGE} element={<LayoutDefault />}>
          <Route index element={<HomePage />} />
          <Route path="/filter">
            <Route path=":category" element={<ListFilter/>}/>
          </Route>
          <Route path={LOGIN} element={<Login />} />
          <Route path={REGISTER} element={<Register />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
