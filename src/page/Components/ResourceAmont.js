import { useState } from 'react';
const ResorceAmount = ({planetName, userResources}) => {
    const isName = planetName != undefined
    return (
        <div className="fixed-top d-flex flex-column align-items-center" style={{ paddingTop: "2%" }}>
    <div
      className="text-white"
      style={{
        backgroundColor: "#221A1A",
        borderRadius: "20vw",
        width: "70%",
        border: '1vw solid #A49D9D',
        paddingTop: "2%",
        paddingBottom: "2%",
        paddingRight: "4%",
        paddingLeft: "4%"
      }}
    >
      <div className="text-center">
        <div className="h4 my-0" style={{ fontSize: "7vw" }}>🚀 {userResources.toLocaleString()}</div>
      </div>
    </div>
    {isName ? (
      <div style={{ marginTop: "2%" }}>
      <div className="h5 text-white" style={{ fontSize: "5vw" }}>Планета: {planetName}</div>
    </div>
    ) : (
      <div>
     </div>
    )}
    
  </div>
    )
}


export default ResorceAmount