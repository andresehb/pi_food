import React from "react";
import "./Card.css";

const Card = ({ id, title, image, dietTypes }) => {
    return (
        <div className="card-wrapper" key={id}>
            <div className="card-info">
                <h3>{title}</h3>
                <div className="card_card">
                    <img src={image} />
                    <div className="card-diets">
                        {
                            dietTypes.map(
                                type => <h5>{type.name}</h5>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Card;