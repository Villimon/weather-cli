#!/usr/bin/env node

import { getArgs } from "./helpers/args.js"
import { getWeather } from "./services/api.service.js"
import { printError, printHelp, printSuccess } from "./services/log.service.js"
import { saveKeyValue, TOKEN_DICT } from "./services/storage.service.js"


const saveToken = async (token) => {
    if(!token.length) {
        printError('Не передан token')
        return
    }
    try {
        await saveKeyValue(TOKEN_DICT.token, token)
        printSuccess('Токен сохранен')
    } catch (error) {
        printError(error.message)
    }    
}

const getForcast = async () => {
    try {
        const weather = await getWeather('moscow')
        console.log(weather);
    } catch (error) {
        if(error?.response?.status === 404) {
            printError('Неверно указан город')
        } else if(error?.response?.status === 401) {
            printError('Неверено указан токен')
        } else {
            printError(error.message)
        }
    }
}


const initCLI = () => {
    const args = getArgs(process.argv)

    if(args.h) {
        printHelp()
    }

    if(args.s) {
        //
    }

    if(args.t) {
        saveToken(args.t)
    }

    getForcast()
}


initCLI()