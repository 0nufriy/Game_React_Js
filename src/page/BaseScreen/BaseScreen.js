import { useEffect, useRef, useState } from "react";
import ResorceAmount from "../Components/ResourceAmont";
import BlueButton from "../Components/Buttons/BlueButton";
import BlackButton from '../Components/Buttons/BlackButton'
import CustomSlider from "../Components/CustomSlider";
import { addDrill, addToGenerator, getBaseByPlanet, getResources } from "../../http";
import LoadingItem from '../Components/Items/LoadingItem'; 
import BuyDrillButton from "../Components/Buttons/BuyDrillButton";
import CountBase from "./CountBase";

const BaseScreen = ({userData, setUserData}) => {
    const [base,setBase] = useState(null)

    const [error, setError] = useState("");
    const [connectionError, setConnectionError] = useState("");
    const [loading, setLoading] = useState(true);
    const [resources, setResources] = useState(userData.user.resources.minerals)
    const [sliderValue, setSliderValue] = useState(0);
    const [maxValueGenerator, setMaxValueGenerator] = useState(0)
    const [resourcesBase, setResourcesBase] = useState(0)
    const [isSecondUpdate, setIsSecondUpdate] = useState(true)
  
    const handleSliderChange = (value) => {
        setSliderValue(value);
      };
    const buyDrill = () => {
        addDrill(base._id).then(r => {
            if(r.error){
                setError(r.error);
            }else{
                setUserData(prevState => ({
                    ...prevState,
                    user: r.user
                }));
                setBase(prevState => ({
                    ...prevState,
                    drills: r.base.drills
                }))
            }
        }).catch(err => {
            setConnectionError(err.message || "Failed to connect");
        })
        .finally(() => {
            setLoading(false);
          });
    }

    const generator = () => {
        if(sliderValue != 0){
            addToGenerator(base._id, Math.round(sliderValue)).then(r => {
                if(r.error){
                    setError(r.error);
                }else{
                    setUserData(prevState => ({
                        ...prevState,
                        user: r.user
                    }));
                    setBase(r.base)
                }
            }).catch(err => {
                setConnectionError(err.message || "Failed to connect");
            })
            .finally(() => {
            setLoading(false);
            });
        }
    }

    const getBaseResources = () => {
        getResources(base._id).then(r => {
            if(r.error){
                setError(r.error);
            }else{
                setUserData(prevState => ({
                    ...prevState,
                    user: r.user
                }));
                setBase(r.base)
            }
        }).catch( err => {
            setConnectionError(err.message || "Failed to connect");
        })
        .finally(() => {
            setLoading(false);
          });
    }

    useEffect(()=> {
        setResources(userData.user.resources.minerals)
    },[userData])

    useEffect(()=> {
        if(base){
            setMaxValueGenerator(Math.round(base.generatorResources.capacity - base.generatorResources.used))
            if(Math.round(base.generatorResources.capacity - base.generatorResources.used) > resources){
                setMaxValueGenerator(resources)
            }
            
            setResourcesBase(base.storage.used)
            if(isSecondUpdate) {
                
                CountBase(setBase)
            }
        }
    },[base])

    useEffect(() => {
        getBaseByPlanet(userData.user.curentPlanet).then(r => {
            if(r.error){
                setError(r.error);
            } else{
                setBase(r)
            }
        }).catch(err => {
            setConnectionError(err.message || "Failed to connect");
        })
        .finally(() => {
            setLoading(false);
          });
    }, [])

    
    const intervalRef = useRef(null);
    useEffect(() => {
        if(loading) return
        clearInterval(intervalRef.current)
        if (base) {
            let count = 0;
            const updateTimeLeft = () => {
                CountBase(setBase)
                if(isSecondUpdate){
                    count++
                    setIsSecondUpdate(count<2)
                }
            };

            updateTimeLeft(); 
            intervalRef.current = setInterval(updateTimeLeft, 1000);
            return () => clearInterval(intervalRef.current);
        } else {
            
        }
    }, [loading]);

    

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
                        marginBottom: "4vw",
                        fontSize: "5vw",
                        alignItems: "center", 
                        textAlign: "center",
                        display: "flex",     
                        flexDirection: "column", 
                    }}>
                        <div className="text-white"
                            style={{
                                fontSize: "7vw"
                            }}>
                            Ресурси на базі:
                        </div>
                        <div className="text-white"
                            style={{
                                marginBottom: "3vw",
                                fontSize: "7vw"
                            }}>
                            {Math.round(resourcesBase)} / {base.storage.capacity}
                        </div>
                        <BlueButton onClick={getBaseResources} text="Отримати" widht="80%" fontSize="6vw"></BlueButton>
                </div>
                <div className="d-flex w-100"
                    style={{
                        borderRadius: "2vw",
                        border: "1vw solid #221A1A",
                        padding: "4vw",
                        backgroundColor: "#070707",
                        marginBottom: "3vw",
                        fontSize: "5vw",
                        alignItems: "center", 
                        textAlign: "center",
                        display: "flex",     
                        flexDirection: "column", 
                    }}>
                    <div className="text-white"
                            style={{
                                marginBottom: "3vw",
                                fontSize: "7vw"
                            }}>
                            Енергія:: {Math.round(base.generatorResources.used)} / {base.generatorResources.capacity}
                        </div>
                        <CustomSlider onValueChange={handleSliderChange} min={0} max={10000}  maxLimit={maxValueGenerator}></CustomSlider>
                        <BlueButton onClick={generator} text="Завантажити ресурси" widht="80%" fontSize="6vw"></BlueButton>
                </div>
                
               <BuyDrillButton onClick={buyDrill} base={base} ></BuyDrillButton>
            </div>
        </div>
    );
}

export default BaseScreen