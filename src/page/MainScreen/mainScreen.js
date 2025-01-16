import back from "../../static/images/background_test.jpg"
import ship from "../../static/images/Ship.png"
import base from "../../static/images/Base.png"
import inven from "../../static/images/Inventory.png"
import probe from "../../static/images/Probe.png"

import ResorceAmount from '../Components/ResourceAmont';
import FixImageButton from '../Components/Buttons/FixImageButton';
import FixButtonWithImage from '../Components/Buttons/FixButtonWithImage';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react"
import { getPlanet } from "../../http"
import LoadingItem from '../Components/Items/LoadingItem'; 


const MainScreen = ({userData}) => {
  const navigate = useNavigate();


  const handleBaseClick = () => {
    navigate('/base')
  };

  const handleShipClick = () => {
    navigate("/planet")
  };

  const handleIProbeClick = () => {
    navigate("/probe")
  };

  const handleIInventoryClick = () => {
    navigate("/inventory")
  };


  const [planet, setPlanet] = useState(null)

  const [error, setError] = useState("");
  const [connectionError, setConnectionError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlanet(userData.user.curentPlanet)
      .then(r => {
        if (r.error) {
          setError(r.error);
        } else {
          setPlanet(r);
        }
      })
      .catch(err => {
        setConnectionError(err.message || "Failed to connect");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userData.user.curentPlanet]);

  if (loading) return <LoadingItem />;

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
    <div className="min-vhn-100 position-relative">

    <ResorceAmount userResources={userData.user.resources.minerals} planetName={planet? planet.name : ""}></ResorceAmount>
  <img
    alt='back'
    className="position-absolute start-0 top-0"
    src={back}
    style={{
      width: "100%",
      zIndex: "-1"
    }}
  />
<FixImageButton onClick={handleBaseClick} image={base} left={"20vw"} width={"50vw"}  top={"67vw"}></FixImageButton>
<FixImageButton onClick={handleShipClick} image={ship} left={"35vw"} width={"50vw"}  top={"120vw"}></FixImageButton>
  <div
    className="position-absolute"
    style={{
      right: "2vw",
      top: "100vw",
      transform: "translateY(-50%)",
      width: "13vw",
    }}
  >
    <div className="d-flex flex-column align-items-center">
      <FixButtonWithImage image={probe} onClick={handleIProbeClick}></FixButtonWithImage>
      <FixButtonWithImage image={inven} onClick={handleIInventoryClick}></FixButtonWithImage>
    </div>
  </div>
</div>
  );
}

export default MainScreen