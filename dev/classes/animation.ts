export default function animation(keyframes:(percent:number)=>void,duration:number):Animation{
    let start = -1
    let a:number;

    const promise = new Promise((res)=>{

        function frame(time:number){
            if(start === -1){
                start = time
            }
            const p = Math.round((time - start) / duration * 100) / 100
            if(p >= 1){
                res(true)
                return
            }
            keyframes(p)
            a = requestAnimationFrame(frame)
        }
        a = requestAnimationFrame(frame)
    })
    return {
        end(){
            cancelAnimationFrame(a)
        },
        get finished(){
            return promise as Promise<boolean>
        }
    }
}

type Animation = {
    end(): void,
    finished: Promise<boolean>
}