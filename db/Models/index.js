const db = require("..");
const { DataTypes } = require("sequelize");

const Student = db.define("Student", {
  student_id: {
    primaryKey: true,
    type: DataTypes.STRING
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true
  },
  bio: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Parent = db.define("Parent", {
  parent_id: {
    primaryKey: true,
    type: DataTypes.STRING,
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Tutor = db.define("Tutor", {
  tutor_id:{
    primaryKey: true,
    type: DataTypes.STRING
  },
  first_name:{
    type: DataTypes.STRING,
    allowNull: true
  },
  last_name:{
    type: DataTypes.STRING,
    allowNull: true
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false
  },
  gender:{
    type: DataTypes.STRING,
    allowNull: true
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false
  },
  bio:{
    type: DataTypes.STRING,
    allowNull: true
  }
});

const Messages = db.define("Messages", {
  message_id:{
    primaryKey: true,
    type: DataTypes.STRING
  },
  message:{
    type: DataTypes.STRING,
    allowNull: false
  },
  time_sent:{
    type: DataTypes.TIME,
    allowNull: false
  },
  sender:{
    type: DataTypes.STRING,
    allowNull:  false
  }
});
const Courses = db.define("Courses", {
  courses_id:{
    primaryKey: true,
    type: DataTypes.STRING
  },
  course_name:{
    type: DataTypes.STRING,
    allowNull: false
  },
  initial_session_price:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  session_hourly_rate:{
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

const Appointment = db.define("Appointments", {
  appointment_id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
const Transactions = db.define("Transactions", {
  transaction_id:{
    primaryKey: true,
    type: DataTypes.STRING
  },
  status:{
    type: DataTypes.STRING,
    allowNull: false
  },
  amount:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date_paid: {
    type: DataTypes.DATE,
    allowNull: false
  }
});
const ParentStudent = db.define("ParentStudent", {
  student_id: { type: DataTypes.STRING, isPrimary: true },
  parent_id: { type: DataTypes.STRING, isPrimary: true }
});

//Student and Parent Joint Table
Parent.belongsToMany(Student, { through: ParentStudent, foreignKey: "student_id", foreignKeyConstraint: true });
Student.belongsToMany(Parent, { through: ParentStudent, foreignKey: "parent_id", foreignKeyConstraint: true });

//Messages
Tutor.hasMany(Messages, { foreignKey: "tutor_id", foreignKeyConstraint:true });
Student.hasMany(Messages, { foreignKey: "student_id", foreignKeyConstraint:true });

//Courses
Tutor.hasMany(Courses, { foreignKey: "tutor_id", foreignKeyConstraint:true });

// Appointments
Appointment.belongsTo(Student, { foreignKey: "student_id", foreignKeyConstraint: true });
Appointment.belongsTo(Tutor, { foreignKey: "tutor_id", foreignKeyConstraint: true });
Appointment.belongsTo(Courses, { foreignKey: "course_id", foreignKeyConstraint: true });

//Transactions
Transactions.belongsTo(Appointment, { foreignKey: "appointment_id", foreignKeyConstraint:true });

module.exports = {
  Student: Student,
  Parent: Parent,
  Tutor: Tutor,
  ParentStudent: ParentStudent,
  Messages: Messages,
  Courses: Courses,
  Appointment: Appointment,
  Transactions: Transactions
};