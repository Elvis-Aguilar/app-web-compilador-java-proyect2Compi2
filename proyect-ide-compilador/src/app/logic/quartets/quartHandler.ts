import { Quartet } from "./quartet";

export class QuartHandler {

    private tmp: number = 0;
    private posStack: number = 0;
    quartets: Quartet[] = [];
    
    constructor(){

    }

    public tmpVar():string{
        return `t${this.tmp}`
    }

    public aumentarTmp(){
        this.tmp++;
    }

    public pos():string{
        return `${this.posStack}`;
    }

    public aumentarPosSatk(){
        this.posStack++;
    }

    public push(q:Quartet){
        this.quartets.push(q);
    }


}