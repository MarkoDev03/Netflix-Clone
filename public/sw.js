self.addEventListener("install",e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["./","","./media/netflix-logo_1_192x192.png"]);
       })
    );
});
self.addEventListener("fetch",e => {
   // console.error(`Intercepting fetch request for: ${e.request.url}`);
})