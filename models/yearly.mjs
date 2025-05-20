export default (sequelize, DataTypes) => {
  const YearlyLeave = sequelize.define('YearlyLeave', {
    yearlyLeaveID: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    EmployeeId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    LeaveID: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    periodOfDuty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    leaveAtCredit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    leaveAvailed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    balanceLeave: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }, {
    tableName: 'YearlyLeave',
   timestamps: false,
    id: false
  });

  return YearlyLeave;
};


