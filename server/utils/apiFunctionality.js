// This file responsibility is Searching, Sorting, Pagination logics

class APIFunctionality {
  constructor(query, queryStr) {
    this.query = query; // await productModel.create(req.body)
    this.queryStr = queryStr; //http://localhost:5000/api/v1/product/68f2640db7?keyword=shirt
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    // console.log("keyword:", keyword);

    this.query = this.query.find({ ...keyword });

    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    this.query = this.query.find(queryCopy);

    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    // here the logic is,
    // eg: my current page is 3
    // results per page is 10
    // 10 * (3 - 1) => 10 * 2 => 20, so skip 20 products when i was in 3 page,from 21 we have to display there like that..
    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

export default APIFunctionality;
