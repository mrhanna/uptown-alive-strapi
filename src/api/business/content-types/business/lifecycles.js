const beforeSave = async function (event) {
    const { data } = event.params;

    if (data.address && data.coordinate === null) {    
        try {
            console.log(`https://nominatim.openstreetmap.org/search?q=${data.address}&format=jsonv2`)
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${data.address}&format=jsonv2`);

            const coord = await response.json();
            console.log(coord);

            const tempdata = await strapi.query('general.coordinate').create({ 
                data: {
                    latitude: coord[0].lat,
                    longitude: coord[0].lon,
                }
            });
            console.log(tempdata);

            data.coordinate = {
                id: tempdata.id,
                _pivot: {
                    field: 'coordinate',
                    component_type: 'general.coordinate'
                }
            }
        } catch (e) {

        }
    }
};

module.exports = {
    beforeCreate: beforeSave,
    beforeUpdate: beforeSave,
}