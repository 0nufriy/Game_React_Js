import { useEffect, useState } from 'react';
import ResorceAmount from '../Components/ResourceAmont';
import shipImg from "../../static/images/Ship.png"
import BlueButton from '../Components/Buttons/BlueButton';
import ShipUpgradeItem from '../Components/Items/ShipUpgradeItem';
import LoadingItem from '../Components/Items/LoadingItem'; 
import { upgradeShip } from '../../http';

const UpgradeShip = ({userData, setUserData}) => {

    const [player, setPlayer] = useState(userData.user.shipLevel)
    const [resources, setResources] = useState(userData.user.resources.minerals)
    const [ships, setShips] = useState([{level: 0},{level: 1}, {level: 2}, {level: 3}, {level: 4}])

    const [error, setError] = useState("");
    const [connectionError, setConnectionError] = useState("");
    

    useEffect(() => {
        setPlayer(userData.user.shipLevel)
        setResources(userData.user.resources.minerals)
    },[userData])

    const doUpgrade = () =>{
        upgradeShip().then( r => {
            
            if(r.error){
                setError(r.error);
            }else{
                setUserData(prevState => ({
                    ...prevState,
                    user: r
                }));
            }
        }).catch(err => {
            setConnectionError("Failed to connect");
        })
        
    }

    if (error)
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', textAlign: 'center' }}>{error}</h1>
        </div>
      );
  
    if (connectionError)
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', textAlign: 'center' }}>{connectionError}</h1>
        </div>
      );


    return (
        <div className="min-vh-100 position-relative" style={{backgroundColor: "#6A738F"}}>
            <ResorceAmount userResources={resources} />
            <div style={{
                paddingTop: "30vw",
                paddingLeft: "3vw",
                paddingRight: "3vw",
                paddingBottom: "5vw"
            }}>
                <div className="d-flex w-100"
                    style={{
                        borderRadius: "2vw",
                        border: "1vw solid #221A1A",
                        padding: "4vw",
                        backgroundColor: "#070707",
                        marginBottom: "10vw",
                        fontSize: "5vw",
                        alignItems: "center", 
                        height: "120vw",
                        textAlign: "center",
                        display: "flex",     
                        flexDirection: "column", 
                    }}>

                    <div style={{
                        display: "flex",
                        flexDirection: "column", 
                        overflowY: "auto",
                        maxHeight: "100vw", 
                        width: "100%",
                        scrollbarWidth: 'none',
                        paddingBottom: "5vw", 
                    }}>
                        {ships.map((ship, index) => (
                            index >= player ? 
                            <ShipUpgradeItem key={index} ship={ship} index={index} image={shipImg} isCurrent={index === player} />
                            : null
                        ))}
                    </div>
                    <div style={{
                        width: "100%",
                        marginTop: "auto", 
                        padding: "5vw"
                    }}>
                        {player +1 != ships.length? 
                        <BlueButton isDisable={resources < (player + 1) * 1000} onClick={doUpgrade} text={"Покращити " + (player + 1) * 1000} widht='100%'></BlueButton>: <div style={{color: "#fff", fontSize: "6vw"}} > Max Upgrade</div> }
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpgradeShip;
