import React, { useEffect, useMemo } from "react";

// Keeping it as it for good memory. Will remove later :)
const IMAGES =  [
    {
        src: "/background/white.jpg",
        thumbnail: "/background/white.jpg",
        thumbnailWidth: 200,
        thumbnailHeight: 200,
    }
].splice(0,1);

function imagePromise(src) {
    return new Promise(resolve => {
        const image = new Image();
        image.src = src;
        image.crossOrigin="anonymous"
        image.onload = () => resolve(image)
    })
}

/**
 * Divide an entire phrase in an array of phrases, all with the max pixel length given.
 * The words are initially separated by the space char.
 * @param phrase
 * @param length
 * @return
 */
async function getLines(ctx, phrase, maxPxLength, maxPxHeight, height, margin, sideMargin) {
    var mp = new Map()
    var check = true

    var lines = phrase.split("\n")
    var phraseArray = []

    ctx.font = height.toString(10) + "px impact"

    lines.forEach( (line) => {
        var wa          = line.split(" "),
            lastPhrase  = "",
            measure     = 0,
            splitChar   = " ";

        for (var i=0; i < wa.length; i++) {
            var w = wa[i];
            measure = ctx.measureText(lastPhrase + (i===0?"":splitChar) + w).width;
            if (measure < maxPxLength - 2*sideMargin) {
                lastPhrase += ((i===0?"":splitChar) + w);
            } else {
                phraseArray.push(lastPhrase);
                lastPhrase=w;
            }
            if (i === wa.length-1) {
                phraseArray.push(lastPhrase);
            }
        }
    })

    if(phraseArray.length * height > maxPxHeight - margin)
        check = false
    
    mp.set('lines', phraseArray)
    mp.set('check', check)
    return mp
}

async function getPrintableLines(ctx, phrase, maxPxLength, maxPxHeight, margin, sideMargin){
    var height = 30
    var mp = new Map()
    var arr = await getLines(ctx, phrase, maxPxLength, maxPxHeight, height, margin, sideMargin)
    var lines = arr.get('lines')
    var check = arr.get('check')

    while(check === false && height > 1) {
        height--
        arr = await getLines(ctx, phrase, maxPxLength, maxPxHeight, height, margin, sideMargin)
        lines = arr.get('lines')
        check = arr.get('check')
    }

    mp.set('lines', lines)
    mp.set('textHeight', height)
    return mp
}

export default React.forwardRef(function CanvasImage({text}, ref) {
    const image = IMAGES[0]['src'];
    const bgImagePromise = useMemo(() => imagePromise(image), [image])

    const margin = 50
    const sideMargin = 20
    
    useEffect(() => {
        const canvas = ref.current;
        if(!canvas) {
            return
        }
        (async () => {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(await bgImagePromise, 0, 0, canvas.width, canvas.height)
            ctx.textAlign = "center";
            ctx.fillStyle = "black";
            ctx.strokeStyle = "black";

            const arr = await getPrintableLines(ctx, text, canvas.width, canvas.height, margin, sideMargin)
            const lines = arr.get('lines')
            const textHeight = arr.get('textHeight')
            ctx.font = textHeight.toString(10) + "px arial";
            let head = (canvas.height/2) - (lines.length/2 - 0.5)*textHeight;
            lines.forEach((line, idx) => {
                ctx.fillText(line, canvas.width / 2, head+idx*textHeight);
                ctx.strokeText(line, canvas.width / 2, head+idx*textHeight);
            });
        })()
    }, [bgImagePromise, ref, text]) // rerender if image, text or canvas size updates
    return (
    <div>
        <canvas ref={ref} width={400} height={400} />
    </div>
    
    )
});
