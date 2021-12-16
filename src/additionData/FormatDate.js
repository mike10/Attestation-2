export const formatDate = (date) => {
    if(date){
        date = new Date(date)
        let day = date.getDate()
        let month = date.getMonth()
        let year = date.getFullYear()
        
        if(day < 10) {
            day = "0"+day
        }
        month +=1 
        if(month < 10) {
            month="0"+month
        }
        date = `${day}.${month}.${year}`
    }
    return date
}