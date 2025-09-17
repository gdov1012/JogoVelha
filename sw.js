const CACHE = "offline";
const FILES =[
    "/",
    "/index.html",
    "/jogo.js",
    "/manifest.json",
    "/icons/258.png",
    "/icons/512.png"
    ]

self.addEventListener("install", (event) =>{
    event.waitUntil(
        caches.open("CACHE").then((cache)=>{
            return cache.addAll(FILES);
        })
    );
    });

self.addEventListener("activate", () => {
      caches.open("offline").then((caches) => {
cache.addAll(FILES);
});
});


     
self.addEventListener('fetch', event => {
        event.respondWith(
            caches.math(event.request).then((Response) => {
                return response || fetch(event.request);
})
        );
    });