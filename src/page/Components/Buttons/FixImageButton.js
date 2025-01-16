import { Button } from "react-bootstrap"

const FixImageButton = ({width, top, left, onClick, image = ""}) => {
    return (
        <div className="position-absolute" style={{ width: width, top: top, left: left }}>
        <Button
          variant="link"
          onClick={onClick}
          onMouseDown={(e) => e.preventDefault()}
          className="p-0"
        >
          <img
            src={image}
            alt="База"
            className="img-fluid"
            style={{
              width: width
            }}
          />
        </Button>
      </div>
    )
}


export default FixImageButton