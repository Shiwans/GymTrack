import React from "react";
import shivajimaharaj from "../assets/shivajimaharajpanaroma.png";

const LeaderBoard = () => {
  // Sample data for the leaderboard
  const topMembers = [
    { rank: 1, trophy: '🏆', member: 'MEMBER1', avatar: '/api/placeholder/40/40', present: '27 DAYS', total: '27 DAYS' },
    { rank: 2, trophy: '🥈', member: 'MEMBER2', avatar: '/api/placeholder/40/40', present: '26 DAYS', total: '27 DAYS' },
    { rank: 3, trophy: '🥉', member: 'MEMBER3', avatar: '/api/placeholder/40/40', present: '24 DAYS', total: '27 DAYS' },
    { rank: '004', trophy: '', member: 'MEMBER4', avatar: '/api/placeholder/40/40', present: '23 DAYS', total: '27 DAYS' },
  ];

  const loverLsPlayers = [
    { rank: '005', member: 'LOVERL5_PLAYER', subtext: 'Skate Enjoyoor', avatar: '/api/placeholder/40/40', tables: '152 TABLES', gump: '1,249 GUMP' },
    { rank: '006', member: 'LOVERL5_PLAYER', subtext: 'Skate Enjoyoor', avatar: '/api/placeholder/40/40', tables: '152 TABLES', gump: '1,249 GUMP' },
    { rank: '006', member: 'LOVERL5_PLAYER', subtext: 'Skate Enjoyoor', avatar: '/api/placeholder/40/40', tables: '152 TABLES', gump: '1,249 GUMP' },
    { rank: '007', member: 'LOVERL5_PLAYER', subtext: 'Skate Enjoyoor', avatar: '/api/placeholder/40/40', tables: '152 TABLES', gump: '1,249 GUMP' },
  ];

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto bg-gray-100">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center my-4">Leader board</h1>
      
      {/* Banner Image */}
      <div className="w-full h-48 bg-amber-100 overflow-hidden mb-4">
        <img src={shivajimaharaj} alt="Decorative leaderboard banner" className="w-full" />
      </div>
      
      {/* Navigation Tabs */}
      <div className="flex mb-4">
        <div className="px-8 py-4 bg-gray-800 text-white">Year</div>
        <div className="px-8 py-4 bg-orange-600 text-white">Monthly</div>
      </div>
      
      {/* Table Headers */}
      <div className="flex w-full py-2 px-4 bg-gray-200 text-gray-700">
        <div className="w-1/4 font-bold">RANK</div>
        <div className="w-1/4 font-bold">MEMBER</div>
        <div className="w-1/4 font-bold text-right">PRESENT</div>
        <div className="w-1/4 font-bold text-right">TOTAL DAYS</div>
      </div>
      
      {/* Top Members */}
      {topMembers.map((member, index) => (
        <div 
          key={index}
          className={`flex w-full py-4 px-4 items-center ${
            index === 0 ? 'bg-amber-700 text-white' : 
            index === 1 ? 'bg-gray-700 text-white' :
            index === 2 ? 'bg-amber-900 text-white' :
            'bg-gray-900 text-white'
          }`}
        >
          <div className="w-1/4 flex items-center">
            {typeof member.rank === 'number' ? member.trophy : member.rank}
          </div>
          <div className="w-1/4 flex items-center">
            <div className="rounded-full overflow-hidden mr-2 w-10 h-10 bg-blue-300 flex justify-center items-center">
              <div className="text-lg">👓</div>
            </div>
            {member.member}
          </div>
          <div className="w-1/4 text-right">{member.present}</div>
          <div className="w-1/4 text-right">{member.total}</div>
        </div>
      ))}
      
      {/* LOVERL5_PLAYER entries */}
      {loverLsPlayers.map((player, index) => (
        <div 
          key={index}
          className={`flex w-full py-4 px-4 items-center ${
            index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-900 text-white'
          }`}
        >
          <div className="w-1/4">{player.rank}</div>
          <div className="w-1/4 flex items-center">
            <div className="rounded-full overflow-hidden mr-2 w-10 h-10 bg-gray-400 flex justify-center items-center">
              <img src={player.avatar} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <div>{player.member}</div>
              <div className="text-xs text-gray-500">{player.subtext}</div>
            </div>
          </div>
          <div className="w-1/4 text-right">{player.tables}</div>
          <div className="w-1/4 text-right">{player.gump}</div>
        </div>
      ))}
    </div>
  );
};

export default LeaderBoard;
