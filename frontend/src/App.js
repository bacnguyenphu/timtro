import { Routes, Route } from "react-router";
import { HOMEPAGE, LOGIN, REGISTER, RENTAL_APARTMENT, RENTAL_HOUSE, RENTAL_ROOM, RENTAL_SPACE } from "./utils/paths";
import { LayoutDefault } from "./layouts";
import { Login, HomePage, Register,RentalApartment, RentalHouse, RentalRoom, RentalSpace } from "./components";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Routes>
        <Route path={HOMEPAGE} element={<LayoutDefault />}>
          <Route index element={<HomePage />} />
          <Route path={RENTAL_APARTMENT} element={<RentalApartment />} />
          <Route path={RENTAL_HOUSE} element={<RentalHouse />} />
          <Route path={RENTAL_ROOM} element={<RentalRoom />} />
          <Route path={RENTAL_SPACE} element={<RentalSpace />}/>
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
