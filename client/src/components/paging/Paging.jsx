import React from "react";
import "./Paging.css";

const Paging = ({ recipesPerPage, allRecipes, pagingFunc }) => {
    const pageNumber = []
    for (let i = 0; i < Math.ceil(allRecipes / recipesPerPage); i++) {
        pageNumber.push(i + 1)
    }

    return (
        <div>
            <nav>
                <ul>
                    {
                        pageNumber && pageNumber.map(n => (
                            <li className="paging-item" key={n}>
                                <a onClick={() => pagingFunc(n)}>{n}</a>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    )
};

export default Paging;