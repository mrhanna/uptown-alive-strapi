import React from 'react';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import { Button } from '@strapi/design-system';

export default function LocationButton() {
    const { modifiedData, onChange } = useCMEditViewDataManager();

    const onClick = async function() {
        // find array idx of "general.location" component

        const address = modifiedData.location.address;
        
        if (!address) return;

        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${address}&format=jsonv2`);
        const data = await response.json();
        const {lat, lon} = data[0];

        if (!lat) return;

        onChange({
            target: {
                name: `location.lat`,
                value: lat,
            }
        });

        onChange({
            target: {
                name: `location.lon`,
                value: lon,
            }
        });
    };

    return <Button onClick={onClick}>Set lat/lon by address</Button>
}