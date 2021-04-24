import React from 'react'
import { AddRestaurants } from '../components/AddRestaurants'
import { Header } from '../components/Header'
import { RestaurantList } from '../components/RestaurantList'

export const Home = () => {
    return (
        <div>
            <Header/>
            <AddRestaurants/>
            <RestaurantList/>
        </div>
    )
}
