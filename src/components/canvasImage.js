import React, { useEffect, useMemo, useState } from "react";
import { CirclePicker } from 'react-color'

import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// import styles
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 100/2,
        backgroundColor: 'red'
    }
  }));

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

    var wa          = phrase.split(" "),
        phraseArray = [],
        lastPhrase  = wa[0],
        measure     = 0,
        splitChar   = " ";

    if (wa.length <= 1) {
        mp.set('lines', wa)
        mp.set('check', check)
        return mp
    }

    ctx.font = height.toString(10) + "px impact"
    for (var i=1; i < wa.length; i++) {
        var w = wa[i];
        measure = ctx.measureText(lastPhrase+splitChar+w).width;
        if (measure < maxPxLength - 2*sideMargin) {
            lastPhrase += (splitChar+w);
        } else {
            phraseArray.push(lastPhrase);
            lastPhrase=w;
        }
        if (i === wa.length-1) {
            phraseArray.push(lastPhrase);
            break;
        }
    }

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

    while(check == false && height > 1) {
        height--
        var arr = await getLines(ctx, phrase, maxPxLength, maxPxHeight, height, margin, sideMargin)
        lines = arr.get('lines')
        check = arr.get('check')
    }

    mp.set('lines', lines)
    mp.set('textHeight', height)
    return mp
}

export default React.forwardRef(function CanvasImage({image, text}, ref) {
    const bgImagePromise = useMemo(() => imagePromise(image), [image])
    const [color, setColor] = useState('red')
    const [expanded, setExpanded] = React.useState(false);
    const margin = 50
    const sideMargin = 5

    const classes = useStyles();
    
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
            ctx.fillStyle = color;
            ctx.strokeStyle = color;

            const arr = await getPrintableLines(ctx, text, canvas.width, canvas.height, margin, sideMargin)
            const lines = arr.get('lines')
            const textHeight = arr.get('textHeight')
            console.log(lines.length, textHeight)
            ctx.font = textHeight.toString(10) + "px impact";
            lines.forEach((line, idx) => {
                ctx.fillText(line, canvas.width / 2, margin+idx*textHeight);
                ctx.strokeText(line, canvas.width / 2, margin+idx*textHeight);
            });
        })()
    }, [image, ref.current, bgImagePromise, text, color]) // rerender if image, text or canvas size updates
    return (
    <div>
        <canvas ref={ref} width={300} height={200} />
        <div>
            <div>
                <span style={{width:"20px", height:"20px" , border:"1px", background: color, display:"inline", float:"left"}} /> 
                &nbsp; &nbsp; Text Color
                <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <ExpandMoreIcon />
                </IconButton>
            </div>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CirclePicker onChangeComplete={(clr, evt) => {setColor(clr["hex"])}}/>
            </Collapse>
        </div>
    </div>
    
    )
});
