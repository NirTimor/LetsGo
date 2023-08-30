import { useState, useMemo, useEffect } from "react";
import countriesAndCitiesData from "../country-by-cities.json";

const useCountriesAndCities = ({ country }) => {
    const [citiesList, setCitiesList] = useState([]);

    const countries = useMemo(() => countriesAndCitiesData.map((item) => item.country), []);

    useEffect(() => {
        const selectedItem = countriesAndCitiesData.filter((item) => item.country === country)[0];
        setCitiesList(selectedItem?.cities);
    }, [country]);

    return ({
        countries,
        citiesList,
    })
};

export default useCountriesAndCities;
