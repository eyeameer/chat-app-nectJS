const { StatusCodes } = require('http-status-codes');
import CustomApiError from './customApiError';
class NotFound extends CustomApiError{
    constructor(mssg){
        super(mssg)
        this.statusCode=StatusCodes.NOT_FOUND
    }
}
export default NotFound