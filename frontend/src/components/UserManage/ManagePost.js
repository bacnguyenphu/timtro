import HeaderTitle from "./HeaderTitle";

function ManagePost() {

    const navs = [
        {
            title: "Tất cả",
            id: "tatca"
        },
        
    ]

    return ( 
        <div>
             <div className="fixed w-full">
                <HeaderTitle title={'Danh sách tin đăng'} navs={navs} />
            </div>
        </div>
     );
}

export default ManagePost;