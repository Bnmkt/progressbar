export enum empty{
    start="\uee00",
    middle="\uee01",
    end="\uee02"
}
export enum completed{
    start="\uee03",
    middle="\uee04",
    end="\uee05"
}
export enum loader{
    "\uee06", 
    "\uee07", 
    "\uee08", 
    "\uee09", 
    "\uee0A", 
    "\uee0B"
}
export class ProgressBar{
    private min:number
    private max:number
    private value:number
    private size:number
    private loaderLength:number = 5
    private loaderState = 0;
    constructor(){
        this.min = 0
        this.max = 100
        this.value = 50
        this.size = 15
    }
    /**
     * show
     */
    public show() {
        let progress = ``;
        const max = this.size;
        const value = (this.value / this.max) * max
        for (let i = 0; i < this.size; i++) {
            if(i==0){
                progress += value <= i ? empty.start : completed.start
            }else if(i==this.size-1){
                progress += value < i ? empty.end : completed.end
            }else{
                progress += value < i ? empty.middle : completed.middle
            }
        }
        progress += ` ${loader[this.loaderState%this.loaderLength]}`
        this.loaderState++
        return progress
    }
    /**
     * getMax:Number
     * @return The defined maximal value of the progress bar
     */
    public getMax() {
        return this.max
    }
    /**
     * getValue:Number
     * @return Current value of the progress bar
     */
    public getValue() {
        return this.value
    }
    /**
     * setMax:ProgressBar
     * @param {number} maxValue Maximal value of the progress bar.
     * Default is 100 (hundred)
     * @return Current instance of the ProgressBar
     */
    public setMax(maxValue:number=100) {
        this.max = maxValue || 100
        return this
    }
    /**
     * setValue:ProgressBar
     * @param {Number} value Value of the progress bar.
     * Default is 50
     * @return Current instance of the ProgressBar
     */
    public setValue(value:number=0) {
        this.value = value || 0
        return this
    }
    /**
     * setSize
     */
    public setSize(size:number=15) {
        this.size = size || 15
        return this
    }
    /**
     * add:Number
     * @param {Number} x number to add to value
     * @return The progress bar value:number
     */
    public add(x:number=0) {
        this.value += x
        return this.value
    }
    /**
     * simulate
     */
    public simulate() {
        const progress = new ProgressBar()
        const clearLastLine = () => {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0); 
        }
        const randomMax = Math.round(Math.random()*1200)+Math.round(Math.random()*300)
        const randomSize = Math.round(Math.random()*10)+15
        progress.setValue(0).setMax(randomMax).setSize(randomSize)

        const i = setInterval(() => {
            clearLastLine()
            const max = progress.getMax()
            const current = progress.getValue()
            const randomIncrement = Math.round(Math.random()*15)+3
            process.stdout.write(`${progress.show()} ${current}/${max}`)
            progress.add(randomIncrement)
            if(current >= max){
                process.exit()
            }
        }, 100);
    }
}
const progress = new ProgressBar()
export {progress}