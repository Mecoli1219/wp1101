import {React, useState} from 'react'

export default function Header(props) {
    const {count} = props
    const {cur, show, pre} = count
    const [sci, setSci] = useState(false)

    const handleOnclick = (event) =>{
        const cur_sci = !sci
        setSci(cur_sci)
        event.target.style.backgroundColor = cur_sci ? "yellow": "white"
    }

    return (
        <div id="total-box">
            <button onClick={handleOnclick}>sci</button>
            <h1 id="total">
                {
                    (
                        (pre==="Infinity" || cur === "Infinity") ? "Error: Divided by 0"
                        :
                        (pre === "NaN" || cur === "NaN" ? "Error: Not a real number":
                            ((show === "cur") ? 
                            (cur==="" ? 0: (sci ? (cur * 1).toExponential(3): cur * 1))+(cur[cur.length-1]==='.' ? '.': '')
                            :pre * 1)
                        )
                    )
                    
                }
            </h1>
        </div>
    )
}

