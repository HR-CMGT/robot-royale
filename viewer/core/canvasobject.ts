import { GameObject } from "./gameobject.js";

export class CanvasObject extends GameObject {

    private canvas : HTMLCanvasElement
    private context: CanvasRenderingContext2D;
    protected image: HTMLImageElement;

    public get Rectangle() {
        return {
            left: this.Position.X,
            right: this.Position.Y + this.image.width,
            top: this.Position.Y,
            bottom: this.Position.Y + this.image.height
        }
    }
    
    /**
     * Basic object to draw a canvas object. HTML has to have a canvas tag!
     * @param imageName src of the image
     */
    constructor(imageName: string) {
        super()
        
        this.canvas     = document.getElementsByTagName("canvas")[0];
        this.context    = this.canvas.getContext('2d');

        this.image      = new Image();   // Create new img element
        this.image.src  = imageName; // Set source path
        
    }

    /**
     * Draw a canvas object on specific X and Y 
     */
    public draw(): void {
        // TODO move to general update method
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // scale scale of image
        let scale = 1 // 100%
        this.context.setTransform(scale, 0, 0, scale, this.Position.X, this.Position.Y); // sets scale and origin
        
        // rotation in radians.
        this.context.rotate(this.Rotation * (Math.PI / 180));
        
        // origin is image center
        this.context.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);

        this.context.setTransform(1,0,0,1,0,0);
    }

    public destroy(): void {
        this.image.remove()
    }
    public detectCollision(target: GameObject): boolean {
        return (
            this.Rectangle.left     <= target.Rectangle.right   &&
            this.Rectangle.top      <= target.Rectangle.bottom  &&
            target.Rectangle.left   <= this.Rectangle.right     &&
            target.Rectangle.top    <= this.Rectangle.bottom
        )
    }
}