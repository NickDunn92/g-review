const { User } = require("./users.schema");

exports.getUsers = async () => {
  const users = await User.find();
  return users;
};

exports.addUser = async (username, email, firstname, lastname, dateOfBirth) => {
  const user = new User({
    username,
    email,
    firstname,
    lastname,
    age: dateOfBirth
  });

  await user.save();
  return user;
};

exports.getUser = async id => {
  const user = await User.findById(id);
  return user;
};
