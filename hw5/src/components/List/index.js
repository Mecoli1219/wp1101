import {React, useRef, useState} from 'react'

export default function List(props) {
    const {setCount, count} = props
    const {cur, pre, operate, show} = count
    const [memory, setMemory] = useState("0")
    const basic_func_ref = useRef({})
    const memory_ref= useRef()

    const clickNumber = (number) =>{
        return () => {
            // console.log(count)
            var cur_count = cur + number
            if (show !== "cur"){
                cur_count = "0" + number
                if (show === "eql"){
                    setCount({cur:cur_count, show:"cur", operate:"", pre:"0"})
                }else{
                    setCount({...count, cur:cur_count, show:"cur"})
                }
            }else{
                setCount({...count, cur:cur_count, show:"cur"})
            }
            
        }
    }

    const clickBasic = (number) =>{
        return () => {
            // console.log(count)
            var cur_count = cur
            cur_count = cur * number
            if (show !== "cur"){
                cur_count = pre * number
            }
            if(number === 0){
                Object.keys(basic_func_ref.current).map((key)=>{
                    basic_func_ref.current[key].style.backgroundColor = "rgba(253, 101, 0, 0.7)"
                    basic_func_ref.current[key].style.color = "rgba(255,255,255,1)"
                    return () =>{}
                })
                setCount({cur:"0", show:"cur", pre:"0", operate:""})
            }else if(show === "eql"){
                setCount({...count, pre:cur_count.toString()})
            }else{
                setCount({...count, cur:cur_count.toString(), show:"cur"})
            }
        }

    }

    const clickOperate = (event) =>{
        return () => {
            var result_cur = cur
            var result_pre = pre
            var result_show = "pre"
            var result_operate = ""
            if (event === "="){
                result_show = "eql"
                switch(operate){
                    case "+":
                        result_pre = pre*1 + cur*1
                        break
                    case "-":
                        result_pre = pre*1 - cur*1
                        break
                    case "*":
                        result_pre = pre * cur
                        break
                    case "/":
                        result_pre = pre / cur
                        break
                    default:
                        result_show = "cur"
                        result_cur = cur
                        result_pre = pre
                }
                result_operate = operate
            }else if(show === "cur"){
                switch(operate){
                    case "+":
                        result_pre = pre*1 + cur*1
                        break
                    case "-":
                        result_pre = pre*1 - cur*1
                        break
                    case "*":
                        result_pre = pre * cur
                        break
                    case "/":
                        result_pre = pre / cur
                        break
                    default:
                        result_pre = cur
                }
                result_cur = result_pre
                result_operate = event
            }else{
                result_pre = pre
                result_cur = cur
                result_operate = event
            }
            result_cur = result_cur.toString()
            result_pre = result_pre.toString()
            Object.keys(basic_func_ref.current).map((key)=>{
                basic_func_ref.current[key].style.backgroundColor = "rgba(253, 101, 0, 0.7)"
                basic_func_ref.current[key].style.color = "rgba(255,255,255,1)"
                return () =>{}
            })
            if (event !== "="){
                // console.log(basic_func_ref.current)
                basic_func_ref.current[event].style.backgroundColor = "rgba(255,255,255,1)"
                basic_func_ref.current[event].style.color = "rgba(253, 101, 0, 0.7)"
            }
            setCount({pre:result_pre, cur:result_cur, operate:result_operate, show:result_show})
        }
    }

    const clickDel = () =>{
        var cur_count = cur
        if (count.length !== 0){
            cur_count = cur.slice(0, -1)
        }
        if (show === "eql"){
            cur_count = "0"
            setCount({cur:cur_count.toString(), show:"cur", pre:"0", operate:""})
        } else{
            setCount({...count, cur: cur_count, show:"cur"})
        }
    }

    const showMemory = () =>{
        setCount({...count, cur: memory, show:"cur"})
    }

    const memorize = () =>{
        memory_ref.current.style.backgroundColor = "rgba(255,255,255,0.3)"
        setMemory(cur)
    }
    
    const reciprocal = () =>{
        var cur_count = cur
        cur_count = 1 / cur 
        if (show !== "cur"){
            cur_count = 1 / pre
        }
        if(show === "eql"){
            setCount({...count, pre:cur_count.toString()})
        }else{
            setCount({...count, cur:cur_count.toString(), show:"cur"})
        }
    }

    const root = () =>{
        var cur_count = cur
        cur_count = cur ** (1/2) 
        if (show !== "cur"){
            cur_count = pre ** (1/2)
        }
        if(show === "eql"){
            setCount({...count, pre:cur_count.toString()})
        }else{
            setCount({...count, cur:cur_count.toString(), show:"cur"})
        }
    }

    const sqrt = () =>{
        var cur_count = cur
        cur_count = cur ** 2 
        if (show !== "cur"){
            cur_count = pre ** 2
        }
        if(show === "eql"){
            setCount({...count, pre:cur_count.toString()})
        }else{
            setCount({...count, cur:cur_count.toString(), show:"cur"})
        }
    }

    return (
        <div id="button-list">
            <button onClick={showMemory} ref={memory_ref} className="func">mr</button>
            <button onClick={clickBasic(0)} className="basic">AC</button>
            <button onClick={clickDel} className="basic">del</button>
            <button onClick={clickBasic(-1)} className="basic">+/-</button>
            <button onClick={clickOperate("/")} ref={el => basic_func_ref.current["/"] = el} className="basic-func">/</button>

            <button onClick={memorize} className="func">mc</button>
            <button onClick={clickNumber("7")} className="number">7</button>
            <button onClick={clickNumber("8")} className="number">8</button>
            <button onClick={clickNumber("9")} className="number">9</button>
            <button onClick={clickOperate("*")} ref={el => basic_func_ref.current["*"] = el} className="basic-func">*</button>

            <button onClick={root} className="func">root</button>
            <button onClick={clickNumber("4")} className="number">4</button>
            <button onClick={clickNumber("5")} className="number">5</button>
            <button onClick={clickNumber("6")} className="number">6</button>
            <button onClick={clickOperate("-")} ref={el => basic_func_ref.current["-"] = el} className="basic-func">-</button>

            <button onClick={sqrt} className="func">sqrt</button>
            <button onClick={clickNumber("1")} className="number">1</button>
            <button onClick={clickNumber("2")} className="number">2</button>
            <button onClick={clickNumber("3")} className="number">3</button>
            <button onClick={clickOperate("+")} ref={el => basic_func_ref.current["+"] = el} className="basic-func">+</button>

            <button onClick={reciprocal} className="func">1/x</button>
            <button onClick={clickNumber("0")} className="zero number">0</button>
            <button onClick={clickNumber('.')} className="number">.</button>
            <button onClick={clickOperate("=")} className="basic-func">=</button>
        </div>
    )
}

