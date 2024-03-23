"use client";
import Script from "next/script";
import React from "react";

export default function Clock2() {
	return (
		<Script id="clock">{`var g=function(){let f=new Date,d=f.getHours(),b=f.getMinutes(),c="AM";if(d>=12){if(d>12)d-=12;c="PM"}else if(d===0)d=12,c="AM";d=d<10?"0"+d:d,b=b<10?"0"+b:b;let j=d+":"+b+":"+c;document.getElementById("clock").innerHTML=j};setInterval(g,60000);g();`}</Script>
	);
}
