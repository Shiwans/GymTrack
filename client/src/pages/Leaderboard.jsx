import React from "react";
import shivajimaharaj from "../assets/shivajimaharajpanaroma.png";

const Leaderboard = () => {
    // const [activeTab,setActiveTab]=useState("monthlhy")
  return (
    <>
      <h1 className="text-center">Leaderboard</h1>
      <div className="bg-auto w-220 h-80 flex">
        <img src={shivajimaharaj} alt="shivaji_maharaj" />
      </div>
    </>
  );
};

export default Leaderboard;
