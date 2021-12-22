import { useState } from "react";

const useChatBox = () => {
    const [chatBoxes, setChatBoxes] = useState([]);

    const [unseen, setUnseen] = useState({}); 
    const [checkout, setCheckout] = useState("")

    const createChatBox = (friend) => {
        setChatBoxes([...chatBoxes, friend])
        const newUnseen = unseen;
        newUnseen[friend] = 0;
        setUnseen(newUnseen);
    }

    const removeChatBox = (targetKey) => {
        const index = chatBoxes.indexOf(targetKey)
        let newChatBoxes = chatBoxes;
        newChatBoxes.splice(index, 1);
        const newUnseen = unseen;
        delete newUnseen[targetKey];
        setUnseen(newUnseen);
        setChatBoxes(newChatBoxes);
    }

    return {
        chatBoxes,
        unseen,
        setUnseen,
        checkout,
        setCheckout,
        createChatBox,
        removeChatBox
    }
}

export default useChatBox