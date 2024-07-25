module.exports = ({ env }) => ({
    slugify: {
        enabled: true,
        config: {
            contentTypes: {
                business: {
                    field: 'slug',
                    references: 'name',
                },
                tag: {
                    field: 'slug',
                    references: 'name',                    
                },
            },
        },
    },
    'strapi-business-hours': {
        enabled: true,
        resolve: './src/plugins/strapi-business-hours'
    },
});