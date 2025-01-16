import { Button  } from 'react-bootstrap';

const BlackButton = ({onClick, text = "", fontSize = "5vw", isDisable = false }) => {
    return (
        <Button
        disabled={isDisable}
        className="d-flex flex-column align-items-center w-100"
        onClick={onClick}
        style={{
          borderRadius: "2vw",
          border: "1vw solid #221A1A",
          padding: "4vw",
          backgroundColor: "#070707",
          marginBottom: "2vw",
          fontSize: fontSize
        }}
      >
        {text}
      </Button>
    )
}


export default BlackButton