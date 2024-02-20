import React, { useEffect, useState } from "react";
import "./drinks.css";

const link = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";


const Food = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState({ status: false, msg: '' })

    useEffect(() => {
        const newlink = `${link}${search}`;
        fetchData(newlink);
    }, [search]);

    const fetchData = async (url) => {
        setLoading(true);
        setIsError({ status: false, msg: '' })
        try {
            const response = await fetch(url);
            const { drinks } = await response.json();
            setData(drinks);
            setLoading(false);
            setIsError({ status: false, msg: '' })
            if (!drinks) {
                throw new Error("No data Available")
            }

        }
        catch (error) {
            setLoading(false);
            setIsError({ status: true, msg: error.message || "Something went wrong...Please try again" })
        }

    }
    return (
        <div>
            <center>
                <form >
                    <input type="text" name="searchinput" id="searchinput" className="search" value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </form>

                {
                    loading && !isError?.status && <h5 class="loading">Loading...</h5>}
                {
                    isError?.status && <h5 style={{ color: "red", marginTop: "16px" }}>{isError.msg}</h5>

                }



                {
                    !loading && !isError?.status && <div className="card-container">
                        {data.map((val) => {
                            const { strDrink, strDrinkThumb, strInstructions, strCategory, strAlcoholic } = val;
                            return (

                                <div class="card" style={{ width: "18rem" }}>
                                    <img src={strDrinkThumb} class="card-img-top" alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title">{strDrink}</h5>
                                        <p class="card-text"><b class="bold">Instructions: </b>{strInstructions}</p>
                                    </div>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item"><b style={{ color: "black" }}>Drink Category : </b> {strCategory}</li>

                                    </ul>

                                </div>
                            );
                        })}
                    </div>
                }

            </center>
        </div>
    );
};

export default Food;
