export default (sequelize, DataTypes) => {
  const Leave = sequelize.define('Leave', {
    LeaveID: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    EmployeeId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    EmployeeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Department: {
      type: DataTypes.STRING,
    },
    Designation: {
      type: DataTypes.STRING,
    },
    LeaveType: {
      type: DataTypes.ENUM(
        'Sick Leave',
        'Casual Leave',
        'Earned Leave',
        'Maternity Leave',
      ),
      allowNull: false,
    },
    StartDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    EndDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Add Status field here:
    Status: {
      type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
      defaultValue: 'Pending',
      allowNull: false,
    },
  }, {
    tableName: 'Leave',
   timestamps: false,
    id: false
  });

  return Leave;
};



