// Avatar icon URLs for trip cards - Mix of travel destinations and friends group photos
export const AVATAR_ICONS = [
  // Travel & Nature Images
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop&crop=center", // Mountain landscape
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=100&h=100&fit=crop&crop=center", // Forest path
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop&crop=center", // Lake view
  "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=100&h=100&fit=crop&crop=center", // Beach sunset
  
  // Friends Group Photos
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=100&h=100&fit=crop&crop=center", // Friends hiking
  "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=100&h=100&fit=crop&crop=center", // Group at beach
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=100&h=100&fit=crop&crop=center", // Friends camping
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&h=100&fit=crop&crop=center", // Group travel
  
  // More Travel Destinations
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop&crop=center", // Mountain peak
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=100&h=100&fit=crop&crop=center", // Forest trail
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop&crop=center", // Scenic lake
  "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=100&h=100&fit=crop&crop=center", // Ocean view
  
  // More Friends Group Photos
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=100&h=100&fit=crop&crop=center", // Adventure group
  "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=100&h=100&fit=crop&crop=center", // Beach friends
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=100&h=100&fit=crop&crop=center", // Camping buddies
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&h=100&fit=crop&crop=center", // Travel companions
];

// Function to get avatar icon for a trip based on trip ID
export const getAvatarIcon = (tripId: number): string => {
  return AVATAR_ICONS[tripId % AVATAR_ICONS.length];
};
