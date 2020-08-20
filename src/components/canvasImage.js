import React, { useEffect, useMemo } from "react";

function imagePromise(src) {
    return new Promise(resolve => {
        const image = new Image();
        image.src = src;
        image.onload = () => resolve(image)
    })
}

export default React.forwardRef(function CanvasImage({image, text}, ref) {
    const bgImagePromise = useMemo(() => imagePromise(image), [image])
    useEffect(() => {
        const canvas = ref.current;
        if(!canvas) {
            return
        }
        (async () => {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(await bgImagePromise, 0, 0, canvas.width, canvas.height)
            ctx.font = "36px impact";
            ctx.textAlign = "center";
            ctx.fillStyle = "black";
            ctx.strokeStyle = "white";
            text.split('\n').forEach((line, idx) => {
                ctx.fillText(line, canvas.width / 2, 50+idx*36);
                ctx.strokeText(line, canvas.width / 2, 50+idx*36);
            });
        })()
    }, [image, ref.current, bgImagePromise, text]) // rerender if image, text or canvas size updates
    return <canvas ref={ref} width={300} height={200}/>
});
