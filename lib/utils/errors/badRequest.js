const { StatusCodes } = require('http-status-codes');
import CustomApiError from './customApiError';
class BadRequest extends CustomApiError{
    constructor(mssg){
        super(mssg)
        this.statusCode=StatusCodes.BAD_REQUEST
    }
}
export default BadRequest