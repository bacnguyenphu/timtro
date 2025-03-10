import { HeaderTitle } from "../UserManage";
import Table from "./Table";

function ManagePrice() {
    return (
        <div>
            <div className="fixed w-full">
                <HeaderTitle title={'Danh sách khoảng giá'} />
            </div>
            <Table type={'price'} />
        </div>
    );
}

export default ManagePrice;