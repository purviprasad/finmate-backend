exports.fetchDashboardDetails = async (
  connectionPromise,
  dateType,
  date,
  user
) => {
  let query = "";
  if (dateType === "month") {
    query += `SELECT * FROM transactions WHERE user_id = '${
      user.user_id
    }' AND MONTH(date) = '${date.split("-")[1]}' AND YEAR(date) = '${
      date.split("-")[0]
    }'`;
  } else if (dateType === "year") {
    query += `SELECT user_id, t_id, type, description, category, Month(date) as date, SUM(amount) as amount, remarks, category_others, last_updated_time, bill_id, due_date FROM transactions WHERE user_id = '${user.user_id}' AND YEAR(date) = '${date}' GROUP BY MONTH(date), type`;
  } else if (dateType === "quarter") {
    //Quarter Q3 remove Q from quarter
    date = date.replace(/Q/, "");

    query += `SELECT user_id, t_id, type, description, category, Month(date) as date, SUM(amount) as amount, remarks, category_others, last_updated_time, bill_id, due_date FROM transactions WHERE user_id = '${
      user.user_id
    }' AND QUARTER(date) = '${date.split("-")[1]}' AND YEAR(date) = '${
      date.split("-")[0]
    }' GROUP BY MONTH(date), type`;
  }
  query += ` ORDER BY date ASC`;
  let result = await connectionPromise(query);
  return result;
};

exports.fetchDashboardPieDetails = async (
  connectionPromise,
  dateType,
  date,
  user
) => {
  let query = "";
  if (dateType === "year") {
    query += `SELECT * FROM transactions WHERE user_id = '${user.user_id}' AND YEAR(date) = '${date}'`;
  } else if (dateType === "quarter") {
    //Quarter Q3 remove Q from quarter
    date = date.replace(/Q/, "");

    query += `SELECT * FROM transactions WHERE user_id = '${
      user.user_id
    }' AND QUARTER(date) = '${date.split("-")[1]}' AND YEAR(date) = '${
      date.split("-")[0]
    }' `;
  }
  query += ` ORDER BY date ASC`;
  let result = await connectionPromise(query);
  return result;
};
