export default {
    // 循环添加script
    reloadJS(url) {
        if (!url || !url.length) {
            return;
        }
    
        let result = null;
    
        return (async () => {
            for (var i = 0; i < url.length; i++) {
                result = await createScript (url[i]);
            }
            if (i === url.length) {
                return result;
            }
        }) ();
    
        /**
         * 创建script
         * @param url
         * @returns {Promise}
         */
        function createScript (urlV) {
            let promise;
            let scriptElement = document.createElement ('script');
            document.body.appendChild (scriptElement);
        
            promise = new Promise ((resolve, reject) => {
                scriptElement.addEventListener (
                'load',
                e => {
                    resolve (e);
                },
                false
                );
        
                scriptElement.addEventListener (
                'error',
                e => {
                    reject (e);
                },
                false
                );
            });
    
            scriptElement.src = window.location.protocol + urlV;
            scriptElement.type = 'text/javascript';
        
            return promise;
        }
    },
  
    uuid(len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split (
        ''
        );
        var uuid = [];
        var i;
        radix = radix || chars.length;
        if (len) {
        for (i = 0; i < len; i++)
            uuid[i] = chars[0 | (Math.random () * radix)];
        } else {
        var r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
            r = 0 | (Math.random () * 16);
            uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
            }
        }
        }
        return uuid.join ('');
    },
}
  