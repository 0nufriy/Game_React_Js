import { useEffect, useRef, useState } from "react";
import BlackButton from "../Components/Buttons/BlackButton";
import probeImg from "../../static/images/Probe.png"
import SelectedItem from "../Components/Items/selectedItem";
import ProbeItem from "../Components/Items/probeItem";
import { asignProbes, getProbes, startProbes, stopProbes } from "../../http";
import ResorceAmount from "../Components/ResourceAmont";
import constant from "../../constant";

const ProbeScreen = ({userData, setUserData}) => {
    const [probes,setProbes] = useState([])
    const [selectedProbe, setSelectedProbe] = useState(null)
    const [resources, setResources] = useState(userData.user.resources.minerals)
    const [probeDoing, setProbeDoing] = useState(null)
    const [timeLeft, setTimeLeft] = useState(null);
    const formatTime = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };
    const intervalRef = useRef(null);

    const [error, setError] = useState("");
    const [connectionError, setConnectionError] = useState("");
    const [loading, setLoading] = useState(true);
  

    useEffect(() => {
        if (selectedProbe?.timeStart) {
            const updateTimeLeft = () => {
                const startTime = new Date(selectedProbe.timeStart).getTime();
                const endTime = startTime + constant.probeTime*1000;
                const now = Date.now();
                const remaining = Math.max(0, endTime - now);
                if (remaining === 0) {
                    setTimeLeft(null); 
                    clearInterval(intervalRef.current);
                } else {
                    setTimeLeft(remaining);
                }
            };

            updateTimeLeft(); 
            intervalRef.current = setInterval(updateTimeLeft, 1000);
            return () => clearInterval(intervalRef.current);
        } else {
            setTimeLeft(null);
        }
    }, [probeDoing]);

    useEffect(() => {
        setResources(userData.user.resources.minerals)
        setSelectedProbe(null)
        setProbeDoing(null)
        getProbes().then(r => {
            if(r.error){
                setError(r.error);
            }else{
                setProbes(r)
                const currentProbe = r.find(
                    (probe) => probe.planetId === userData.user.curentPlanet
                );
                if (currentProbe) {
                    setProbeDoing(currentProbe);
                    setSelectedProbe(currentProbe);
                }
            }
        }).catch(err => {
            setConnectionError(err.message || "Failed to connect");
        })
        .finally(() => {
            setLoading(false);
          });
    }, [userData])

    const funcSetSelectedProbe = (probe) => {
        if(!probeDoing){
            setSelectedProbe(probe)
        }
    }


    const buyProbe = () => {
        asignProbes().then( r => {
            if(r.error){
                setError(r.error);

            }else{
                setUserData(prevState => ({
                    ...prevState,
                    user: r
                }));
            }

        }).catch(err => {
            setConnectionError(err.message || "Failed to connect");
        })
        .finally(() => {
            setLoading(false);
          });
    }
    const doProbe = () => {
        if(probeDoing){
            stopProbes(probeDoing._id).then(r=>{
                if(r.error){
                    setError(r.error);
                }else{
                    setUserData(prevState => ({
                        ...prevState,
                        user: r
                    }));
                }
            })
        }else{
            if(selectedProbe)
            startProbes(selectedProbe._id). then(r => {
                if(r.error){
                    setError(r.error);
                }else{
                    setUserData(prevState => ({
                        ...prevState,
                        user: r
                    }));
                }
        }).catch(err =>{
            setConnectionError(err.message || "Failed to connect");
        })
        .finally(() => {
            setLoading(false);
          });
        }
    }
    return (
        <div className="min-vh-100 position-relative" style={{backgroundColor: "#6A738F"}}>
            <ResorceAmount userResources={resources}></ResorceAmount>
            <div style={{
                paddingTop: "30vw",
                paddingLeft: "3vw",
                paddingRight: "3vw",
                paddingBottom: "5vw"
            }}>
                <SelectedItem color="#0033FF" item={selectedProbe}></SelectedItem>
                <div
                    className="d-flex"
                    style={{
                        borderRadius: "4vw",
                        border: "1vw solid #221A1A",
                        padding: "2.5vw",
                        backgroundColor: "#494942",
                        margin: "0 auto",
                        marginTop: "15vw",
                        marginBottom: "5vw",
                        display: "flex",
                        height: "45vw",
                        minHeight: "45vw", 
                        overflowX: "auto",
                        scrollbarWidth: 'none',
                    }}
                >
                    {probes.length > 0 ? (
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
                        {probes.map((probe, index) => (
                            <ProbeItem item={probe} onClick={() => {funcSetSelectedProbe(probe)}} key={index} color="#0033FF" isSelected={probe == selectedProbe}/>
                        ))}
                    </div>) : (
                        <div style={{
                            fontSize: "6vw", 
                            color: "#fff", 
                            textAlign: "center", 
                            width: "100%", 
                            height: "100%", 
                            display: "flex", 
                            justifyContent: "center", 
                            alignItems: "center"}}>
                        No Probes
                        </div>
                    )}
                </div>   
                <BlackButton onClick={buyProbe} isDisable={resources < constant.probePrice} text={"Купити зонд (" + constant.probePrice + ")"} fontSize="6vw" ></BlackButton>
                <BlackButton onClick={doProbe}
                isDisable={(!selectedProbe || selectedProbe.status === "Exploring") && ((formatTime(timeLeft) !== "00:00") || !probeDoing)}
                text={ selectedProbe && selectedProbe.status=="Exploring"? formatTime(timeLeft) == "00:00"? "Зупинити" : `Залишилось: ${formatTime(timeLeft)}` : "Відправити" }
                fontSize="6vw" ></BlackButton>
            </div>
        </div>
    );
}

export default ProbeScreen