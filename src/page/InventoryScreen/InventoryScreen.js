import { useEffect, useState } from "react";
import SelectedItem from "../Components/Items/selectedItem";
import ArtefactItem from "../Components/Items/artefactItem";
import Modal from "../Components/Items/Modal";

import artifactImg from "../../static/images/artifact.png"
import robotImg from "../../static/images/robot.png"
import RobotItem from "../Components/Items/robotItem"
import { getArtifacts, getRobots } from "../../http";
import LoadingItem from '../Components/Items/LoadingItem'; 

const InventoryScreen = ({userData}) => {
    const [artefacts, setArtefacts] = useState([]);
    const [robots,setRobots] = useState([])

    const [error, setError] = useState("");
    const [connectionError, setConnectionError] = useState("");
    const [loadingArt, setLoadingArt] = useState(true);
    const [loadingRob, setLoadingRob] = useState(true);

    useEffect(() => {
        getArtifacts().then( r => {
            if(r.error){
                setError(r.error);
            }else{
                setArtefacts(r)
                
            }
        }).catch(err => {
            setConnectionError(err.message || "Failed to connect");
        })
        .finally(() => {
            setLoadingArt(false);
          });
        getRobots().then( r => {
            if(r.error){
                setError(r.error);
            }else{
                setRobots(r)
                
            }
        }).catch(err => {
            setConnectionError(err.message || "Failed to connect");
        })
        .finally(() => {
            setLoadingRob(false);
          });
    }, [])

    const [selectedArtefact, setSelectedArtefact] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [selectedRobot, setSelectedRobot] = useState(null)

    const handleItemClick = (item) => {
        setSelectedArtefact(item);
        setIsModalOpen(true);
      };

    const onCloseModal = () =>{
        setIsModalOpen(false)
    }

    if (loadingArt || loadingRob) return <LoadingItem />;
        
        
    
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
            <div style={{
                paddingTop: "30vw",
                paddingLeft: "3vw",
                paddingRight: "3vw",
                paddingBottom: "5vw"
            }}>
                <SelectedItem color="#FF0000" item={selectedRobot}></SelectedItem>

                <div
                    className="d-flex"
                    style={{
                        borderRadius: "4vw",
                        border: "1vw solid #221A1A",
                        padding: "2.5vw",
                        backgroundColor: "#494942",
                        margin: "0 auto",
                        marginTop: "15vw",
                        marginBottom: "15vw",
                        display: "flex",
                        height: "22.5vw",
                        minHeight: "22.5vw", 
                        overflowX: "auto",
                        scrollbarWidth: 'none',
                    }}
                >
                    {robots.length > 0 ? (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(18vw, 18vw))", 
                            gridAutoFlow: "column", 
                            gridTemplateRows: "repeat(1, 1fr)", 
                            gap: "3vw",
                            width: "max-content", 
                        }}
                    >
                        {robots.map((robot, index) => (
                            <RobotItem isSelected={selectedRobot == robot} onClick={()=> {setSelectedRobot(robot)}} key={index} image={robot.image} color="#FF0000" />
                        ))}
                    </div>
                ) : (
                <div style={{
                    fontSize: "6vw", 
                    color: "#fff", 
                    textAlign: "center", 
                    width: "100%", 
                    height: "100%", 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center"}}>
                   No Robots
                </div>)}
                </div>
                <div
                    className="d-flex"
                    style={{
                        borderRadius: "4vw",
                        border: "1vw solid #221A1A",
                        padding: "2.5vw",
                        backgroundColor: "#494942",
                        margin: "0 auto",
                        marginTop: "15vw",
                        marginBottom: "15vw",
                        display: "flex",
                        height: "45vw",
                        minHeight: "45vw", 
                        overflowX: "auto",
                        scrollbarWidth: 'none',
                    }}
                >
                   {artefacts.length > 0 ? (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(18vw, 18vw))", 
                            gridAutoFlow: "column", 
                            gridTemplateRows: "repeat(2, 1fr)", 
                            gap: "3vw",
                            width: "max-content", 
                        }}
                    >
                        {artefacts.map((item, index) => (
                            <ArtefactItem
                                key={index}
                                color="#FFF700"
                                image={item.image}
                                onClick={() => handleItemClick(item)}
                            />
                        ))}
                    </div>
                ) : (
                    <div style={{
                        fontSize: "6vw", 
                        color: "#fff", 
                        textAlign: "center", 
                        width: "100%", 
                        height: "100%", 
                        display: "flex", 
                        justifyContent: "center", 
                        alignItems: "center"}}>
                    No Atrifacts
                    </div>
                )}
                </div>
            </div>
            <Modal isOpen={isModalOpen} item={selectedArtefact} onClose={onCloseModal}></Modal>
        </div>
    );
}

export default InventoryScreen