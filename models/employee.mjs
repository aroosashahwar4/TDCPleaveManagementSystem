export default (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    EmployeeId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    EmployeeName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    Designation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Department: {
      type: DataTypes.STRING,
      allowNull: false
    },
    JoiningDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
  },
    {
    tableName: 'Employee',
   timestamps: true,
    id: false,
  });

  return Employee;
};
