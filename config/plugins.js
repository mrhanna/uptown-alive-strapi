module.exports = ({ env }) => ({
    slugify: {
        enabled: true,
        config: {
            contentTypes: {
                business: {
                    field: 'slug',
                    references: 'name',
                },
                feature: {
                    field: 'slug',
                    references: 'title',
                },
            },
        },
    },
});