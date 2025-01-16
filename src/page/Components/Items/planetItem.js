const PlanetItem = ({type, planet, index, image, isCurent, isPlayerHere }) => (
    <div 
        className="d-flex align-items-center justify-content-center flex-shrink-0"
        style={{
            scrollSnapAlign: 'center',
            width: '50vw',
            transition: 'transform 0.3s ease, opacity 0.3s ease',
            transform: `scale(${isCurent ? 1 : 0.7})`,
            opacity: isCurent ? 1 : 0.7,
            willChange: 'transform, opacity'
        }}
    >
        <div className="text-center">
            <div style={{
                transition: 'transform 0.3s ease',
                transform: `translateY(${isCurent ? 0 : '20px'})`,
                willChange: 'transform'
            }}>
                <img
                    src={image}
                    alt={`Planet ${planet.name}`}
                    style={{
                        borderRadius: "100vw",
                        border: isPlayerHere ? "1vw solid #00FF37" : "",
                        width: '55vw',
                        height: 'auto',
                        objectFit: 'contain',
                        transition: 'all 0.3s ease',
                        willChange: 'transform'
                    }}
                    loading="lazy"
                />
                <h3 className="text-white" style={{
                    fontSize: "5vw"
                }}>{planet.name + (type=="Planet"? "" : " (" + type + ")")}</h3>
               
            </div>
        </div>
    </div>
);
export default PlanetItem