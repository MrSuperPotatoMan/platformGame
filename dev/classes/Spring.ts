// import { Vector } from "../levels";

// export default class Spring{
//     constructor(attachment:Vector,length:number){
//         this.#attachment = attachment;
//         this.#length = length
//     }
//     #attachment
//     #length
//     #angle = 0
//     #setAngle(n:Vector){
//         if(this.#angle > 90 && this.#angle < 270){
//             if(Math.sign(this.velocity[Y]) === 1){
//                 this.#accerelate([0,-0.2])
//             }else{
//                 this.#accerelate([0,-0.1])
//             }
//         }else if(this.#angle < 90 || this.#angle >= 270){
//             if(Math.sign(this.velocity[Y]) === -1){
//                 this.#accerelate([0,0.2])
//             }else{
//                 this.#accerelate([0,0.1])
//             }
//         }else if(Math.abs(this.velocity[Y]) < 1){
//             this.velocity[Y] = 0
//         }
//         console.log(this.#angle, this.velocity[Y])
//         if(this.#angle >= 360){
//             this.#angle -= 360
//         }
//         if(this.#angle < 0){
//             this.#angle += 360
//         }
//         this.#angle += this.velocity[Y];
//         this.#angle = Math.round(this.#angle * 100) / 100
//     }
//     velocity = [0,0] as Vector
//     get #rad(){
//         return (this.#angle / 360) * Math.PI * 2
//     }
//     accerelate(n:Vector){
//         if(this.#angle > 90 && this.#angle < 270){
//             this.#accerelate([0,-n[Y] / 10 * -Math.sign(n[Y])]);
//         }else if(this.#angle < 90 || this.#angle > 270){
//             this.#accerelate([0,n[Y] / 10 * Math.sign(n[Y])]);
//         }else if(Math.sign(n[Y]) === -1 && this.#angle === 270){
//             this.#accerelate([0,5])
//         }else if(Math.sign(n[Y]) === 1 && this.#angle === 90){
//             this.#accerelate([0,5])
//         }
//     }
//     #accerelate(v:Vector){
//         this.velocity[X] += v[X];
//         if(Math.abs(this.velocity[X]) > SCARF_MAX_VELOCITY){
//             this.velocity[X] = SCARF_MAX_VELOCITY * Math.sign(this.velocity[X])
//         }
//         this.velocity[Y] += v[Y];
//         if(Math.abs(this.velocity[Y]) > SCARF_MAX_VELOCITY){
//             this.velocity[Y] = SCARF_MAX_VELOCITY * Math.sign(this.velocity[Y])
//         }
//         this.velocity[X] = Math.round(this.velocity[X] * 100) / 100
//         this.velocity[Y] = Math.round(this.velocity[Y] * 100) / 100
//     }
//     draw(ctx: CanvasRenderingContext2D){
//         ctx.beginPath();
//         ctx.lineTo(this.#attachment[X],this.#attachment[Y]);
//         ctx.lineTo(this.#attachment[X] + (this.#length * Math.cos(this.#rad)),this.#attachment[Y] + (this.#length * Math.sin(this.#rad)));
//         ctx.strokeStyle = '#a5d49c';
//         ctx.stroke();
//         ctx.closePath();
//         // gravity & braeking
//         this.#setAngle(this.velocity);
//         //
//     } 
// }