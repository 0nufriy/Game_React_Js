import { Button  } from 'react-bootstrap';

const BlueButton = ({onClick, text = "", widht = "", fontSize = "4vw", isDisable= false}) => {
    return (
        <Button
        onClick={onClick}
        disabled = {isDisable}
        className="d-flex flex-column align-items-center justify-content-center" 
        style={{
            borderRadius: "2vw",
            border: "1vw solid #221A1A",
            backgroundColor: "#4581C7",
            fontSize: fontSize,
            padding: "2vw",
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            width: widht
        }}
    >
        {text}
    </Button>
    )
}


export default BlueButton