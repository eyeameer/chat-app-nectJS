const {StatusCodes}=require('http-status-codes')
import CustomApiError from './customApiError'
class UnauthenticatedError extends CustomApiError{
    constructor(mssg){
        super(mssg)
        this.statusCode=StatusCodes.UNAUTHORIZED
    }
}
export default UnauthenticatedError