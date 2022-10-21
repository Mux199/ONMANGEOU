import React, { useEffect, useState } from 'react';
import EmptyView from './search/emptyview';
import List from './search/List/List';
/*
import FilterPanel from '../../components/Home/FilterPanel';

import SearchBar from '../../components/Home/SearchBar';*/
import '../styles/components/_search.scss';

const Search = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState([1000, 5000]);


    const [restaurants, setRestaurants] = useState([
        { id: 1, checked: false, label: 'American' },
    ]);
    const ListRestaurant = "../assets/data/restaurants.json"
    const [list, setList] = useState(ListRestaurant);
    const [resultsFound, setResultsFound] = useState(true);
    const [searchInput, setSearchInput] = useState('');

    const handleSelectCategory = (event, value) =>
        !value ? null : setSelectedCategory(value);

    const handleSelectRating = (event, value) =>
        !value ? null : setSelectedRating(value);

    const handleChangeChecked = (id) => {
        const restaurantsStateList = ListRestaurant;
        const changeCheckedRestaurants = restaurantsStateList.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
        );
        setRestaurants(changeCheckedRestaurants);
    };

    const handleChangePrice = (event, value) => {
        setSelectedPrice(value);
    };

    const applyFilters = () => {
        let updatedList = ListRestaurant;

        // Rating Filter
        if (selectedRating) {
            updatedList = updatedList.filter(
                (item) => parseInt(item.rating) === parseInt(selectedRating)
            );
        }

        // Category Filter
        if (selectedCategory) {
            updatedList = updatedList.filter(
                (item) => item.category === selectedCategory
            );
        }

        // Restaurant Filter
        const restaurantsChecked = restaurants
            .filter((item) => item.checked)
            .map((item) => item.label.toLowerCase());

        if (restaurantsChecked.length) {
            updatedList = updatedList.filter((item) =>
                restaurantsChecked.includes(item.restaurant)
            );
        }

        // Search Filter
        if (searchInput) {
            updatedList = updatedList.filter(
                (item) => item.title.toLowerCase().
                search(searchInput.toLowerCase().trim()) !== -1);
        }

        // Price Filter
        const minPrice = selectedPrice[0];
        const maxPrice = selectedPrice[1];

        updatedList = updatedList.filter(
            (item) => item.price >= minPrice && item.price <= maxPrice
        );

        setList(updatedList);

        !updatedList.length ? setResultsFound(false) : setResultsFound(true);
    };

    useEffect(() => {
        applyFilters();
    }, [selectedRating, selectedCategory, restaurants, searchInput, selectedPrice]);

    return (
        <div className='search'>
            {/* Search Bar */}
            <SearchBar
                value={searchInput}
                changeInput={(e) => setSearchInput(e.target.value)}
            />
            <div className='search_panelList-wrap'>
                {/* Filter Panel */}
                <div className='search_panel-wrap'>
                    <FilterPanel
                        selectedCategory={selectedCategory}
                        selectCategory={handleSelectCategory}
                        selectedRating={selectedRating}
                        selectedPrice={selectedPrice}
                        selectRating={handleSelectRating}
                        restaurants={restaurants}
                        changeChecked={handleChangeChecked}
                        changePrice={handleChangePrice}
                    />
                </div>
                {/* List & Empty View */}
                <div className='search_list-wrap'>
                    {resultsFound ? <List list={list} /> : <EmptyView />}
                </div>
            </div>
        </div>
    );
};

export default Search;