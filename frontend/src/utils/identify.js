const formatNumber = (num) => {
    const fixedNum = num.toFixed(1); // Giữ 1 số sau dấu phẩy
    return fixedNum.endsWith(".0") ? Math.floor(num) : parseFloat(fixedNum);
}

export const iditify = (min, max) => {

    let valueMin = +min / 1000000
    let valueMax = +max / 1000000

    if (+min === 0) {
        if(valueMax<1){
            return `Dưới ${+max/1000} nghìn`
        }
        return `Dưới ${formatNumber(valueMax)} triệu`
    }
    else if (max === null || max === '') {
        if(valueMin<1){
            return `Trên ${+min/1000} nghìn`
        }
        return `Trên ${formatNumber(valueMin)} triệu`
    }
    else {
        return `Từ ${valueMin<1 ? +min/1000 + ' nghìn' : formatNumber(valueMin) + ' triệu'} - ${valueMax<1 ? +max/1000 + ' nghìn' : formatNumber(valueMax) + ' triệu'}`
    }
}

export const identifyArea = (min,max)=>{
    if (+min === 0) {
        return `Dưới ${max}m2`
    }
    else if (max === null || max === '') {
        return `Trên ${min}m2`
    }
    else {
        return `Từ ${min}m2 - ${max}m2`
    }
}

export const isNumber = (value) => {
    return typeof value === 'number' && !isNaN(value);
}