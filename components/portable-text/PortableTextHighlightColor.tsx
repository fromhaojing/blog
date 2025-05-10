'use client'
import React from "react";

interface IProps {
    children: React.ReactNode
}

export function HighlightBackground(props: IProps) {
    return (
        <span style={{background: 'var(--h-bg-color)'}}>{props.children}</span>
    )
}


export function HighlightBackgroundText(props: IProps) {
    return (
        <span style={{color: 'var(--h-text-color)', padding: '.065em .4em', borderRadius: 2}}>{props.children}</span>
    )
}
