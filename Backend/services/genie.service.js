const genieModel = require("../models/genie.model");

module.exports.createGenie = async ({
  fullname: { firstname, lastname },
  email,
  password,
  vehicle: {
    color: vehicleColor,
    id: vehicleId,
    capacity: vehicleCapacity,
    type: vehicleType,
  },
}) => {
  if (
    !firstname ||
    !email ||
    !password ||
    !vehicleColor ||
    !vehicleId ||
    !vehicleCapacity ||
    !vehicleType
  ) {
    throw new Error("All fields are required");
  }

  const genie = await genieModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      color: vehicleColor,
      id: vehicleId,
      capacity: vehicleCapacity,
      type: vehicleType,
    },
  });

  return genie;
};
