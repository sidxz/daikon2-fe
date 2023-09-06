import React from 'react';
import { FcNeutralTrading, FcPlanner } from "react-icons/fc";
import { GiVote } from "react-icons/gi";
import { WiMoonFull } from "react-icons/wi";

const HAOverview = () => {
    return (

        <div className="flex flex-column w-full">
            <div className="flex w-full surface-50">


                <div className="flex w-full text-sm">
                    <div
                        className="flex p-1 align-items-center justify-content-center w-full text-lg  border-1 border-0 gap-2"
                        style={{
                            color: "#3c83bd",
                        }}
                    >
                        <div className="flex">
                            <FcPlanner />
                        </div>
                        <div className="flex">
                            <b>HA ENABLED SCREENS</b>
                        </div>
                    </div>
                </div>
                <div className="flex w-full text-sm">
                    <div
                        className="flex p-1 align-items-center justify-content-center w-full text-lg  border-1 border-0 gap-2"
                        style={{
                            color: "#3c83bd",
                        }}
                    >
                        <div className="flex">
                            <FcNeutralTrading />
                        </div>
                        <div className="flex">
                            <b>ACTIVE HA</b>
                        </div>
                    </div>
                </div>
                <div className="flex w-full text-sm">
                    <div
                        className="flex p-1 align-items-center justify-content-center w-full text-lg  border-1 border-0 gap-2"
                        style={{
                            color: "#3c83bd",
                        }}
                    >
                        <div className="flex text-orange-500">
                            <GiVote />
                        </div>
                        <div className="flex">
                            <b>INACTIVE HA</b>
                        </div>
                    </div>
                </div>
                <div className="flex w-full">
                    <div
                        className="flex p-1 align-items-center justify-content-center w-full text-lg  border-1 border-0 gap-2"
                        style={{
                            color: "#3c83bd",
                        }}
                    >
                        <div className="flex text-green-500">
                            <WiMoonFull />
                        </div>
                        <div className="flex">
                            <b>PORTFOLIO READY</b>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HAOverview