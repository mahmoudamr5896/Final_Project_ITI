function Facts (props){

    return (
        <div className={`col-lg-3 col-sm-12 ${props.bgcolor} rounded-4 shadow mx-4 p-5 mt-3`}>
            <img src={props.img} style={{ height: "5rem" }} alt="Icon" />
            <h1>{props.head}</h1>
            <p className="fs-5">{props.content}</p>
        </div>
    )
}

export default Facts;
