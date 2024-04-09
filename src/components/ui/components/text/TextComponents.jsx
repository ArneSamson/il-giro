import React from "react";

export const ButtonCategoryTitle = ({ children, title }) => {
    return (
        <div
            style={{
                marginBottom: "50px",
            }}
        >
            <h4
                className="config-ui__button-category-title"
            >
                {title}
            </h4>
            {children}
        </div>
    );
} 