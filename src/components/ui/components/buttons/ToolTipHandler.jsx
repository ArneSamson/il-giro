import React, { useEffect, useState } from "react";

import useUIStore from "../../../../store/useUIStore.jsx";

export default function ToolTipHandler({ children, content }) {

    const { setToolTip } = useUIStore(
        state => ({
            toolTip: state.toolTip,
            setToolTip: state.setToolTip,
        })
    );

    return <>
        <div
            className="tooltip-handler"
            onMouseEnter={(e) => {
                setToolTip(e.currentTarget, content, true);
            }}
            onMouseLeave={(e) => {
                setToolTip(e.currentTarget, content, false);
            }}
        >
            {children}
        </div>
    </>
}