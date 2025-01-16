import { Button  } from 'react-bootstrap';
import BlueButton from './BlueButton';

const UpgradeShipButton = ({image, navigate, player}) => (
    <div style={{
        padding: "3vw",
        paddingBottom: "10vw"
    }}>
        <div className="d-flex justify-between items-center w-100"
        onClick={() => {navigate("/upgradeShip")}}
        style={{
            borderRadius: "2vw",
            border: "1vw solid #221A1A",
            padding: "2vw",
            backgroundColor: "#070707",
            fontSize: "5vw",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center", 
            minHeight: "100%", 
            textAlign: "center",
        }}>
        <img src={image}
             alt="Корабель"
             style={{
                 width: "15vw",
                 height: "auto",
                 display: "block" 
             }}>
        </img>  

        <div className='text-white'style={{
            fontSize: "6vw"
        }}>Рівень: {player}</div>  
        <BlueButton text='Покращити'></BlueButton>
    </div>  
</div>
);
export default UpgradeShipButton