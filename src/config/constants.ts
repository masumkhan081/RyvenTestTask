export const userRoles = {
  admin: "ADMIN",
  student: "STUDENT",
};

export const testUsers = [
  {
    email: "test.admin@gmail.com",
    password: "123456",
    role: userRoles.admin,
    fullName: "admin khan",
    phone: "01833347848",
    address: "address ...",
  },
  {
    email: "test.student@gmail.com",
    password: "123456",
    role: userRoles.student,
    fullName: "student khan", // ha ha - test purpose !
    phone: "01833347847",
    address: "address ...",
  },
];

export const entities = {
  task: "Task",
};

export const paginationFields = ["page", "limit", "sortBy", "sortOrder"];
export const defaultViewLimit = 20;
export const defaultSortOrder = "desc";

export const mapSearchable = {
  [entities.task]: ["title"],
};

export const mapFilterables = {
  [entities.task]: ["isCompleted", "rewardCoins"],
};

// may be changed based on the outcome expected
export const mapDefaultSortBy = {
  [entities.task]: "",
};
