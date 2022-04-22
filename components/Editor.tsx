import React, {FC, useState} from 'react'
import CodeMirror, {ReactCodeMirrorProps} from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";

export const Editor: FC<{
    value?: string
    onChange: ReactCodeMirrorProps['onChange']
    onBlur: ReactCodeMirrorProps['onBlur']
}> = ({value, onChange, onBlur}) => {
    return (
        <CodeMirror
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            extensions={[
                markdown({ base: markdownLanguage, codeLanguages: languages })
            ]}
    />
    )
}