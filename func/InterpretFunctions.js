const MaxValue = (array)=>{
    let max = Math.max.apply(null, array);
    return max
}

const spetArray = (array = [])=>{
    let max = MaxValue(array)
    let index = array.findIndex((r)=> r == max)

    let newArray = []
    for (let i = 0; i < array.length; i++) {
        if (i == index) {
            newArray.push(1)
        }else newArray.push(0)
    }

    return newArray
}

module.exports = {
    MaxValue: spetArray
}