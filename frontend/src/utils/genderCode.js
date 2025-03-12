export const genderCode= (value)=>{
    const code = value.split(" ").map(word => word[0]).join("").toUpperCase();
    return `${code}_${Math.floor(Math.random() * (999 - 100 + 1)) + 100}`
}