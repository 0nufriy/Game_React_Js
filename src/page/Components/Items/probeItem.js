import probeImg from "../../../static/images/Probe.png"
const ProbeItem = ({ color, index, item, isSelected, onClick }) => {
    const border = isSelected ? "1vw solid #62FF00": "1vw solid #221A1A"
    if(item)
    return (<div style={{
        width: "100%",
        backgroundColor: color,
        borderRadius: "4vw",
        border: border,
        minWidth: "18vw"
    }}
    onClick={onClick}>
    <img
        src={probeImg}
        alt="База"
        className="img-fluid"
        style={{
        width: "100%",
        height: "auto" 
        }}
    />
    </div>)
};
export default ProbeItem