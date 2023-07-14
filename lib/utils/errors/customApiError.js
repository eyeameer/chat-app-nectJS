class CustomApiError extends Error{
    constructor(mssg){
        super(mssg)
    }
}
export default CustomApiError