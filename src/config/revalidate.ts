export const REVALIDATE_CONFIG = {
  HOME: 3600,
  MUSIC_ANIME: 1800,
  ARTICLE: 7200,
} as const;

export const minutesToSeconds = (minutes: number) => minutes * 60;
export const hoursToSeconds = (hours: number) => hours * 60 * 60; 