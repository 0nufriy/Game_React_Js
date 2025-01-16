const ShipUpgradeItem = ({ ship, index, image, isCurrent }) => (
    <div style={{
        marginLeft: "10vw",
        marginRight: "10vw",
        marginTop: "10vw",
        opacity: isCurrent ? 1 : 0.5,
        transform: isCurrent ? "scale(1.1)" : "scale(1)", 
        transition: "all 0.3s ease" 
    }}>
        <div className="d-flex items-center w-100"
            style={{
                fontSize: "5vw",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                minHeight: "100%",
                textAlign: "center",
            }}>
            <img src={image}
                alt="Паза"
                style={{
                    width: "15vw",
                    height: "auto",
                    display: "block",
                    marginRight: "5vw",
                    opacity: isCurrent ? 1 : 0.7, 
                    transform: isCurrent ? "scale(1.2)" : "scale(1)",
                    transition: "all 0.3s ease"
                }}>
            </img>  
            <div className='text-white' style={{
                fontSize: "6vw"
            }}>Рівень: {ship.level}</div> 
        </div>  
    </div>
);

export default ShipUpgradeItem;
