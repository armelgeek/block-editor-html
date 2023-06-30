export function cacheMusic(uuid: any, url: any) {
  return fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const cacheRequest = caches
        .open("audio-cache")
        .then((cache) => cache.put(uuid, new Response(blob)));
      return cacheRequest.then(() => blob);
    });
}

export function getCachedMusic(uuid: any) {
  return caches
    .open("audio-cache")
    .then((cache) => cache.match(uuid))
    .then((response) => {
      console.log('is cached',response);
      if (!response) {
        return null;
      }
      return response.blob();
    });
}

export function isMusicCached(uuid: any) {
  return caches
    .open("audio-cache")
    .then((cache) => cache.match(uuid))
    .then((response) => response !== undefined);
}
