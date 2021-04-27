import React, {useContext, useEffect} from 'react'
import RestaurantFinder from "../apis/RestaurantFinder"
import { RestaurantsContext } from '../context/RestaurantsContext'
import { useHistory } from "react-router-dom"

export const RestaurantList = (props) => {
    const {restaurants, setRestaurants} = useContext(RestaurantsContext);
    let history = useHistory()

    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/")
                
                console.log(response)
                setRestaurants(response.data.data.restaurant)
            } catch (error) {}
        };
        
       fetchData();
    }, [])

    const handleDelete = async (e, id) => {
        e.stopPropagation()
        try {
            const response = await RestaurantFinder.delete(`/${id}`)
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id
            }))
            console.log(response)
        } catch (error) {
            
        }
    }

    const handleUpdate = (e, id) => {
        e.stopPropagation()
        history.push(`/restaurants/${id}/update`)
    };

    const handleRestaurantSelect = (id) => {
        history.push(`/restaurants/${id}`);
    }
    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants &&
                    restaurants.map(restaurant => {
                        return (
                           <tr onClick={() => handleRestaurantSelect(restaurant.id)}key={restaurant.id}>
                            <th>{restaurant.name}</th>
                            <th>{restaurant.location}</th>
                            <th>{"$".repeat(restaurant.price_range)}</th>
                            <th>reviws</th>
                            <th><button onClick={(e) => handleUpdate(e, restaurant.id)} className="btn btn-warning">Update</button></th>
                            <th><button onClick={(e) => handleDelete(e, restaurant.id)} className="btn btn-danger">Delete</button></th>
                        </tr> 
                        )})}
                    {/* <tr>
                        <td>Mcdonal</td>
                        <td>NewYork</td>
                        <td>$$</td>
                        <td>Rating</td>
                        <td>
                            <button className="btn btn-warning">Update</button>
                        </td>
                        <td>
                        <button className="btn btn-danger">Delete</button>
                        </td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    )
}
