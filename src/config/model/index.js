import sequelize from "../sequalize";
import Address from "./address";
import BusinessProfile from "./business-profile";
import Category from "./category";
import Job from "./Job";
import PersonalProfile from "./personal-profile";
import Review from "./review";
import Schedule from "./schedule";
import SubCategory from "./subCategory";
import User from "./user";

// Initialize models
const db = {};

db.Sequelize = sequelize.Sequelize;
db.sequelize = sequelize;

db.User = User;
db.PersonalProfile = PersonalProfile;
db.BusinessProfile = BusinessProfile;
db.Address = Address;
db.Category = Category;
db.Subcategory = SubCategory;

db.JobPost = Job;
db.Review = Review;
db.Schedule = Schedule;

// Define associations
db.User.hasOne(db.PersonalProfile, {
  foreignKey: "username",
  as: "personalProfile",
});
db.PersonalProfile.belongsTo(db.User, {
  foreignKey: "username",
  as: "user",
});

db.User.hasOne(db.BusinessProfile, {
  foreignKey: "username",
  as: "businessProfile",
});
db.BusinessProfile.belongsTo(db.User, {
  foreignKey: "username",
  as: "user",
});

db.User.hasOne(db.Address, {
  foreignKey: "username",
  as: "addresses",
});
db.Address.belongsTo(db.User, {
  foreignKey: "username",
  as: "user",
});

// schedule association
db.User.hasMany(db.Schedule, {
  foreignKey: "username",
  as: "schedule",
});
db.Schedule.belongsTo(db.User, {
  foreignKey: "username",
  as: "user",
});

// jobs association
db.User.hasMany(db.JobPost, {
  foreignKey: "username",
  as: "jobPost",
});
db.JobPost.belongsTo(db.User, {
  foreignKey: "username",
  as: "user",
});

// review association
db.User.hasMany(db.Review, {
  foreignKey: "username",
  as: "review",
});
db.Review.belongsTo(db.User, {
  foreignKey: "username",
  as: "user",
});

// db.JobPost.hasMany(Review, { foreignKey: "jobId", as: "reviews" });
// db.Review.belongsTo(JobPost, { foreignKey: "jobId", as: "jobs" });

// Category and Subcategory associations
db.Category.hasMany(db.Subcategory, {
  foreignKey: "categoryId",
  as: "subcategories",
});
db.Subcategory.belongsTo(db.Category, {
  foreignKey: "categoryId",
  as: "category",
});

export default db;
