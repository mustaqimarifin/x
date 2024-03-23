"use client";

const klClock = new Date().toLocaleTimeString([], {
	timeZone: "Asia/Kuala_Lumpur",
	hour12: false,
	hour: "2-digit",
	minute: "2-digit",
});

//const klClockRepeat = setInterval(klClock, 60000);
const KLC = () => <div>{`${klClock}:KL`}</div>;

export default KLC;
