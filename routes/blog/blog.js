const { clientId, clientSecret } = require("../../config/index");
const axios = require("axios");

module.exports = async (req, res) => {
  const query = req.query.query;
  const display = req.query.display;
  const start = req.query.start;
  const sort = req.query.sort;
  let getApi;

  if (query) {
    try {
      getApi = await axios.get(
        `https://openapi.naver.com/v1/search/blog.json?query=${encodeURI(
          query
        )}` +
          `${display ? "&display=" + display : ""}` +
          `${start ? "&start=" + start : ""}` +
          `${sort ? "&sort=" + sort : ""}`,
        {
          headers: {
            "X-Naver-Client-Id": clientId,
            "X-Naver-Client-Secret": clientSecret
          }
        }
      );
    } catch (error) {
      if (getApi.data.errorCode === "SE01") {
        return res.status(400).json({
          status: 400,
          message: "잘못된 쿼리 요청입니다."
        });
      } else if (getApi.data.errorCode === "SE99") {
        return res.status(500).json({
          status: 500,
          message: "서버 오류"
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "잘못된 형식 요청입니다."
        });
      }
    }
  } else {
    return res.status(400).json({
      status: 400,
      message: "잘못된 쿼리 요청입니다."
    });
  }

  return res.status(200).json({
    status: 200,
    message: "검색 조회 성공",
    data: {
      count: getApi.data.display,
      sort: getApi.data.sort,
      items: getApi.data.items
    }
  });
};
