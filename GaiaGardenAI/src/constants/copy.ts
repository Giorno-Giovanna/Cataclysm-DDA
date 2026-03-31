import { GardenStyle } from '../types';

export const GARDEN_STYLES: GardenStyle[] = [
  'Scandinavian,Modern,Minimalist,Zen,Desert,Tropical,Cottage,Mediterranean,Rustic,Formal'.split(',').map((name, i) => ({
    id: name.toLowerCase(),
    name,
    emoji: ['❄️', '🏡', '✨', '🪷', '🏜️', '🌴', '🌸', '🌊', '🪵', '🧱'][i],
    image: `placeholder-${name.toLowerCase()}`,
    tagline: `${name} inspired garden style`,
    prompt: `Redesign this garden in ${name.toLowerCase()} style`,
  })),
].flat();

export const TRENDS = [
  'Aesthetic in Pools: Current Trends',
  'Relaxation Zones in Garden Design',
  'Sustainable Backyard Ideas',
];
