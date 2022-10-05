import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

const root = ReactDOM.createRoot(document.getElementById('header'));
const appes = ReactDOM.createRoot(document.getElementById('body'));

function Header() {

    const [search, setSearch] = useState('');


    const handleChange = event => {
        setSearch(event.target.value);
    };


    async function handleSubmit(a) {
        a.preventDefault();
        if (search.length > 2) {
            const response = await fetch(
                `http://localhost:31114/api/pokeview/${search}`
            ).then((response) => response.json());
            appes.render(
                <div className="container px-4 darkback">
                    <div className="row justify-content-center px-4">
                        {response &&
                            response.map((pokedex, index) => (
                                <div className="p-3 col-6 col-md-3" key={index}>
                                    <div className="card" >
                                        <img src={pokedex.image} className="card-img-top" alt="Logo" />
                                        <div className="card-body">
                                            <p className="card-text">N. {pokedex.pid}</p>
                                            <h5 className="card-title">{pokedex.english}</h5>
                                            <button type="button" className="btn btn-primary" style={{ backgroundColor: pokedex.tcolor, borderColor: pokedex.tcolor }}>{pokedex.type}</button>
                                            <div className="card-body">
                                                <h5 className="card-title">{pokedex.english}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            );
        } else if (search.length === 0) {
            appes.render(<App />);
        }
    }

    return (

        <div className="form-inline justify-content-between mr-2">
            <h1 className="section-title ml-2">Pokédex</h1>
            <div className="form-group mx-sm-3 mb-2">
                <label className="pokedex-filter-text mt-1">Nombre</label>
                <input type="text" onChange={handleChange} value={search} className="form-control mt-1" />
                <button type="button" className="btn btn-danger ml-2 mt-1" onClick={handleSubmit}>Buscar Pokemon</button>
            </div>
        </div>

    );
}

function App() {
    const [pokedexs, setPokedex] = useState();

    const getApiDataPokedex = async () => {
        const response = await fetch(
            "http://localhost:31114/api/pokeview"
        ).then((response) => response.json());

        setPokedex(response);
    };

    useEffect(() => {
        getApiDataPokedex();
    }, []);

    return (

        <div className="container px-4 darkback">
            <div className="row justify-content-center px-4">
                {pokedexs &&
                    pokedexs.map((pokedex, index) => (
                        <div className="p-3 col-12 col-md-3" key={index}>
                            <div className="card" >
                                <img src={pokedex.image} className="card-img-top" alt="Logo" />
                                <div className="card-body">
                                    <p className="card-text">N. {pokedex.pid}</p>
                                    <h5 className="card-title">{pokedex.english}</h5>
                                    <button type="button" className="btn btn-primary" style={{ backgroundColor: pokedex.tcolor, borderColor: pokedex.tcolor }}>{pokedex.type}</button>
                                </div>
                                <div className="card-footer d-flex flex-wrap justify-content-center mt-1">
                                    <h5 className="stats statstext ml-2 text-success">HP: {pokedex.hp}</h5>
                                    <h5 className="stats statstext ml-2 text-danger">Atk: {pokedex.attack}</h5>
                                    <h5 className="stats statstext ml-2 text-primary">Def: {pokedex.defense}</h5>
                                    <h5 className="stats statstext ml-2 text-info">SpAtk: {pokedex.spAttack}</h5>
                                    <h5 className="stats statstext ml-2 text-dark">SpDef: {pokedex.spDefense}</h5>
                                    <h5 className="stats statstext ml-2 text-muted">Speed: {pokedex.speed}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>

    );
}
root.render(<Header />);
appes.render(<App />);