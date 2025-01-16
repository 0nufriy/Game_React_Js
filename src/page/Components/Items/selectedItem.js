
import ProbeItem from "./probeItem";

const SelectedItem = ({ color, index, item }) => (
    <div className="d-flex"
        style={{
            borderRadius: "4vw",
            border: "1vw solid #221A1A",
            padding: "2.5vw",
            backgroundColor: "#494942",
            width: "35vw",
            height: "35vw",
            margin: "0 auto",
            marginBottom: "4vw",
            display: "flex",   
            justifyContent: "center",
            alignItems: "center"
        }}
    >
        <ProbeItem color={color} item={item}></ProbeItem>
    </div>
);
export default SelectedItem