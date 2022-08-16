import queryStringify from "../utils/queryStringify";

const enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

type TRequestData = Record<string, string | number>;

export type TRequestOptions = {
    method?: METHODS
    headers?: Record<string, string>
    timeout?: number
    data?: unknown
    withCredentials?: boolean
};

class HTTPTransport {
    private _parentPath: string;

    constructor(_parentPath = '') {
        this._parentPath = _parentPath;
    }


    public get = (url: string, options = {}): Promise<XMLHttpRequest> => {

        // if (options.hasOwnProperty('data')) {
        //     url = url + queryStringify(options.data)
        // }
        return this.request(url, {
            ...options,
            method: METHODS.GET
        });
    };
    put = (url :string, options = {}) => {
        return this.request(url, {
            ...options,
            method: METHODS.PUT
        })
    };
    post = (url :string, options = {}) => {
        return this.request(url, {
            ...options,
            method: METHODS.POST
        })
    };
    delete = (url :string, options = {}) => {
        return this.request(url, {
            ...options,
            method: METHODS.DELETE
        })
    };

    request = (url: string, options: TRequestOptions): any => {
        const {
            method = METHODS.GET,
            data,
            headers = {},
            timeout = 5000,
            withCredentials = false,
        } = options

        const query = method === METHODS.GET ? queryStringify(data as TRequestData) : ''

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open(method, this._parentPath + url + query)
            withCredentials && (xhr.withCredentials = true)
            Object.entries(headers).forEach(([key, value]) => {
                xhr.setRequestHeader(key, value)
            })
            xhr.onload = () => {
                if (xhr.status >= 300) {
                    reject(xhr)
                } else {
                    resolve(xhr)
                }
            }

            xhr.timeout = timeout;
            xhr.onabort = () => reject(xhr)
            xhr.onerror = () => reject(xhr)
            xhr.ontimeout = () => reject(xhr)

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data as any)
            }
        })
    }

}

export default new HTTPTransport();
