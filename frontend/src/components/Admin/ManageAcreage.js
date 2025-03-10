import { HeaderTitle } from "../UserManage";
import Table from "./Table";

function ManageAcreage() {
    return (
        <div>
            <div className="fixed w-full">
                <HeaderTitle title={'Danh sách diện tích'} />
            </div>
            <Table type={'acreage'} />
        </div>
    );
}

export default ManageAcreage;