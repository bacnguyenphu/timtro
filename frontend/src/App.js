import { Routes, Route } from "react-router";
import { HOMEPAGE, LOGIN, LOGOUT, POST_LIKED, REGISTER, USER_MANAGE_POSTS, USER_POST_NEW, USER_PROFILE } from "./utils/paths";
import { LayoutDefault, LayoutUserManage } from "./layouts";
import { Login, HomePage, Register, ListFilter, Logout, DetailPost, PostLiked } from "./components";
import { ToastContainer } from 'react-toastify';
import { ManageAccout, ManagePost, PostNew } from "./components/UserManage";

function App() {
  return (
    <>
      <Routes>

        <Route path={HOMEPAGE} element={<LayoutDefault />}>
          <Route index element={<HomePage />} />
          <Route path="/filter">
            <Route path=":category" element={<ListFilter/>}>
                <Route path=":idPost" element={<DetailPost/>}/>
            </Route>
          </Route>
          <Route path={LOGIN} element={<Login />} />
          <Route path={REGISTER} element={<Register />} />
          <Route path={LOGOUT} element={<Logout><Login /></Logout>}/>
          <Route path={POST_LIKED} element={<PostLiked/>}/>
        </Route>

        <Route path="/user" element={<LayoutUserManage/>}>
          <Route path={USER_MANAGE_POSTS} element={<ManagePost/>}/>
          <Route path={USER_POST_NEW} element={<PostNew/>}/>
          <Route path={USER_PROFILE} element={<ManageAccout/>}/>
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
