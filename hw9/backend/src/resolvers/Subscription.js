import { makeName } from "./utility";

const Subscription = {
    message: {
        subscribe(parent, {name1, name2}, {db, pubsub}, info){
            const chatBoxName = makeName(name1, name2);
            return pubsub.asyncIterator(`message ${chatBoxName}`)
        }
    }
};

export { Subscription as default };
