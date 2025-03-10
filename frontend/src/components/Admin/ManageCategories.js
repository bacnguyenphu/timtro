import { HeaderTitle } from "../UserManage";
import Table from "./Table";

function ManageCategories() {
    return ( 
        <div>
             <div className="fixed w-full">
                <HeaderTitle title={'Danh sách danh mục'} />
            </div>
            <Table type={'category'}/>
        </div>
     );
}

export default ManageCategories;