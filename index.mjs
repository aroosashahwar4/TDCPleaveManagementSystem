import express from 'express'
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import AdminJSSequelize from '@adminjs/sequelize'
import { Sequelize, DataTypes } from 'sequelize'
import employeeModel from './models/employee.mjs'
import leaveModel from './models/leave.mjs'
import yearlyLeaveModel from './models/yearly.mjs'
import leaveRoutes from './routes/leaveRoutes.mjs';
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid'
import bodyParser from 'body-parser';


// Register Sequelize adapter
AdminJS.registerAdapter(AdminJSSequelize)

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
  
})

// Define models
const Employee = employeeModel(sequelize, DataTypes)
const Leave = leaveModel(sequelize, DataTypes)
const YearlyLeave = yearlyLeaveModel(sequelize, DataTypes)

// Define relationships
//Employee.hasMany(Leave, { foreignKey: 'EmployeeId', onDelete: 'CASCADE' })
//Leave.belongsTo(Employee, { foreignKey: 'EmployeeId' })

//Employee.hasOne(YearlyLeave, { foreignKey: 'EmployeeId', onDelete: 'CASCADE' })
//YearlyLeave.belongsTo(Employee, { foreignKey: 'EmployeeId' })

//Leave.hasMany(YearlyLeave, { foreignKey: 'LeaveID', onDelete: 'CASCADE' })
//YearlyLeave.belongsTo(Leave, { foreignKey: 'LeaveID' })

// AdminJS setup
const adminJs = new AdminJS({
  resources: [
    {
      resource: Employee,
      options: {
        properties: {
          EmployeeId: {
            isVisible: {
              list: true,
              filter: true,
              show: true,
              edit: false,
            },
          },
        },
        actions: {
          new: {
            before: async (request) => {
              if (request.payload) {
                request.payload.EmployeeId = uuidv4()
              }
              return request
            },
          },
        },
      },
    },
    {
      resource: Leave,
      options: {
        properties: {
          LeaveID: {
            isVisible: {
              list: true,
              filter: true,
              show: true,
              edit: false,
            },
          },
          EmployeeId: {
            isVisible: false,
          },
        },
        actions: {
          new: {
            before: async (request) => {
              if (request.payload) {
                request.payload.LeaveID = uuidv4()
              }
              return request
            },
          },
        },
      },
    },
    {
      resource: YearlyLeave,
      options: {
        properties: {
          yearlyLeaveID: {
            isVisible: {
              list: true,
              filter: true,
              show: true,
              edit: false,
            },
          },
          EmployeeId: { isVisible: false },
          LeaveID: { isVisible: false },
        },
        actions: {
          new: {
            before: async (request) => {
              if (request.payload) {
                request.payload.yearlyLeaveID = uuidv4()
              }
              return request
            },
          },
        },
      },
    },
  ],
  rootPath: '/admin',
})

// Express setup
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Mount routes
app.use('/api/leaves', leaveRoutes(Leave));


// ✅ Setup AdminJS router
const adminRouter = AdminJSExpress.buildRouter(adminJs)
app.use(adminJs.options.rootPath, adminRouter)

// Sync DB and start server
const PORT = 3000
await sequelize.sync();
sequelize.sync( ).then(() => {
  app.listen(PORT, '192.168.5.157', () => {
    console.log(`✅ AdminJS running at http://192.168.5.157${PORT}${adminJs.options.rootPath}`)
  })
})

