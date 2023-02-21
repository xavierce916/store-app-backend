
const isPrice = (value) => {

    if (!value) {

        return false

    }

    if (value >= 2000 && value <= 500000) {

        return true

    } else {
    
        return false

    }
}



module.exports = { isPrice };