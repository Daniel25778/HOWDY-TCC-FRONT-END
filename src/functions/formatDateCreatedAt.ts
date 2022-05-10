import { useState } from "react";


export function formatDateCreatedAt(createdAt){
    
    

    const createdAtDate = new Date(createdAt);

    const currentDate = new Date()

    const dataFormatted = currentDate.getTime() - createdAtDate.getTime()
    
    console.log(dataFormatted)

    const oneMinute = 60000
    const oneHour = 3600000
    const oneDay = 86400000
    const oneWeek = 604800016.56
    const oneMonth = 2629743833.3
    const oneYear = 31557600000
    

    if (dataFormatted < oneMinute) {
        const dateCreatedAt = "Há alguns segundos"
        return dateCreatedAt
    } else if (dataFormatted < oneHour) {
        //@ts-ignore
        const distanceInMinutes = parseInt(dataFormatted / oneMinute)
        console.log(distanceInMinutes)
        const dateCreatedAt = `Há ${distanceInMinutes}  minuto` + (distanceInMinutes > 1 ? 's' : '')
        return dateCreatedAt
    }else if (dataFormatted < oneDay) {
        //@ts-ignore
        const distanceInHours = parseInt(dataFormatted / oneHour)
        console.log(distanceInHours)
        const dateCreatedAt = `Há ${distanceInHours} hora` + (distanceInHours > 1 ? 's' : '')
        return dateCreatedAt
    } else if (dataFormatted < oneWeek) {
        //@ts-ignore
        const distanceInDays = parseInt(dataFormatted / oneDay)
        const dateCreatedAt = `Há ${distanceInDays} dia` + (distanceInDays > 1 ? 's' : '')
        return dateCreatedAt
    }else if (dataFormatted < oneMonth) {
        //@ts-ignore
        const distanceInWeeks = parseInt(dataFormatted / oneWeek)
       const dateCreatedAt = `Há ${distanceInWeeks} semana` + (distanceInWeeks > 1 ? 's' : '')
        return dateCreatedAt
    }else if (dataFormatted < oneYear) {
        //@ts-ignore
        const distanceInMonths = parseInt(dataFormatted / oneMonth)
        const dateCreatedAt = `Há ${distanceInMonths} mes` + (distanceInMonths > 1 ? 's' : '')
        return dateCreatedAt
    }
    
}