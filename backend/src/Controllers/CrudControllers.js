const { mysqldb } = require("../connection");
const { promisify } = require("util");
const dba = promisify(mysqldb.query).bind(mysqldb);

let getData = `select id, name, date_format(created_at, '%d %M %y') as created, date_format(updated_at, '%d %M %y') as updated from list where active = 1`;
module.exports = {
  getData: async (req, res) => {
    try {
      const dataList = await dba(getData);
      return res.status(200).send(dataList);
    } catch (error) {
      return res.status(500).send({ message: "server error" });
    }
  },

  postData: async (req, res) => {
    try {
      const data = req.body;
      let sql = `insert list set ?`;
      let dataInsert = {
        name: data.name,
      };
      await dba(sql, [dataInsert]);
      const dataName = await dba(getData);
      return res.status(200).send(dataName);
    } catch (error) {
      return res.status(500).send({ message: "server error" });
    }
  },

  updateData: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      let sql = `update list set name = ? where id = ?`;
      await dba(sql, [data.name, id]);
      const dataName = await dba(getData);
      return res.status(200).send(dataName);
    } catch (error) {
      return res.status(500).send({ message: "server error" });
    }
  },

  deleteData: async (req, res) => {
    try {
      const data = req.query;
      let sql = `update list set active = 0 where id = ?`;
      await dba(sql, [data.id]);
      const dataName = await dba(getData);
      return res.status(200).send(dataName);
    } catch (error) {
      return res.status(500).send({ message: "server error" });
    }
  },
};
