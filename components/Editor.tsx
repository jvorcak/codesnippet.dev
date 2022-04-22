import React, {FC} from 'react'
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import dynamic from "next/dynamic";
import {ReactCodeMirrorProps} from "@uiw/react-codemirror";

const CodeMirror = dynamic(
    () => import('@uiw/react-codemirror'),
    { ssr: false }
)

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