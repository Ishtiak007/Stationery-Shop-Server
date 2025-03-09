import { FilterQuery, Query } from 'mongoose';
class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  //search method
  search(searchableFields: string[]) {
    const searchTerm = this.query?.searchTerm;
    if (searchTerm) {
      const searchOptioins = searchTerm
        ? {
            $or: searchableFields.map(
              (field) =>
                ({
                  [field]: { $regex: searchTerm, $options: 'i' },
                }) as FilterQuery<T>,
            ),
          }
        : {};

      this.modelQuery = this.modelQuery.find(searchOptioins);
    }
    return this;
  }

  //filter method
  filter() {
    const queryObj = { ...this.query }; //copy
    const excludedFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    this.modelQuery = this.modelQuery.find(queryObj);
    return this;
  }

  //sort method
  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',').join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }

  //pagination
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    let skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  //fieldsLimiting | like projection
  fields() {
    const fields = this?.query?.fields
      ? (this?.query?.fields as string)?.split(',').join(' ')
      : '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}
export default QueryBuilder;
