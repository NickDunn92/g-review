const { User } = require('./users.schema');

exports.getUsers = async () => {
  const users = await User.find();
  return users;
}

exports.addUser = async (username, email, firstname, lastname) => {
  const user = new User({
    username,
    email,
    firstname,
    lastname
  });

  await user.save();
  return user;
}

exports.getUser = async () => {
  const user = await User.findById();
  return user;
}

