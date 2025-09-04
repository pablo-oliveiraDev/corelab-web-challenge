import { toast } from 'react-toastify';

export const ResStatusCode = (statusCode: number, message: string) => {
    if (statusCode !== 0 && !!message && message.length !== 0) {
        switch (statusCode) {
            case 200:
                return toast.success(message);
            case 201:
                return toast.success(message);
            case 400:
                return toast.warn(message);
            case 401:
                return toast.warn(message);
            case 403:
                return toast.warn(message);
            case 404:
                return toast.warn(message);
            case 500:
                return toast.error(message);
            default:
                return toast.warn(
                    'status desconhecido :' +
                        statusCode +
                        '\n' +
                        'MSG :' +
                        message
                );
        }
    }
};
