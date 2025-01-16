const RobotItem = ({ color, index, image, onClick, isSelected }) => {
    const border = isSelected ? "1vw solid #62FF00": "1vw solid #221A1A"
    return (
        <div style={{
            width: "100%",
            backgroundColor: color,
            borderRadius: "4vw",
            border: border,
            minWidth: "18vw"
        }}
        onClick = {onClick}>
        <img
            src={image}
            alt="База"
            className="img-fluid"
            style={{
            width: "100%",
            height: "auto" 
            }}
        />
        </div>
    );
}
export default RobotItem