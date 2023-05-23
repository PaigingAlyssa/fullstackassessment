import React from "react";

const Header = (props: {title: string}) => {
    const {title} = props;
    return(
        <h1 className="my-4 text-6xl text-rose-200">
            {title}
        </h1>
    )
}

export default Header;