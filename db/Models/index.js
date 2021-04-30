const db = require("..");
const { DataTypes } = require("sequelize");

const Users = db.define("Users", {
  id: {
    primaryKey: true,
    type: DataTypes.STRING
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const StudentParent = db.define("StudentParent", {
  studentId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Users,
      key: "id"
    }
  },
  parentId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Users,
      key: "id"
    }
  }
});

const Messages = db.define("Messages", {
  id: {
    primaryKey: true,
    type: DataTypes.STRING
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timeSent: {
    type: DataTypes.TIME,
    allowNull: false
  },
  senderId: {
    type: DataTypes.STRING,
    allowNull:  false,
    references: {
      model: Users,
      key: "id"
    }
  },
  receiverId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Users,
      key: "id"
    }
  }
});

const Courses = db.define("Courses", {
  id: {
    primaryKey: true,
    type: DataTypes.STRING
  },
  courseName:{
    type: DataTypes.STRING,
    allowNull: false
  },
  initialSessionPrice:{
    type: DataTypes.FLOAT,
    allowNull: false
  },
  sessionHourlyRate:{
    type: DataTypes.FLOAT,
    allowNull: false
  },
  tutorId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Users,
      key: "id"
    }
  }
});

const Appointments = db.define("Appointments", {
  id: {
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
  },
  courseId: {
    type: DataTypes.STRING,
    allowNull: false,
    reference: {
      model: Courses,
      key: "id"
    }
  },
  studentId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Users,
      key: "id"
    }
  },
  tutorId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Users,
      key: "id"
    }
  }
});

const Transactions = db.define("Transactions", {
  id:{
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
  datePaid: {
    type: DataTypes.DATE,
    allowNull: false
  },
  appointmentId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Appointments,
      key: "id"
    }
  }
});

module.exports = {
  Users: Users,
  StudentParent: StudentParent,
  Courses: Courses,
  Transactions: Transactions,
  Appointments: Appointments
};