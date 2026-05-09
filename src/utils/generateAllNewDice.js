import { nanoid } from "nanoid";

export function generateAllNewDice(arr=[]) {
    if(arr.length==0){
        return new Array(10)
        .fill(0)
        .map(()=>({
            value:Math.floor(Math.random() * 6) + 1,
            isHeld:false,
            id:nanoid(),
        }));
    }

    return arr.map(die=>{
        if(die.isHeld){
            return die;
        } 

        return {
            ...die,
            value:Math.floor(Math.random() * 6) + 1
        }
    });

}