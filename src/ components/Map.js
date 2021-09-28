import React from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import { store_all, store_address } from '../redux/actions/apiAction';
import { connect } from 'react-redux';
import {compose} from 'redux';
import './Map.css';


const MapContainer = ({store_all, store_address, markers, address}) => {

    const handleChange = address => {
        store_address({ address });
    };

    const handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                store_all({
                    markers:[
                        {
                            position:{
                                lat: latLng.lat,
                                lng: latLng.lng
                            },
                        },
                        ...markers
                    ],
                    address
                })
            })
            .catch(error => console.error('Error', error));
    };


    const mapClicked = (mapProps, map, event) =>{
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        store_all({
        markers: [
            {
                position:{
                    lat: lat,
                    lng: lng
                },
            },
            ...markers
            ],
    })
    }

    return (
        <div>
            <PlacesAutocomplete
                value={address}
                onChange={handleChange}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input data-testid="input"
                    {...getInputProps({
                        placeholder: 'Search Places ...',
                        className: 'location-search-input',
                    })}
                    />
                    <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                        const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                        <div
                            {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                            })}
                        >
                            <span>{suggestion.description}</span>
                        </div>
                        );
                    })}
                    </div>
                </div>
                )}
            </PlacesAutocomplete>
            <Map
                className="map"
                google={window.google}
                zoom={11}
                initialCenter={{
                    lat: markers[0].position.lat,
                    lng: markers[0].position.lng
                }}
                center={{
                    lat: markers[0].position.lat,
                    lng: markers[0].position.lng
                }}
                onClick={mapClicked}>
                    {markers.map((marker, i) =>{
                        return(
                            <Marker
                            className="marker"
                            key={i}
                            title={'Geolocation'}
                            position={{
                            lat:marker.position.lat,
                            lng:marker.position.lng,
                            }}
                        />
                    )
                    })}  
            </Map>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        markers: state.apiState.markers,
        address: state.apiState.address
    }
}

const enhance = compose(
    connect(mapStateToProps, {store_all, store_address}),
    GoogleApiWrapper(() => ({
        apiKey: 'YOUR API KEY GOES HERE',
    })),
)

export default enhance(MapContainer)
