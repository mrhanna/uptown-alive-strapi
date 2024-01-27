import type { Schema, Attribute } from '@strapi/strapi';

export interface GeneralCoordinate extends Schema.Component {
  collectionName: 'components_general_coordinates';
  info: {
    displayName: 'coordinate';
  };
  attributes: {
    latitude: Attribute.Float;
    longitude: Attribute.Float;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'general.coordinate': GeneralCoordinate;
    }
  }
}
