

const isYear = (value) => {
    
    if (!value) {

        return false

    }

    if (value >= 1990 && value <= 2023) {

        return true

    } else {
    
        return false

    }
}



module.exports = { isYear };