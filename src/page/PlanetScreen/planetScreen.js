import { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react';
import planetImg from "../../static/images/planet.png";
import ResorceAmount from '../Components/ResourceAmont';
import PlanetItem from '../Components/Items/planetItem';
import BlackButton from '../Components/Buttons/BlackButton';
import ship from "../../static/images/Ship.png"
import { useNavigate } from 'react-router-dom';
import UpgradeShipButton from '../Components/Buttons/UpgradrShipButton';
import LoadingItem from '../Components/Items/LoadingItem'; 

import {colonizePlanet, getMyPlanet, getPlanets, goToPlanet} from "../../http"
import constant from '../../constant';

const Planet = ({userData, setUserData}) => {
    const navigate = useNavigate();
    const [startX, setStartX] = useState(null);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);
    const scrollTimeout = useRef(null);


    const [resources, setResources] = useState(userData.user.resources.minerals)

    const [planets, setPlanets] = useState([]);
    const [planetSelect, setPlanetSelect] = useState(null);
    const [planetPlayer, setPlanetPlayer] = useState(null)
    const [myPlanet, setMyPlanet] = useState([])
   
    const [error, setError] = useState("");
    const [connectionError, setConnectionError] = useState("");
    const [loadingPlanet, setLoadingPlanet] = useState(true);
    const [loadingMyPlanet, setLoadingMyPlanet] = useState(true);
    
    useEffect(() => {
        if (planetPlayer && planets.length > 0 && containerRef.current) {
            const index = planets.findIndex(planet => planet._id === planetPlayer._id);
            if (index !== -1) {
                const itemWidth = window.innerWidth / 2; 
                const scrollPosition = index * itemWidth;
                containerRef.current.scrollLeft = scrollPosition; 
                setPlanetSelect(planets[index]);
            }
        }
    }, [planetPlayer, planets]);

    useEffect(()=>{
        getPlanets().then(r => {
            if(r.error){
                setError(r.error);
            }else{
                const sortedPlanets = r.sort((a, b) => {
                    return a.coordinates - b.coordinates;
                });
                setPlanets(sortedPlanets);
                setPlanetSelect(r[0])
                r.forEach(planet => {
                    if(userData && planet._id == userData.user.curentPlanet){
                        setPlanetPlayer(planet)
                    }
                })
            }
        }).catch( err => {
            setConnectionError("Failed to connect");
        })
        .finally(() => {
            setLoadingPlanet(false);
          });
        getMyPlanet().then(r => {
            if(r.error){
                setError(r.error);
            }else{
                setMyPlanet(r)
            }
        }).catch( err => {
            setConnectionError("Failed to connect");
        })
        .finally(() => {
            setLoadingMyPlanet(false);
          });
    },[])

    
    const handleScroll = useCallback(() => {
        if (scrollTimeout.current) {
            window.cancelAnimationFrame(scrollTimeout.current);
        }

        scrollTimeout.current = window.requestAnimationFrame(() => {
            if (containerRef.current) {
                const scrollPosition = containerRef.current.scrollLeft;
                const itemWidth = window.innerWidth / 2;
                const index = Math.round(scrollPosition / itemWidth);
                if (index >= 0 && index < planets.length) {
                    setPlanetSelect(planets[index]);
                }
            }
        });
    }, [planets]);

    const handleTouchStart = useCallback((e) => {
        setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    }, []);

    const handleMouseDown = useCallback((e) => {
        e.preventDefault(); 
        e.stopPropagation(); 
        setIsDragging(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    }, []);



    const handleMouseMove = useCallback((e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        
        window.requestAnimationFrame(() => {
            if (containerRef.current) {
                containerRef.current.scrollLeft = scrollLeft - walk;
            }
        });
    }, [isDragging, startX, scrollLeft]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);
    const handleTouchEnd = useCallback(() => {
        setStartX(null)
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            const throttledScroll = (e) => {
                if (scrollTimeout.current) {
                    window.cancelAnimationFrame(scrollTimeout.current);
                }
                scrollTimeout.current = window.requestAnimationFrame(() => handleScroll(e));
            };
            container.addEventListener('scroll', throttledScroll, { passive: true });
            return () => {
                container.removeEventListener('scroll', throttledScroll);
                if (scrollTimeout.current) {
                    window.cancelAnimationFrame(scrollTimeout.current);
                }
            };
        }
    }, [handleScroll]);

    function toPlanet(){
        if(myPlanet.includes(planetSelect._id) || planetSelect.type != "Planet"){
            goToPlanet(planetSelect._id).then( r => {
                
                if(r.error || !r){
                    setError(r.error);
                }else{
                    setUserData(prevState => ({
                        ...prevState,
                        user: r
                    }));
                    navigate("/")
                }
            }).catch(err =>{
                setConnectionError("Failed to connect");
            })
            .finally(() => {
                setLoadingMyPlanet(false);
              });
        }else{
            colonizePlanet(planetSelect._id).then(r => {
                if(r.error || !r){
                    setError(r.error);
                }else{
                    setUserData(prevState => ({
                        ...prevState,
                        user: r
                    }));
                    navigate("/")
                }
            }).catch(err => {
                setConnectionError("Failed to connect");
            })
            .finally(() => {
                setLoadingMyPlanet(false);
              });
        }

    }
    if (loadingMyPlanet || loadingPlanet) return <LoadingItem />;

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
            <ResorceAmount userResources={userData.user.resources.minerals} />
            <div 
                ref={containerRef}
                className="d-flex position-relative align-items-center"
                style={{
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    scrollSnapType: 'x mandatory',
                    scrollBehavior: 'smooth',
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                    WebkitOverflowScrolling: 'auto',
                    paddingTop: "50vw",
                    paddingLeft: '25vw',
                    paddingRight: '25vw',
                    willChange: 'scroll-position',
                    cursor: isDragging ? 'grabbing' : 'grab' 
                }}
                onTouchStart={handleTouchStart}
                onMouseMove={handleMouseMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {planets.map((planet, index) => (
                    <PlanetItem type={planet.type} key={index} planet={planet} index={index} image={planetImg} isPlayerHere={planetPlayer._id == planet._id} isCurent={planetSelect._id == planet._id}/>
                ))}
            </div>
            <div   className="d-flex flex-column align-items-center" style={{
                paddingTop: "3vw",
                paddingLeft: "10vw",
                paddingRight: "10vw",
            }}>
                <div style={{
                    marginBottom: "2vw"
                }}>
                    {planetPlayer ? 
                    planetPlayer.coordinates !== planetSelect.coordinates ? 
                    <div style={{ textAlign: 'center' }}>
                    <div className='text-white' style={{ fontSize: '4vw' }}>
                        Необхідно ресурсів: {myPlanet.includes(planetSelect._id)?  Math.abs(planetSelect.coordinates - planetPlayer.coordinates) * constant.shipResourceByBit : constant.colonizePrice + Math.abs(planetSelect.coordinates - planetPlayer.coordinates) * constant.shipResourceByBit}
                    </div>
                    <div className='text-white' style={{ fontSize: '4vw' }}>
                        Необхідний ріень кораблю: {Math.abs(planetSelect.coordinates - planetPlayer.coordinates)}
                    </div>
                </div>
                    : 
                    <div style={{ textAlign: 'center' }}>
                    <div className='text-white' style={{ fontSize: '4vw' }}>
                        Поточна планета
                    </div>
                    <div className='text-white' style={{ fontSize: '4vw' }}>
                     Не можна сюди переміститися
                    </div>
                </div>
                     : ""}
                </div>
                <BlackButton
                    onClick={toPlanet}
                    isDisable={planetSelect == planetPlayer || resources < (Math.abs(planetSelect.coordinates - planetPlayer.coordinates)) * constant.shipResourceByBit || userData.user.shipLevel < Math.abs(planetSelect.coordinates - planetPlayer.coordinates)}
                    text={myPlanet.includes(planetSelect._id) || planetSelect.type != "Planet"? "Переміститися" : "Колонізувати"}></BlackButton>
            </div>
            <UpgradeShipButton image={ship} navigate={navigate} player={userData.user.shipLevel} ></UpgradeShipButton>
        </div>
    );
};

export default Planet;
