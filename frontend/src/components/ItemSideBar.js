import { FaAngleRight } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import _ from 'lodash'

function ItemSideBar({ title, content, isCate,isArea }) {

    const navigate = useNavigate()

    const paramsURL = useParams()

    return (
        <div className="bg-white rounded-lg py-5 px-3">
            <h3 className="font-semibold">{title}</h3>
            {isCate ?
                <div className={`flex flex-col gap-x-4 gap-y-2 mt-3`}>
                    {content && content.length > 0 &&
                        content.map(item => {
                            return (
                                <div key={item.code} className="flex text-sm items-center gap-1 cursor-pointer hover:text-red-primary"
                                    onClick={() => { navigate(`/filter/${item.code}`) }}
                                >
                                    <span><FaAngleRight color="E41B23" /></span>
                                    <p>{item.value}</p>
                                </div>
                            )
                        })
                    }
                </div>
                :
                <div className={`flex flex-wrap gap-x-4 gap-y-2 mt-3`}>
                    {content && content.length > 0 &&
                        content.map(item => {
                            return (
                                <div key={item.code} className="flex text-sm items-center gap-1 cursor-pointer hover:text-red-primary"
                                    onClick={() => { navigate(`${_.isEmpty(paramsURL) ? `?${isArea?'area':'price'}=${item?.code}` : `/filter/${paramsURL.category}?${isArea?'area':'price'}=${item.code}`}`) }}
                                >
                                    <span><FaAngleRight color="E41B23" /></span>
                                    <p>{item.value}</p>
                                </div>
                            )
                        })
                    }
                </div>
            }

        </div>
    );
}

export default ItemSideBar;