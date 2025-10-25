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
}

export default APIFunctionality;
