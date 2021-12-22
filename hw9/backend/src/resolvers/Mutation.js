import {checkUser, newUser, makeName, checkChatBox, newChatBox, newMessage, checkMessage} from "./utility"

const Mutation = {
  async createChatBox(parent, {name1, name2}, {db}, info){
    if (!name1 || !name2){
      throw new Error('Missing chatBox name for CreateChatBox');
    }
    if (!(await checkUser(db, name1, "createChatBox"))){
      console.log("User does not exit for CreateChatBox: " + name1);
      await newUser(db, name1)
    }
    if (!(await checkUser(db, name2, "createChatBox"))){
      console.log("User does not exit for CreateChatBox: " + name2);
      await newUser(db, name2)
    }
    const chatBoxName = makeName(name1, name2);
    let chatBox = await checkChatBox(db, chatBoxName, "createChatBox");
    if (!chatBox) chatBox = await newChatBox(db, chatBoxName);
    return chatBox
  },
  async createMessage(parent, {sender, receiver, body}, {db, pubsub}, info){
    const user = await checkUser(db, sender, "createMessage");
    const chatBoxName = makeName(sender, receiver);
    const message = await newMessage(db, user.id, body);
    checkMessage(db, chatBoxName, message.id);
    pubsub.publish(`message ${chatBoxName}`, {
      message: {mutation: 'CREATED', data: message},
    });
    return message
  }
};

export { Mutation as default };
