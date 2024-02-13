import type { Schema, Attribute } from '@strapi/strapi';

export interface BusinessHours extends Schema.Component {
  collectionName: 'components_business_hours';
  info: {
    displayName: 'hours';
    icon: 'clock';
  };
  attributes: {
    sunday: Attribute.Component<'general.time-range'>;
    monday: Attribute.Component<'general.time-range'>;
    tuesday: Attribute.Component<'general.time-range'>;
    wednesday: Attribute.Component<'general.time-range'>;
    thursday: Attribute.Component<'general.time-range'>;
    friday: Attribute.Component<'general.time-range'>;
    saturday: Attribute.Component<'general.time-range'>;
  };
}

export interface BusinessLinks extends Schema.Component {
  collectionName: 'components_general_links';
  info: {
    displayName: 'links';
    icon: 'link';
    description: '';
  };
  attributes: {
    website: Attribute.String;
    facebook: Attribute.String;
    instagram: Attribute.String;
    twitter: Attribute.String;
    tiktok: Attribute.String;
  };
}

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

export interface GeneralLocation extends Schema.Component {
  collectionName: 'components_general_locations';
  info: {
    displayName: 'location';
    icon: 'pinMap';
    description: '';
  };
  attributes: {
    address: Attribute.String;
    lat: Attribute.Float;
    lon: Attribute.Float;
  };
}

export interface GeneralTimeRange extends Schema.Component {
  collectionName: 'components_general_time_ranges';
  info: {
    displayName: 'timeRange';
  };
  attributes: {
    from: Attribute.Time;
    to: Attribute.Time;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'business.hours': BusinessHours;
      'business.links': BusinessLinks;
      'general.coordinate': GeneralCoordinate;
      'general.location': GeneralLocation;
      'general.time-range': GeneralTimeRange;
    }
  }
}
