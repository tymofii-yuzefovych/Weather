class CacheProxy {
    _fetchData(url) {
        /*
         * @TODO - Uzupełnij tą metodę tak, aby zwracała Promise,
         * które spełnia się do rozkodowanego z JSON
         * obiektu. Wykorzystaj fetch() do pobrania zawartości z argumentu url.
         */
        return fetch(url).then(resp => resp.json())

    }

    constructor() {
        this.cache = {}

        this.get = url => {
            if (url in this.cache)
                return Promise.resolve(this.cache[url]);
            else
                return this._fetchData(url).then(data => {
                    this.cache[url] = data;
                    return data;
                });
            }
        }
}

module.exports = new CacheProxy();
