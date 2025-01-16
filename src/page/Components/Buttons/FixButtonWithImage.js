import { Button, Image  } from 'react-bootstrap';

const FixButtonWithImage = ({onClick, image = ""}) => {
    return (
        <Button
        className="d-flex flex-column align-items-center w-100"
        onClick={onClick}
        style={{
          borderRadius: "4vw",
          border: "1vw solid #000000",
          padding: "1vw",
          backgroundColor: "#7C7C7C",
          marginBottom: "2vw",
        }}
      >
        <Image
          src={image}
          rounded
          style={{ width: "100%", height: "auto" }}
        />
      </Button>
    )
}


export default FixButtonWithImage