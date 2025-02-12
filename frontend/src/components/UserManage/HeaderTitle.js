function HeaderTitle({title,navs}) {

    return ( 
        <div className="bg-white border-b px-14">
            <p className="font-semibold text-2xl py-4">{title}</p>
            <ul className="flex gap-5">
                {navs&&navs.length>0&&
                navs.map((nav,index)=>{
                    return(
                        <li key={`navssss-${index}`} className={`pb-4 cursor-pointer hover:text-red-primary`}>
                            {nav.title}
                        </li>
                    )
                })
                }
            </ul>
        </div>
     );
}

export default HeaderTitle;