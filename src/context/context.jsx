import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();


const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompts, setRecentPrompts] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([])
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState();

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord)
        }, 75*index);
    }

    const onSent = async (prompt) => {
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if (prompt !== undefined) {
           response = await run(prompt);
           setRecentPrompts(prompt)
        } else {
            setPrevPrompts(prev => [...prev, input])
            setRecentPrompts(input)
            response = await run(input)
        }
        
        setLoading(false)
        setInput("")
        let responseArray = response.split("**")
        let newResponse = ""; 
        for (let i=0; i<responseArray.length; i++) {
            if (i === 0 || i%2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i]+ "</b>"
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ");
        for(let i=0; i<newResponseArray.length; i++){
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ")
        }
    }

    
    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompts,
        recentPrompts,
        loading,
        setInput,
        input,
        showResult,
        resultData,
    }

    return (
        <Context.Provider value= {contextValue}>
            {
                props.children
            }
        </Context.Provider>
    )
}

export default ContextProvider;