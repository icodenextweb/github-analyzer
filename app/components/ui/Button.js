"use client"; 

export default function Button(props) {
    return(
        <button 
          className={`${props.className}`} 
          type={props.btnType || "button"} 
          onClick={props.btnFunction}
        >
          {props.btnText}
        </button>
    )
}