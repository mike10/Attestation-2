
export const validation = (data) => {
    

    let {firstName, lastName, email, phone, dateOfBirth} = data
    // console.log(firstName, lastName, email, phone, dateOfBirth);
    // console.log(data);

    if(!firstName){
        return [false, "name"]
    }
  
    if(!lastName){
        return [false, "surname"]
    }
    
    if(!(/^\w{2,}\@\w{2,}.\w{2,}$/i).test(email)){
        alert()
        return [false, "email"]
    }
    
    if(!(/^\+7\d{10}$/i).test(phone)){
        return [false, "phone"]
    }

    if((/^\d{2}.\d{2}.\d{4}$/i).test(dateOfBirth)){
    
        let date = new Date()
        let str = dateOfBirth.split(".")
        dateOfBirth = new Date(`${str[2]}.${str[1]}.${str[0]}`)
        const dateYear = date.getFullYear()
        const birthYear = dateOfBirth.getFullYear()
        if(str[0] > 31 || str[0] < 1){
            return [false, "day"]
        }
        if(str[1] > 12 || str[1] < 1){
            str = parseInt(str[1]) // 1
            return [false, "month"]
        }
        if(dateYear - birthYear < 0){
            return [false, "notime"]
        }
        if( dateYear - birthYear > 100){
            return [false, "toolate"]
        }
        if( dateYear - birthYear < 5){
            return [false, "tooearly"]
        }
        dateOfBirth = `${str[2]}.${str[1]}.${str[0]}`
    }

    return  [true, {...data, "firstName":firstName, "lastName":lastName,
    "email": email, "phone":phone, "dateOfBirth":dateOfBirth}]

} 