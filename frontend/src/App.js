import { Routes, Route } from "react-router";
import { ADMIN_MANAGE_POSTS, ADMIN_MANAGE_USERS, HOMEPAGE, LOGIN, LOGOUT, POST_LIKED, REGISTER, USER_MANAGE_POSTS, USER_POST_NEW, USER_PROFILE } from "./utils/paths";
import { LayoutAdmin, LayoutDefault, LayoutUserManage } from "./layouts";
import { Login, HomePage, Register, ListFilter, Logout, DetailPost, PostLiked, ManagePost } from "./components";
import { ToastContainer } from 'react-toastify';
import { ManageAccout, PostNew } from "./components/UserManage";
import { ManageUser } from "./components/Admin";

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
          <Route path={USER_MANAGE_POSTS} element={<ManagePost type={'USER'}/>}/>
          <Route path={USER_POST_NEW} element={<PostNew/>}/>
          <Route path={USER_PROFILE} element={<ManageAccout/>}/>
        </Route>

        <Route path="/admin" element={<LayoutAdmin/>}>
            <Route path={ADMIN_MANAGE_POSTS} element={<ManagePost type={'ADMIN'}/>}/>
            <Route path={ADMIN_MANAGE_USERS} element={<ManageUser/>} />
            <Route path={ADMIN_MANAGE_POSTS} />
            <Route path={ADMIN_MANAGE_POSTS} />
            <Route path={ADMIN_MANAGE_POSTS} />
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
