# @bnmkt/ProgressBar

Custom progress bar using [Fira Code](https://github.com/tonsky/FiraCode)

## Installation
```
    npm i -D @bnmkt/progressbar
```

## Usage
### Example usage
```typescript
    import {progress} from "@bkt/progress"
    const clearLastLine = () => {
        process.stdout.clearLine()
        process.stdout.cursorTo(0)
    }
    
    // Using the progress bar
    progress.setValue(0) // Set the default value
            .setMax(1000) // Set Maximum value
            .setSize(15) // Size in character
    
    const interval = setInterval(() => {
        clearLastLine()
        const max = progress.getMax()
        const current = progress.getValue()
    
        if(current >= max){
            clearInterval(interval)
            process.stdout.write(`${progress.show()}\nProgressBar finished\n`)
            process.exit()
        }
    
        process.stdout.write(`${progress.show()} ${current}/${max}`)
        progress.add(50) 
    
    }, 100)
```
### Simulating a progress bar
```ts
    import {progress} from "@bkt/progress"
    // Simulating a progress bar
    progress.simulate()
```

## Requirements

- [Fira Code](https://github.com/tonsky/FiraCode)
- 