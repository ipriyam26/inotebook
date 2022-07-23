import React from 'react'

export default function Alert(props) {
const capitalize = (word)=>{
    const lower = word.toLowerCase();
    return lower[0].toUpperCase() + lower.slice(1) + '!';
}

    return (
        props.message &&
        <div className={`alert alert-${props.message.type} alert-dismissible fade show`} role="alert">
            <strong>{capitalize(props.message.type)}</strong>{props.message.msg}
        </div>
    )
}