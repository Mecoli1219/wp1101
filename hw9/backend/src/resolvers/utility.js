const checkUser = (db, name, errFunc) => {
    if (!name) throw new Error("Missing user name for " + errFunc);
    return db.UserModel.findOne({ name });
};

const newUser = (db, name) => {
    return new db.UserModel({name}).save();
}

const makeName = (name1, name2) => {
    if (name1 < name2){
        return name1 + "-" + name2;
    }else{
        return name2 + "-" + name1;
    }
}

const checkChatBox = (db, chatBoxName, errFunc) => {
    if (!chatBoxName) throw new Error("Missing chatBox name for " + errFunc);
    return db.ChatBoxModel.findOne({name:chatBoxName});
}

const checkMessage = async(db, chatBoxName, messageID) => {
    const chatBox = await checkChatBox(db, chatBoxName, "checkMessage");
    const {messages} = chatBox;
    await db.ChatBoxModel.updateOne({name: chatBoxName}, {messages: [...messages, messageID]})
}

const newMessage = (db, sender, body) => {
    return new db.MessageModel({ sender, body }).save();   
}

const newChatBox = (db, chatBoxName) => {
    return new db.ChatBoxModel({ name: chatBoxName }).save();
}

export {
    checkUser,
    newUser,
    makeName,
    checkChatBox,
    checkMessage,
    newMessage,
    newChatBox
}
