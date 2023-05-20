import React from "react";

const Card = ({ id, title, image, dietTypes }) => {
    return (
        <div key={id}>
            <div>
                <h3>{title}</h3>
                <img src={image} />
                <div>
                    {
                        dietTypes.map(
                            type => <h5>{type.title}</h5>
                        )
                    }
                </div>
            </div>
        </div>
    )
};

export default Card;