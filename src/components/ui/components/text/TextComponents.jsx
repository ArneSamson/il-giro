import React from "react";

export const ButtonCategoryTitle = ({ children, title }) => {
    return (
        <div
            style={{
                marginBottom: "25px",
            }}
        >
            <h4
                className="config-ui__button-category-title"
            >
                {title}
            </h4>
            <hr
                style={{
                    border: "1px solid #272727",
                }}
            />
            {children}
        </div>
    );
} 