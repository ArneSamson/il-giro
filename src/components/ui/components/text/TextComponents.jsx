import React from "react";

export const ButtonCategoryTitle = ({ children, title }) => {
    return (
        <div
            style={{
                marginBottom: "25px",
            }}
        >
            <hr
                style={{
                    height: "1px",
                    borderWidth: 0,
                    borderColor: "#9b9b9b",
                    borderStyle: "solid",
                    borderBottomWidth: "1px",
                    margin: 0,
                }}
            />
            <h4
                className="config-ui__button-category-title"
            >
                {title}
            </h4>
            {children}
        </div>
    );
} 