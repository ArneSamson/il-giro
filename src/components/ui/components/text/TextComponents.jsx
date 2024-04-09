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
                    height: "1px",
                    borderWidth: 0,
                    borderColor: "#272727",
                    borderStyle: "solid",
                    borderBottomWidth: "1px",
                    margin: 0,
                }}
            />
            {children}
        </div>
    );
} 