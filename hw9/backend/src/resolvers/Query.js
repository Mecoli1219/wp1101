import {makeName} from "./utility"

const Query = {
  async chatbox(parent, args, { db }, info){
    const name = makeName(args.name1, args.name2)
    return db.ChatBoxModel.findOne({name})
  },
  async messages(parent, args, { db }, info){
    return db.MessageModel.find()
  },
  async users(parent, args, {db}, info){
    if (!args.query){
      return db.UserModel.find()
    }
    return db.UserModel.findOne({name:args.query})
  }
};

export { Query as default };
