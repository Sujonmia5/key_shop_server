import { Query } from "mongoose";

class QueryBuilder<T> {
  constructor(
    public modelQuery: Query<T[], T>,
    public query: Record<string, unknown>
  ) {
    this.query = query;
    this.modelQuery = modelQuery;
  }
  searchQuery() {
    const { search } = this.query;
    const searchablefields = ["name", "category", "model", "brand"];
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchablefields.map((field) => ({
          [field]: { $regex: search, $options: "i" },
        })),
      });
    }
    return this;
  }
  filter() {
    const excludeFields = ["search", "page", "limit"];
    const queryObj = { ...this.query };
    excludeFields.forEach((field) => delete queryObj[field]);
    const data = Object.keys(queryObj).reduce(
      (acc: Record<string, unknown>, key: string) => {
        acc[key] = { $regex: new RegExp(queryObj[key] as string, "i") };
        return acc;
      },
      {}
    );
    this.modelQuery = this.modelQuery.find(data);
    return this;
  }
  paginate() {
    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }
  sort() {
    const { sortBy, sortOrder } = this.query;
    if (sortBy && sortOrder) {
      this.modelQuery = this.modelQuery.sort();
    }
    return this;
  }

  field() {
    const fieldName = (this.query?.field as string).split(",").join(" ");
    this.modelQuery = this.modelQuery.select(fieldName);
    return this;
  }
}

export default QueryBuilder;
