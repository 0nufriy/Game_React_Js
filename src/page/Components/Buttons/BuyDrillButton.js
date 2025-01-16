import constant from '../../../constant';
import BlueButton from './BlueButton';

const BuyDrillButton = ({onClick, base}) => (
    <div style={{
        padding: "3vw",
        paddingBottom: "10vw"
    }}>
        <div className="d-flex justify-between items-center w-100"
        onClick={onClick}
        style={{
            borderRadius: "2vw",
            border: "1vw solid #221A1A",
            padding: "2vw",
            paddingLeft: "6vw",
            paddingRight: "3vw",
            backgroundColor: "#070707",
            fontSize: "5vw",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center", 
            minHeight: "100%", 
            textAlign: "center",
        }}>
        <div className='text-white'style={{
            fontSize: "6vw"
        }}>Бурів: {base.drills}</div>  
        <BlueButton text={`Купити (${constant.DrillPrice})`}></BlueButton>
    </div> 
</div> 
); 
export default BuyDrillButton