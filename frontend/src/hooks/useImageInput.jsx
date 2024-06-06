import React, { useState } from 'react'

export const useImageInput = (props) => {

    const { options = {} } = props
    const { multiple = false } = options

    const INPUT_PROP_ID = `input-image-${Math.floor(Math.random() * 100)}`;

    const [file, setFile] = useState(undefined);

    const option_style = options.style;

    const onClick = (event) => { document.getElementById(INPUT_PROP_ID).click(); }

    const inputProps = {
        ...options,
        id: INPUT_PROP_ID,
        type: 'file',
        onChange: (event) => {
            let file = event.target.files
            if (!multiple) {
                file = file[0]
            }
            if (props.onSelect) {
                props.onSelect(file)
            }
            setFile(file)
        },
        style: { ...(option_style ? option_style : {}), display: 'none' },
    };

    const removeFile = (file) => {
        setFile(undefined)
    }

    return { file, onClick, inputProps, removeFile };
}