
const isMileage = (value) => {

    if (!value && value !== 0 ) {

        return false

    }

    if (value >= 0 && value <= 500000) {
        return true
        
    } else {
        
        return false

    }
}



module.exports = { isMileage };